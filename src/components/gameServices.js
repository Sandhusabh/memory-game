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
    "cat",
    "dog",
    "car",
    "tree",
    "apple",
    "banana",
    "flower",
    "mountain",
    "ocean",
    "sun",
    "moon",
    "star",
    "ball",
    "ice cream",
    "bird",
    "fish",
    "butterfly",
    "train",
    "rocket",
    "guitar",
    "book",
    "clock",
    "hat",
    "shoe",
    "robot",
    "elephant",
    "panda",
    "cupcake",
    "rainbow",
    "cactus"
  ];
  
}
 

export { fetchImages, getSearchOptions }