package com.guidewire.demo.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "policies")
public class Policy {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "policy_number", unique = true, nullable = false, length = 30)
    private String policyNumber;

    @Column(name = "public_id", unique = true, nullable = false, length = 50)
    private String publicId;

    @Column(name = "product_code", nullable = false, length = 50)
    private String productCode;

    @Column(name = "product_name", length = 100)
    private String productName;

    @Column(nullable = false, length = 30)
    private String status;

    @Column(name = "effective_date", nullable = false)
    private LocalDate effectiveDate;

    @Column(name = "expiration_date", nullable = false)
    private LocalDate expirationDate;

    @Column(name = "total_premium", precision = 12, scale = 2)
    private BigDecimal totalPremium;

    @Column(name = "currency_code", length = 3)
    private String currencyCode = "USD";

    @Column(name = "primary_insured_name", nullable = false, length = 200)
    private String primaryInsuredName;

    @Column(name = "primary_insured_id", length = 50)
    private String primaryInsuredId;

    @Column(name = "agent_code", length = 30)
    private String agentCode;

    @Column(name = "agent_name", length = 200)
    private String agentName;

    @Column(name = "uw_company", length = 100)
    private String uwCompany;

    @Column(name = "term_number")
    private Integer termNumber = 1;

    @Column(name = "cancellation_date")
    private LocalDate cancellationDate;

    @Column(name = "created_date")
    private LocalDateTime createdDate;

    @Column(name = "modified_date")
    private LocalDateTime modifiedDate;

    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getPolicyNumber() { return policyNumber; }
    public void setPolicyNumber(String policyNumber) { this.policyNumber = policyNumber; }

    public String getPublicId() { return publicId; }
    public void setPublicId(String publicId) { this.publicId = publicId; }

    public String getProductCode() { return productCode; }
    public void setProductCode(String productCode) { this.productCode = productCode; }

    public String getProductName() { return productName; }
    public void setProductName(String productName) { this.productName = productName; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public LocalDate getEffectiveDate() { return effectiveDate; }
    public void setEffectiveDate(LocalDate effectiveDate) { this.effectiveDate = effectiveDate; }

    public LocalDate getExpirationDate() { return expirationDate; }
    public void setExpirationDate(LocalDate expirationDate) { this.expirationDate = expirationDate; }

    public BigDecimal getTotalPremium() { return totalPremium; }
    public void setTotalPremium(BigDecimal totalPremium) { this.totalPremium = totalPremium; }

    public String getCurrencyCode() { return currencyCode; }
    public void setCurrencyCode(String currencyCode) { this.currencyCode = currencyCode; }

    public String getPrimaryInsuredName() { return primaryInsuredName; }
    public void setPrimaryInsuredName(String primaryInsuredName) { this.primaryInsuredName = primaryInsuredName; }

    public String getPrimaryInsuredId() { return primaryInsuredId; }
    public void setPrimaryInsuredId(String primaryInsuredId) { this.primaryInsuredId = primaryInsuredId; }

    public String getAgentCode() { return agentCode; }
    public void setAgentCode(String agentCode) { this.agentCode = agentCode; }

    public String getAgentName() { return agentName; }
    public void setAgentName(String agentName) { this.agentName = agentName; }

    public String getUwCompany() { return uwCompany; }
    public void setUwCompany(String uwCompany) { this.uwCompany = uwCompany; }

    public Integer getTermNumber() { return termNumber; }
    public void setTermNumber(Integer termNumber) { this.termNumber = termNumber; }

    public LocalDate getCancellationDate() { return cancellationDate; }
    public void setCancellationDate(LocalDate cancellationDate) { this.cancellationDate = cancellationDate; }

    public LocalDateTime getCreatedDate() { return createdDate; }
    public void setCreatedDate(LocalDateTime createdDate) { this.createdDate = createdDate; }

    public LocalDateTime getModifiedDate() { return modifiedDate; }
    public void setModifiedDate(LocalDateTime modifiedDate) { this.modifiedDate = modifiedDate; }
}
