//import { post } from "jquery";

import bookmark from "./bookmark";

const BASE_URL = 'https://thinkful-list-api.herokuapp.com/Michael/bookmarks';

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
const makeBody = (bookmark) => {
  return {
    "title": bookmark.title,
    "url":bookmark.url,
    "desc":bookmark.desc,
    "rating":bookmark.rating,
  };
};

function createUrl(bookmark){
  let body = JSON.stringify(bookmark)


  fetch(`${BASE_URL}`, {
  method: 'post',
  headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(bookmark)
  }).then(res=>res.json()).then(res => console.log(res));

  /*
  return listApiFetch(`${BASE_URL}`,
    {
      method: 'POST',
      headers: {'content-Type': 'application/json'},
      body: body
    });
  */
};

const deleteItem =function (id) {
  return listApiFetch(`${BASE_URL}/bookmarks/${id}`, {
    method:'Delete'
  });
};

const updateUrl = function (id,update) {
  return listApiFetch(`${BASE_URL}/bookmarks/${id}`, {
    method: 'PATCH',
    headers: {'Content-Type': 'application/json',},
    body: JSON.stringify(update)
  });
};

export default {
  //getUrl,
  getSavedUrl,
  createUrl,
  deleteItem,
  updateUrl,

  
};