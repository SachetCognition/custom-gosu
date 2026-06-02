package com.guidewire.demo.repository;

import com.guidewire.demo.model.Contact;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ContactRepository extends JpaRepository<Contact, Long> {
    Optional<Contact> findByPublicId(String publicId);
    List<Contact> findByLastNameContainingIgnoreCase(String lastName);
    List<Contact> findByContactType(String contactType);
    List<Contact> findByStatus(String status);
    List<Contact> findByStateAndCity(String state, String city);
}
