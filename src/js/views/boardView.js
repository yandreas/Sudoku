import View from './View.js';

class boardView extends View {
  #parentElement = document.querySelector('.sudoku');

  constructor() {
    super();
  }

  render(data) {
    const { value } = data;

    const parts = Array.from(
      this.#parentElement.querySelectorAll('.sudoku__part')
    );

    let i = 0;
    parts.forEach(part => {
      const cells = part.querySelectorAll('.sudoku__cell');

      let j = 0;
      cells.forEach(cell => {
        let input;
        if (value[i][j] !== 0) {
          input = value[i][j];
          cell.classList.add('locked');
        } else {
          input = '';
        }
        cell.innerHTML = `<span>${input}</span>`;
        cell.setAttribute('data-pos', `[${i},${j}]`);
        j++;
      });
      i++;
    });
  }

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  renderWin() {
    document.querySelector('.game-state').classList.remove('hidden');
    this.#parentElement.classList.add('hidden');
  }
}

export default new boardView();
