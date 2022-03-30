class DataStorage {
  async fetchAllMovies() {
    const getResponse = await fetch(`https://movies-0623.herokuapp.com/movies?_page=1&_limit=8`);
    // getResponse.headers.forEach((key,value)=>{console.log(key+': '+value)})
    // let url  = new URL(`http://movies-0623.herokuapp.com/movies/?_page=1&_limit=2`);
    // console.log(url.searchParams.get(`_page`))
    // console.log(url.searchParams.get(`_limit`))
    return await getResponse.json();
  }
}

const dataStorage = new DataStorage();
export default dataStorage;
