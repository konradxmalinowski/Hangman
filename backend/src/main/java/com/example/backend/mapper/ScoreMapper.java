package com.example.backend.mapper;

import com.example.backend.entity.Score;
import com.example.backend.dto.ScoreDTO;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
public class ScoreMapper {

    private final ModelMapper modelMapper;

    public ScoreMapper() {
        this.modelMapper = new ModelMapper();
    }

    public ScoreDTO toDTO(Score score) {
        return modelMapper.map(score, ScoreDTO.class);
    }

    public Score toEntity(ScoreDTO scoreDTO) {
        return modelMapper.map(scoreDTO, Score.class);
    }
}
