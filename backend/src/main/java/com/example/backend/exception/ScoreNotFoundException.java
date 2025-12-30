package com.example.backend.exception;

public class ScoreNotFoundException extends RuntimeException {
    public ScoreNotFoundException(String message) {
        super(message);
    }

    public ScoreNotFoundException(Integer id) {
        super("Score not found with id: " + id);
    }
}
