package com.example.backend;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Score implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private Integer id;
    private boolean win;
    private int leftChances;
    @Column(name = "date", columnDefinition = "DATE DEFAULT CURRENT_DATE", insertable = false, updatable = false)
    private Date date;


}
