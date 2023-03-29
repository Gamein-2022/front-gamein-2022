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
