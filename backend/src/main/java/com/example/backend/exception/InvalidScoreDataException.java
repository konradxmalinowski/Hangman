package com.example.backend.exception;

public class InvalidScoreDataException extends RuntimeException {
    public InvalidScoreDataException(String message) {
        super(message);
    }
}
