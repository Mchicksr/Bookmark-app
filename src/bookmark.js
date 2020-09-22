import $ from 'jquery';
import store from './store';
import api from './api';
import data from './data';
window.$ = $;


/////////////////
// GenerateHTML//
////////////////


$('section').prepend(`
<header>
          <H1>Le Bookmark</H1>
        
      </header>
      <select name ='star' size='1'>
      <option value= "1 star"  >1 star</option> 
      <option value= "2 stars" >2 stars</option> 
      <option value= "3 stars" >3 stars</option> 
      <option value= "4 stars" >4 stars</option> 
      <option value= "5 stars" >5 stars</option>
  </select> 
<button id="clickMe">Add Bookmark</button>

`)

const generateMain = function () {


  return `
      
      <div id="myDIV">
      
      
      
      <nav>
         
            <div class="container">
          <form>
              <label for='url'>Create Bookmark Here!</label><br>
              <input type='text' id='title' name='title' placeholder="title" required /><br>
              <input type='text' id='url' name='url' placeholder="url" required/> <br>
              <textarea  id='description' name='description' placeholder="description" ></textarea><br>
              <button class ='new' type = 'submit' value="send" >New</button> 
          
             
          </form>
          </div>
      </nav>
      </div>
      `
};






//the Bookark
const generateBookmark = function (item) {
  // document.querySelector('section').innerHTML += 
  //console.log(item)
  return `<article class='bookmarks' data-item-id="${item.id}">
        <h2>${item.title}</h2>
        <p> <a href=${item.url}>${item.title}</a></p> 
        <p>${item.desc}</p>
        <p> ${item.rating} stars</p>
        <button class="delete" type="button" value=delete>Delete</button>
        <button class="update" type="button" value=update>Update</button>
        
        <button id="info">info</button>
        <div id="myinfo">
        <p> <a href=${item.url}>${item.url}</a></p>
      <p>hey<p>
      </div>
      </article>
      `

};




// const generateInfo = function () {
//   return `

// <button id="info">info</button>
//   <div id="myinfo">
// <p>hey<p>
// </div>
// </article>`
// }

///////////
// Render//
///////////

//Notes/////////////////////////////////////////
//this physically puts the the html on the page/
//also takes information for bookmark //////////
////////////////////////////////////////////////
const bookmarks = []

const render = function () {


  //$('main').html(generateMain())
  if (store.adding) {
    $('main').html(generateMain())
  } else {
    $('main').empty();
  }

  // $(".new").click(function () {
  //   console.log('reset')
  //   $("form").trigger("reset");
  // });

   $('.new').on('click', async function () {
    
    let apiValues = {}

    apiValues.id = $('#id').val()
    apiValues.title = $('#title').val()
    apiValues.url = $('#url').val()
    apiValues.desc = $('#description').val()
    apiValues.rating = $("select[name='star']").val()
    apiValues.rating = parseInt(apiValues.rating.charAt(0))

    await api.createUrl(apiValues)

    //console.log('api values 2', apiValues)
    bookmarks.push(apiValues)
    $('article').html(bookmarks.map(generateBookmark))

    

    $("form").trigger("reset");
    

  })

}


////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
//////////////////// eventlisteners/////////////////////////
//////////////////////////////////////////////////////////

//toggle to open the Header

if (store.adding) {
  $('#myinfo').html(generateBookmark())
} else {
  $('#myinfo').empty();
}


const toggleClass = function () {
  $('#info').click(() => {
    console.log('infooooo')
    store.toggleAddNewBookmark();
    render();
    
  })
 
 
  // $('article').on('click', '#info', event => {
  //   console.log('toggle clicked')
  //   let x = document.getElementById("myinfo")
  //   if (x.style.display === "none") {
  //     x.style.display = "block";
  //   } else {
  //     x.style.display = "none";
  //   }

  // })
}



const handleOpenBookmark = function () {
  $('#clickMe').click(() => {
    store.toggleAddNewBookmark();
    render();
    
  })

};

// attaches to bookmark ids
const getItemIdFromElement = function (item) {
  //console.log($(item).closest('.bookmarks').data('item-id'))
  return $(item)
    .closest('.bookmarks')
    .data('item-id');

};

//Delete bookmark
const handleDeleteItemClicked = function () {

  // like in `handleItemCheckClicked`, we use event delegation
  $('article').on('click', '.delete', event => {
    const id = getItemIdFromElement(event.currentTarget);

    // TODO: there is some kind of error here
    //console.log('the api', api)
    api.deleteItem(id)
      // .then(() => {
      //   store.findAndDelete(id);
      //   render();
      // })
      // .catch((error) => {
      //   console.log(error);
      //   store.setError(error.message);
      //   //renderError();
      // });
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
  bookmarks,
};


