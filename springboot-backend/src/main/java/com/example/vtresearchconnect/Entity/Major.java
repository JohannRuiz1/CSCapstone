package com.example.vtresearchconnect.Entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "major")
public class Major {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    @ManyToOne
    @JoinColumn(name = "college_id", nullable = false)
    private College college;
    
}
