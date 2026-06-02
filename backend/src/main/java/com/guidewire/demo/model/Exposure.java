package com.guidewire.demo.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "exposures")
public class Exposure {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "public_id", unique = true, nullable = false, length = 50)
    private String publicId;

    @Column(name = "claim_number", nullable = false, length = 30)
    private String claimNumber;

    @Column(name = "exposure_type", length = 100)
    private String exposureType;

    @Column(name = "coverage_type", length = 100)
    private String coverageType;

    @Column(length = 30)
    private String status;

    @Column(name = "claimant_name", length = 200)
    private String claimantName;

    @Column(name = "loss_party", length = 30)
    private String lossParty;

    @Column(name = "reserve_amount", precision = 12, scale = 2)
    private BigDecimal reserveAmount;

    @Column(name = "paid_amount", precision = 12, scale = 2)
    private BigDecimal paidAmount;

    @Column(name = "incurred_amount", precision = 12, scale = 2)
    private BigDecimal incurredAmount;

    @Column(name = "adjuster_name", length = 200)
    private String adjusterName;

    @Column(length = 30)
    private String severity;

    @Column(name = "created_date")
    private LocalDateTime createdDate;

    @Column(name = "closed_date")
    private LocalDate closedDate;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getPublicId() { return publicId; }
    public void setPublicId(String publicId) { this.publicId = publicId; }
    public String getClaimNumber() { return claimNumber; }
    public void setClaimNumber(String claimNumber) { this.claimNumber = claimNumber; }
    public String getExposureType() { return exposureType; }
    public void setExposureType(String exposureType) { this.exposureType = exposureType; }
    public String getCoverageType() { return coverageType; }
    public void setCoverageType(String coverageType) { this.coverageType = coverageType; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public String getClaimantName() { return claimantName; }
    public void setClaimantName(String claimantName) { this.claimantName = claimantName; }
    public String getLossParty() { return lossParty; }
    public void setLossParty(String lossParty) { this.lossParty = lossParty; }
    public BigDecimal getReserveAmount() { return reserveAmount; }
    public void setReserveAmount(BigDecimal reserveAmount) { this.reserveAmount = reserveAmount; }
    public BigDecimal getPaidAmount() { return paidAmount; }
    public void setPaidAmount(BigDecimal paidAmount) { this.paidAmount = paidAmount; }
    public BigDecimal getIncurredAmount() { return incurredAmount; }
    public void setIncurredAmount(BigDecimal incurredAmount) { this.incurredAmount = incurredAmount; }
    public String getAdjusterName() { return adjusterName; }
    public void setAdjusterName(String adjusterName) { this.adjusterName = adjusterName; }
    public String getSeverity() { return severity; }
    public void setSeverity(String severity) { this.severity = severity; }
    public LocalDateTime getCreatedDate() { return createdDate; }
    public void setCreatedDate(LocalDateTime createdDate) { this.createdDate = createdDate; }
    public LocalDate getClosedDate() { return closedDate; }
    public void setClosedDate(LocalDate closedDate) { this.closedDate = closedDate; }
}
