package com.antiz.DCP_KDM_system.util;

import jakarta.xml.bind.JAXBContext;
import jakarta.xml.bind.JAXBException;
import jakarta.xml.bind.Marshaller;
import jakarta.xml.bind.Unmarshaller;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.nio.charset.StandardCharsets;

public class XmlUtil {

    // Marshals JAXB object to XML byte array
    public static <T> byte[] marshalToBytes(T object, Class<T> clazz) throws JAXBException {
        JAXBContext context = JAXBContext.newInstance(clazz);
        Marshaller marshaller = context.createMarshaller();
        marshaller.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, Boolean.TRUE);

        try (ByteArrayOutputStream baos = new ByteArrayOutputStream()) {
            marshaller.marshal(object, baos);
            return baos.toByteArray();
        } catch (Exception e) {
            throw new JAXBException("Error marshalling object to bytes", e);
        }
    }

    // Marshals JAXB object to XML String
    public static <T> String marshalToString(T object, Class<T> clazz) throws JAXBException {
        return new String(marshalToBytes(object, clazz), StandardCharsets.UTF_8);
    }

    // Unmarshals XML byte array to JAXB object
    public static <T> T unmarshalFromBytes(byte[] xmlBytes, Class<T> clazz) throws JAXBException {
        JAXBContext context = JAXBContext.newInstance(clazz);
        Unmarshaller unmarshaller = context.createUnmarshaller();
        try (ByteArrayInputStream bais = new ByteArrayInputStream(xmlBytes)) {
            return (T) unmarshaller.unmarshal(bais);
        } catch (Exception e) {
            throw new JAXBException("Error unmarshalling bytes to object", e);
        }
    }

    // Unmarshals XML String to JAXB object
    public static <T> T unmarshalFromString(String xml, Class<T> clazz) throws JAXBException {
        return unmarshalFromBytes(xml.getBytes(StandardCharsets.UTF_8), clazz);
    }
}
