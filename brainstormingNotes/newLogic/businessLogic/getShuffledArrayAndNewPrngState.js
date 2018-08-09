import xorshift from 'xorshift';

const Xorshift = xorshift.constructor;

export default ({ array, prngState }) => {
  const xorshift = new Xorshift(prngState);
  const shuffledArray = array.slice();
  for (let i = 0; i < 256; i++) {
    shuffledArray.sort(() => xorshift.random() - 0.5);
  }
  const nextPrngState = xorshift.randomint().concat(xorshift.randomint());
  return {
    shuffledArray,
    newPrngState,
  };
};
