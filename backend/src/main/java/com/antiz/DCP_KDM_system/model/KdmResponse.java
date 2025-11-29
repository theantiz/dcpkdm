package com.antiz.DCP_KDM_system.model;

public class KdmResponse {
    private boolean success;
    private String message;
    private byte[] kdmXml;


    public KdmResponse() {
    }


    public KdmResponse(boolean success, String message, byte[] kdmXml) {
        this.success = success;
        this.message = message;
        this.kdmXml = kdmXml;
    }


    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public byte[] getKdmXml() {
        return kdmXml;
    }

    public void setKdmXml(byte[] kdmXml) {
        this.kdmXml = kdmXml;
    }
}
