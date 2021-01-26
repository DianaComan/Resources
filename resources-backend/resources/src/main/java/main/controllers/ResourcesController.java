package main.controllers;

import com.google.gson.Gson;
import main.Services.ResourcesService;
import main.Services.SubscriptionsService;
import main.domain.Resources;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(originPatterns = "*")

@Controller
public class ResourcesController {

    @Autowired
    private ResourcesService resourcesService;

    @Autowired
    private SubscriptionsService subscriptionsService;


    @RequestMapping(value = "/resources/getResourcesByOrganizationId/", params = "id",   method = RequestMethod.GET)
    @ResponseBody
    public String getAllResourcesByOrganisationId(@RequestParam("id") Integer id)  {
        List<Resources> resourcesList=resourcesService.getAllResourcesByOrganizationId(id);
        Gson gson = new Gson();
        String json = gson.toJson(resourcesList);
        return json;
    }

    @RequestMapping(value = "/resources/getAllFreeResourcesByOrganizationId/", params = "id",   method = RequestMethod.GET)
    @ResponseBody
    public String getAllFreeResourcesByOrganizationId(@RequestParam("id") Integer id)  {
        List<Resources> usersList=resourcesService.getAllFreeResourcesByOrganizationId(id);
        Gson gson = new Gson();
        String json = gson.toJson(usersList);
        return json;
    }

    @RequestMapping(value = "/resources/createResources/",
            params = {"name", "organizationId"},
            method = RequestMethod.POST)
    @ResponseBody
    public String createResource(@RequestParam("name") String name,
                             @RequestParam("organizationId") Integer organizationId
    )  {
        String response=resourcesService.createResource(name,  organizationId);
        Gson gson = new Gson();
        String json = gson.toJson(response);
        return json;
    }


    @RequestMapping(value = "/resources/deleteResource/",
            params = {"name"},
            method = RequestMethod.DELETE)
    @ResponseBody
    public String deleteResource(@RequestParam("name") String name)  {
        String response=resourcesService.deleteResource(name);
        return response;
    }

    @RequestMapping(value = "/resources/getResourceByName/",
            params = {"name"},
            method = RequestMethod.GET)
    @ResponseBody
    public String getResourceByName(@RequestParam("name") String name)  {
        Resources response=resourcesService.getResourceByName(name);
        Gson gson = new Gson();
        String json = gson.toJson(response);
        if (response == null) {
            json = "not a resource";
        }
        return json;
    }

    @RequestMapping(value = "/resources/getResource/",
            params = {"id"},
            method = RequestMethod.GET)
    @ResponseBody
    public String getResource(@RequestParam("id") Integer id)  {
        Resources response=resourcesService.getResourceById(id);
        Gson gson = new Gson();
        String json;
        if (response == null) {
            json = "not a resource";
        } else {
            json = gson.toJson(response);
        }
        return json;
    }

    @RequestMapping(value = "/resources/getMyCurrentResources/",
            params = {"username"},
            method = RequestMethod.GET)
    @ResponseBody
    public String getMyCurrentResources(@RequestParam("username") String  username)  {
        List<Resources> response=resourcesService.getMyCurrentResources(username);
        Gson gson = new Gson();
        String json;
        json = gson.toJson(response);

        return json;
    }

    @RequestMapping(value = "/resources/reserve/",
            params = {"username", "resourceName", "estimatedTime"},
            method = RequestMethod.PUT)
    @ResponseBody
    public String reserve(@RequestParam("username") String username,
                                    @RequestParam("resourceName") String resourceName,
                                    @RequestParam("estimatedTime") String estimatedTime)  {
        String response=resourcesService.reserve(username, resourceName, estimatedTime);
        return response;
    }

    @RequestMapping(value = "/resources/subscribe/",
            params = {"username", "resourceName"},
            method = RequestMethod.POST)
    @ResponseBody
    public String subscribe(@RequestParam("username") String username,
                          @RequestParam("resourceName") String resourceName)  {
        String response=subscriptionsService.createSubscription(username, resourceName);
        return response;
    }

    @RequestMapping(value = "/resources/unreserve/",
            params = {"username", "resourceName"},
            method = RequestMethod.PUT)
    @ResponseBody
    public String unreserve(@RequestParam("username") String username,
                            @RequestParam("resourceName") String resourceName)  {
        String response=resourcesService.unreserve(username, resourceName);

        return response;
    }



}
