
import $ from 'jquery';
import './index.css';
import api from './api';
import bookmark from './bookmark';
import store from './store';



const main = function(){
    bookmark.render()
   bookmark.bindEventListeners()

};

$(main);





