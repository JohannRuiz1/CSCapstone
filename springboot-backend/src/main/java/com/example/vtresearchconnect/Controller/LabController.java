package com.example.vtresearchconnect.Controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;

import com.example.vtresearchconnect.DTO.LabDTO;
import com.example.vtresearchconnect.Service.LabService;

import jakarta.persistence.EntityNotFoundException;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/labs")
public class LabController {
    
    @Autowired
    private LabService labService;

    @GetMapping
    public List<LabDTO> getAllLabs(@RequestParam(name = "collegeName", required = false) String collegeName, @RequestParam(name = "majorName", required = false) String majorName) {
        if(collegeName != null && !collegeName.isEmpty()){
            return labService.getLabsByCollege(collegeName);
        }
        else if(majorName != null && !majorName.isEmpty()){
            return labService.getLabsByMajor(majorName);
        }
        else{
            return labService.getAllLabs();
        }
    }

    @GetMapping("/major/{major}")
    public List<LabDTO> getLabsByMajor(@PathVariable String major) {
        return labService.getLabsByMajor(major);
    }

    @GetMapping("/college/{college}")
    public List<LabDTO> getLabsCollege(@PathVariable String college) {
        return labService.getLabsByCollege(college);
    }

    @GetMapping("/name/{labName}")
    public LabDTO getLabByName(@PathVariable String labName) {
        return labService.getLabByName(labName);
    }

    @DeleteMapping("/id/{id}")
    public ResponseEntity<Void> deleteLab(@PathVariable long id) {
        try {
            labService.deleteLabById(id);
            return ResponseEntity.ok().build();
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @GetMapping("/id/{id}")
    public LabDTO getLabById(@PathVariable long id) {
        return labService.findLabById(id);
    }


    // @PostMapping
    // public Lab createLab(@RequestBody Lab lab) {
    //     return labRepository.save(lab);
    // }

    // @PutMapping("/{id}")
    // public Lab updateLab(@PathVariable Long id, @RequestBody Lab LabDetails) {
    //     Optional<Lab> LabOptional = labRepository.findById(id);

    //     if (LabOptional.isPresent()) {
    //         Lab Lab = LabOptional.get();
    //         Lab.setName(LabDetails.getName());
    //         Lab.setUrl(LabDetails.getUrl());
    //         Lab.setPrincipleInvestigator(LabDetails.getPrincipleInvestigator());
    //         Lab.setMajor(LabDetails.getMajor());
    //         Lab.setDescription(LabDetails.getDescription());

    //         return labRepository.save(Lab);
    //     } else {
    //         throw new RuntimeException("Research Project not found with id " + id);
    //     }
    // }

    // @DeleteMapping("/{id}")
    // public void deleteLab(@PathVariable Long id) {
    //     labRepository.deleteById(id);
    // }
    // @GetMapping("/name/{name}")
    // public List<Lab> getLabsByName(@PathVariable String name) {
    //     return labRepository.findByName(name);
    // }
    // @GetMapping("/investigator/{investigator}")
    // public List<Lab> getLabsByPrincipleInvestigator(@PathVariable String investigator) {
    //     return labRepository.findByPrincipleInvestigator(investigator);
    // }

    // @GetMapping("/major/{major}")
    // public List<Lab> getLabsByMajor(@PathVariable String major) {
    //     return labRepository.findByMajorName(major);
    // }

    // @GetMapping("/college/{college}")
    // public List<Lab> getLabsCollege(@PathVariable String college) {
    //     return labRepository.findByCollegeName(college);
    // }

    // @GetMapping("/search")
    // public List<Lab> searchLabsByDescription(@RequestParam String keyword) {
    //     return labRepository.findByDescriptionContaining(keyword);
    // }

}
