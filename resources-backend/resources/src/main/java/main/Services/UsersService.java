package main.Services;

import main.domain.User;

import java.util.List;

public interface UsersService {
    List<User> getAllUsersByOrganizationId(int id);

    String login(String username, String password);

    String createUser(String username, String password, String email, String firstname, String lastname, String organizationName);

    User getUserByUsername(String username);

    User getUserById(Integer id);

    String makeUserAdmin(String username);

    String updateCurrentUser(String username, String newEmail, String newFirstname, String newLastName);

    String changePassword(String username, String oldPassword, String newPassword, String confirmPassword);

    String deleteUser(String username);
}
