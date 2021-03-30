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
})({"lieux_episode/js/utils.js":[function(require,module,exports) {
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
},{}],"lieux_episode/js/conf.js":[function(require,module,exports) {
var API_LINK = {
  location: "https://rickandmortyapi.com/api/location",
  episode: "https://rickandmortyapi.com/api/episode",
  locationByType: "https://rickandmortyapi.com/api/location?type="
};
module.exports = {
  API_LINK: API_LINK
};
},{}],"lieux_episode/js/lieux.js":[function(require,module,exports) {
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _require = require('./utils'),
    _fetchData = _require._fetchData,
    _replaceClass = _require._replaceClass,
    _autocomplete = _require._autocomplete,
    _types = _require._types;

var _require2 = require('./conf'),
    API_LINK = _require2.API_LINK;

var Location = /*#__PURE__*/function () {
  function Location() {
    var _this = this;

    _classCallCheck(this, Location);

    _defineProperty(this, "curent_page", 1);

    _defineProperty(this, "info", {});

    _defineProperty(this, "locations", []);

    _fetchData(API_LINK.location + "?page=" + this.curent_page).then(function (locations) {
      var locations_bg = document.querySelector('.app');
      var info = locations.info,
          results = locations.results;
      _this.locations = results;
      _this.info = info;
      locations_bg.innerHTML += _this.init();

      _autocomplete(document.getElementById("myInput"), _types);

      _this.createLocations(_this.locations);

      _this.searchByType();
    });
  }

  _createClass(Location, [{
    key: "init",
    value: function init() {
      return "<div class=\"app_body\">\n                    <span class=\"app_count\">Location (".concat(this.info.count, ")</span>\n                    <ul class=\"app_list\"></ul>\n                </div>");
    }
  }, {
    key: "createLocations",
    value: function createLocations(locations) {
      var _this2 = this;

      var locations_list = document.querySelector('.app_list');
      locations_list.innerHTML = "";
      locations.forEach(function (location) {
        var li = document.createElement('li');
        li.innerHTML += "<div class=\"app_card\">\n                                <div class=\"ribbon up\" style=\"--color: #8975b4;\">\n                                    <div class=\"content\">".concat(location.residents.length, "</div>\n                                </div>\n                                <div class=\"app_card_body\">\n                                    <span class=\"app_card_label\">").concat(location.type, "</span>\n                                    <a data-url=\"").concat(location.url, "\" href=\"#\" class=\"location_name\">").concat(location.name, "</a>\n                                    <span class=\"location_dimension\">").concat(location.dimension, "</span>\n                                </div>\n                                <div class=\"app_card_body_bg\"></div>\n                            </div>");
        li.querySelector('a').addEventListener('click', _this2.showDetails.bind(_this2));
        locations_list.append(li);
      });
      this.createPagintion();
    }
  }, {
    key: "createPagintion",
    value: function createPagintion() {
      var buttons = document.querySelector('.buttons');
      buttons.innerHTML = "";
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
      window.scrollTo(0, 0);
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
      var _this3 = this;

      if (e.target.dataset.url !== 'null') {
        _fetchData(e.target.dataset.url).then(function (locations) {
          var info = locations.info,
              results = locations.results;
          _this3.info = info;

          _this3.createLocations(results);
        });
      } else {
        e.target.setAttribute('disabled', true);
      }
    }
  }, {
    key: "showDetails",
    value: function showDetails(e) {
      var _this4 = this;

      e.preventDefault();

      _fetchData(e.currentTarget.dataset.url).then(function (location) {
        _this4.location = location;

        if (location.residents.length > 0) {
          Promise.all(_this4.location.residents.map(function (url) {
            return _fetchData(url);
          })).then(function (resp) {
            return Promise.all(resp.map(function (res) {
              return res;
            }));
          }).then(function (residents) {
            document.querySelector('.dataList').innerHTML = _this4.showLocationDetails(residents);
            document.body.classList.add('modal-active');
            document.querySelector('.close').addEventListener('click', function (e) {
              _replaceClass(e.target.parentNode, 'two', 'out');

              document.body.classList.remove('modal-active');
            });
          });
        }
      });
    }
  }, {
    key: "searchByType",
    value: function searchByType() {
      var _this5 = this;

      var button_search = document.querySelector('.search');
      button_search.addEventListener('click', function (e) {
        var input = e.target.previousElementSibling;

        _fetchData(API_LINK.locationByType + input.value).then(function (locations) {
          if (input.value.trim().length > 0) {
            _this5.createLocations(locations.results);

            input.value = "";
          } else {
            _this5.createLocations(_this5.locations);
          }
        });
      });
    }
  }, {
    key: "showLocationDetails",
    value: function showLocationDetails(residents) {
      var _this6 = this;

      var str = "<div id=\"modal-container\" class=\"two\">\n                        <a href=\"#\" class=\"close\"></a>\n                        <div class=\"modal-background\">\n                            <div class=\"modal\">";
      residents.forEach(function (resident) {
        str += _this6.locationDetail(resident);
      });
      str += "</div>\n                        </div>\n                    </div>";
      return str;
    }
  }, {
    key: "locationDetail",
    value: function locationDetail(resident) {
      return "<div class=\"locations_details\">\n                    <div class=\"card\">\n                        <div class=\"card-image\">\n                            <img src=\"".concat(resident.image, "\" alt=\"Orange\"/>\n                        </div>\n                        <div class=\"card-body\"> \n                            <div class=\"card-date\">\n                                <span>Type ").concat(resident.type, "</span>\n                            </div>     \n                            <div class=\"card-date\">\n                                <time>").concat(resident.created, "</time>\n                            </div>\n                            <div class=\"card-title\">\n                                <h3>").concat(resident.name, "</h3>\n                            </div>\n                            <div class=\"card-excerpt\">\n                                <p>").concat(this.location.dimension, "</p>\n                            </div>\n                        </div>\n                    </div>\n                </div>");
    }
  }, {
    key: "getLinksType",
    value: function getLinksType() {
      var links = [];

      for (var index = 0; index < 7; index++) {
        links.push(API_LINK.api + "?page=" + index);
      }

      return {
        links: links
      };
    }
  }, {
    key: "createAllType",
    value: function createAllType() {
      var listTypes = [];

      var _this$getLinksType = this.getLinksType(),
          links = _this$getLinksType.links;

      return Promise.all(links.map(function (url) {
        return fetch(url);
      })).then(function (resp) {
        return Promise.all(resp.map(function (res) {
          return res.json();
        }));
      }).then(function (locations) {
        locations.forEach(function (location) {
          location.results.forEach(function (res) {
            listTypes.push(res.type);
          });
        });
        return _toConsumableArray(new Set(listTypes));
      });
    }
  }]);

  return Location;
}();

new Location();
},{"./utils":"lieux_episode/js/utils.js","./conf":"lieux_episode/js/conf.js"}],"../../../../.nvm/versions/node/v14.10.1/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "56634" + '/');

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
},{}]},{},["../../../../.nvm/versions/node/v14.10.1/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","lieux_episode/js/lieux.js"], null)
//# sourceMappingURL=/lieux.0c581266.js.map