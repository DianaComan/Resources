package main.controllers;

import com.google.gson.Gson;
import main.Services.OrganizationsService;
import main.domain.Organizations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(originPatterns = "*")

@Controller
public class OrganizationsController {
    @Autowired
    OrganizationsService organizationsService;

    @RequestMapping(value = "/organizations/getAllOrganizations/",   method = RequestMethod.GET)
    @ResponseBody
    public String getAllOrganizations()  {
        List<Organizations> organizationsList=organizationsService.getAllOrganizations();
        Gson gson = new Gson();
        String json = gson.toJson(organizationsList);
        return json;
    }

    @RequestMapping(value = "/organizations/createOrganization/",
            params = {"name"},
            method = RequestMethod.POST)
    @ResponseBody
    public String createResource(@RequestParam("name") String name)  {
        String response=organizationsService.createOrganization(name);
        Gson gson = new Gson();
        String json = gson.toJson(response);
        return json;
    }

    @RequestMapping(value = "/organizations/getOrganizationByName/",
            params = {"name"},
            method = RequestMethod.GET)
    @ResponseBody
    public String getOrganizationByName(@RequestParam("name") String name)  {
        Organizations response=organizationsService.getOrganizationByName(name);
        Gson gson = new Gson();
        String json = gson.toJson(response);
        if (response == null) {
            json = "not an organization";
        }
        return json;
    }

    @RequestMapping(value = "/organizations/getOrganizationById/",
            params = {"id"},
            method = RequestMethod.GET)
    @ResponseBody
    public String getOrganizationById(@RequestParam("id") Integer id)  {
        Organizations response=organizationsService.getOrganizationById(id);
        Gson gson = new Gson();
        String json;
        if (response == null) {
            json = "not an organization";
        } else {
            json = gson.toJson(response);
        }
        return json;
    }

}
