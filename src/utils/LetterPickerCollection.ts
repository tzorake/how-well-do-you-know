import { generateUniqueRandomLetters, shuffle } from "./StringUtils";

export class LetterPickerCollection {
  /**
   * Actual answer for given level
   */
  actualAnswer: string;
  /**
   * Indexes of the letter, which need to open on load
   */
  opened: Array<number>;
  /**
   * Random letter for adding them to actual answer
   */
  mixin: string;
  /**
   * The string contains actual answer and mixin but it is being randomized
   */
  mixedLetters: string;
  /**
   * The states of letter buttons from LETTER-PICKER section
   */
  letterPickerState: Array<boolean>;

  constructor(actualAnswer: string, opened: Array<number> = []) {
    this.actualAnswer = actualAnswer;
    this.opened = opened;
    this.mixin = this.createMixin();
    this.mixedLetters = this.createMixedLetters();
    this.letterPickerState = this.createLetterPickerState();
  }

  public get actualAnswerWithoutSpaces(): string {
    return this.actualAnswer.replaceAll(" ", "")
  }

  public get actualAnswerCharacters(): Array<string> {
    return this.actualAnswerWithoutSpaces.split("");
  }

  public get actualAnswerWords(): Array<string> {
    return this.actualAnswer.split(" ");
  }

  private createMixin() {
    const characters = this.actualAnswerCharacters;

    return generateUniqueRandomLetters(characters, 18 - characters.length).join("");
  }

  private createMixedLetters(): string {
    const word = this.actualAnswerWithoutSpaces + this.mixin;

    return shuffle(word);
  }

  private createLetterPickerState(): Array<boolean> {
    const characters = this.actualAnswerWithoutSpaces;
    const state = new Array(characters.length + this.mixin.length).fill(false);

    const indexes = this.opened
      .filter((index) => this.actualAnswer[index])
      .map((index) => this.actualAnswer[index])
      .map((character) => this.mixedLetters.indexOf(character));
    indexes.forEach((index) => {
      state[index] = true;
    });

    return state;
  }
}
