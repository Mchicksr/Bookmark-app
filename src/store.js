import data from './data'

const urls = [];
let error = null;
let adding = false;
const showRating =1;
// let rank= [

// ]

const findById = function (id) {
  return this.items.find(currentItem => currentItem.id === id);
};

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

const findAndDelete = function (id) {
  this.urls = this.urls.filter(currenturls => currenturls.id !== id);
};

const setError = function (error){
  this.error = error;
};



export default {
  urls,
  error,
  adding,
  showRating,
  // updateUrlToStore,
  addUrl,
  findById,
  findAndDelete,
  setError
};
