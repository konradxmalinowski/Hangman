package org.example;

import java.util.Arrays;
import java.util.List;
import java.util.Random;
import java.util.Scanner;

public class Hangman {
//   TODO: Add db connection (scores, history, words)
    DatabaseConnection databaseConnection = new DatabaseConnection();

    List<String> words = List.of("car", "cat", "programming", "computer");
    String randomWord;
    Scanner scanner = new Scanner(System.in);
    char[] userWord;
    int mode;
    int chances;

    public void play() {
        System.out.println("Welcome to Hangman!");

        while (true) {
            System.out.println("""
                    \nChoose game mode:\s
                    1. Easy - 30 chances
                    2. Medium - 20 chances
                    3. Hard - 10 chances
                    4. End\s""");
            mode = Integer.parseInt(scanner.nextLine());

            switch (mode) {
                case 1 -> chances = 30;
                case 2 -> chances = 20;
                case 3 -> chances = 10;
                case 4 -> System.exit(0);
                default -> {
                    System.out.println("Invalid input! Chances = 20");
                    chances = 20;
                }
            }

            Random rand = new Random();
            randomWord = words.get(rand.nextInt(words.size()));
            userWord = new char[randomWord.length()];
            Arrays.fill(userWord, '_');

            System.out.println(userWord);

            while (chances > 0) {
                System.out.println("\nEnter a character: ");
                String input = scanner.nextLine().trim();
                if (input.isEmpty()) {
                    System.out.println("Invalid input! Please enter a valid character!");
                    continue;
                }
                char userCharacter = input.charAt(0);


                guessChar(userCharacter);

                if (String.valueOf(userWord).equals(randomWord)) {
                    win();
                    break;
                }

                if (chances == 0) {
                    lose();
                    break;
                }
            }

        }
    }

    public void checkChar(char character) {
        boolean found = false;

        for (int i = 0; i < randomWord.length(); i++) {
            if (character == randomWord.charAt(i)) {
                found = true;
                userWord[i] = randomWord.charAt(i);
            }
        }

        if (found) {
            guessed();
            return;
        }

        notGuessed();
    }

    public void guessChar(char character) {
        if (randomWord.indexOf(character) == -1) {
            notGuessed();
            return;
        }

        if (userWord[randomWord.indexOf(character)] != '_') {
            System.out.println("This letter is already in use!");
            return;
        }

        checkChar(character);
    }

    public void guessed() {
        System.out.println("You guessed it!");
        System.out.println("Chances: " + chances);
        System.out.println(userWord);
    }

    public void notGuessed() {
        System.out.println("Invalid character!");
        chances--;
        System.out.println("Chances: " + chances);
        System.out.println(userWord);
    }

    public void win() {
        System.out.println("You win!");
        System.out.println("Chances: " + chances);
        System.out.println("Guessed word " + randomWord);
    }

    public void lose() {
        System.out.println("You lose!");
        System.out.println("Chances: " + chances);
        System.out.println("Not guessed word: " + randomWord);
    }
}
