//import { post } from "jquery";

import bookmark from "./bookmark";
//Api URL
const BASE_URL = 'https://thinkful-list-api.herokuapp.com/MichaelHR/bookmarks';
//Api catcher
const listApiFetch = function (...args) {
  let error;
  return fetch(...args)
    .then(res => {
      if (!res.ok) {
         
        error = { code: res.status };
  
          
        if (!res.headers.get('content-type').includes('json')) {
          error.message = res.statusText;
          return Promise.reject(error);
        }
      }
  
      return res.json();
    })
    .then(data => {
        
      if (error) {
        error.message = data.message;
        return Promise.reject(error);
      }
  
       
      return data;
    });
};

const getSavedUrl= function() {
  return listApiFetch(`${BASE_URL}/bookmarks`)
};

// function getUrl(){
//   return fetch(`${BASE_URL}/bookmarks`).then(function(myRequest){
//     return myRequest;
//   });
    
// }
// Formats API for Bookmark
function createUrl(name){
  let newItem = JSON.stringify({name})

  return listApiFetch(`${BASE_URL}/bookmarks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: newItem
  });

};
// const getItems = function () {
//   return listApiFetch(`${BASE_URL}/items`);
// };

//delete api bookmark
const deleteItem =function (id) {
  console.log(id,'123')
  return listApiFetch(BASE_URL + '/bookmarks/' + id, 
   {
    method:'DELETE'
  });
};
//update api bookmark
const updateUrl = function (id,update) {
  return listApiFetch(`${BASE_URL}/bookmarks/${id}`, {
    method: 'PATCH',
    headers: {'Content-Type': 'application/json',},
    body: JSON.stringify(update)
  });
};

export default {
  //getItems,
  getSavedUrl,
  createUrl,
  deleteItem,
  updateUrl,

  
};