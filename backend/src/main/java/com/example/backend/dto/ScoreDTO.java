package com.example.backend.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "Score data transfer object")
public class ScoreDTO implements Serializable {

    private static final long serialVersionUID = 1L;

    @Schema(description = "Unique identifier of the score", example = "1", accessMode = Schema.AccessMode.READ_ONLY)
    private Integer id;

    @NotNull(message = "Win status cannot be null")
    @Schema(description = "Whether the player won the game", example = "true")
    private Boolean win;

    @NotNull(message = "Left chances cannot be null")
    @Min(value = 0, message = "Left chances must be at least 0")
    @Max(value = 10, message = "Left chances cannot exceed 10")
    @Schema(description = "Number of chances left when game ended", example = "3", minimum = "0", maximum = "10")
    private Integer leftChances;

    @Schema(description = "Date when the score was recorded", example = "2025-12-30", accessMode = Schema.AccessMode.READ_ONLY)
    private Date date;
}
