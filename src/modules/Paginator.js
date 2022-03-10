export default class Paginator {
  constructor(listArray, numberPerPage, currentPage, pagesContainer, container, maxPages){
    this.listArray = listArray;
    this.numberOfItems = listArray.length
    this.numberPerPage = numberPerPage
    this.currentPage = currentPage
    this.container = container;
    this.pagesContainer = pagesContainer;
    this.maxPages = maxPages;
    this.middlePage = 2;
    this.numberOfPages = Math.ceil(this.numberOfItems/this.numberPerPage)
    const pages = document.getElementById('pages');
    this.buildPage(1);
    if (this.numberOfPages !== 1) { 
      pages.classList.remove('no-display');
      pages.classList.add('d-flex');
      this.buildPagination(this.currentPage);
      document.getElementById('paginator').onclick = (e) => {
        if(e.target.id == 'previous' || e.target.textContent == '«'){
          if ((this.middlePage - this.maxPages) >= 2){
            this.middlePage = this.middlePage - maxPages;
            this.buildPagination(this.middlePage)
          }
        } else if (e.target.id == 'next' || e.target.textContent == '»'){
          if ((this.middlePage) <= (this.numberOfPages - this.maxPages + 1)){
            this.middlePage = this.middlePage + maxPages;
            this.buildPagination(this.middlePage)
          }

        } else {
          const clickedPage = parseInt(e.target.textContent);
          this.buildPagination(clickedPage)
          this.buildPage(clickedPage)
        }
      }
    } else if (this.numberOfPages === 1){
      pages.classList.add('no-display');
      pages.classList.remove('d-flex');
    }
  }

  
  accomodatePage = (clickedPage) => {
    if (clickedPage <= 1) { return clickedPage + 1}
    if (clickedPage >= this.numberOfPages) { return clickedPage -1}
    return clickedPage
  }
  
  buildPagination = (clickedPage) => {
    this.pagesContainer.innerHTML = '';
    const currPageNum = this.accomodatePage(clickedPage)
    const previous = document.createElement('li');
    previous.className = 'page-item';
    previous.innerHTML = `<a class="page-link" id="previous" href="#"><span aria-hidden="true">&laquo;</span></a>`;
    this.pagesContainer.appendChild(previous);
    if (this.numberOfPages >= this.maxPages) {
        for (let i=-1; i<this.maxPages - 1; i++) {
            if (currPageNum+i<=this.numberOfPages) { 
              const element = document.createElement('li');
              element.className = 'page-item';
              element.innerHTML = `<a class="page-link" href="#">${currPageNum+i}</a>`;
              this.pagesContainer.appendChild(element);
            }
        }
    } else {
        for (let i=-1; i<this.numberOfPages; i++) {
          if (currPageNum+i > 0) {
            const element = document.createElement('li');
            element.className = 'page-item';
            element.innerHTML = `<a class="page-link" href="#">${currPageNum+i}</a>`;
            this.pagesContainer.appendChild(element);
          }
        }
    }
    const next = document.createElement('li');
    next.className = 'page-item';
    next.innerHTML = `<a class="page-link" id="next" href="#"><span aria-hidden="true">&raquo;</span></a>`;
    this.pagesContainer.appendChild(next);
  }
  
  buildPage = (currPage) => {
    const trimStart = (currPage-1)*this.numberPerPage
    const trimEnd = trimStart + this.numberPerPage
    const trimmedArray = this.listArray.slice(trimStart, trimEnd);
    this.container.innerHTML = '';
    console.log(trimmedArray,this.listArray);
    trimmedArray.forEach(trim => {
      console.log(trim)
      this.container.appendChild(trim);
    })
  }
}