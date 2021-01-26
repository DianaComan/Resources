package main.Services.Impl;

import main.Services.EmailService;
import main.Services.ResourcesService;
import main.domain.Organizations;
import main.domain.Resources;
import main.domain.Subscriptions;
import main.domain.User;
import main.repository.OrganizationsRepository;
import main.repository.ResourcesRepository;
import main.repository.SubscriptionsRepository;
import main.repository.UsersRepository;
import org.apache.commons.lang3.math.NumberUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.apache.commons.lang3.time.DateUtils;


import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@CrossOrigin(originPatterns = "*")

@Service
@EnableScheduling
public class ResourcesServiceImpl implements ResourcesService {

    @Autowired
    UsersRepository usersRepository;
    @Autowired
    ResourcesRepository resourcesRepository;

    @Autowired
    OrganizationsRepository organizationsRepository;

    @Autowired
    SubscriptionsRepository subscriptionsRepository;

    @Autowired
    EmailService emailService;

    @Override
    @Transactional
    public List<Resources> getAllResourcesByOrganizationId(Integer id) {
        return resourcesRepository.findResourcesByOrganizationId(id);
    }

    @Override
    @Transactional
    public List<Resources> getAllFreeResourcesByOrganizationId(Integer id) {
        return resourcesRepository.findAllFreeResourcesByOrganizationId(id);
    }


    @Scheduled(fixedRate = 100000)
    public void check(){
        List<Resources> resources = resourcesRepository.findAll();
        for ( Resources resource : resources) {

            if (resource.getStatus().toLowerCase().equals("busy")) {
                Date checkedDate = null;
                DateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
                Calendar cal = Calendar.getInstance();
                Date currDate = cal.getTime();


                try {
                    checkedDate = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss").
                            parse(resource.getCurrentlyReservationTime());
                } catch (ParseException e) {
                }
                if (NumberUtils.isNumber(resource.getEstimatedTime())) {
                    int addMinuteTime = Integer.parseInt(resource.getEstimatedTime());
                    Date targetTime = DateUtils.addMinutes(checkedDate, addMinuteTime); //add minute
                    if (currDate.after(targetTime)) {
                        unreserve(resource.getCurrentlyReservedBy(), resource.getName());
                    }
                }
            }
        }
    };

    @Override
    @Transactional
    public String createResource(String name, Integer organizationId) {
        List<Resources> allResources = resourcesRepository.findAll();
        if (allResources.stream().anyMatch(o -> o.getName().equals(name))) {
            return "resource with this name already exists";
        }
        List<Organizations> allOrganizations = organizationsRepository.findAll();
        if (!allOrganizations.stream().anyMatch(o -> Objects.equals(o.getId(), organizationId))) {
            return "wrong organization id";
        }

        Resources newResources = new Resources();
        newResources.setCurrentlyReservedBy("none");
        newResources.setEstimatedTime("none");
        newResources.setLastReservedBy("none");
        newResources.setCurrentlyReservationTime("none");
        newResources.setName(name);
        newResources.setOrganizationId(organizationId);
        newResources.setStatus("FREE");
        resourcesRepository.save(newResources);
        return "ok";
    }

    @Override
    public String deleteResource(String name) {
        Optional<Resources> resources = resourcesRepository.getResourcesByName(name);
        if (!resources.isPresent()) {
            return "not a resource";
        }
        resourcesRepository.deleteById(resources.get().getId());
        return "ok";

    }

    @Override
    public Resources getResourceByName(String name) {
        Optional<Resources> resources = resourcesRepository.findResourcesByName(name);
        if (!resources.isPresent()) {
            return null;
        }
        return resources.get();
    }

    @Override
    public Resources getResourceById(Integer id) {
        Optional<Resources> resources = resourcesRepository.findResourcesById(id);
        if (!resources.isPresent()) {
            return null;
        }
        return resources.get();
    }

    @Override
    public List<Resources> getMyCurrentResources(String username) {
        return resourcesRepository.getAllByCurrentlyReservedBy(username);
    }

    @Override
    public String reserve(String username, String resourceName, String estimatedTime) {
        Optional<Resources> resources = resourcesRepository.findResourcesByName(resourceName);
        if (!resources.isPresent()) {
            return "not a resource";
        }
        if (resources.get().getStatus().equals("BUSY")) {
            return "busy resource";
        }
        Optional<User> user1 = usersRepository.getUsersByUsername(username);
        if (!user1.isPresent()) {
            return "not an user";
        }
        Resources resources1 = resources.get();
        resources1.setEstimatedTime(estimatedTime);
        resources1.setCurrentlyReservedBy(username);
        resources1.setStatus("BUSY");
        DateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
        Calendar cal = Calendar.getInstance();
        String currDate = dateFormat.format(cal.getTime()).toString();
        resources1.setCurrentlyReservationTime(currDate);
        resourcesRepository.save(resources1);
        return "ok";
    }

    @Override
    public String unreserve(String username, String resourceName) {
        Optional<Resources> resources = resourcesRepository.findResourcesByName(resourceName);
        if (!resources.isPresent()) {
            return "not a resource";
        }
        if (resources.get().getStatus().equals("FREE")) {
            return "free resource";
        }
        Optional<User> user1 = usersRepository.getUsersByUsername(username);
        if (!user1.isPresent()) {
            return "not an user";
        }
        Resources resources1 = resources.get();
        resources1.setLastReservedBy(resources1.getCurrentlyReservedBy());
        resources1.setEstimatedTime("none");
        resources1.setCurrentlyReservedBy("none");
        resources1.setStatus("FREE");
        resources1.setCurrentlyReservationTime("none");
        resourcesRepository.save(resources1);

        List<Subscriptions> subscriptionsList = subscriptionsRepository.findAllByResourceId(resources1.getId());
        for (Subscriptions s : subscriptionsList) {
            User user2 = usersRepository.findUserById(s.getUserId()).get();
            String userEmail = user2.getEmail();

            String emailContent = "Dear " + user2.getFirstname() + " " + user2.getLastname() + "\n"
                    + "The resource " + resourcesRepository.findResourcesById(s.getResourceId()).get().getName()
                    + " that you subscribed to is free now! Book it before anybody else!";

            emailService.sendMessage(userEmail, "[Freed resource]", emailContent);
            subscriptionsRepository.deleteById(s.getId());

        }
        return "ok";
    }
}
