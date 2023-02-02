/*
    Creation : 02-Feb-2023 
    Author   : Manoj Raghavan
    File     : script.js

    Version history and changes:
    1.0 - Creation - 
          Superhero Hunter App using :
          HTML/CSS/JAVASCRIPT/LocalStorage
    2.0 - 
*/

    const displayTag = document.getElementById('container');
    searchTag = document.getElementById('search');
    searchBtnTag = document.getElementById('searchBtn');
    var inputStr = '';
    var currentData = [];
    var favouritesData = [];


    /*
        Function : searchData()
        Description : 
        - Asynchronously fetch Superhero characters based on the search input using generated Auth key 
        - Render on DOM
        - Store in local storage

    */
    async function searchData (input) {
        localStorage.removeItem('currentData');
        displayTag.innerHTML ='';
        try {
            console.log('character' + input);        
            console.log('$character' + `${input}`);

            /* The Authentication key is generated using below calculation :
             ts=<time-stamp>&apikey=<public-key>&hash=<md5(ts+privateKey+publicKey) */
            URLAuth = "ts=1&apikey=2f9db1aaaf4257f3b606efd6672b4d37&hash=d0e5ed175983e441713135d32b5cb2a0";
            
            // Fetch the superhero character data asynchronously using async await
            const response = await fetch(`http://gateway.marvel.com/v1/public/characters?nameStartsWith=${input}&${URLAuth}`);
            const data = await response.json();
            console.log(data);

            // Loop over the results array, save data, render and store in local storage
            for ( character of data.data.results ) {

                itemTag = document.createElement('div');
                itemTag.setAttribute('id', 'item');
                var imagePath = character.thumbnail.path;
                var extn = character.thumbnail.extension;
                character.name = character.name.slice(0,28);
                var id = character.id;
                console.log("id" + character.id);
            
                var imageURL = imagePath + '/standard_fantastic'+ '.' + extn;

                if (imagePath == '') {
                    continue;
                }

                // Render on DOM
                itemTag = `
                    <div class ="item">
                        <a href="superHero-details.html?id=${id}" target="_blank"><img src=${imageURL} class="images" > </a>
                        <span> ${character.name} </span>

                        <button class="addFavourites" id =${id} onclick="handleAddToFavourites(event, ${id})"> Add to Favourites </button>
                    </div>
                `
                displayTag.innerHTML = displayTag.innerHTML + itemTag;
                console.log("Display Tag");
                console.log(displayTag);


                // Save the current superhero data in memory
                currentData.push( {
                    'id' : id,
                    'imageURL' : imageURL,
                    'name' : character.name,
                    'description' : character.description,
                    'comics' :character.comics.available,
                    'events' : character.events.available,
                    'series' : character.series.available,
                    'stories' : character.stories.available
                })

            }

            //Store current search data in local storage. We will need this 
            // to display the details of the Superhero when the user clicks on it for more details
            localStorage.setItem('currentData', JSON.stringify(currentData));

        } 
        catch(error) {
            console.log("Error while searching..." + error);
        }

    }

    /*
        Function : handleAddToFavourites()
        Description : 
        - Event handler for adding SuperHero to list of favourites
        - If already added then ignore the request
        - Get the current list from localStorage and append to it
        - Store new request to localStorage

    */
    function handleAddToFavourites(event, id) {
        console.log('Add to favourites');
        console.log("id" + id);

        var favouriteInfo = currentData.filter(elem => elem.id == id );
        console.log('favouriteInfo');
        console.log(favouriteInfo);
        var favouritesDataTmp = JSON.parse(localStorage.getItem('favouritesData'));

        console.log('favouritesDataTmp local storage');
        console.log(favouritesDataTmp);

        if (favouritesDataTmp == null ) {
            // Local storage is null - means first time addition
            favouritesData.push( {
                'id' : favouriteInfo[0].id,
                'imageURL' : favouriteInfo[0].imageURL,
                'name' : favouriteInfo[0].name,
                'comics' :favouriteInfo[0].comics.available,
                'events' : favouriteInfo[0].events.available,
                'series' : favouriteInfo[0].series.available,
                'stories' : favouriteInfo[0].stories.available

            });
            favouritesDataTmp=favouritesData;

        } else {
            
            // Check if id is already added to favourites list from retrieved local storage data
            var test = favouritesDataTmp.filter(elem => {
            return   elem.id == favouriteInfo[0].id
            });
            
            if (  test.length != 0) {
                //Already added, so just return and show alert msg to user
                console.log("returning as test is null");
                window.alert('Already in Favourites List...')

                return;
            }
    
            favouritesDataTmp.push( {
                'id' : favouriteInfo[0].id,
                'imageURL' : favouriteInfo[0].imageURL,
                'name' : favouriteInfo[0].name,
                'comics' :favouriteInfo[0].comics.available,
                'events' : favouriteInfo[0].events.available,
                'series' : favouriteInfo[0].series.available,
                'stories' : favouriteInfo[0].stories.available

            });
        }

        // Store in local storage
        localStorage.setItem('favouritesData', JSON.stringify(favouritesDataTmp));      

    }

    /*
        Function : saveInput()
        Description : Event handler for capturing the Search input string

    */
    function saveInput (event) {
        console.log("In saveInput");
        console.log(event.keyCode);

        inputStr = event.target.value;
        console.log('inputStr :' + inputStr);

    }
    /*
        Function : handleSearch()
        Description : Event handler for handling the Superhero search task

    */
    function handleSearch (event) {
        console.log("In handleSearch");

        searchData(inputStr);
        searchTag.innerHTML='';
    }

    function initializeApp () {  
        searchBtnTag.addEventListener('click',handleSearch);
        searchTag.addEventListener('keyup',saveInput);
        searchTag.onfocus = function(){this.value=''};
    }
    initializeApp();

