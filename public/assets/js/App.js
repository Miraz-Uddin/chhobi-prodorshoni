import dataStorage from "./DataStorage.js";
class App {
  #loadSelectors() {
    const movieContainer = document.querySelector("#movieContainer");
    return { movieContainer };
  }
  init() {
    document.addEventListener("DOMContentLoaded", async (e) => {
      e.preventDefault();
      const moviesList = await dataStorage.fetchAllMovies();
      this.#generateGallery(moviesList);
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
}

const app = new App();
export default app;
