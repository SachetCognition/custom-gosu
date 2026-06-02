package com.guidewire.demo.controller;

import com.guidewire.demo.service.*;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/v1/dashboard")
public class DashboardController {

    private final PolicyService policyService;
    private final ClaimService claimService;
    private final ContactService contactService;
    private final BillingService billingService;

    public DashboardController(PolicyService policyService, ClaimService claimService,
                                ContactService contactService, BillingService billingService) {
        this.policyService = policyService;
        this.claimService = claimService;
        this.contactService = contactService;
        this.billingService = billingService;
    }

    @GetMapping("/summary")
    public Map<String, Object> summary() {
        return Map.of(
                "policies", Map.of(
                        "total", policyService.count(),
                        "inForce", policyService.countByStatus("InForce"),
                        "cancelled", policyService.countByStatus("Cancelled")
                ),
                "claims", Map.of(
                        "total", claimService.count(),
                        "open", claimService.countByStatus("Open"),
                        "closed", claimService.countByStatus("Closed")
                ),
                "contacts", Map.of(
                        "total", contactService.count()
                ),
                "billing", Map.of(
                        "totalAccounts", billingService.count()
                )
        );
    }
}
