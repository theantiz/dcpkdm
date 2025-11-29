package com.antiz.DCP_KDM_system.controller;

import com.antiz.DCP_KDM_system.model.KdmRequest;
import com.antiz.DCP_KDM_system.model.KdmResponse;
import com.antiz.DCP_KDM_system.service.KdmCryptoService;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.time.format.DateTimeParseException;

@RestController
@RequestMapping("/api/kdm")
public class KdmController {

    private final KdmCryptoService kdmCryptoService;

    public KdmController(KdmCryptoService kdmCryptoService) {
        this.kdmCryptoService = kdmCryptoService;
    }

    @PostMapping("/generate")
    public ResponseEntity<?> generateKdm(
            @RequestParam("dcpDigest") MultipartFile dcpDigest,
            @RequestParam("projectorCertificate") MultipartFile projectorCertificate,
            @RequestParam("startDate") String startDate,
            @RequestParam("endDate") String endDate) {

        // Validate input files
        if (dcpDigest == null || dcpDigest.isEmpty()) {
            return ResponseEntity.badRequest().body("dcpDigest file missing or empty");
        }
        if (projectorCertificate == null || projectorCertificate.isEmpty()) {
            return ResponseEntity.badRequest().body("projectorCertificate file missing or empty");
        }

        // Validate dates
        LocalDate start;
        LocalDate end;
        try {
            start = LocalDate.parse(startDate);
            end = LocalDate.parse(endDate);
        } catch (DateTimeParseException ex) {
            return ResponseEntity.badRequest().body("Invalid date format for startDate or endDate");
        }

        KdmRequest request = new KdmRequest();
        request.setDcpDigest(dcpDigest);
        request.setProjectorCertificate(projectorCertificate);
        request.setStartDate(start);
        request.setEndDate(end);

        try {
            KdmResponse response = kdmCryptoService.generateKdm(request);

            if (!response.isSuccess()) {
                return ResponseEntity.badRequest().body(response.getMessage());
            }

            ByteArrayResource resource = new ByteArrayResource(response.getKdmXml());

            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"generated_kdm.xml\"")
                    .contentType(MediaType.APPLICATION_XML)
                    .contentLength(response.getKdmXml().length)
                    .body(resource);

        } catch (Exception e) {
            return ResponseEntity.status(500).body("Server error: " + e.getMessage());
        }
    }
}
