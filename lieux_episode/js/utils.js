const _types = ["Planet", "Cluster", "Space station", "Microverse", "TV", "Resort", "Fantasy town", "Dream", "Dimension", "unknown", "Menagerie", "Game", "Customs", "Daycare", "Dwarf planet (Celestial Dwarf)", "Miniverse", "Teenyverse", "Box", "Spacecraft", "Artificially generated world", "Machine", "Arcade", "Spa", "Quadrant", "Quasar", "Mount", "Liquid", "Convention", "Woods", "Diegesis", "Non-Diegetic Alternative Reality", "Nightmare", "Asteroid", "Acid Plant", "Reality", "Death Star", "Base"];
  

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

function _autocomplete(inp, arr) {
  var currentFocus;
  inp.addEventListener("input", function(e) {
      var autocomplete_list, 
      matchElement, i, val = this.value;

      closeAllLists();
      if (!val) { return false;}
      currentFocus = -1;
   
      autocomplete_list = document.createElement("div");
      autocomplete_list.setAttribute("id", this.id + "autocomplete-list");
      autocomplete_list.setAttribute("class", "autocomplete-items");

      this.parentNode.appendChild(autocomplete_list);

      for (i = 0; i < arr.length; i++) {
        if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
          matchElement = document.createElement("DIV");
          matchElement.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
          matchElement.innerHTML += arr[i].substr(val.length);
          matchElement.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
          matchElement.addEventListener("click", function(e) {
              inp.value = this.getElementsByTagName("input")[0].value;
              closeAllLists();
          });
          autocomplete_list.appendChild(matchElement);
        }
      }
  });

  inp.addEventListener("keydown", function(e) {
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
        currentFocus++;
        addActive(x);
      } else if (e.keyCode == 38) {
        currentFocus--;
        addActive(x);
      } else if (e.keyCode == 13) {

        e.preventDefault();
        if (currentFocus > -1) {
          if (x) x[currentFocus].click();
        }
      }
  });

  function addActive(x) {
    if (!x) return false;
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }

  document.addEventListener("click", function (e) {
      closeAllLists(e.target);
  });
}

module.exports = {
  _fetchData,
  _insertAfter,
  _replaceClass,
  _autocomplete,
  _types
}