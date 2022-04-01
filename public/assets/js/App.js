import dataStorage from "./DataStorage.js";
import temporaryStorage from "./TemporaryStorage.js";
class App {
  #loadSelectors() {
    const movieContainer = document.querySelector("#movieContainer");
    const dynamicPagination = document.querySelector("#dynamic_pagination");
    return { movieContainer, dynamicPagination };
  }

  async #showGallery(url) {
    const data = await dataStorage.fetchMovieCollection(url);
    const currentPageNumber = new URL(url).searchParams.get("_page");
    this.#generateGallery(data.filteredList);
    this.#generatePagination(
      data.linkedList,
      data.linkAvailable,
      currentPageNumber
    );
  }

  init() {
    const { dynamicPagination } = this.#loadSelectors();
    const currentUrl = temporaryStorage.getCurrentUrl();
    this.#showGallery(currentUrl);

    dynamicPagination.addEventListener("click", function (e) {
      e.preventDefault();
      if (e.target.className.includes("page-link")) {
        temporaryStorage.current = Array.from(e.target.attributes)[0].value;
        location.reload();
      }
    });
  }

  #generateGallery(arr) {
    const { movieContainer } = this.#loadSelectors();
    const movies = arr
      .map(
        (movie) =>
          `<div class="col">
            <div class="card">
                <img src="https://source.unsplash.com/user/wsanter" class="image-wow"/>
                <div class="card-body">
                    <figure>
                    <blockquote class="blockquote">
                        <p>${movie.title} (${movie.year})</p>
                    </blockquote>
                    <figcaption class="blockquote-footer">${movie.director} </figcaption>
                    </figure>
                </div>
            </div>
        </div>
        `
      )
      .join("");
    movieContainer.innerHTML = "";
    movieContainer.insertAdjacentHTML("afterbegin", movies);
  }

  #generatePagination(linkedList, linkAvailable, currentPageNumber) {
    const { dynamicPagination } = this.#loadSelectors();
    const { prevPageLink, firstPageLink, lastPageLink, nextPageLink } =
      linkedList;
    const { prevAvailable, nextAvailable, totalPages } = linkAvailable;


    const strPrev = `<li class="page-item ${prevAvailable ? "" : "disabled"} "><a data-link="${prevPageLink}" class="page-link"  href="${window.location.href}" ${prevAvailable ? "" : 'tabindex="-1" aria-disabled="true"'} >Previous</a></li>`;
    const strNext = `<li class="page-item ${nextAvailable ? "" : "disabled"} "><a data-link="${nextPageLink}" class="page-link" href="${window.location.href}" ${nextAvailable ? "" : 'tabindex="-1" aria-disabled="true"'} >Next</a></li>`;

    let pageFirst = this.#listItemGenerator((new URL(firstPageLink)).searchParams.get('_page'), currentPageNumber);
    let pageAfterFirst = this.#listItemGenerator(parseInt((new URL(firstPageLink)).searchParams.get('_page')) + 1, currentPageNumber);

    let beforeCurrentPage = this.#listItemGenerator(parseInt(currentPageNumber) - 1, currentPageNumber);
    let pageCurrent = this.#listItemGenerator(currentPageNumber, currentPageNumber);
    let afterCurrentPage = this.#listItemGenerator(parseInt(currentPageNumber) + 1, currentPageNumber);
    if((currentPageNumber == (new URL(firstPageLink)).searchParams.get('_page')) 
    || currentPageNumber == (parseInt((new URL(firstPageLink)).searchParams.get('_page')) + 1) 
    || currentPageNumber == (parseInt((new URL(lastPageLink)).searchParams.get('_page')) - 1) 
    || currentPageNumber == ((new URL(lastPageLink)).searchParams.get('_page')) 
    || currentPageNumber == (3) 
    || currentPageNumber == (4) 
    || currentPageNumber == (13) 
    ){
      beforeCurrentPage = this.#listItemGenerator(3, currentPageNumber);
      pageCurrent = this.#listItemGenerator(4, currentPageNumber);
      afterCurrentPage = this.#listItemGenerator(5, currentPageNumber);
    }

    if(currentPageNumber == (13)){
      afterCurrentPage = this.#listItemGenerator(13, currentPageNumber);
    }

    let pageBeforeLast = this.#listItemGenerator(parseInt((new URL(lastPageLink)).searchParams.get('_page')) - 1, currentPageNumber);
    let pageLast = this.#listItemGenerator((new URL(lastPageLink)).searchParams.get('_page'), currentPageNumber);

    const str = strPrev + pageFirst + pageAfterFirst + beforeCurrentPage + pageCurrent + afterCurrentPage + pageBeforeLast + pageLast + strNext;
    dynamicPagination.innerHTML = "";
    dynamicPagination.insertAdjacentHTML("afterbegin", str);
  }

  #generateLink(
    pageNumber = 1,
    itemLimit = 10,
    base_url = "https://movies-0623.herokuapp.com/movies"
  ) {
    return `${base_url}?_page=${pageNumber}&_limit=${itemLimit}`;
  }

  #listItemGenerator(page, temp){
    return `<li class="page-item"><a data-link="${this.#generateLink(page)}" class="page-link ${page == temp ? "text-danger" : ""}" href="${window.location.href}">${page}</a></li>`;
  }
}

const app = new App();
export default app;
