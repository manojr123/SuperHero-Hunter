# SuperHero-Hunter
Superhero Hunter app using HTML/CSS and vanilla Javascript

*This includes the following features:  *
   1. Home Page
      - Fetches and display a list of SuperHeros (Characters) on the home page. A search bar is provided which will filter out the character based on search query. Suppose I type “spider” in the search box, it will show spider related superheroes. 
      - Uses public key and MD5 of (ts+privateKey+publicKey) for Authentication
      - Each search result of the superhero has a favorite button, clicking on which superhero ise added to  “My favorite superheroes” (a list).
      - On clicking any particular search result (any superhero), opens a new page with more information about that superhero (Superhero page).


   2. SuperHero Page
      - Shows a lot of information about the superhero like their name, photo, bio and other information provided by the API (comics, events, series, stories, etc).

   3. Favourites SuperHero Page
      - Displays a list of all the favourite superheroes.
      - This list is made persistent (has the same number of superheroes before and after closing the browser).
      -	Remove from favourites button is provided: Each superhero should have remove from favourites button, clicking on which removes that superhero from the list.

   4. Local Storage is used to make the favorites list persistent

# SuperHero Hunter
