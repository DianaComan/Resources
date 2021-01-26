package main.Services.Impl;

import main.Services.EmailService;
import main.Services.UsersService;
import main.domain.Organizations;
import main.domain.User;

import java.util.Objects;
import main.repository.OrganizationsRepository;
import main.repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;

import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@CrossOrigin(originPatterns = "*")

@Service
public class UsersServiceImpl implements UsersService {

    @Autowired
    UsersRepository usersRepository;

    @Autowired
    OrganizationsRepository organizationsRepository;

    @Autowired
    EmailService emailService;
    @Override
    @Transactional
    public List<User> getAllUsersByOrganizationId(int id) {
        return usersRepository.findUsersByOrganizationId(id);
    }

    @Override
    @Transactional
    public String login(String username, String password) {
        Optional<User> user = Optional.ofNullable(usersRepository.findUserByUsername(username));
        if (!user.isPresent()) {
            return "not an user";
        }
        if (!user.get().getPassword().equals(password)) {
            return "incorrect password";
        }
        return "login succesful";
    }

    @Override
    @Transactional
    public String createUser(String username, String password, String email, String firstname, String lastname, String organizationName) {
        //check all users for email and username - getAll
        List<User> allUsers = usersRepository.findAll();
        if (allUsers.stream().anyMatch(o -> o.getUsername().equals(username))) {
            return "username already exists";
        }
        List<Organizations> allOrganizations = organizationsRepository.findAll();
        if (!(allOrganizations.stream().anyMatch(o -> Objects.equals(o.getName(), organizationName)))) {
            return "wrong organization id";
        }
        if (allUsers.stream().anyMatch(o -> o.getEmail().equals(email))) {
            return "email already exists";
        }

        if (password.length() < 8) {
            return "password must be at least 8 characters long";
        }

        boolean result = true;
        try {
            InternetAddress emailAddr = new InternetAddress(email);
            emailAddr.validate();
        } catch (AddressException ex) {
            result = false;
        }
        if (!result) {
            return "invalid email address";
        }
        User newUser = new User();
        newUser.setUsername(username);
        newUser.setEmail(email);
        newUser.setPassword(password);
        newUser.setLastname(lastname);
        newUser.setFirstname(firstname);
        newUser.setOrganizationId(allOrganizations.stream().filter(o -> o.getName().equals(organizationName)).collect(Collectors.toList()).get(0).getId());
        newUser.setOrganizationName(organizationName);
        newUser.setRole("regular");
        usersRepository.save(newUser);


        String emailContent = "Dear " + firstname + " " + lastname + "\n"
                + "You are now a member of our community! Hope you enjoy it with us!";

        emailService.sendMessage(email, "[Account created]", emailContent);
        return "ok";
    }

    @Override
    @Transactional
    public User getUserByUsername(String username) {
        Optional<User> user = usersRepository.getUsersByUsername(username);
        if (!user.isPresent()) {
            return null;
        }
        return user.get();

    }

    @Override
    @Transactional
    public User getUserById(Integer id) {
        Optional<User> user = usersRepository.findUserById(id);
        if (!user.isPresent()) {
            return null;
        }
        return user.get();
    }

    @Override
    @Transactional
    public String makeUserAdmin(String username) {
        Optional<User> user = usersRepository.getUsersByUsername(username);
        if (!user.isPresent()) {
            return "not an user";
        }
        User user1 = user.get();
        user1.setRole("admin");
        usersRepository.save(user1);
        return "ok";
    }

    @Override
    @Transactional
    public String updateCurrentUser(String username, String newEmail, String newFirstname, String newLastName) {
        Optional<User> user = usersRepository.getUsersByUsername(username);
        if (!user.isPresent()) {
            return "not an user";
        }
        List<User> allUsers = usersRepository.findAll();
        if (allUsers.stream().anyMatch(o -> o.getEmail().equals(newEmail) && !o.getUsername().equals(username))) {
            return "email already exists";
        }
        User user1 = user.get();
        user1.setFirstname(newFirstname);
        user1.setLastname(newLastName);
        boolean result = true;
        try {
            InternetAddress emailAddr = new InternetAddress(newEmail);
            emailAddr.validate();
        } catch (AddressException ex) {
            result = false;
        }
        if (!result) {
            return "invalid email address";
        }
        user1.setEmail(newEmail);
        usersRepository.save(user1);
        return "ok";
    }

    @Override
    @Transactional
    public String changePassword(String username, String oldPassword, String newPassword, String confirmPassword) {
        Optional<User> user = usersRepository.getUsersByUsername(username);
        if (!user.isPresent()) {
            return "not an user";
        }
        User user1 = user.get();
        if (!user1.getPassword().equals(oldPassword)) {
            return "wrong password";
        }
        if (!newPassword.equals(confirmPassword)) {
            return "passwords don't match";
        }

        if (newPassword.length() < 8) {
            return "password must be at least 8 characters long";
        }
        user1.setPassword(newPassword);
        usersRepository.save(user1);
        return("ok");

    }

    @Override
    @Transactional
    public String deleteUser(String username) {
        Optional<User> user = usersRepository.getUsersByUsername(username);
        if (!user.isPresent()) {
            return "not an user";
        }
        usersRepository.deleteById(user.get().getId());
        return "ok";

    }
}
