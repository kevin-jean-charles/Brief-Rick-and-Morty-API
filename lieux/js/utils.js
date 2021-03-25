function _replaceClass(elem, prevClass, newClass){
  let str = prevClass;
  let strReGex = new RegExp(str,"gi");
  elem.className = elem.className.replace(strReGex, newClass);
}

function _fetchData(url){
  return fetch(url).then(function(response) {
      var contentType = response.headers.get("content-type");
      if(contentType && contentType.indexOf("application/json") !== -1) {
        return response.json();
      } else {
        console.log("Oops, nous n'avons pas du JSON!");
      }
  });
}


function _insertAfter(element, newElement) {
  element.parentNode.insertBefore(newElement, element.nextSibling);
}

module.exports = {
  _fetchData,
  _insertAfter,
  _replaceClass
}