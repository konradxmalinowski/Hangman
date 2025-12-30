package com.example.backend;

import com.example.backend.dto.ScoreDTO;
import com.example.backend.service.ScoreService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/scores")
@RequiredArgsConstructor
@Tag(name = "Hangman Scores", description = "API for managing Hangman game scores")
public class HangmanController {

    private final ScoreService scoreService;

    @Operation(summary = "Get all scores", description = "Retrieves a list of all game scores")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved scores",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ScoreDTO.class))),
            @ApiResponse(responseCode = "204", description = "No scores found")
    })
    @GetMapping
    public ResponseEntity<List<ScoreDTO>> getAllScores() {
        List<ScoreDTO> scores = scoreService.getAllScores();

        if (scores.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(scores);
    }

    @Operation(summary = "Get score by ID", description = "Retrieves a specific score by its ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Score found",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ScoreDTO.class))),
            @ApiResponse(responseCode = "404", description = "Score not found")
    })
    @GetMapping("/{id}")
    public ResponseEntity<ScoreDTO> getScoreById(
            @Parameter(description = "ID of the score to retrieve", required = true)
            @PathVariable Integer id) {
        ScoreDTO score = scoreService.getScoreById(id);
        return ResponseEntity.ok(score);
    }

    @Operation(summary = "Create a new score", description = "Saves a new game score")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Score created successfully",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ScoreDTO.class))),
            @ApiResponse(responseCode = "400", description = "Invalid input data")
    })
    @PostMapping
    public ResponseEntity<ScoreDTO> createScore(
            @Parameter(description = "Score data to create", required = true)
            @Valid @RequestBody ScoreDTO scoreDTO) {
        ScoreDTO createdScore = scoreService.createScore(scoreDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdScore);
    }

    @Operation(summary = "Delete a score", description = "Deletes a score by its ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Score deleted successfully"),
            @ApiResponse(responseCode = "404", description = "Score not found")
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteScore(
            @Parameter(description = "ID of the score to delete", required = true)
            @PathVariable Integer id) {
        scoreService.deleteScore(id);
        return ResponseEntity.noContent().build();
    }
}
