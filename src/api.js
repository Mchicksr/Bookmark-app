//import { post } from "jquery";


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

function createUrl(bookmarks){
  let body = JSON.stringify(bookmarks)


  fetch(`${BASE_URL}`, {
  method: 'POST',
  headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(bookmarks)
  }).then(res=>res.json()).then(res =>{ 
    bookmarks.id = res.id
    return bookmarks
  
  });

};




// const getItems = function () {
//   return listApiFetch(`${BASE_URL}/items`);
// };

//delete api bookmarks
const deleteItem =function (id) {
  //console.log('123',id)
  console.log("hey")
  fetch(`${BASE_URL}/${id}`,
  {    method: 'delete'  })
  .then(response =>  response.json()
  .then(json => 
    { console.log(json);
    })  
    );}
//   return listApiFetch(`${BASE_URL}/${id}`, 
//    {
//     method:'DELETE'
//   });
  
// };
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