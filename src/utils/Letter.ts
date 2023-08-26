import { LetterState } from "./LetterState";

export class Letter
{
  letter: string;
  index: number;
  state: LetterState;

  constructor(letter: string, index: number, state: LetterState = LetterState.DEFAULT)
  {
    this.letter = letter;
    this.index = index;
    this.state = state;
  }

  static toLetters(inputString: string): Letter[]
  {
    return inputString.split('').map((ch: string, index: number) => new Letter(ch, index));
  }

  static toString(letters: Letter[]): string
  {
    return letters.reduce((acc, curr) => acc + curr.letter, "");
  }

  copy(): Letter
  {
    return new Letter(this.letter, this.index);
  }

  setState(state: LetterState) {
    this.state = state;
  }
}