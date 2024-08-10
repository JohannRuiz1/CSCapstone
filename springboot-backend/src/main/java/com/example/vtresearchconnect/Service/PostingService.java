//package com.example.vtresearchconnect.Service;
//
//import com.example.vtresearchconnect.DTO.LabDTO;
//import com.example.vtresearchconnect.DTO.ProfessorDTO;
//import com.example.vtresearchconnect.Entity.Lab;
//import com.example.vtresearchconnect.Entity.Professor;
//import com.example.vtresearchconnect.Repository.LabRepository;
//import com.example.vtresearchconnect.Repository.ProfessorRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import com.example.vtresearchconnect.DTO.PostingDTO;
//import com.example.vtresearchconnect.Entity.Posting;
//import com.example.vtresearchconnect.Repository.PostingRepository;
//
//import jakarta.persistence.EntityNotFoundException;
//import java.util.List;
//import java.util.stream.Collectors;
//
//@Service
//public class PostingService {
//
//    @Autowired
//    private PostingRepository postingRepository;
//    @Autowired
//    private LabService labService;
//    @Autowired
//    private ProfessorRepository professorRepository;
//    @Autowired
//    private LabRepository labRepository;
//
//    // Find all postings
//    public List<PostingDTO> findAllPostings() {
//        return postingRepository.findAll().stream()
//                .map(this::convertToDTO)
//                .collect(Collectors.toList());
//    }
//
//    // Find a single posting by ID
//    public PostingDTO findPostingById(Long id) {
//        Posting posting = postingRepository.findById(id)
//                .orElseThrow(() -> new EntityNotFoundException("Posting not found with id: " + id));
//        return convertToDTO(posting);
//    }
//
//    // Create a new posting
//    public PostingDTO createPosting(PostingDTO postingDTO) {
//        Posting posting = convertToEntity(postingDTO);
//        posting = postingRepository.save(posting);
//        return convertToDTO(posting);
//    }
//
//    // Update an existing posting
//    public PostingDTO updatePosting(Long id, PostingDTO postingDTO) {
////        Posting posting = postingRepository.findById(id)
////                .orElseThrow(() -> new EntityNotFoundException("Posting not found with id: " + id));
////        posting.setName(postingDTO.getName());
////        posting.setDescription(postingDTO.getDescription());
////        posting.setType(postingDTO.getType());
////        posting.setUrl(postingDTO.getUrl());
////        posting = postingRepository.save(posting);
////        return convertToDTO(posting);
//        Posting posting = convertToEntity(postingDTO);
//        posting.setId(id);
//        Posting updatedPosting = postingRepository.save(posting);
//        return convertToDTO(updatedPosting);
//    }
//
//    // Delete a posting
//    public void deletePosting(Long id) {
//        postingRepository.deleteById(id);
//    }
//
//    private PostingDTO convertToDTO(Posting posting) {
//        PostingDTO dto = new PostingDTO();
//        dto.setId(posting.getId());
//        dto.setName(posting.getName());
//        dto.setDescription(posting.getDescription());
//        dto.setType(posting.getType());
//        dto.setUrl(posting.getUrl());
//
//        Lab lab = posting.getLab();
//        if (lab != null) {
//            dto.setLabName(lab.getName());
//        }
//        Professor professor = professorRepository.findByLabId(lab.getId());
//        if (professor != null) {
//            ProfessorDTO professorDTO = new ProfessorDTO();
//            professorDTO.setId(professor.getId());
//            professorDTO.setFirstName(professor.getFirstName());
//            professorDTO.setLastName(professor.getLastName());
//            professorDTO.setEmail(professor.getEmail());
//            professorDTO.setCollege(professor.getCollege().getName());
//            dto.setProfessor(professorDTO);
//        }
////        LabDTO labDTO = labService.mapLabToDTO(posting.getLab());
////        dto.setLabId(labDTO.getId());
//
//        return dto;
//    }
//
//    private Posting convertToEntity(PostingDTO dto) {
//        Posting posting = new Posting();
////        posting.setId(dto.getId());
//        posting.setName(dto.getName());
//
////        posting.setName(dto.getName());
//        posting.setDescription(dto.getDescription());
//        posting.setType(dto.getType());
//        posting.setUrl(dto.getUrl());
//
//        Lab lab = labRepository.findByName(dto.getLabName());
////        if (lab == null) {
////            throw new EntityNotFoundException("Lab not found with id: " + dto.getLabId());
////        }
//        if (lab != null) {
//            posting.setLab(lab);
//        }
////        posting.setLab(lab);
//
//        return posting;
//    }
//}

package com.example.vtresearchconnect.Service;

import com.example.vtresearchconnect.DTO.LabDTO;
import com.example.vtresearchconnect.DTO.ProfessorDTO;
import com.example.vtresearchconnect.Entity.Lab;
import com.example.vtresearchconnect.Entity.Professor;
import com.example.vtresearchconnect.Repository.LabRepository;
import com.example.vtresearchconnect.Repository.ProfessorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.vtresearchconnect.DTO.PostingDTO;
import com.example.vtresearchconnect.Entity.Posting;
import com.example.vtresearchconnect.Repository.PostingRepository;

import jakarta.persistence.EntityNotFoundException;

import java.sql.Timestamp;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PostingService {

    @Autowired
    private PostingRepository postingRepository;
    @Autowired
    private LabService labService;
    @Autowired
    private ProfessorRepository professorRepository;
    @Autowired
    private LabRepository labRepository;

    // Find all postings
    public List<PostingDTO> findAllPostings() {
        return postingRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // Find a single posting by ID
    public PostingDTO findPostingById(Long id) {
        Posting posting = postingRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Posting not found with id: " + id));
        return convertToDTO(posting);
    }

    // Create a new posting
    public PostingDTO createPosting(PostingDTO postingDTO) {
        Posting posting = convertToEntity(postingDTO);
        posting.setCreatedAt(new Timestamp(System.currentTimeMillis()));
        posting = postingRepository.save(posting);
        return convertToDTO(posting);
    }

    // Update an existing posting
    public PostingDTO updatePosting(Long id, PostingDTO postingDTO) {
        Posting posting = convertToEntity(postingDTO);
        posting.setId(id);
        Posting updatedPosting = postingRepository.save(posting);
        return convertToDTO(updatedPosting);
    }

    // Delete a posting
    public void deletePosting(Long id) {
        postingRepository.deleteById(id);
    }

    private PostingDTO convertToDTO(Posting posting) {
        PostingDTO dto = new PostingDTO();
        dto.setId(posting.getId());
        dto.setName(posting.getName());
        dto.setDescription(posting.getDescription());
        dto.setType(posting.getType());
        dto.setUrl(posting.getUrl());
        dto.setCreatedAt(posting.getCreatedAt());

        Lab lab = posting.getLab();
        if (lab != null) {
            dto.setLabName(lab.getName());
            Long labId = lab.getId();
            if (labId != null) {
                Professor professor = professorRepository.findByLabId(labId);
                if (professor != null) {
                    ProfessorDTO professorDTO = new ProfessorDTO();
                    professorDTO.setId(professor.getId());
                    professorDTO.setFirstName(professor.getFirstName());
                    professorDTO.setLastName(professor.getLastName());
                    professorDTO.setEmail(professor.getEmail());
                    professorDTO.setCollege(professor.getCollege().getName());
                    dto.setProfessor(professorDTO);
                }
            }
        }

        return dto;
    }

    private Posting convertToEntity(PostingDTO dto) {
        Posting posting = new Posting();
        posting.setName(dto.getName());
        posting.setDescription(dto.getDescription());
        posting.setType(dto.getType());
        posting.setUrl(dto.getUrl());
        posting.setCreatedAt(dto.getCreatedAt());

        Lab lab = labRepository.findByName(dto.getLabName());
        if (lab != null) {
            posting.setLab(lab);
        }

        return posting;
    }
}
