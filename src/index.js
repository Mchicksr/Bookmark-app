
import $ from 'jquery';
import './index.css';
import api from './api';
import bookmark from './bookmark';
import store from './store';



const main = function(){
    api.getSavedUrl()
    .then((items)=>{
        items.forEach((item)=>store.addUrl(item));
        bookmark.render();
    })
    bookmark.render()
   bookmark.bindEventListeners()

};

$(main);





