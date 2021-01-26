package main.Services.Impl;

import main.Services.SubscriptionsService;
import main.domain.Resources;
import main.domain.Subscriptions;
import main.domain.User;
import main.repository.ResourcesRepository;
import main.repository.SubscriptionsRepository;
import main.repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.Optional;

@CrossOrigin(originPatterns = "*")

@Service
public class SubscriptionsServiceImpl implements SubscriptionsService {

    @Autowired
    UsersRepository usersRepository;

    @Autowired
    ResourcesRepository resourcesRepository;

    @Autowired
    SubscriptionsRepository subscriptionsRepository;
    @Override
    public String createSubscription(String username, String resourceName) {
        Optional<Resources> resources1 = resourcesRepository.getResourcesByName(resourceName);
        if (!resources1.isPresent()) {
            return "not a resource";
        }
        if (resources1.get().getStatus().equals("FREE")) {
            return "resource is free";
        }
        Resources resources = resources1.get();
        Optional<User> user1 = usersRepository.getUsersByUsername(username);
        if (!user1.isPresent()) {
            return "not an user";
        }
        User user = user1.get();

        Subscriptions subscriptions = new Subscriptions();
        subscriptions.setResourceId(resources.getId());
        subscriptions.setUserId(user.getId());
        subscriptionsRepository.save(subscriptions);
        return "ok";
    }
}
