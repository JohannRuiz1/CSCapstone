package com.example.vtresearchconnect;  // Use your own package name

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class WebController {
    // Redirect all non-static requests to the React app
    @RequestMapping(value = "/react")
    public String redirect() {
        // This forwards all routes to Angular/React except for resource like .js, .css, images, etc.
        return "forward:/";
    }

    @GetMapping(value = "/hello-world")
    public String helloWorld() {
        return "Hello World!";
    }
}
