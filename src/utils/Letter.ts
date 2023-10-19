import { LetterState } from "./LetterState";

export class Letter
{
  character: string;
  index: number;
  state: LetterState;

  constructor(character: string, index: number, state: LetterState = LetterState.DEFAULT)
  {
    this.character = character;
    this.index = index;
    this.state = state;
  }

  static toLetters(inputString: string): Letter[]
  {
    return inputString.split('').map((ch: string, index: number) => new Letter(ch, index));
  }

  static toString(letters: Letter[]): string
  {
    return letters.reduce((acc, curr) => acc + curr.character, "");
  }

  copy(): Letter
  {
    return new Letter(this.character, this.index);
  }
}
