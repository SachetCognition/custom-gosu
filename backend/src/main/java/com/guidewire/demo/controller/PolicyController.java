package com.guidewire.demo.controller;

import com.guidewire.demo.model.Policy;
import com.guidewire.demo.service.PolicyService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/v1/policies")
public class PolicyController {

    private final PolicyService policyService;

    public PolicyController(PolicyService policyService) {
        this.policyService = policyService;
    }

    @GetMapping
    public Page<Policy> list(Pageable pageable) {
        return policyService.findAll(pageable);
    }

    @GetMapping("/{policyNumber}")
    public ResponseEntity<Policy> getByPolicyNumber(@PathVariable String policyNumber) {
        return policyService.findByPolicyNumber(policyNumber)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/search")
    public List<Policy> search(@RequestParam(required = false) String insuredName,
                                @RequestParam(required = false) String productCode,
                                @RequestParam(required = false) String status) {
        if (insuredName != null) return policyService.searchByInsuredName(insuredName);
        if (productCode != null) return policyService.findByProductCode(productCode);
        if (status != null) return policyService.findByStatus(status);
        return policyService.findAll();
    }

    @PostMapping
    public Policy create(@RequestBody Policy policy) {
        return policyService.save(policy);
    }

    @PutMapping("/{policyNumber}")
    public ResponseEntity<Policy> update(@PathVariable String policyNumber, @RequestBody Policy policy) {
        return policyService.findByPolicyNumber(policyNumber)
                .map(existing -> {
                    policy.setId(existing.getId());
                    policy.setPolicyNumber(policyNumber);
                    return ResponseEntity.ok(policyService.save(policy));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/stats")
    public Map<String, Object> stats() {
        return Map.of(
                "totalPolicies", policyService.count(),
                "inForce", policyService.countByStatus("InForce"),
                "cancelled", policyService.countByStatus("Cancelled"),
                "expired", policyService.countByStatus("Expired")
        );
    }
}
