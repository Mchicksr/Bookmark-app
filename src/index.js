
import $ from 'jquery';
import './index.css';
import api from './api';
import bookmark from './bookmark';
import store from './store';


const main = function(){
  api.getUrl()
    .then(res => res.json())
    .then((items) => {
      items.forEach((item) => store.addUrl(item));
      bookmark.render();
    });


  api.createUrl('www.link.com')
    .then(res => res.json())
    .then((newUrl) => {
      return api.getUrl();
    })
    .then(res => res.json())
    .then((items) => {
      console.log(items);
    });



  api.getUrl()
    .then(res => res.json())
    .then(res => console.log(res));
  
  console.log(api.BASE_URL);
};

$(main);