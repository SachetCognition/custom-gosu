package com.guidewire.demo.service;

import com.guidewire.demo.model.Contact;
import com.guidewire.demo.repository.ContactRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ContactService {

    private final ContactRepository repository;

    public ContactService(ContactRepository repository) {
        this.repository = repository;
    }

    public List<Contact> findAll() {
        return repository.findAll();
    }

    public Page<Contact> findAll(Pageable pageable) {
        return repository.findAll(pageable);
    }

    public Optional<Contact> findByPublicId(String publicId) {
        return repository.findByPublicId(publicId);
    }

    public List<Contact> searchByLastName(String lastName) {
        return repository.findByLastNameContainingIgnoreCase(lastName);
    }

    public List<Contact> findByContactType(String contactType) {
        return repository.findByContactType(contactType);
    }

    public Contact save(Contact contact) {
        contact.setModifiedDate(LocalDateTime.now());
        if (contact.getCreatedDate() == null) {
            contact.setCreatedDate(LocalDateTime.now());
        }
        return repository.save(contact);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }

    public long count() {
        return repository.count();
    }
}
