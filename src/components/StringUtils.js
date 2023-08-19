export function removeCharacterAtIndex(string, index) {
  if (index < 0 || index >= string.length) {
    throw new Error("Invalid index");
  }

  const firstPart = string.slice(0, index);
  const secondPart = string.slice(index + 1);

  return firstPart + secondPart;
}

export function insertCharacterAtIndex(string, index, character) {
  if (index < 0 || index > string.length) {
    throw new Error("Invalid index");
  }

  const charArray = string.split("");
  charArray.splice(index, 0, character);

  return charArray.join("");
}

export function shuffle(string) {
  const charArray = Array.from(string);
  
  for (let i = charArray.length - 1; i > 0; --i) {
    const j = Math.floor(Math.random() * (i + 1));
    [charArray[i], charArray[j]] = [charArray[j], charArray[i]];
  }
  
  return charArray.join("");
}

export function findSpaceIndexes(string) {
  const indexes = [];

  for (let i = 0; i < string.length; ++i) {
    if (string[i] === " ") {
      indexes.push(i);
    }
  }

  return indexes;
}

