import View from './View';
class PaginationView extends View {
  _parentEl = document.querySelector('.pagination');

  _generateMarkup() {
    console.log(this._data);
    const pages = Math.ceil(
      this._data.allCountries.length / this._data.resultsPerPage
    );
    console.log(pages);
    // page 1 and there are other pages
    if (this._data.page === 1 && pages > 1) {
      return `
          
          <button class="pagination__button pagination__button--next">
            <i class="fa-solid fa-arrow-right"></i>
            <span class="pagination__text">${this._data.page + 1}</span>
          </button>
      `;
    }
    // page 1 and NOT other pages
    if (this._data.page === 1 && pages === 1) {
      return ``;
    }
    // in other pages
    if (this._data.page < pages) {
      return `
      <button class="pagination__button pagination__button--prev">
        <i class="fa-solid fa-arrow-left"></i>
        <span class="pagination__text">${this._data.page - 1}</span>
      </button>
      <button class="pagination__button pagination__button--next">
        <i class="fa-solid fa-arrow-right"></i>
        <span class="pagination__text">${this._data.page + 1}</span>
      </button>
  `;
    }
    // last page
    if (pages > 1 && this._data.page === pages) {
      return `
      <button class="pagination__button pagination__button--prev">
        <i class="fa-solid fa-arrow-left"></i>
        <span class="pagination__text">${this._data.page - 1}</span>
      </button>
      `;
    }
  }
}

export default new PaginationView();
