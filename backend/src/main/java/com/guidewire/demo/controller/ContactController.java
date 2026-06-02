package com.guidewire.demo.controller;

import com.guidewire.demo.model.Contact;
import com.guidewire.demo.service.ContactService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/v1/contacts")
public class ContactController {

    private final ContactService contactService;

    public ContactController(ContactService contactService) {
        this.contactService = contactService;
    }

    @GetMapping
    public Page<Contact> list(@RequestParam(defaultValue = "0") int page,
                              @RequestParam(defaultValue = "15") int size) {
        return contactService.findAll(PageRequest.of(page, size));
    }

    @GetMapping("/{publicId}")
    public ResponseEntity<Contact> getByPublicId(@PathVariable String publicId) {
        return contactService.findByPublicId(publicId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/search")
    public List<Contact> search(@RequestParam(required = false) String lastName,
                                 @RequestParam(required = false) String contactType) {
        if (lastName != null) return contactService.searchByLastName(lastName);
        if (contactType != null) return contactService.findByContactType(contactType);
        return contactService.findAll();
    }

    @PostMapping
    public Contact create(@RequestBody Contact contact) {
        return contactService.save(contact);
    }

    @PutMapping("/{publicId}")
    public ResponseEntity<Contact> update(@PathVariable String publicId, @RequestBody Contact contact) {
        return contactService.findByPublicId(publicId)
                .map(existing -> {
                    contact.setId(existing.getId());
                    contact.setPublicId(publicId);
                    return ResponseEntity.ok(contactService.save(contact));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/stats")
    public Map<String, Object> stats() {
        return Map.of("totalContacts", contactService.count());
    }
}
