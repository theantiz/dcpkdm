package com.antiz.DCP_KDM_system.model;

import jakarta.xml.bind.annotation.XmlRootElement;
import jakarta.xml.bind.annotation.XmlElement;
import jakarta.xml.bind.annotation.XmlAccessorType;
import jakarta.xml.bind.annotation.XmlAccessType;
import jakarta.xml.bind.annotation.XmlType;

import java.time.LocalDate;
import java.util.Base64;

@XmlRootElement(name = "KDM")
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(propOrder = { "wrappedKeyBase64", "startDate", "endDate" })
public class KdmXml {

    @XmlElement(name = "WrappedKey")
    private String wrappedKeyBase64;

    @XmlElement(name = "StartDate")
    private String startDate;

    @XmlElement(name = "EndDate")
    private String endDate;

    public KdmXml() {}

    public KdmXml(byte[] wrappedKey, LocalDate start, LocalDate end) {
        this.wrappedKeyBase64 = Base64.getEncoder().encodeToString(wrappedKey);
        this.startDate = start.toString();
        this.endDate = end.toString();
    }

    public String getWrappedKeyBase64() {
        return wrappedKeyBase64;
    }

    public void setWrappedKeyBase64(String wrappedKeyBase64) {
        this.wrappedKeyBase64 = wrappedKeyBase64;
    }

    public String getStartDate() {
        return startDate;
    }

    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }

    public String getEndDate() {
        return endDate;
    }

    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }
}
