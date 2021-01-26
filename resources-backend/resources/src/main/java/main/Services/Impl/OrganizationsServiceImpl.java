package main.Services.Impl;

import main.Services.OrganizationsService;
import main.domain.Organizations;
import main.repository.OrganizationsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;
import java.util.Optional;

@CrossOrigin(originPatterns = "*")

@Service
@Transactional
public class OrganizationsServiceImpl implements OrganizationsService {

    @Autowired
    OrganizationsRepository organizationsRepository;

    @Override
    public List<Organizations> getAllOrganizations() {
        return organizationsRepository.findAll();
    }

    @Override
    public String createOrganization(String name) {
        List<Organizations> allOrganizations = organizationsRepository.findAll();
        if (allOrganizations.stream().anyMatch(o -> o.getName().equals(name))) {
            return "this name is in use already";
        }

        Organizations newOrganizations = new Organizations();
        newOrganizations.setName(name);
        organizationsRepository.save(newOrganizations);
        return "ok";
    }

    @Override
    @Transactional
    public Organizations getOrganizationByName(String name) {
        Optional<Organizations> organizations = organizationsRepository.findOrganizationByName(name);
        if (!organizations.isPresent()) {
            return null;
        }
        return organizations.get();
    }

    @Override
    @Transactional
    public Organizations getOrganizationById(Integer id) {
        Optional<Organizations> organizations = organizationsRepository.findOrganizationById(id);
        if (!organizations.isPresent()) {
            return null;
        }
        return organizations.get();
    }


}
