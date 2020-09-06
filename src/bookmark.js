import $ from 'jquery';
import store from './store';
import api from './api';
import data from './data';
window.$ = $;
/////////////////
// GenerateHTML//
////////////////
const generateItemElement = function (item) {
  let itemTitle = `<span class="link-item link-item__checked">${item.name}</span>`;
  if (!item.checked) {
    console.log('this', item)

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


const generateMain = function () {
  let bookMarkStart = `
  <div><h3 class="BookmarkTitle">${data.title}</h3>
  </div>`;
  bookMarkStart = `<h3><id= "input-titleEdit" type="text" value="$(bookmark.title)">
  <span class="inline-edit done"><i class="fas fa-pencil-alt"</span></h3>>
  `


  let urlDesc = "";
  if (data.desc !== '')
    urlDesc = `<p>${data.desc}</p>`
  return `
      <div id=‘${data.id}’ class="bookmark detail">
      <div class="Main-title">
        ${bookMarkStart}
      <header>
          <H1>Bookmark</H1>
      </header>
      <nav>
          <h2>New</h2>
          <h2>options</h2>
            <div class="container">
          <form>
              <label for='url'>Paste your url here</label><br>
              <input type='text' id='title' name=title placeholder="title" value="" required><br>
              <input type='text' id='url' name='url' placeholder="url" required></input><br>
              <input type='textarea' id='description' name='description' placeholder="description">
              <button id ="new" type = 'button' value="send" class ='new'>New</button> 
          
              <select name ='star' size='1'>
                  <option value= "1 star" size="1">1 star</option> 
                  <option value= "2 star" size="1">2 star</option> 
                  <option value= "3 star" size="1">3 star</option> 
                  <option value= "4 star" size="1">4 star</option> 
                  <option value= "5 star" size="1">5 star</option>
              </select> 
          </form>
          </div>
      </nav>
      </div>
      `
};

const generateBookmark = function (item) {
  return `
  <article class='bookmark'>
            <h2>${item.title}</h2>
            <p> <a href=${item.url}>${item.url}</a></p> 
            <p>${item.desc}</p>
            <p> ${item.rating}stars</p>
        </article>`
};
//////////
//Tester//
//////////

const generateLinkItemsString = function (linkList) {
  const items = linkList.map((item) => generateItemElement(item));
  return items.join('');
};

const render2 = function () {
  renderError();
  let items = [...store.urls];
  const BookmarkurlsString = generateLinkItemsString(items);
  $('main').html(BookmarkurlsString);
};

const renderError = function () {
  if (store.error) {
    const el = generateError(store.error);
    $('.error-container').html(el);
  } else {
    $('.error-container').empty();
  }
};
const generateError = function (message) {
  return `
        <section class="error-content">
          <button id="cancel-error">X</button>
          <p>${message}</p>
        </section>
      `;
};



///////////
// Render//
///////////
const render = function () {

  $('main').html(generateMain())

  $('.new').on('click', function () {
    let inputData = {}
    inputData.title = $('#title').val()
    inputData.url = $('#url').val()
    inputData.desc = $('#description').val()
    //inputData.ratings=document.querySelector('select[type='name']'.value)
    api.createUrl(inputData)
    .then(function (bookmark){
      const html = generateBookmark(bookmark);
      $('main').html(html)
    })
    
    // alert('clicked')
  })


}

// const renderbookmark = function () {

//   $('main').append(generateBookmark())
// }






const handleInput = function () {
  let dataInput = {}
  dataInput.title = document.querySelector('#title').value
  console.log(dataInput.title)
}

///////////////////
// eventlisteners//
///////////////////

const handleNewItemSubmit = function () {
  $('main').on('submit', function (event) {
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
        //renderError();
      });
  });
};



const bindEventListeners = function () {
  // handleDeleteItemClicked();
  handleNewItemSubmit();
  // handleUrlSubmit();
  // handleCreate();
  //generateItemElement();
  //generateMain()
  //HandleNewButton();
  //handleInput()
  //SubmitBookmark()
};
$(bindEventListeners);

export default {
  render2,
  //renderbookmark,
  render,
  //renderbookmark,
  bindEventListeners,
  //generateMain,
  //generateBookmark,


};
