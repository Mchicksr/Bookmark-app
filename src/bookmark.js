import $ from 'jquery';

import store from './store';
import api from './api';

const generateItemElement = function (item) {
  let itemTitle = `<span class="link-item link-item__checked">${item.name}</span>`;
  if (!item.checked) {
    itemTitle = `
        <form class="js-edit-item">
          <input class="url-item" type="text" value="${item.name}" required />
        </form>
      `;
  }
  
  return `
      <li class="js-item-element" data-item-id="${item.id}">
        ${itemTitle}
        <div class="url-item-controls">
          <button class="url-item-toggle js-item-toggle">
            <span class="button-label">info</span>
          </button>
          <button class="url-item-delete js-item-delete">
            <span class="button-label">delete</span>
          </button>
        </div>
      </li>`;
};
const generateLinkItemsString = function (linkList) {
  const items = linkList.map((item) => generateItemElement(item));
  return items.join('');
};


const generateError = function (message) {
  return `
        <section class="error-content">
          <button id="cancel-error">X</button>
          <p>${message}</p>
        </section>
      `;
};

const renderError = function () {
  if (store.error) {
    const el = generateError(store.error);
    $('.error-container').html(el);
  } else {
    $('.error-container').empty();
  }
};

const render = function () {
  renderError();
  let items = [...store.urls];
  const BookmarkurlsString = generateLinkItemsString(items);
  $('main').html(BookmarkurlsString);
};

const getItemIdFromElement = function (item) {
  return $(item)
    .closest('.js-item-element')
    .data('item-id');
};


const handleNewItemSubmit = function () {
  $('url').submit(function (event) {
    event.preventDefault();
    const newItemName = $('.js-bookmark-entry').val();
    $('.js-bookmark-entry').val('');
    api.createUrl(newItemName)
      .then((newItem) => {
        store.addUrl(newItem);
        render();
      })
      .catch((error) => {
        store.setError(error.message);
        renderError();
      });
  });
};
const handleUrlSubmit = function(){
  $('form').on('click', '.new', event => {
    event.preventDefault();
    console.log('submit was clicked');
    const id = getItemIdFromElement(event.currentTarget);
    const newItemName = $('.js-bookmark-entry').val();
    $('.js-bookmark-entry').val('');
     
    api.createUrl(newItemName)
      .then((newItem) => {
        store.addUrl(newItem);
        render();
      })
          
      .catch((error) => {
        console.log(error);
        store.setError(error.message);
        renderError();
      });
  });
};


const handleDeleteItemClicked = function () {
  $('main').on('click', '.js-item-delete', event => {
    event.preventDefault();
    console.log('delete was clicked');
    const id = getItemIdFromElement(event.currentTarget);
 
    api.deleteItem(id)
      .then(() => {
        store.findAndDelete(id);
        render();
      })
      
      .catch((error) => {
        console.log(error);
        store.setError(error.message);
        renderError();
      });
  });
};
  
const bindEventListeners = function () {
  handleDeleteItemClicked();
  handleNewItemSubmit();
  handleUrlSubmit();
};
$(bindEventListeners);
export default{
  render,
  bindEventListeners,
  
};