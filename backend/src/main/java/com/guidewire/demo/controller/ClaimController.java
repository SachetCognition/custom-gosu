package com.guidewire.demo.controller;

import com.guidewire.demo.model.Claim;
import com.guidewire.demo.service.ClaimService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/v1/claims")
public class ClaimController {

    private final ClaimService claimService;

    public ClaimController(ClaimService claimService) {
        this.claimService = claimService;
    }

    @GetMapping
    public Page<Claim> list(Pageable pageable) {
        return claimService.findAll(pageable);
    }

    @GetMapping("/{claimNumber}")
    public ResponseEntity<Claim> getByClaimNumber(@PathVariable String claimNumber) {
        return claimService.findByClaimNumber(claimNumber)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/policy/{policyNumber}")
    public List<Claim> getByPolicyNumber(@PathVariable String policyNumber) {
        return claimService.findByPolicyNumber(policyNumber);
    }

    @GetMapping("/search")
    public List<Claim> search(@RequestParam(required = false) String status) {
        if (status != null) return claimService.findByStatus(status);
        return claimService.findAll();
    }

    @PostMapping
    public Claim create(@RequestBody Claim claim) {
        return claimService.save(claim);
    }

    @GetMapping("/stats")
    public Map<String, Object> stats() {
        return Map.of(
                "totalClaims", claimService.count(),
                "open", claimService.countByStatus("Open"),
                "closed", claimService.countByStatus("Closed")
        );
    }
}
