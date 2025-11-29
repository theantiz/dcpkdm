package com.antiz.DCP_KDM_system.service;

import com.antiz.DCP_KDM_system.model.KdmRequest;
import com.antiz.DCP_KDM_system.model.KdmResponse;
import com.antiz.DCP_KDM_system.model.KdmXml;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;
import jakarta.xml.bind.JAXBContext;
import jakarta.xml.bind.Marshaller;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.security.*;
import java.security.cert.CertificateFactory;
import java.security.cert.X509Certificate;
import java.time.LocalDate;
import java.util.Base64;

@Service
public class KdmCryptoService {

    private PrivateKey loadIssuerPrivateKey() throws Exception {
        // Load private key for signing from keystore - implement accordingly
        return null;
    }

    private X509Certificate loadX509Certificate(MultipartFile certFile) throws Exception {
        if (certFile == null || certFile.isEmpty()) {
            throw new IOException("Certificate upload is empty");
        }

        byte[] bytes = certFile.getBytes();
        String content = new String(bytes, java.nio.charset.StandardCharsets.US_ASCII);

        CertificateFactory cf = CertificateFactory.getInstance("X.509");

        if (content.contains("BEGIN CERTIFICATE")) {
            String base64Str = content
                    .replace("-----BEGIN CERTIFICATE-----", "")
                    .replace("-----END CERTIFICATE-----", "")
                    .replaceAll("[^A-Za-z0-9+/=]", ""); // remove all non-Base64 chars safely

            int remainder = base64Str.length() % 4;
            if (remainder != 0) {
                base64Str += "====".substring(remainder);
            }

            System.out.println("Base64 length: " + base64Str.length());
            System.out.println("Base64 ends with: '" + base64Str.substring(Math.max(base64Str.length() - 4, 0)) + "'");

            byte[] der;
            try {
                der = Base64.getDecoder().decode(base64Str);
            } catch (IllegalArgumentException e) {
                throw new IOException("Invalid Base64 certificate content (after cleaning/padding)", e);
            }

            try (ByteArrayInputStream bais = new ByteArrayInputStream(der)) {
                return (X509Certificate) cf.generateCertificate(bais);
            }
        } else {
            try (ByteArrayInputStream bais = new ByteArrayInputStream(bytes)) {
                return (X509Certificate) cf.generateCertificate(bais);
            }
        }
    }




    private byte[] extractContentKey(MultipartFile dcpDigestFile) {

        return new byte[] { 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08,
                0x09, 0x0A, 0x0B, 0x0C, 0x0D, 0x0E, 0x0F, 0x10 };
    }

    private byte[] wrapKey(byte[] contentKey, PublicKey recipientPublicKey) throws Exception {
        Cipher cipher = Cipher.getInstance("RSA/ECB/OAEPWithSHA-256AndMGF1Padding");
        cipher.init(Cipher.WRAP_MODE, recipientPublicKey);
        return cipher.wrap(new SecretKeySpec(contentKey, "AES"));
    }

    private byte[] createSignedKdmXml(byte[] wrappedKey, LocalDate start, LocalDate end) throws Exception {
        JAXBContext context = JAXBContext.newInstance(KdmXml.class);
        Marshaller marshaller = context.createMarshaller();
        marshaller.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, true);

        KdmXml kdm = new KdmXml(wrappedKey, start, end);

        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        marshaller.marshal(kdm, baos);

        // Add XML digital signature here if needed

        return baos.toByteArray();
    }

    public KdmResponse generateKdm(KdmRequest request) {
        try {
            X509Certificate recipientCert = loadX509Certificate(request.getProjectorCertificate());
            byte[] contentKey = extractContentKey(request.getDcpDigest());

            byte[] wrappedKey = wrapKey(contentKey, recipientCert.getPublicKey());
            byte[] signedKdmXml = createSignedKdmXml(wrappedKey, request.getStartDate(), request.getEndDate());

            return new KdmResponse(true, "KDM generated successfully", signedKdmXml);
        } catch (Exception ex) {
            ex.printStackTrace();
            return new KdmResponse(false, "Failed to generate KDM: " + ex.getMessage(), null);
        }
    }
}
