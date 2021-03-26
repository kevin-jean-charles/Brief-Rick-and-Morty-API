
const {_fetchData, _replaceClass, _autocomplete, _types} = require('./utils');
const {API_LINK} = require('./conf');

class Location{
    curent_page = 1;
    info = {};
    locations = [];
    location = {};
    constructor(){
        
    _fetchData(API_LINK.api + "?page=" + this.curent_page)
      .then((locations) => {
            let locations_bg = document.querySelector('.locations');
            const {info, results} = locations;
            this.locations = results;
            this.info = info;
            setTimeout(() => {
                locations_bg.innerHTML += this.init();
                _autocomplete(document.getElementById("myInput"), _types);
                this.createLocations(this.locations);
                this.searchByType();
            });
        });
    }

    init(){ 
        
        return `<div class="locations_body">
                    <h1 class="locations_title">Rick And Morty</h1>
                    <span class="locations_count">Location (${this.info.count})</span>
                    <a href="${this.info.next}" class="locations_link" href="">Pages suivante</a>
                    <ul class="locations_list"></ul>
                </div>`;
    }

    createLocations(locations){
        let locations_list = document.querySelector('.locations_list');
        locations_list.innerHTML = "";
        locations.forEach(location => {
            let li = document.createElement('li');
            li.innerHTML += `<li>
                                <div class="locations_card">
                                    <div class="locations_card_body">
                                        <span class="locations_card_label">${location.type}</span>
                                        <a data-url="${location.url}" href="#" class="location_name">${location.name}</a>
                                        <span class="location_dimension">${location.dimension}</span>
                                    </div>
                                </div>
                            </li>`;
            li.querySelector('a').addEventListener('click', this.showDetails.bind(this));
            locations_list.append(li);
    });
    }

    showDetails(e){
        e.preventDefault();   
        _fetchData(e.currentTarget.dataset.url)
        .then((location) => {
            this.location = location;
            if(location.residents.length > 0){
                Promise.all(this.location.residents.map(url => _fetchData(url)))
                .then(resp => Promise.all( resp.map(res => res)))
                .then(residents => {
                    document.querySelector('.dataList').innerHTML = this.showLocationDetails(residents);
                    document.body.classList.add('modal-active');
                    document.querySelector('.close').addEventListener('click', (e) => {
                        _replaceClass(e.target.parentNode, 'two', 'out');
                        document.body.classList.remove('modal-active')
                    });
                });
            }
        })  
    }

    searchByType(){
        let button_search = document.querySelector('.search');
        button_search.addEventListener('click', (e)  => {
            let input = e.target.previousElementSibling.querySelector('input');
            _fetchData(API_LINK.searchByType + input.value)
                .then((locations) => {
                     if(input.value.trim().length > 0){
                        this.createLocations(locations.results);
                        input.value = "";
                     }else{
                        this.createLocations(this.locations);
                    }
             });
        });
    }

    showLocationDetails(residents){
        let str =  `<div id="modal-container" class="two">
                        <a href="#" class="close"></a>
                        <div class="modal-background">
                            <div class="modal">`;
                                residents.forEach(resident => {
                                    str += this.locationDetail(resident);
                                });
            str +=          `</div>
                        </div>
                    </div>`;
        return str;
    }

    locationDetail(resident){
        return `<div class="locations_details">
                    <div class="card">
                        <div class="card-image">
                            <img src="${resident.image}" alt="Orange"/>
                        </div>
                        <div class="card-body"> 
                            <div class="card-date">
                                <span>Type ${resident.type}</span>
                            </div>     
                            <div class="card-date">
                                <time>${resident.created}</time>
                            </div>
                            <div class="card-title">
                                <h3>${resident.name}</h3>
                            </div>
                            <div class="card-excerpt">
                                <p>${this.location.dimension}</p>
                            </div>
                        </div>
                    </div>
                </div>`;
    }

    getLinksType() {
        let links = [];
        for (let index = 0; index < 7; index++) {
            links.push(API_LINK.api + "?page=" + index);
        }
        return { links };
    }

    createAllType() {
        let listTypes = [];
        let { links} = this.getLinksType();
        return Promise.all(links.map(url => fetch(url)))
                .then(resp => Promise.all(resp.map(res => res.json())))
                .then(locations => {
                    locations.forEach(location => {
                        location.results.forEach(res => {
                            listTypes.push(res.type);
                        });
                    });
                    return [...new Set(listTypes)];
                });
    }
  }

  new Location();

  