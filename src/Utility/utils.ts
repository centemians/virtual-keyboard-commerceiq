export const keyLayout = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "0",
  "backspace",
  "q",
  "w",
  "e",
  "r",
  "t",
  "y",
  "u",
  "i",
  "o",
  "p",
  "caps",
  "a",
  "s",
  "d",
  "f",
  "g",
  "h",
  "j",
  "k",
  "l",
  "enter",
  "done",
  "shift",
  "z",
  "x",
  "c",
  "v",
  "b",
  "n",
  "m",
  ",",
  ".",
  "?",
  "space",
];

export function shuffle(array: number[]) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

export const alphabetsIndex = [
  12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 24, 25, 26, 27, 28, 29, 30, 31, 32,
  37, 38, 39, 40, 41, 42, 43,
];

//@ts-ignore
function insertAt(array, index, ...elements) {
  array.splice(index, 0, ...elements);
}

export const shuffleKeyboardKeys = () => {
  const keyboardContainer = document.getElementById("main_keyboard");
  const allKeys: any = keyboardContainer?.childNodes;

  const shuffledAlphabetsIndex = shuffle(alphabetsIndex);
  const newDomStructure = [] as any;

  for (let i = 0; i < shuffledAlphabetsIndex.length; i++) {
    newDomStructure.push(allKeys[shuffledAlphabetsIndex[i]]);
  }

  for (let i = 0; i < 49; i++) {
    if (alphabetsIndex.indexOf(i) < 0) {
      insertAt(newDomStructure, i, allKeys[i]);
    }
  }

  //@ts-ignore
  keyboardContainer?.replaceChildren(...newDomStructure);
};
