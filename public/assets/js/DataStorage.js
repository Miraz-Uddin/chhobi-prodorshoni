class DataStorage {
  async fetchAllMovies() {
    const getResponse = await fetch(`https://movies-0623.herokuapp.com/movies`);
    return await getResponse.json();
  }
}

const dataStorage = new DataStorage();
export default dataStorage;
