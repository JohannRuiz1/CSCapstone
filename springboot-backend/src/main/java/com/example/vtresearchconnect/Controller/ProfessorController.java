package com.example.vtresearchconnect.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.vtresearchconnect.DTO.ProfessorDTO;
import com.example.vtresearchconnect.Service.ProfessorService;

@RestController
@RequestMapping("/api/professors")
public class ProfessorController {
    
    @Autowired
    private ProfessorService professorService;

    @GetMapping
    public List<ProfessorDTO> getAllProfessors() {
        return professorService.getAllProfessors();
    }

    @GetMapping("/fullName/{professorName}")
    public ProfessorDTO getProfessorByFullName(@PathVariable("professorName")String professorName) {
        return professorService.getProfessorByFullName(professorName);
    }

    @GetMapping("/email/{email}")
    public ProfessorDTO getProfessorByEmail(@PathVariable String email) {
        return professorService.getProfessorByEmail(email);
    }

    @GetMapping("/id/{id}")
    public ProfessorDTO getProfessorById(@PathVariable long id) {
        return professorService.getProfessorById(id);
    }

    @PostMapping("/add")
    public long addProfessor(@RequestBody ProfessorDTO professorDTO) {
        return professorService.addProfessor(professorDTO); // Assuming you have a method in your service layer to add a discussion
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProfessorDTO> updateProfessor(@PathVariable long id, @RequestBody ProfessorDTO professorDTO) {
        ProfessorDTO updatedProfessor = professorService.updateProfessorLabInfo(id, professorDTO);
        if (updatedProfessor != null) {
            return ResponseEntity.ok(updatedProfessor);
        } else {
            return ResponseEntity.notFound().build();
        }
    }


}
