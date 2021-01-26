package main.Services;

import main.domain.Organizations;
import main.domain.Resources;

import java.util.List;

public interface OrganizationsService {
    Organizations getOrganizationByName(String name);

    Organizations getOrganizationById(Integer id);

    String createOrganization(String name);

    List<Organizations> getAllOrganizations();
}
