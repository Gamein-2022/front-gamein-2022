export const formatPrice = (input) => {
  if (input === null || input === undefined) return input;
  let count = 0;
  let res = "";
  input = input.toString();
  for (let i = input.length - 1; i > -1; i--) {
    const char = input.charAt(i);
    res = char + res;
    count += 1;
    if (count % 3 == 0 && i != 0) {
      res = "," + res;
    }
  }
  return res;
};

export function isEmpty(s) {
  return String(s).trim() === "";
}

function removeLeadingZeros(string) {
  return Number(string, 10).toString();
}

function convertThreeDigitsToLexicalNumber(string, keepDigits = false) {
  const zeroTrimmedString = removeLeadingZeros(string);
  if (!zeroTrimmedString.length || zeroTrimmedString === "0") {
    return "";
  }

  if (keepDigits) {
    return zeroTrimmedString;
  }

  if ({}.hasOwnProperty.call(digitalLexicalNumbersMap, zeroTrimmedString)) {
    return digitalLexicalNumbersMap[zeroTrimmedString];
  }

  if (zeroTrimmedString.length === 2) {
    return `${digitalLexicalNumbersMap[`${zeroTrimmedString[0]}0`]} و ${
      digitalLexicalNumbersMap[zeroTrimmedString[1]]
    }`;
  }

  return `${
    digitalLexicalNumbersMap[`${zeroTrimmedString[0]}00`]
  } و ${convertThreeDigitsToLexicalNumber(zeroTrimmedString.substring(1))}`;
}

const digitalLexicalNumbersMap = {
  0: "صفر",
  1: "یک",
  2: "دو",
  3: "سه",
  4: "چهار",
  5: "پنج",
  6: "شش",
  7: "هفت",
  8: "هشت",
  9: "نه",
  10: "ده",
  11: "یازده",
  12: "دوازده",
  13: "سیزده",
  14: "چهارده",
  15: "پانزده",
  16: "شانزده",
  17: "هفده",
  18: "هجده",
  19: "نوزده",
  20: "بیست",
  30: "سی",
  40: "چهل",
  50: "پنجاه",
  60: "شصت",
  70: "هفتاد",
  80: "هشتاد",
  90: "نود",
  100: "صد",
  200: "دویست",
  300: "سیصد",
  400: "چهارصد",
  500: "پانصد",
  600: "ششصد",
  700: "هفتصد",
  800: "هشتصد",
  900: "نهصد",
};
const lexicalSuffixes = ["هزار", "میلیون", "میلیارد"];

function chunkByThree(string) {
  const chunks = [];
  let index = 0;
  const headDigitsCount = string.length % 3;
  if (headDigitsCount) {
    chunks.push(string.substring(0, headDigitsCount));
    index += headDigitsCount;
  }

  while (index < string.length - 1) {
    chunks.push(string.substring(index, index + 3));
    index += 3;
  }

  return chunks;
}

function appendLexicalSuffixes(chunk, chunkIndex, chunks) {
  if (!chunk) {
    return "";
  }

  const { length: chunksCount } = chunks;

  const suffix = lexicalSuffixes[chunksCount - (chunkIndex + 2)];
  if (
    suffix === lexicalSuffixes[0] &&
    chunk === digitalLexicalNumbersMap["1"]
  ) {
    return suffix;
  }

  return suffix ? `${chunk} ${suffix}` : chunk;
}

export function convertNumericToLexical(num = 0, keepDigits = false) {
  const number = num || 0
  const numberStr = number.toString();
  const chunks = chunkByThree(numberStr);
  if (chunks.length === 1 && chunks[0] === "0") {
    return digitalLexicalNumbersMap["0"];
  }
  try {
    return chunks
      .map((chunk) => convertThreeDigitsToLexicalNumber(chunk, keepDigits))
      .map(appendLexicalSuffixes)
      .filter(Boolean)
      .join(" و ");
  } catch (error) {
    return "...";
  }
}

export const convertNumberToEnglish = (input) => {
  input = `${input}`;
  const english = {
    "۰": "0",
    "۱": "1",
    "۲": "2",
    "۳": 3,
    "۴": 4,
    "۵": 5,
    "۶": 6,
    "۷": 7,
    "۸": 8,
    "۹": 9,
  };
  let res = "";
  for (let i = 0; i < input.length; i++) {
    let char = input.charAt(i);
    if (english[char]) {
      char = english[char];
    }
    res += char;
  }
  return res;
};
