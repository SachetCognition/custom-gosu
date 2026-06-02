package com.guidewire.demo.repository;

import com.guidewire.demo.model.BillingAccount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BillingAccountRepository extends JpaRepository<BillingAccount, Long> {
    Optional<BillingAccount> findByAccountNumber(String accountNumber);
    List<BillingAccount> findByPolicyNumber(String policyNumber);
    List<BillingAccount> findByDelinquencyStatus(String delinquencyStatus);
    List<BillingAccount> findByStatus(String status);
    List<BillingAccount> findByAccountNameContainingIgnoreCase(String accountName);
}
