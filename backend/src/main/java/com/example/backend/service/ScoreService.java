package com.example.backend.service;

import com.example.backend.entity.Score;
import com.example.backend.repository.HangmanRepository;
import com.example.backend.dto.ScoreDTO;
import com.example.backend.exception.ScoreNotFoundException;
import com.example.backend.mapper.ScoreMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional(readOnly = true)
public class ScoreService {

    private final HangmanRepository hangmanRepository;
    private final ScoreMapper scoreMapper;

    @Cacheable(value = "scores", key = "'allScores'")
    public List<ScoreDTO> getAllScores() {
        log.info("Fetching all scores from database (cache miss)");
        List<Score> scores = hangmanRepository.findAll();
        return scores.stream()
                .map(scoreMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Cacheable(value = "scores", key = "#id")
    public ScoreDTO getScoreById(Integer id) {
        log.info("Fetching score with id: {} from database (cache miss)", id);
        Score score = hangmanRepository.findById(id)
                .orElseThrow(() -> new ScoreNotFoundException(id));
        return scoreMapper.toDTO(score);
    }

    @Transactional
    @CacheEvict(value = "scores", allEntries = true)
    public ScoreDTO createScore(ScoreDTO scoreDTO) {
        log.info("Creating new score and invalidating cache");
        Score score = scoreMapper.toEntity(scoreDTO);
        Score savedScore = hangmanRepository.save(score);
        log.info("Score created with id: {}", savedScore.getId());
        return scoreMapper.toDTO(savedScore);
    }

    @Transactional
    @CacheEvict(value = "scores", allEntries = true)
    public void deleteScore(Integer id) {
        log.info("Deleting score with id: {} and invalidating cache", id);
        if (!hangmanRepository.existsById(id)) {
            throw new ScoreNotFoundException(id);
        }
        hangmanRepository.deleteById(id);
        log.info("Score with id: {} deleted successfully", id);
    }

    @Cacheable(value = "scores", key = "'count'")
    public long countScores() {
        log.info("Counting scores from database (cache miss)");
        return hangmanRepository.count();
    }
}
