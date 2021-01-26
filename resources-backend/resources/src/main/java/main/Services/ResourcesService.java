package main.Services;

import main.domain.Resources;
import main.repository.ResourcesRepository;
import main.repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public interface ResourcesService {
    
    List<Resources> getAllResourcesByOrganizationId(Integer id);

    List<Resources> getAllFreeResourcesByOrganizationId(Integer id);

    String createResource(String name, Integer organizationId);

    String deleteResource(String name);

    Resources getResourceByName(String name);

    Resources getResourceById(Integer id);

    String reserve(String username, String resourceName, String estimatedTime);

    List<Resources> getMyCurrentResources(String username);

    String unreserve(String username, String resourceName);
}
