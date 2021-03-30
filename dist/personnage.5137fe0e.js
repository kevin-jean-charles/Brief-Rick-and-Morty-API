// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"personnage/js/utils.js":[function(require,module,exports) {
var _types = ["Planet", "Cluster", "Space station", "Microverse", "TV", "Resort", "Fantasy town", "Dream", "Dimension", "unknown", "Menagerie", "Game", "Customs", "Daycare", "Dwarf planet (Celestial Dwarf)", "Miniverse", "Teenyverse", "Box", "Spacecraft", "Artificially generated world", "Machine", "Arcade", "Spa", "Quadrant", "Quasar", "Mount", "Liquid", "Convention", "Woods", "Diegesis", "Non-Diegetic Alternative Reality", "Nightmare", "Asteroid", "Acid Plant", "Reality", "Death Star", "Base"];

function _replaceClass(elem, prevClass, newClass) {
  var str = prevClass;
  var strReGex = new RegExp(str, "gi");
  elem.className = elem.className.replace(strReGex, newClass);
}

function _fetchData(url) {
  return fetch(url).then(function (response) {
    var contentType = response.headers.get("content-type");

    if (contentType && contentType.indexOf("application/json") !== -1) {
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
  inp.addEventListener("input", function (e) {
    var autocomplete_list,
        matchElement,
        i,
        val = this.value;
    closeAllLists();

    if (!val) {
      return false;
    }

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
        matchElement.addEventListener("click", function (e) {
          inp.value = this.getElementsByTagName("input")[0].value;
          closeAllLists();
        });
        autocomplete_list.appendChild(matchElement);
      }
    }
  });
  inp.addEventListener("keydown", function (e) {
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
    if (currentFocus < 0) currentFocus = x.length - 1;
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
  _fetchData: _fetchData,
  _insertAfter: _insertAfter,
  _replaceClass: _replaceClass,
  _autocomplete: _autocomplete,
  _types: _types
};
},{}],"personnage/js/conf.js":[function(require,module,exports) {
var API_LINK = {
  location: "https://rickandmortyapi.com/api/location",
  episode: "https://rickandmortyapi.com/api/episode",
  locationByType: "https://rickandmortyapi.com/api/location?type=",
  personnages: "https://rickandmortyapi.com/api/character"
};
module.exports = {
  API_LINK: API_LINK
};
},{}],"personnage/js/personnage.js":[function(require,module,exports) {
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _require = require('./utils'),
    _fetchData = _require._fetchData,
    _replaceClass = _require._replaceClass;

var _require2 = require('./conf'),
    API_LINK = _require2.API_LINK;

var Personnage = /*#__PURE__*/function () {
  function Personnage() {
    var _this = this;

    _classCallCheck(this, Personnage);

    _defineProperty(this, "personnages", []);

    _defineProperty(this, "personnage", {});

    _defineProperty(this, "info", {});

    _fetchData(API_LINK.personnages + "/?page=1").then(function (personnages) {
      var results = personnages.results,
          info = personnages.info;
      _this.info = info;
      _this.personnages = results;

      _this.createPersonnages(results);

      _this.addEventRadionBtn(); // console.log(this.personnages);

    });
  }

  _createClass(Personnage, [{
    key: "createPagintion",
    value: function createPagintion() {
      var buttons = document.querySelector('.buttons');
      buttons.innerHTML = "";
      console.log(buttons);
      var next = document.createElement('button');
      var prev = document.createElement('button');
      prev.className = "button button--red";
      prev.textContent = "<< Prcédent";
      prev.dataset.url = this.info.prev;
      this.info.prev === null ? prev.setAttribute('disabled', true) : '';
      prev.addEventListener('click', this.prev.bind(this));
      next.className = "button button--red";
      next.textContent = "Suivant >>";
      next.dataset.url = this.info.next;
      next.addEventListener('click', this.next.bind(this));
      buttons.appendChild(prev);
      buttons.appendChild(next);
    }
  }, {
    key: "prev",
    value: function prev(e) {
      this.getDataPagination(e);
      window.scrollTo(0, -500);
    }
  }, {
    key: "next",
    value: function next(e) {
      this.getDataPagination(e);
      window.scrollTo(0, 0);
    }
  }, {
    key: "getDataPagination",
    value: function getDataPagination(e) {
      var _this2 = this;

      if (e.target.dataset.url !== 'null') {
        _fetchData(e.target.dataset.url).then(function (locations) {
          var info = locations.info,
              results = locations.results;
          _this2.info = info;

          _this2.createPersonnages(results);
        });
      } else {
        e.target.setAttribute('disabled', true);
      }
    }
  }, {
    key: "addEventRadionBtn",
    value: function addEventRadionBtn() {
      var _this3 = this;

      var radios = document.querySelectorAll(".radios input");
      radios.forEach(function (radio) {
        radio.addEventListener("change", function (event) {
          var app_lists = document.querySelector(".app_lists");

          if (event.target.value != "all") {
            app_lists.innerHTML = "";

            _fetchData(API_LINK.personnages + "/?species=" + event.target.value).then(function (personnages) {
              var results = personnages.results;

              _this3.createPersonnages(results);
            });
          } else {
            _this3.createPersonnages(_this3.personnages);
          }
        });
      });
    }
  }, {
    key: "createPersonnages",
    value: function createPersonnages(episodes) {
      var _this4 = this;

      var app_lists = document.querySelector(".app_lists");
      app_lists.innerHTML = "";
      episodes.forEach(function (personnage) {
        app_lists.innerHTML += _this4.createPersonnage(personnage);
      });
      console.log(this.personnages);
      app_lists.querySelectorAll(".face__name").forEach(function (name) {
        name.addEventListener("click", _this4.showCharacters.bind(_this4));
      });
      this.createPagintion();
    }
  }, {
    key: "showCharacters",
    value: function showCharacters(event) {
      var _this5 = this;

      _fetchData(event.currentTarget.dataset.url).then(function (personnage) {
        _this5.personnage = personnage;
        console.log(_this5.personnage);
        Promise.all(_this5.personnage.episode.map(function (url) {
          return _fetchData(url);
        })).then(function (resp) {
          return Promise.all(resp.map(function (res) {
            return res;
          }));
        }).then(function (episodes) {
          document.querySelector(".app__modal").innerHTML = _this5.showEpisodeDetails(episodes, _this5.personnage);
          document.body.classList.add('modal-active');
          document.querySelector('.close').addEventListener('click', function (e) {
            _replaceClass(e.target.parentNode, 'two', 'out');

            document.body.classList.remove('modal-active');
          });
          console.log(episodes); // document.querySelector('.dataList').innerHTML = this.showLocationDetails(residents);
        });
      });
    }
  }, {
    key: "createPersonnage",
    value: function createPersonnage(personnage) {
      return "\n  <div class=\"card\">\n    <div class=\"card__header\">    \n      <img src=\"".concat(personnage.image, "\" alt=''>\n      <h2 data-url=\"").concat(personnage.url, "\" class=\"face__name\">").concat(personnage.name, "</h2>\n      <h4>&dash; Bonn &dash;</h4>\n    </div>\n    <div class=\"card_body\">\n      <p> ").concat(personnage.name, "</p>\n      <p>Statut: ").concat(personnage.status, "</p>\n      <p>Esp\xE8ce: ").concat(personnage.species, "</p>\n      <p>Nombre d'episode: ").concat(personnage.episode.length, "</p>\n    </div>\n  </div>\n    ");
    } // nom, status, espèce, type, genre, planète d'origine, dernier lieux de positionnement connu, les épisodes dans le(s)quel(s) le personnage apparait

  }, {
    key: "showEpisodeDetails",
    value: function showEpisodeDetails(episodes) {
      var _this6 = this;

      var str = "<div id=\"modal-container\" class=\"two\">\n                      <a href=\"#\" class=\"close\"></a>\n                      <div class=\"modal-background\">\n                          <div class=\"modal\">";
      episodes.forEach(function (episode) {
        str += _this6.episodeDetail(episode);
      });
      str += "</div>\n                      </div>\n                  </div>";
      return str;
    }
  }, {
    key: "episodeDetail",
    value: function episodeDetail(episode) {
      return "<div class=\"locations_details\">\n                  <div class=\"card\">\n                      <div class=\"card-body\"> \n                          <div class=\"card-date\">\n                              <span>Date de cr\xE9ation: ".concat(episode.air_date, "</span>\n                          </div>     \n                          <div class=\"card-title\">\n                              <h3>Episode: ").concat(episode.name, "</h3>\n                          </div>\n                      </div>\n                  </div>\n              </div>");
    }
  }]);

  return Personnage;
}();

new Personnage();
},{"./utils":"personnage/js/utils.js","./conf":"personnage/js/conf.js"}],"../../../../.nvm/versions/node/v14.10.1/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "64307" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../.nvm/versions/node/v14.10.1/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","personnage/js/personnage.js"], null)
//# sourceMappingURL=/personnage.5137fe0e.js.map