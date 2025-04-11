import axios from "axios";   
async function fetchImages(numberOfImages, searchValue) {
  const api_key = import.meta.env.VITE_GIPHY_API_KEY;
  try {
    let request = await axios.get(
      `https://api.giphy.com/v1/stickers/search?api_key=${api_key}&q=${searchValue}&limit=${numberOfImages}&offset=0&rating=r&lang=en&bundle=messaging_non_clips`
    );
    return request.data?.data || [];
  } catch (error) {
    console.error("Error fetching images:", error);
  }

}

function getSearchOptions(){
  return [
    "Mickey Mouse",
    "Bugs Bunny",
    "Homer Simpson",
    "SpongeBob SquarePants",
    "Tom and Jerry", 
    "Scooby-Doo",
    "Fred Flintstone",
    "Bart Simpson",
    "Daffy Duck",
    "Donald Duck",
    "Goofy",
    "Popeye",
    "Patrick Star",
    "Rick Sanchez",
    "Morty Smith",
    "Velma Dinkley",
    "Timmy Turner",
    "Dexter",
    "Bubbles"
  ];
}
 

export { fetchImages, getSearchOptions }