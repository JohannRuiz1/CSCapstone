package com.example.vtresearchconnect.Controller;


import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;
import com.example.vtresearchconnect.DTO.CollegeDTO;
import com.example.vtresearchconnect.Service.CollegeService;


import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/colleges")
public class CollegeController {
    
    @Autowired
    private CollegeService collegeService;

    @GetMapping
    public List<CollegeDTO> getAllLabs(@RequestParam(name = "majors", required = false) boolean majors) {
        if(majors){
            return collegeService.getAllCollegesWithMajors();
        }
        else{
            return collegeService.getAllColleges();
        }
    }

    @GetMapping("/{collegeName}")
    public CollegeDTO getLabsByMajor(@PathVariable String collegeName,@RequestParam(name = "majors", required = false) boolean majors) {
        if(majors){
            return collegeService.getCollegeWithMajors(collegeName);
        }
        else{
            return collegeService.getCollege(collegeName);
        }
    }

}
