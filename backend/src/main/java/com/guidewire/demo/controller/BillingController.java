package com.guidewire.demo.controller;

import com.guidewire.demo.model.BillingAccount;
import com.guidewire.demo.service.BillingService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/v1/billing")
public class BillingController {

    private final BillingService billingService;

    public BillingController(BillingService billingService) {
        this.billingService = billingService;
    }

    @GetMapping("/accounts")
    public List<BillingAccount> list() {
        return billingService.findAll();
    }

    @GetMapping("/accounts/{accountNumber}")
    public ResponseEntity<BillingAccount> getByAccountNumber(@PathVariable String accountNumber) {
        return billingService.findByAccountNumber(accountNumber)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/accounts/policy/{policyNumber}")
    public List<BillingAccount> getByPolicyNumber(@PathVariable String policyNumber) {
        return billingService.findByPolicyNumber(policyNumber);
    }

    @GetMapping("/accounts/delinquent")
    public List<BillingAccount> getDelinquent() {
        return billingService.findByDelinquencyStatus("Delinquent");
    }

    @PostMapping("/accounts")
    public BillingAccount create(@RequestBody BillingAccount account) {
        return billingService.save(account);
    }

    @GetMapping("/stats")
    public Map<String, Object> stats() {
        return Map.of("totalAccounts", billingService.count());
    }
}
