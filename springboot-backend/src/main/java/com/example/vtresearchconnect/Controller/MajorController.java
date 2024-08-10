package com.example.vtresearchconnect.Controller;


import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;
import com.example.vtresearchconnect.DTO.MajorDTO;
import com.example.vtresearchconnect.Service.MajorService;


import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/majors")
public class MajorController {
    
    @Autowired
    private MajorService majorService;

    @GetMapping
    public List<MajorDTO> getAllMajors(@RequestParam(name = "college", required = false) String collegeName) {
        if(collegeName == null){
            return majorService.getAllMajors();
        }
        else{
            return majorService.getMajorByCollege(collegeName);
        }
    }


}
