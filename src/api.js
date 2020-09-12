//import { post } from "jquery";
//import { bookmarks } from 'bookmark'


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
  return listApiFetch(`${BASE_URL}`)
};

// function getUrl(){
//   return fetch(`${BASE_URL}/bookmarks`).then(function(myRequest){
//     return myRequest;
//   });
    
// }
// Formats API for Bookmark
async function createUrl(bookmarks) {
  let body = JSON.stringify(bookmarks)

  await fetch(`${BASE_URL}`, {
  method: 'POST',
  headers: {
    'Accept': 'application/json, text/plain, */*',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(bookmarks)
  }).then(res=> res.json()).then(res =>{ 
    bookmarks.id = res.id
    return res
  });
};

// const getItems = function () {
//   return listApiFetch(`${BASE_URL}/items`);
// };

//delete api bookmarks
const deleteItem =function (id) {
  // delete from the api
  fetch(`${BASE_URL}/${id}`,
  { method: 'delete' })
  .then(response =>  response.json())
  .then(json => json)

  // TODO: delete item from the bookmarks array id
  // loop through bookmarks and delete the one with the id
  /*
  let counter = 0
  for(let e of bookmarks)
    if(e.id === id)
      bookmarks.remove(counter)
  }
  */


  //remove bookmark in ui
  $(event.target).closest('.bookmarks').remove();


// TODO: Maybe try this, you don't need it but it might also work
//   return listApiFetch(`${BASE_URL}/${id}`, 
//    {
//     method:'DELETE'
//   });
//};
}




//update api bookmark
const updateUrl = function (id,update) {
  return listApiFetch(`${BASE_URL}/${id}`, {
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