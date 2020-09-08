import data from './data'

const items = [];
let error = null;
let adding = false;
const showRating =1;
// let rank= [

// ]
// Search for bookmark
const findById = function (id) {
  return this.items.find(currentItem => currentItem.id === id);
};
//add bookmark
const addUrl = function (newurl) {
  try {
    this.urls.push(data.create(newurl));
  } catch (error) {
    console.log(error,'no')
  }
 
};

// const updateUrlToStore = function (id){
//   let currenturls = findById(id);
//   return Object.assign(currenturls, newUrls)
// }
//Delete bookmark on page
const findAndDelete = function (id) {
  this.items = this.items.filter(currenturls => currenturls.id !== id);
  
};

const setError = function (error){
  this.error = error;
};



export default {
  items,
  error,
  adding,
  showRating,
  // updateUrlToStore,
  addUrl,
  findById,
  findAndDelete,
  setError
};
