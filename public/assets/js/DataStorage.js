class DataStorage {
  async fetchMovieCollection(customUrl) {
    const getResponse = await fetch(customUrl);
    const arraySplitter = getResponse.headers.get('link').split(',');
    const indexArray = arraySplitter.map(x=>x.split('rel=')[1].replace(/\W+/gm,''));
    const linkArray = arraySplitter.map(x=>x.split(';')[0]);

    let prevAvailable = false;
    let nextAvailable = false;
    let firstPageLink = "#";
    let lastPageLink = "#";
    let nextPageLink = "#";
    let prevPageLink = "#";
    
    if(indexArray.includes('next')) nextAvailable = true
    if(indexArray.includes('prev')) prevAvailable = true
    
    if(nextAvailable) nextPageLink = linkArray[1].replace(/<|>/gm,'')
    if(prevAvailable) prevPageLink = linkArray[1].replace(/<|>/gm,'')
    
    if(nextAvailable && prevAvailable){
      prevPageLink = linkArray[1].replace(/<|>/gm,'')
      nextPageLink = linkArray[2].replace(/<|>/gm,'')
    }

    firstPageLink = linkArray[0].replace(/<|>/gm,'')
    lastPageLink = linkArray[linkArray.length-1].replace(/<|>/gm,'')
    prevPageLink = prevPageLink.replace(/http:\//gm,'https://')
    nextPageLink = nextPageLink.replace(/http:\//gm,'https://')

    const filteredList = await getResponse.json();
    const linkedList = { prevPageLink, firstPageLink, lastPageLink, nextPageLink };
    const linkAvailable = { prevAvailable, nextAvailable };

    return {linkedList,filteredList, linkAvailable};
  }
}

const dataStorage = new DataStorage();
export default dataStorage;
