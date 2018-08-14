import xorshift from 'xorshift';

const Xorshift = xorshift.constructor;

export default ({ array, prngState }) => {
  console.log('old',prngState);
  const xorshift = new Xorshift(prngState);
  const shuffledArray = array.slice();
  for (let i = 0; i < 256; i++) {
    shuffledArray.sort(() => xorshift.random() - 0.5);
  }
  const newPrngState = xorshift.randomint().concat(xorshift.randomint());
  console.log('new',newPrngState);
  return {
    shuffledArray,
    newPrngState,
  };
};
