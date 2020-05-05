class Pagination {
  constructor() {
    this._page = 1;
    this._totalPages = 0;
  }

  setTotalPages(totalPages) {
    this._totalPages = totalPages;
  }

  getPage() {
    return this._page;
  }

  nextPage() {
    if (this._totalPages === 0) return this._getObjectError();

    const nextPage = this._page + 1;
    return nextPage > this._totalPages
      ? (this._page = this._totalPages)
      : (this._page = nextPage);
  }

  previousPage() {
    if (this._totalPages === 0) return this._getObjectError();

    const previousPage = this._page - 1;
    return previousPage < 1 ? (this._page = 1) : (this._page = previousPage);
  }

  _getObjectError() {
    return {
      error: true,
      message: 'Você deve definir um total de páginas antes de continuar.',
    };
  }
}
