import * as model from './model.js';
import boardView from './views/boardView.js';
import cellView from './views/cellView.js';

const controlSudoku = async function () {
  try {
    await model.loadSudoku();

    boardView.render(model.state.sudokuArray);
  } catch (err) {
    console.error(err);
  }
};

const controlInput = function (key, position) {
  const [one, two] = JSON.parse(position);
  model.changeValue(key, one, two);
  model.compareArrays();

  if (model.state.mistakes === 0) {
    boardView.renderWin();
  }
};

const init = function () {
  boardView.addHandlerRender(controlSudoku);
  cellView.addHandlerKey(controlInput);
};
init();
