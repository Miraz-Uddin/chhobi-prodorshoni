import dataStorage from "./DataStorage.js";
class App {
  #loadSelectors() {
    const movieContainer = document.querySelector("#movieContainer");
    const dynamicPagination = document.querySelector("#dynamic_pagination");
    return { movieContainer, dynamicPagination };
  }

  init() {
    document.addEventListener("DOMContentLoaded", async (e) => {
      e.preventDefault();
      const data = await dataStorage.fetchMovieCollection(`
        https://movies-0623.herokuapp.com/movies?_page=1&_limit=10
      `);
      this.#generateGallery(data.filteredList);
      this.#generatePagination(data.linkedList);
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

  #generatePagination(linkedList){
    const { dynamicPagination } = this.#loadSelectors();
    const { prevPageLink, firstPageLink, lastPageLink, nextPageLink } = linkedList;
    const str = `
      <li class="page-item disabled">
        <a class="page-link" href="${prevPageLink}" tabindex="-1" aria-disabled="true">Previous</a>
      </li>
      <li class="page-item"><a class="page-link" href="${firstPageLink}">1</a></li>
      <li class="page-item"><a class="page-link" href="${lastPageLink}">15</a></li>
      <li class="page-item"><a class="page-link" href="${nextPageLink}">Next</a></li>
    `;
    dynamicPagination.innerHTML = "";
    dynamicPagination.insertAdjacentHTML("afterbegin", str);
  }
}

const app = new App();
export default app;
