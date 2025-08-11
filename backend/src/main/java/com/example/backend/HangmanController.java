package com.example.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class HangmanController {

    @Autowired
    HangmanRepository hangmanRepository;

    @GetMapping("/scores")
    public ResponseEntity<List<Score>> getScores(){
        List<Score> scores = hangmanRepository.findAll();

        if (scores.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(scores, HttpStatus.OK);
    }

    @GetMapping("/scores/{id}")
    public ResponseEntity<Score> getScore(@PathVariable int id){
        Optional<Score> score = hangmanRepository.findById(id);

        return score.map(value -> new ResponseEntity<>(value, HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/scores")
    public ResponseEntity<Score> saveScore(@RequestBody Score score){
        return new ResponseEntity<>(hangmanRepository.save(score), HttpStatus.CREATED);
    }
}
