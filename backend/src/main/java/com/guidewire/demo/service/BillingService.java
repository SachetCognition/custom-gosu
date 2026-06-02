package com.guidewire.demo.service;

import com.guidewire.demo.model.BillingAccount;
import com.guidewire.demo.repository.BillingAccountRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class BillingService {

    private final BillingAccountRepository repository;

    public BillingService(BillingAccountRepository repository) {
        this.repository = repository;
    }

    public List<BillingAccount> findAll() {
        return repository.findAll();
    }

    public Optional<BillingAccount> findByAccountNumber(String accountNumber) {
        return repository.findByAccountNumber(accountNumber);
    }

    public List<BillingAccount> findByPolicyNumber(String policyNumber) {
        return repository.findByPolicyNumber(policyNumber);
    }

    public List<BillingAccount> findByDelinquencyStatus(String delinquencyStatus) {
        return repository.findByDelinquencyStatus(delinquencyStatus);
    }

    public BillingAccount save(BillingAccount account) {
        account.setModifiedDate(LocalDateTime.now());
        if (account.getCreatedDate() == null) {
            account.setCreatedDate(LocalDateTime.now());
        }
        return repository.save(account);
    }

    public long count() {
        return repository.count();
    }
}
