package com.guidewire.demo.repository;

import com.guidewire.demo.model.Policy;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PolicyRepository extends JpaRepository<Policy, Long> {
    Optional<Policy> findByPolicyNumber(String policyNumber);
    Optional<Policy> findByPublicId(String publicId);
    List<Policy> findByPrimaryInsuredNameContainingIgnoreCase(String name);
    List<Policy> findByProductCode(String productCode);
    List<Policy> findByStatus(String status);
    Page<Policy> findByStatus(String status, Pageable pageable);
    long countByStatus(String status);
    long countByProductCode(String productCode);
}
