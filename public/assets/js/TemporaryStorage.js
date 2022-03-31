class TemporaryStorage {
  #currentUrl = "https://movies-0623.herokuapp.com/movies?_page=1&_limit=10";
  set current(url) {
    this.#currentUrl = url;
    localStorage.setItem("currentUrl", this.#currentUrl);
  }
  getCurrentUrl() {
    if (localStorage.getItem("currentUrl"))
      return localStorage.getItem("currentUrl");
    return this.#currentUrl;
  }
}
const temporaryStorage = new TemporaryStorage();
export default temporaryStorage;
