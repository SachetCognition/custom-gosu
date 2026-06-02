package com.guidewire.demo.service;

import com.guidewire.demo.model.Claim;
import com.guidewire.demo.repository.ClaimRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ClaimService {

    private final ClaimRepository repository;

    public ClaimService(ClaimRepository repository) {
        this.repository = repository;
    }

    public List<Claim> findAll() {
        return repository.findAll();
    }

    public Page<Claim> findAll(Pageable pageable) {
        return repository.findAll(pageable);
    }

    public Optional<Claim> findByClaimNumber(String claimNumber) {
        return repository.findByClaimNumber(claimNumber);
    }

    public List<Claim> findByPolicyNumber(String policyNumber) {
        return repository.findByPolicyNumber(policyNumber);
    }

    public List<Claim> findByStatus(String status) {
        return repository.findByStatus(status);
    }

    public Claim save(Claim claim) {
        claim.setModifiedDate(LocalDateTime.now());
        if (claim.getCreatedDate() == null) {
            claim.setCreatedDate(LocalDateTime.now());
        }
        return repository.save(claim);
    }

    public long count() {
        return repository.count();
    }

    public long countByStatus(String status) {
        return repository.countByStatus(status);
    }
}
