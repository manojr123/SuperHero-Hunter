/*
    Creation : 02-Feb-2023 
    Author   : Manoj Raghavan
    File     : favourites.js

    Version history and changes:
    1.0 - Creation - 
          Superhero Hunter App using :
          HTML/CSS/JAVASCRIPT/LocalStorage
    2.0 - 
*/

var container = document.getElementById('container');

// Retrieve the favourites list from local storage
var favouritesData = JSON.parse(localStorage.getItem('favouritesData'));

console.log("In favourites : ");
console.log(favouritesData);

// Render the favourites list on the DOM
renderFavouritesOnDom();



/*
    Function : renderFavouritesOnDom()
    Description : 
     - Render the list on the DOM
     - Also incorporate the request for delete from the favourites list

*/
function renderFavouritesOnDom () {
    container.innerHTML='';
    for (let i = 0; i< favouritesData.length ; i++) {
        var imageURL =  favouritesData[i].imageURL;
        var name = favouritesData[i].name;
        var id = favouritesData[i].id;
        itemTag = `
            <div class ="item">
            <a href="superHero-details.html?id=${id}" target="_blank"><img src=${imageURL} class="images" ></a>
                <span> ${name} </span>

                <button class="addFavourites" id =${id} onclick="handleDeleteFromFavourites(event, ${id})"> Remove from Favourites </button>
            </div>
        `
        container.innerHTML = container.innerHTML + itemTag;
        console.log("Display Tag");
        console.log(container);
    }
}

/*
    Function : handleDeleteFromFavourites()
    Description : 
     - Render the list on the DOM
     - Also incorporate the request for delete from the favourites list

*/
function handleDeleteFromFavourites(event, id) {
    console.log("In handle delete");

    console.log(id);
    console.log('favouritesData');
    console.log(favouritesData);

    var newFavouritesData = favouritesData.filter(elem => elem.id != id);
    favouritesData = newFavouritesData;

    console.log('newFavouritesData');
    console.log(newFavouritesData);

    // Render on the DOM
    renderFavouritesOnDom();

    // Store in local storage
    localStorage.setItem('favouritesData',JSON.stringify(favouritesData));
}