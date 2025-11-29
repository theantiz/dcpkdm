package com.antiz.DCP_KDM_system.model;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.PastOrPresent;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;

public class KdmRequest {

    @NotNull(message = "DCP digest file must be provided")
    private MultipartFile dcpDigest;

    @NotNull(message = "Projector certificate file must be provided")
    private MultipartFile projectorCertificate;

    @NotNull(message = "Start date must be provided")
    @PastOrPresent(message = "Start date cannot be in the future")
    private LocalDate startDate;

    @NotNull(message = "End date must be provided")
    @FutureOrPresent(message = "End date cannot be in the past")
    private LocalDate endDate;


    public MultipartFile getDcpDigest() {
        return dcpDigest;
    }

    public void setDcpDigest(MultipartFile dcpDigest) {
        this.dcpDigest = dcpDigest;
    }

    public MultipartFile getProjectorCertificate() {
        return projectorCertificate;
    }

    public void setProjectorCertificate(MultipartFile projectorCertificate) {
        this.projectorCertificate = projectorCertificate;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }
}
