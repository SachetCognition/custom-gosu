package com.guidewire.demo.repository;

import com.guidewire.demo.model.Claim;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ClaimRepository extends JpaRepository<Claim, Long> {
    Optional<Claim> findByClaimNumber(String claimNumber);
    Optional<Claim> findByPublicId(String publicId);
    List<Claim> findByPolicyNumber(String policyNumber);
    List<Claim> findByStatus(String status);
    Page<Claim> findByStatus(String status, Pageable pageable);
    List<Claim> findByLossCause(String lossCause);
    long countByStatus(String status);
}
