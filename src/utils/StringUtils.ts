export function removeCharacterAtIndex(
  inputString: string,
  index: number
): string {
  if (index < 0 || index >= inputString.length) {
    throw new Error("Invalid index");
  }

  const firstPart = inputString.slice(0, index);
  const secondPart = inputString.slice(index + 1);

  return firstPart + secondPart;
}

export function insertCharacterAtIndex(
  inputString: string,
  index: number,
  character: string
): string {
  if (index < 0 || index > inputString.length) {
    throw new Error("Invalid index");
  }

  const charArray = inputString.split("");
  charArray.splice(index, 0, character);

  return charArray.join("");
}

export function shuffle(inputString: string): string {
  const charArray = Array.from(inputString);

  for (let i = charArray.length - 1; i > 0; --i) {
    const j = Math.floor(Math.random() * (i + 1));
    [charArray[i], charArray[j]] = [charArray[j], charArray[i]];
  }

  return charArray.join("");
}

export function findSpaceIndexes(inputString: string): number[] {
  const indexes: number[] = [];

  for (let i = 0; i < inputString.length; ++i) {
    if (inputString[i] === " ") {
      indexes.push(i);
    }
  }

  return indexes;
}
