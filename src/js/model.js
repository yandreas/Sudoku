import { AJAX } from './helpers.js';

export const state = {
  sudokuArray: {},
  mistakes: 0,
};

export const compareArrays = function () {
  let mistakes = 0;
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (!(state.sudokuArray.value[i][j] === state.sudokuArray.solution[i][j]))
        mistakes++;
    }
  }

  state.mistakes = mistakes;
};

export const changeValue = function (key, one, two) {
  state.sudokuArray.value[one][two] = key;
};

const createSudoku = function (data) {
  const grids = data.newboard.grids[0];
  const mutatedSudoku = mutateSudoku(grids);
  return {
    value: mutatedSudoku.newValue,
    solution: mutatedSudoku.newSolution,
  };
};

const mutateSudoku = function (grid) {
  const { value, solution } = grid;

  const newValue = arrayToMatrix(value);
  const newSolution = arrayToMatrix(solution);

  return {
    newValue,
    newSolution,
  };
};

const arrayToMatrix = function (array) {
  const newArray = [];

  for (let i = 0; i < 9; i++) {
    newArray[i] = nestArray(array[i]);
  }
  const saveArray = [newArray.flat()];

  const matrix = createEndArray(saveArray);
  return matrix;
};

const nestArray = function (array) {
  const newArray = [[], [], []];
  newArray[0].push(array[0], array[1], array[2]);
  newArray[1].push(array[3], array[4], array[5]);
  newArray[2].push(array[6], array[7], array[8]);

  return newArray;
};

const arrayConcat = function (array, arr1, arr2, arr3) {
  const saveArray = array.flat();
  const newArray = saveArray[arr1].concat(saveArray[arr2], saveArray[arr3]);
  return newArray;
};

const createEndArray = function (array) {
  const one = arrayConcat(array, 0, 3, 6);
  const two = arrayConcat(array, 1, 4, 7);
  const three = arrayConcat(array, 2, 5, 8);
  const four = arrayConcat(array, 9, 12, 15);
  const five = arrayConcat(array, 10, 13, 16);
  const six = arrayConcat(array, 11, 14, 17);
  const seven = arrayConcat(array, 18, 21, 24);
  const eight = arrayConcat(array, 19, 22, 25);
  const nine = arrayConcat(array, 20, 23, 26);
  return [one, two, three, four, five, six, seven, eight, nine];
};

export const loadSudoku = async function () {
  try {
    const data = await AJAX(`https://sudoku-api.vercel.app/api/dosuku`);

    state.sudokuArray = createSudoku(data);
  } catch (err) {
    throw err;
  }
};
