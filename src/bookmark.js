import $ from 'jquery';
import store from './store';
import api from './api';
import data from './data';
window.$ = $;


/////////////////
// GenerateHTML//
////////////////

//Html for the inputs and cover
const generateMain = function () {
  
  
  return `
  
      <header>
          <H1>Le Bookmark</H1>
      </header>
      <select name ='star' size='1'>
      <option value= "1 star" size="1">1 star</option> 
      <option value= "2 stars" size="1">2 stars</option> 
      <option value= "3 stars" size="1">3 stars</option> 
      <option value= "4 stars" size="1">4 stars</option> 
      <option value= "5 stars" size="1">5 stars</option>
  </select> 
      
      <button id="clickMe">Add Bookmark</button>
      <div id="myDIV">
      
      
      
      <nav>
         
            <div class="container">
          <form>
              <label for='url'>Create Bookmark Here!</label><br>
              <input type='text' id='title' name=title placeholder="title" value="" required><br>
              <input type='text' id='url' name='url' placeholder="url" required></input><br>
              <textarea type='text' id='description' name='description' placeholder="description"></textarea><br>
              <button class ='new' type = 'button' value="send" >New</button> 
          
             
          </form>
          </div>
      </nav>
      </div>
      </div>
      `
};
//the Bookark
const generateBookmark = function (item) {
  // document.querySelector('section').innerHTML += 
  return `<article class='bookmark' data-item-id="${item.id}">
        <h2>${item.title}</h2>
        <p> <a href=${item.url}>${item.title}</a></p> 
        <p>${item.desc}</p>
        <p> ${item.stars}</p>
        <button class="delete" type="button" value=delete>Delete</button>
        <button class="update" type="button" value=update>Update</button>
        

        <button id="info">info</button>
      <div id="myinfo">
      <p>hey<p>
      </div>
      </article>
    
      `
      
};

///////////
// Render//
///////////

//Notes/////////////////////////////////////////
//this physically puts the the html on the page/
//also takes information for bookmark //////////
////////////////////////////////////////////////
const bookmarks = []
const render = function () {


  $('main').html(generateMain())


  
  $('.new').on('click', function () {
    

    let inputData = {}
    let apiValues = {}
 
    // inputData.id = $('#id').val()
    console.log(inputData)
    inputData.title = $('#title').val()
    inputData.url = $('#url').val()
    inputData.desc = $('#description').val()
    inputData.stars =  $("select[name='star']").val()

    apiValues.title = $('#title').val()
    apiValues.url = $('#url').val()
    apiValues.desc = $('#description').val()
    apiValues.stars =  $("select[name='star']").val()
    
    apiValues.stars=parseInt(apiValues.stars.charAt(0))
    console.log(apiValues.stars)
     let response = api.createUrl(apiValues)
     console.log(response)
    bookmarks.push(inputData)
    $('article').html(bookmarks.map(generateBookmark))
    
  })
 
}

////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
//////////////////// eventlisteners/////////////////////////
//////////////////////////////////////////////////////////

//toggle to open the Header

const toggleClass = function () {
  
  document.getElementById('info').addEventListener('click',
  function (){
    console.log('toggle clicked')
  let x = document.getElementById("myinfo") 
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
  })
}

const handleOpenBookmark = function () {
  document.getElementById('clickMe').addEventListener('click',
  function (){
  let x = document.getElementById("myDIV")
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
  })
};





// attaches to bookmark ids
const getItemIdFromElement = function (items) {
  return $(items)
    .closest('.bookmark')
    .data('item-id');
    
};

//Delete bookmark
const handleDeleteItemClicked = function () {
  
  // like in `handleItemCheckClicked`, we use event delegation

  $('article').on('click', '.delete', event => {
    const id = getItemIdFromElement(event.currentTarget);
    api.deleteItem(id)
    console.log(id)
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



//place all eventhandlers
const bindEventListeners = function () {
  handleOpenBookmark();
  handleDeleteItemClicked();
  toggleClass();
 };
 //$(bindEventListeners);

export default {
  render,
  bindEventListeners,
  
};



//////////
//Tester//
//////////
// const generateItemElement = function (item) {
//   let itemTitle = `<span class="link-item link-item__checked">${item.name}</span>`;
//   if (!item.checked) {
//     console.log('this', item)

//     itemTitle = `
        
//         <form class="js-edit-item">
//           <input class="url-item" type="text" value="${item.name}" required />

//         </form>
//       `;
//   }

//   return `
//     <li class="js-item-element" data-item-id="${item.id}">
//         ${itemTitle}
//         <div class="url-item-controls">
//           <button class="url-item-toggle js-item-toggle">
//             <span class="button-label">info</span>
//           </button>
//           <button class="url-item-delete js-item-delete">
//             <span class="button-label">delete</span>
//           </button>
//         </div>
//       </li>`;
// };



// const generateLinkItemsString = function (linkList) {
//   const items = linkList.map((item) => generateBookmark(item));
//   return items.join('');
// };

// const render2 = function () {
//   renderError();
//   let items = [...store.urls];
//   const BookmarkurlsString = generateLinkItemsString(items);
//   $('main').html(BookmarkurlsString);
// };

// const renderError = function () {
//   if (store.error) {
//     const el = generateError(store.error);
//     $('.error-container').html(el);
//   } else {
//     $('.error-container').empty();
//   }
// };
// const generateError = function (message) {
//   return `
//         <section class="error-content">
//           <button id="cancel-error">X</button>
//           <p>${message}</p>
//         </section>
//       `;
// };

// const handleNewItemSubmit = function () {
//   $('main').on('submit', function (event) {
//     event.preventDefault();
//     const newItemName = $('.js-bookmark-entry').val();
//     $('.js-bookmark-entry').val('');
//     api.createUrl(newItemName)
//       .then((newItem) => {
//         store.addUrl(newItem);
//         render();
//       })
//       .catch((error) => {
//         store.setError(error.message);
//         //renderError();
//       });
//   });
// };

// const generateLinkItemsString = function (linkList) {
//   const items = linkList.map((item) => generateBookmark(item));
//   return items.join('');
// };

// const handleInput = function () {
//   let dataInput = {}
//   dataInput.title = document.querySelector('#title').value
//   console.log(dataInput.title)
// }
