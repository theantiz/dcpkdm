
package com.antiz.DCP_KDM_system.model;

import jakarta.xml.bind.JAXBContext;
import jakarta.xml.bind.Marshaller;
import org.junit.jupiter.api.Test;

import java.io.ByteArrayOutputStream;
import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.assertTrue;

public class KdmXmlTest {

    @Test
    void marshal_shouldProduceXml() throws Exception {
        KdmXml kdm = new KdmXml("abc".getBytes(), LocalDate.now(), LocalDate.now().plusDays(1));
        JAXBContext ctx = JAXBContext.newInstance(KdmXml.class);
        Marshaller marshaller = ctx.createMarshaller();
        marshaller.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, true);

        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        marshaller.marshal(kdm, baos);

        String xml = baos.toString();
        assertTrue(xml.contains("<KDM>"));
        assertTrue(xml.contains("<WrappedKey>"));
    }
}
