/**
 * Return an object with the sum of two objects (integer values)
 * @param obj1 First object
 * @param obj2 Second object
 * @returns Object with the sum values of the two inputs.
 */
export function sumObjects(
  obj1: { [x: string]: any },
  obj2: { [x: string]: any; hasOwnProperty: (arg0: string) => any },
) {
  let sum = {};

  Object.keys(obj1).forEach(key => {
    if (obj2.hasOwnProperty(key)) {
      sum[key] = obj1[key] + obj2[key];
    } else {
      sum[key] = obj1[key];
    }
  });

  return sum;
}

/**
 * Shuffle an array :-)
 * @see http://sedition.com/perl/javascript-fy.html
 */
export function arrayShuffle(array) {
  let currentIndex = array.length,
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
