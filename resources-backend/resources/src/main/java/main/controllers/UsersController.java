package main.controllers;

import com.google.gson.Gson;
import main.Services.UsersService;
import main.domain.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(originPatterns = "*")

@Controller
public class UsersController  {

    public static final String ORGANIZATION_NAME = "organizationName";
    @Autowired
    private UsersService usersService;

    @RequestMapping(value = "/users/getUsersByOrganization/", params = "id",   method = RequestMethod.GET)
    @ResponseBody
    public String getUsersByOrganisationId(@RequestParam("id") Integer id)  {
        List<User> usersList=usersService.getAllUsersByOrganizationId(id);
        Gson gson = new Gson();
        String json = gson.toJson(usersList);
        return json;
    }

    @RequestMapping(value = "/login/", params = {"username", "password"},
            method = RequestMethod.GET)
    @ResponseBody
    public String login(@RequestParam("username") String username, @RequestParam("password") String password )  {
        String response=usersService.login(username, password);
        Gson gson = new Gson();
        String json = gson.toJson(response);
        return json;
    }

    @RequestMapping(value = "/users/createUser/",
            params = {"username", "password", "email", "firstname", "lastname", ORGANIZATION_NAME},
            method = RequestMethod.POST)
    @ResponseBody
    public String createUser(@RequestParam("username") String username,
                             @RequestParam("password") String password,
                             @RequestParam("email") String email,
                             @RequestParam("firstname") String firstname,
                             @RequestParam("lastname") String lastname,
                             @RequestParam("organizationName") String organizationName
                             )  {
        String response=usersService.createUser(username, password, email,
                firstname, lastname, organizationName);
        Gson gson = new Gson();
        String json = gson.toJson(response);
        return json;
    }

    @RequestMapping(value = "/users/getUserByUsername/",
            params = {"username"},
            method = RequestMethod.GET)
    @ResponseBody
    public String getUserByUsername(@RequestParam("username") String username)  {
        User response=usersService.getUserByUsername(username);
        Gson gson = new Gson();
        String json = gson.toJson(response);
        if (response == null) {
            json = "not an user";
        }
        return json;
    }

    @RequestMapping(value = "/users/getUser/",
            params = {"id"},
            method = RequestMethod.GET)
    @ResponseBody
    public String getUser(@RequestParam("id") Integer id)  {
        User response=usersService.getUserById(id);
        Gson gson = new Gson();
        String json;
        if (response == null) {
            json = "not an user";
        } else {
            json = gson.toJson(response);
        }
        return json;
    }

    @RequestMapping(value = "/users/makeUserAdmin/",
            params = {"username"},
            method = RequestMethod.PUT)
    @ResponseBody
    public String makeUserAdmin(@RequestParam("username") String username)  {
        String response=usersService.makeUserAdmin(username);
        return response;
    }

    @RequestMapping(value = "/users/updateUser/",
            params = {"username", "newEmail", "newFirstname", "newLastname"},
            method = RequestMethod.PUT)
    @ResponseBody
    public String updateCurrentUser(@RequestParam("username") String username,
                                            @RequestParam("newEmail") String newEmail,
                                            @RequestParam("newFirstname") String newFirstname,
                                            @RequestParam("newLastname") String newLastName)  {
        String response=usersService.updateCurrentUser(username, newEmail, newFirstname, newLastName);
        return response;
    }

    @RequestMapping(value = "/users/changePassword/",
            params = {"username", "oldPassword", "newPassword", "confirmPassword"},
            method = RequestMethod.PUT)
    @ResponseBody
    public String changePassword(@RequestParam("username") String username,
                                    @RequestParam("oldPassword") String oldPassword,
                                    @RequestParam("newPassword") String newPassword,
                                    @RequestParam("confirmPassword") String confirmPassword)  {
        String response=usersService.changePassword(username, oldPassword, newPassword, confirmPassword);
        return response;
    }

    @RequestMapping(value = "/users/deleteUser/",
            params = {"username"},
            method = RequestMethod.DELETE)
    @ResponseBody
    public String deleteUser(@RequestParam("username") String username)  {
        String response=usersService.deleteUser(username);
        return response;
    }

}
