import View from './View';
class PaginationView extends View {
  _parentEl = document.querySelector('.pagination__container');

  //! Get GoToPage dataset and pass to controller to render it
  addHandlerClick(handler) {
    this._parentEl.addEventListener('click', function (e) {
      e.preventDefault();
      const btn = e.target.closest('.pagination__button');
      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkup() {
    const pages = Math.ceil(
      this._data.allCountries.length / this._data.resultsPerPage
    );
    //! 1)page 1 and there are other pages
    if (this._data.page === 1 && pages > 1) {
      let html = '';
      for (let index = 1; index < pages; index++) {
        html += this._generateOtherPagesPositive(index);
      }
      return [
        this._generateCurrentPageButton(),
        html,
        this._generateNextButton(),
      ].join('');
    }
    //! 2) page 1 and NOT other pages
    if (this._data.page === 1 && pages === 1) {
      return ``;
    }
    //! 3) In other pages
    if (this._data.page < pages) {
      let htmlNext = '';
      for (let index = this._data.page; index < pages; index++) {
        htmlNext += this._generateOtherPagesPositive(
          index - this._data.page + 1
        );
      }

      let htmlPrev = '';
      for (let i = this._data.page - 1; i > 0; i--) {
        htmlPrev += this._generateOtherPagesNegative(i);
      }

      return [
        this._generatePrevButton(),
        htmlPrev,
        this._generateCurrentPageButton(),
        htmlNext,
        this._generateNextButton(),
      ].join('');
    }
    //! 4) last page
    if (pages > 1 && this._data.page === pages) {
      let html = '';
      for (let i = pages - 1; i > 0; i--) {
        html += this._generateOtherPagesNegative(i);
      }
      return [
        this._generatePrevButton(),
        html,
        this._generateCurrentPageButton(),
      ].join('');
    }
  }
  _generateCurrentPageButton() {
    return `
    <button data-goto="${this._data.page}" class="pagination__button pagination__button--active">
      <span class="pagination__button--active-txt">${this._data.page}</span>
    </button>
    `;
  }
  _generateOtherPagesPositive(page) {
    return `
    <button data-goto="${
      this._data.page + page
    }" class="pagination__button pagination__button--prev">
      <span class="pagination__text">${this._data.page + page}</span>
    </button>
    `;
  }
  _generateOtherPagesNegative(page) {
    return `
    <button data-goto="${
      this._data.page - page
    }" class="pagination__button pagination__button--prev">
      <span class="pagination__text">${this._data.page - page}</span>
    </button>
    `;
  }
  _generatePrevButton() {
    return `
    <button data-goto="${
      this._data.page - 1
    }" class="pagination__button pagination__button--prev pagination__arrow--left">
    <i class="fa-solid fa-angle-left"></i>
    </button>
    `;
  }
  _generateNextButton() {
    return `<button data-goto="${
      this._data.page + 1
    }" class="pagination__button pagination__button--next pagination__arrow--right">
    <i class="fa-solid fa-angle-right"></i>
    </button>`;
  }
}

export default new PaginationView();
