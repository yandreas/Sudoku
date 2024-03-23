import View from './View.js';

class cellView extends View {
  #parentElement = document.querySelectorAll('.sudoku__cell');

  constructor() {
    super();
    this.#addHandlerClick();
  }

  #addHandlerClick() {
    const cells = this.#parentElement;
    cells.forEach(cell => {
      cell.addEventListener('click', function (e) {
        if (this.classList.contains('locked')) return;
        cells.forEach(cell => cell.classList.remove('enlargen'));
        this.classList.add('enlargen');
      });
    });
  }

  addHandlerKey(changeValue) {
    window.addEventListener('click', e => {
      if (e.target.closest('.sudoku__cell')?.classList.contains('enlargen'))
        return;
      this.#parentElement.forEach(cell => cell.classList.remove('enlargen'));
    });

    window.addEventListener('keydown', e => {
      const activeCell = document.querySelector('.enlargen');
      if (!activeCell) return;

      if (isFinite(+e.key) && +e.key !== 0) {
        activeCell.innerHTML = `<span>${e.key}</span>`;

        changeValue(+e.key, activeCell.dataset.pos);
      }

      if (e.key === 'Backspace') {
        activeCell.innerHTML = `<span></span>`;
        changeValue(0, activeCell.dataset.pos);
      }
    });
  }
}

export default new cellView();
