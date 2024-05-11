const leadingZeros = (num, zeroes) => {
  let str = String(num);
  while (str.length <= zeroes) {
    str = `0${str}`;
  }
  return str;
};
