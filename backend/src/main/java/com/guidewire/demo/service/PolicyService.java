package com.guidewire.demo.service;

import com.guidewire.demo.model.Policy;
import com.guidewire.demo.repository.PolicyRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class PolicyService {

    private final PolicyRepository repository;

    public PolicyService(PolicyRepository repository) {
        this.repository = repository;
    }

    public List<Policy> findAll() {
        return repository.findAll();
    }

    public Page<Policy> findAll(Pageable pageable) {
        return repository.findAll(pageable);
    }

    public Optional<Policy> findByPolicyNumber(String policyNumber) {
        return repository.findByPolicyNumber(policyNumber);
    }

    public Optional<Policy> findByPublicId(String publicId) {
        return repository.findByPublicId(publicId);
    }

    public List<Policy> searchByInsuredName(String name) {
        return repository.findByPrimaryInsuredNameContainingIgnoreCase(name);
    }

    public List<Policy> findByProductCode(String productCode) {
        return repository.findByProductCode(productCode);
    }

    public List<Policy> findByStatus(String status) {
        return repository.findByStatus(status);
    }

    public Policy save(Policy policy) {
        policy.setModifiedDate(LocalDateTime.now());
        if (policy.getCreatedDate() == null) {
            policy.setCreatedDate(LocalDateTime.now());
        }
        return repository.save(policy);
    }

    public long count() {
        return repository.count();
    }

    public long countByStatus(String status) {
        return repository.countByStatus(status);
    }
}
