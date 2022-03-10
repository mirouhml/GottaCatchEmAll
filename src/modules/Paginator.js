class Paginator {
  constructor(listArray, numberPerPage, currentPage, pagesContainer, container){
    this.numberOfItems = listArray.length
    this.numberPerPage = numberPerPage
    this.currentPage = currentPage
    this.container = container;
    this.pagesContainer = pagesContainer;
    this.numberOfPages = Math.ceil(this.numberOfItems/this.numberPerPage)
    this.buildPage(1);
    this.buildPagination(this.currentPage);
    document.getElementById('paginator').onclick = (e) => {
        console.log(e.target.textContent);
      const clickedPage = parseInt(e.target.textContent);
      this.buildPagination(clickedPage)
      this.buildPage(clickedPage)
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
    if (this.numberOfPages >= 3) {
        for (let i=-1; i<2; i++) {
            const element = document.createElement('li');
            element.className = 'page-item';
            element.innerHTML = `<a class="page-link" href="#">${currPageNum+i}</a>`;
            this.pagesContainer.appendChild(element);
        }
    } else {
        for (let i=0; i<numberOfPages; i++) {
          const element = document.createElement('li');
          element.className = 'page-item';
          element.innerHTML = `<a class="page-link" href="#">${currPageNum+i}</a>`;
          this.pagesContainer.appendChild(element);
        }
    }
  }
  
  buildPage = (currPage) => {
    const trimStart = (currPage-1)*this.numberPerPage
    const trimEnd = trimStart + this.numberPerPage
    const trimmedArray = listArray.slice(trimStart, trimEnd);
    this.container.innerHTML = '';
    trimmedArray.forEach(trim => {
      this.container.appendChild(trim);
    })
  }
}