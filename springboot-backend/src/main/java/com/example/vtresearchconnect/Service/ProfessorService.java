package com.example.vtresearchconnect.Service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.vtresearchconnect.DTO.ProfessorDTO;
import com.example.vtresearchconnect.Entity.Professor;
import com.example.vtresearchconnect.Repository.ProfessorRepository;

@Service
public class ProfessorService {
    @Autowired
    private ProfessorRepository professorRepository;

    @Autowired
    private LabService labService;

    public ProfessorDTO getProfessorById(long id) {
        Professor professor = professorRepository.findById(id).orElse(null);
        return mapProfessorToDTO(professor);
    }

    public List<ProfessorDTO> getAllProfessors() {
        List<Professor> professors = professorRepository.findAll();
        return professors.stream()
                .map(this::mapProfessorToDTO)
                .collect(Collectors.toList());
    }


    public ProfessorDTO getProfessorByFullName(String professorName) {
        String[] names = professorName.split(" ", 2);
        if (names.length < 2) {
            return null;
        }
        Professor professor = professorRepository.findByFirstNameAndLastName(names[0], names[1]);
        return mapProfessorToDTO(professor);
    }

    public ProfessorDTO getProfessorByEmail(String email) {
        Professor professor = professorRepository.findByEmail(email);
        if (professor != null) {
            return mapProfessorToDTO(professor);
        } else {
            return null;
        }
    }

    public long addProfessor(ProfessorDTO professorDTO) {
        Professor professor = new Professor();
        professor.setFirstName(professorDTO.getFirstName());
        professor.setLastName(professorDTO.getLastName());
        professor.setEmail(professorDTO.getEmail());

        // Save the professor and get the saved entity
        return professorRepository.save(professor).getId();
    }

    public ProfessorDTO updateProfessorLabInfo(long id, ProfessorDTO professorDTO) {
        Professor professor = professorRepository.findById(id).orElse(null);
        if (professor != null && professorDTO.getLab() != null) {
            if (professor.getLab() != null) {
                professor.getLab().setName(professorDTO.getLab().getName());
                professor.getLab().setUrl(professorDTO.getLab().getUrl());
                professor.getLab().setDescription(professorDTO.getLab().getDescription());
            } else {
                professor.setLab(labService.mapDTOToLab(professorDTO.getLab()));
            }
            professorRepository.save(professor);
            return mapProfessorToDTO(professor);
        }
        return null;
    }

    private ProfessorDTO mapProfessorToDTO(Professor professor) {
        return new ProfessorDTO(
            professor.getId(),
            professor.getFirstName(),
            professor.getLastName(),
            professor.getEmail(),
            professor.getCollege().getName(),
            labService.mapLabToDTO(professor.getLab()),
            professor.getUser().getId()
        );
    }
}
