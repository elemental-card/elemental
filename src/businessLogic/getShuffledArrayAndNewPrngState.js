import xorshift from "xorshift";

const Xorshift = xorshift.constructor;

export default ({ array, prngState }) => {
  const xorshift = new Xorshift(prngState);
  const shuffledArray = array.slice();
  const lastIndex = array.length - 1;
  for (let i = 0; i < 256; i++) {
    // O(n) shuffle
    // https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#The_modern_algorithm
    for (let j = lastIndex; j > 0; j--) {
      const k = Math.floor(xorshift.random() * (j + 1));
      const temp = shuffledArray[j];
      shuffledArray[j] = shuffledArray[k];
      shuffledArray[k] = temp;
    }
  }
  const newPrngState = xorshift.randomint().concat(xorshift.randomint());
  return {
    shuffledArray,
    newPrngState,
  };
};
