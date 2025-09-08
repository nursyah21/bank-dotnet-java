package com.nursyah.bank_simulation.shared.filter;

import com.nursyah.bank_simulation.shared.dto.ResponseDto;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionFilter {

    private static final Logger logger = LoggerFactory.getLogger(GlobalExceptionFilter.class);

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ResponseDto> handleValidationExceptions(MethodArgumentNotValidException ex) {
        var allErrors = ex.getBindingResult()
                          .getAllErrors()
                          .stream()
                          .map(error -> error.getDefaultMessage())
                          .toList();

        var hasTechnicalError = allErrors.stream()
                                         .anyMatch(message -> message.contains("No validator could be found") ||
                                                              message.contains("0x"));

        String messageToShow;
        if (hasTechnicalError) {
            messageToShow = "Invalid input.";
        } else {
            messageToShow = allErrors.stream().findFirst().orElse("Invalid request.");
        }

        logger.warn("Validation Error: {}", String.join("; ", allErrors));

        var responseDto = new ResponseDto(messageToShow, false);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseDto);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ResponseDto> handleGeneralException(Exception ex) {
        logger.error("An unexpected error occurred: {}", ex.getMessage(), ex);
        var responseDto = new ResponseDto("Invalid request.", false);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseDto);
    }
}