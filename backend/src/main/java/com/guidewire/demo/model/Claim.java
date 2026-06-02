package com.guidewire.demo.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "claims")
public class Claim {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "claim_number", unique = true, nullable = false, length = 30)
    private String claimNumber;

    @Column(name = "public_id", unique = true, nullable = false, length = 50)
    private String publicId;

    @Column(name = "policy_number", nullable = false, length = 30)
    private String policyNumber;

    @Column(nullable = false, length = 30)
    private String status;

    @Column(name = "loss_date", nullable = false)
    private LocalDate lossDate;

    @Column(name = "reported_date")
    private LocalDate reportedDate;

    @Column(name = "closed_date")
    private LocalDate closedDate;

    @Column(name = "loss_cause", length = 100)
    private String lossCause;

    @Column(name = "loss_type", length = 100)
    private String lossType;

    @Column(name = "loss_description", length = 2000)
    private String lossDescription;

    @Column(name = "loss_location_city", length = 100)
    private String lossLocationCity;

    @Column(name = "loss_location_state", length = 50)
    private String lossLocationState;

    @Column(name = "claimant_name", length = 200)
    private String claimantName;

    @Column(name = "insured_name", length = 200)
    private String insuredName;

    @Column(name = "adjuster_name", length = 200)
    private String adjusterName;

    @Column(name = "adjuster_code", length = 30)
    private String adjusterCode;

    @Column(name = "total_incurred", precision = 12, scale = 2)
    private BigDecimal totalIncurred;

    @Column(name = "total_paid", precision = 12, scale = 2)
    private BigDecimal totalPaid;

    @Column(name = "total_reserves", precision = 12, scale = 2)
    private BigDecimal totalReserves;

    @Column(name = "total_recoveries", precision = 12, scale = 2)
    private BigDecimal totalRecoveries;

    @Column(length = 30)
    private String severity;

    @Column(name = "litigation_status", length = 30)
    private String litigationStatus;

    @Column(name = "catastrophe_number", length = 30)
    private String catastropheNumber;

    @Column(name = "created_date")
    private LocalDateTime createdDate;

    @Column(name = "modified_date")
    private LocalDateTime modifiedDate;

    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getClaimNumber() { return claimNumber; }
    public void setClaimNumber(String claimNumber) { this.claimNumber = claimNumber; }
    public String getPublicId() { return publicId; }
    public void setPublicId(String publicId) { this.publicId = publicId; }
    public String getPolicyNumber() { return policyNumber; }
    public void setPolicyNumber(String policyNumber) { this.policyNumber = policyNumber; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public LocalDate getLossDate() { return lossDate; }
    public void setLossDate(LocalDate lossDate) { this.lossDate = lossDate; }
    public LocalDate getReportedDate() { return reportedDate; }
    public void setReportedDate(LocalDate reportedDate) { this.reportedDate = reportedDate; }
    public LocalDate getClosedDate() { return closedDate; }
    public void setClosedDate(LocalDate closedDate) { this.closedDate = closedDate; }
    public String getLossCause() { return lossCause; }
    public void setLossCause(String lossCause) { this.lossCause = lossCause; }
    public String getLossType() { return lossType; }
    public void setLossType(String lossType) { this.lossType = lossType; }
    public String getLossDescription() { return lossDescription; }
    public void setLossDescription(String lossDescription) { this.lossDescription = lossDescription; }
    public String getLossLocationCity() { return lossLocationCity; }
    public void setLossLocationCity(String lossLocationCity) { this.lossLocationCity = lossLocationCity; }
    public String getLossLocationState() { return lossLocationState; }
    public void setLossLocationState(String lossLocationState) { this.lossLocationState = lossLocationState; }
    public String getClaimantName() { return claimantName; }
    public void setClaimantName(String claimantName) { this.claimantName = claimantName; }
    public String getInsuredName() { return insuredName; }
    public void setInsuredName(String insuredName) { this.insuredName = insuredName; }
    public String getAdjusterName() { return adjusterName; }
    public void setAdjusterName(String adjusterName) { this.adjusterName = adjusterName; }
    public String getAdjusterCode() { return adjusterCode; }
    public void setAdjusterCode(String adjusterCode) { this.adjusterCode = adjusterCode; }
    public BigDecimal getTotalIncurred() { return totalIncurred; }
    public void setTotalIncurred(BigDecimal totalIncurred) { this.totalIncurred = totalIncurred; }
    public BigDecimal getTotalPaid() { return totalPaid; }
    public void setTotalPaid(BigDecimal totalPaid) { this.totalPaid = totalPaid; }
    public BigDecimal getTotalReserves() { return totalReserves; }
    public void setTotalReserves(BigDecimal totalReserves) { this.totalReserves = totalReserves; }
    public BigDecimal getTotalRecoveries() { return totalRecoveries; }
    public void setTotalRecoveries(BigDecimal totalRecoveries) { this.totalRecoveries = totalRecoveries; }
    public String getSeverity() { return severity; }
    public void setSeverity(String severity) { this.severity = severity; }
    public String getLitigationStatus() { return litigationStatus; }
    public void setLitigationStatus(String litigationStatus) { this.litigationStatus = litigationStatus; }
    public String getCatastropheNumber() { return catastropheNumber; }
    public void setCatastropheNumber(String catastropheNumber) { this.catastropheNumber = catastropheNumber; }
    public LocalDateTime getCreatedDate() { return createdDate; }
    public void setCreatedDate(LocalDateTime createdDate) { this.createdDate = createdDate; }
    public LocalDateTime getModifiedDate() { return modifiedDate; }
    public void setModifiedDate(LocalDateTime modifiedDate) { this.modifiedDate = modifiedDate; }
}
