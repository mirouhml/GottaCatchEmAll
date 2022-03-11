export default class Paginator {
  constructor(listArray, numberPerPage, pagesContainer, container, maxPages) {
    this.listArray = listArray;
    this.numberOfItems = listArray.length;
    this.numberPerPage = numberPerPage;
    this.container = container;
    this.pagesContainer = pagesContainer;
    this.maxPages = maxPages;
    this.currentPage = 0;
    this.numberOfPages = Math.ceil(this.numberOfItems / this.numberPerPage);
  }

  init() {
    this.buildPage(1);
    if (this.numberOfPages !== 1) {
      this.buildPagination();
      document.getElementById('paginator').onclick = (e) => {
        if (e.target.id === 'previous' || e.target.textContent === '«') {
          if ((this.currentPage - this.maxPages)<=0)
            this.currentPage = 0;
          else (this.currentPage = this.currentPage - this.maxPages)
          this.buildPagination();
        } else if ((e.target.id === 'next' || e.target.textContent === '»')) {
          if (this.currentPage < this.numberOfPages - 2) {
            console.log(this.currentPage);
            if ((this.currentPage - this.maxPages)>=this.numberOfPages)
              this.currentPage = this.numberOfPages;
            else (this.currentPage = this.currentPage + this.maxPages)
            this.buildPagination();
          }
        } else {
          const clickedPage = parseInt(e.target.textContent, 10);
          this.buildPage(clickedPage);
        }
      }
      return true;
    } else if (this.numberOfPages === 1) {
      return false;
    }
  }

  accomodatePage = (clickedPage) => {
    if (clickedPage <= 1) { return clickedPage + 1; }
    if (clickedPage >= this.numberOfPages) { return clickedPage - 1; }
    return clickedPage;
  }

  buildPagination = () => {
    this.pagesContainer.innerHTML = '';
    const previous = document.createElement('li');
    previous.className = 'page-item';
    previous.innerHTML = `<a class="page-link" id="previous" href="#"><span aria-hidden="true">&laquo;</span></a>`;
    this.pagesContainer.appendChild(previous);
    let max = this.currentPage + this.maxPages;
    if (max >= this.numberOfPages)
      max = this.numberOfPages;
    for (let i=this.currentPage; i<max; i++) {
      const element = document.createElement('li');
      element.className = 'page-item';
      if(i<9)
        element.innerHTML = `<a class="page-link" href="#">0${i+1}</a>`;
      else
      element.innerHTML = `<a class="page-link" href="#">${i+1}</a>`;
      this.pagesContainer.appendChild(element);
    }
    const next = document.createElement('li');
    next.className = 'page-item';
    next.innerHTML = '<a class="page-link" id="next" href="#"><span aria-hidden="true">&raquo;</span></a>';
    this.pagesContainer.appendChild(next);
  }

  buildPage = (currPage) => {
    const trimStart = (currPage - 1) * this.numberPerPage;
    const trimEnd = trimStart + this.numberPerPage;
    const trimmedArray = this.listArray.slice(trimStart, trimEnd);
    this.container.innerHTML = '';
    trimmedArray.forEach((trim) => {
      this.container.appendChild(trim);
    });
  }
}