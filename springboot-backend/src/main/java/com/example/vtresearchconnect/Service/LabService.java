package com.example.vtresearchconnect.Service;


import com.example.vtresearchconnect.Repository.LabRepository;
import com.example.vtresearchconnect.DTO.LabDTO;
import com.example.vtresearchconnect.Entity.Lab;

import com.example.vtresearchconnect.Repository.MajorRepository;

import jakarta.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class LabService {

    @Autowired
    private LabRepository labRepository;
    @Autowired
    private MajorRepository majorRepository;
    @Autowired
    private MajorService majorService;
    public Lab mapDTOToLab(LabDTO labDTO) {
        if (labDTO == null) {
            return null;
        }

        Lab lab = new Lab();
        lab.setName(labDTO.getName());
        lab.setUrl(labDTO.getUrl());
        lab.setDescription(labDTO.getDescription());
        lab.setPrincipleInvestigator(labDTO.getPrincipleInvestigator());
        // Set other fields as needed

        return lab;
    }
    public List<LabDTO> getAllLabs() {
        return labRepository.findAllLabs().stream()
                .map(this::mapLabToDTO)
                .collect(Collectors.toList());
    }

    public List<LabDTO> getLabsByMajor(String majorName) {
        return labRepository.findByMajor(majorName).stream()
                .map(this::mapLabToDTO)
                .collect(Collectors.toList());
    }

    public List<LabDTO> getLabsByCollege(String college) {
        return labRepository.findByCollege(college).stream()
                .map(this::mapLabToDTO)
                .collect(Collectors.toList());
    }

    public LabDTO getLabByName(String labName) {
        return (mapLabToDTO(labRepository.findByName(labName)));
    }

    public LabDTO findLabById(Long id) {
        return mapLabToDTO(labRepository.findLabById(id));
    }

    public LabDTO mapLabToDTO(Lab lab) {
        if (lab != null) {
            return new LabDTO(
                    lab.getId(),
                    lab.getName(),
                    lab.getUrl(),
                    lab.getPrincipleInvestigator(),
                    majorService.mapMajorToDTO(lab.getMajor()),
                    lab.getDescription()
            );
        } else {
            return null;
        }

    }

    public void createLab(Lab lab, String firstName, String lastName, Long majorId) {
        lab.setPrincipleInvestigator(firstName + " " + lastName);
        lab.setMajor(majorRepository.findById(majorId).orElse(null)); // Handle null appropriately
        labRepository.save(lab);
    }

    public void deleteLabById(long id) {
        if (labRepository.existsById(id)) {
            labRepository.deleteById(id);
        } else {
            throw new EntityNotFoundException("Lab not found with id: " + id);
        }
    }

    public boolean existsById(long id){
        return labRepository.existsById(id);
    }

    public boolean existsByName(String name){
        return labRepository.findByName(name) != null;
    }

}