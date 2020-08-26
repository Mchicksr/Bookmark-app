const urls = [];
let error = null;
let hideCheckeditems = false;

const findById = function (id) {
  return this.items.find(currentItem => currentItem.id === id);
};

const addUrl = function (url) {
  this.urls.push(url);
};

const findAndDelete = function (id) {
  this.urls = this.urls.filter(currenturls => currenturls.id !== id);
};




export default {
  urls,
  error,
  hideCheckeditems,
  addUrl,
  findById,
  findAndDelete
};
