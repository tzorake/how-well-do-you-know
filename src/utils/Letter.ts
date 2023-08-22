export class Letter
{
  letter: string;
  index: number;

  constructor(letter: string, index: number)
  {
    this.letter = letter;
    this.index = index;
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
}