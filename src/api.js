//import { post } from "jquery";

const BASE_URL = 'https://thinkful-list-api.herokuapp.com/Michael';

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

function getUrl(){
  return fetch(`${BASE_URL}/items`).then(function(myRequest){
    return myRequest;
  });
    
}

function createUrl(name){
  let newUrl = JSON.stringify({name: name});
  return fetch(`${BASE_URL}/items`,
    {
      method: 'post',
      headers: {'content-Type': 'application/json'},
      body: newUrl}
  ); 
}


const deleteItem = function (id) {
  return listApiFetch(BASE_URL + '/items/' + id, {
    method: 'DELETE'
  });
};

export default {
  getUrl,
  createUrl,
  deleteItem
};

