import View from './View';
class PaginationView extends View {
  _parentEl = document.querySelector('.pagination');

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
    console.log(this._data);
    const pages = Math.ceil(
      this._data.allCountries.length / this._data.resultsPerPage
    );
    console.log(pages);
    // let html = '';
    // for (let i = 0; i < pages; i++) {
    //   html += this._generateButtons(i);
    // }
    // return html;

    // page 1 and there are other pages
    if (this._data.page === 1 && pages > 1) {
      let html = '';
      for (let index = 1; index < pages; index++) {
        html += this._generateOtherPagesPositive(index);
      }
      return [
        this._generateCurrentPageButton(),
        html,
        this._generateNextButton(),
      ];
    }
    // page 1 and NOT other pages
    if (this._data.page === 1 && pages === 1) {
      return ``;
    }
    // in other pages
    if (this._data.page < pages) {
      let htmlNext = '';
      for (let index = this._data.page; index < pages; index++) {
        //6
        console.log(index);
        htmlNext += this._generateOtherPagesPositive(
          index - this._data.page + 1
        );
      }

      let htmlPrev = '';
      for (let i = this._data.page - 1; i > 0; i--) {
        // 5
        htmlPrev += this._generateOtherPagesNegative(i);
      }

      return [
        this._generatePrevButton(),
        htmlPrev,
        this._generateCurrentPageButton(),
        htmlNext,
        this._generateNextButton(),
      ];
    }
    // last page
    if (pages > 1 && this._data.page === pages) {
      let html = '';
      for (let i = pages - 1; i > 0; i--) {
        html += this._generateOtherPagesNegative(i);
      }
      return [
        this._generatePrevButton(),
        html,
        this._generateCurrentPageButton(),
      ];
    }
  }
  _generateCurrentPageButton() {
    return `
    <button data-goto="${this._data.page}" class="pagination__button pagination__button--active ">
      <span class="pagination__text">${this._data.page}</span>
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
    }" class="pagination__button pagination__button--prev">
      <i class="fa-solid fa-arrow-left"></i>
    </button>
    `;
  }
  _generateNextButton() {
    return `
    <button data-goto="${
      this._data.page + 1
    }" class="pagination__button pagination__button--next">
      <i class="fa-solid fa-arrow-right"></i>
    </button>
    `;
  }
}

export default new PaginationView();
