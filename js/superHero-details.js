/*
    Creation : 02-Feb-2023 
    Author   : Manoj Raghavan
    File     : superHero-details.js

    Version history and changes:
    1.0 - Creation - 
          Superhero Hunter App using :
          HTML/CSS/JAVASCRIPT/LocalStorage
    2.0 - 
*/


// Get the id of the SuperHero for which details are requested
const myURL = new URL(window.location.toLocaleString());
var id = myURL.searchParams.get('id');
console.log('id' + id);

var container = document.getElementById('container');

// Retrieve the data from local Storage
var currentData = JSON.parse(localStorage.getItem('currentData'));
var favouritesData = JSON.parse(localStorage.getItem('favouritesData'));
var selectionItem = currentData.filter( elem => elem.id == id);

// If data not in currentData then the request has come from Favourites List
if( selectionItem.length ==0 ) {
    var selectionItem = favouritesData.filter( elem => elem.id == id);

}

container.innerHTML ="";

// Render the favourites list on DOM
renderItemOnDom();

/*
    Function : renderItemOnDom()
    Description : 
     - Render the Superhero list of favourites on the DOM
     
*/
function renderItemOnDom() {

        itemTag = `
            <div id ="item">
                <div>
                    <img src=${selectionItem[0].imageURL} class="images" > 
                </div> 
                <div id="details">
                    <span class="heading">  Name : <span class="text"> ${selectionItem[0].name} </span></span>
                    <span class="heading">  Description :<br> <span class="text">${selectionItem[0].description} </span></span>
                    <span class="heading">  Comics : <span class="text">${selectionItem[0].comics} </span></span>
                    <span class="heading"> Events :  <span class="text">${selectionItem[0].events} </span></span>
                    <span class="heading">  Series : <span class="text">${selectionItem[0].series} </span></span>
                    <span class="heading">  Stories :<span class="text"> ${selectionItem[0].stories} </span></span>
                        
                    <button class="addFavourites" id =${id} onclick="handleAddToFavourites(event, ${id})"> Add to Favourites </button>
                </div>
            </div>
        `
        container.innerHTML =  itemTag;
        console.log(container);

}