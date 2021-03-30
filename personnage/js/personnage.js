const { _fetchData, _replaceClass } = require('./utils');
const { API_LINK } = require('./conf');

class Personnage {
  personnages = [];
  personnage = {};
  info = {};
  constructor() {
    _fetchData(API_LINK.personnages + "/?page=1")
      .then((personnages) => {
        const { results, info } = personnages
        this.info = info;
        this.personnages = results;
        this.createPersonnages(results);
        this.addEventRadionBtn();
        // console.log(this.personnages);
        
      });
  }

  
  createPagintion(){
    let buttons = document.querySelector('.buttons');
    buttons.innerHTML = "";
    console.log(buttons );
    let next = document.createElement('button');
    let prev = document.createElement('button');
    prev.className = "button button--red";
    prev.textContent = "<< Prcédent";
    prev.dataset.url = this.info.prev;
    this.info.prev === null ? prev.setAttribute('disabled', true) : ''; 
    prev.addEventListener('click', this.prev.bind(this))
    next.className = "button button--red";
    next.textContent = "Suivant >>";
    next.dataset.url = this.info.next;
    next.addEventListener('click', this.next.bind(this));
    buttons.appendChild(prev);
    buttons.appendChild(next);
}


prev(e){
  this.getDataPagination(e);
  window.scrollTo(0, -500);
}

next(e){
    this.getDataPagination(e);
    window.scrollTo(0, 0);
}

getDataPagination(e) {
    if(e.target.dataset.url !== 'null'){
        _fetchData(e.target.dataset.url)
        .then((locations) => {
            const {info, results} = locations;
            this.info = info;
            this.createPersonnages(results);
        });
    }else{ 
        e.target.setAttribute('disabled', true); 
    }
}

  addEventRadionBtn() {
    let radios = document.querySelectorAll(".radios input")
    console.log(radios);
    radios.forEach(radio => {
      radio.addEventListener("change", (event) => {
        let app_lists = document.querySelector(".app_lists");
        if (event.target.value != "all") {
          app_lists.innerHTML = "";
          _fetchData(API_LINK.personnages + "/?species=" + event.target.value)
          .then((personnages) => {
            const { results } = personnages
            this.createPersonnages(results);
            });
          } else{
            this.createPersonnages(this.personnages); 
          }
        })
    })
  }


  createPersonnages(episodes){
      let app_lists = document.querySelector(".app_lists");
      app_lists.innerHTML = "";
      episodes.forEach(personnage => {
        app_lists.innerHTML += this.createPersonnage(personnage)
      })


    console.log(this.personnages);
      app_lists.querySelectorAll(".face__name").forEach(name => {
        name.addEventListener("click", this.showCharacters.bind(this))
      });

    this.createPagintion()
    }

  showCharacters(event) {
      _fetchData(event.currentTarget.dataset.url)
      .then((personnage) => {
        this.personnage = personnage;
        console.log(this.personnage);
        Promise.all(this.personnage.episode.map(url => _fetchData(url)))
          .then(resp => Promise.all(resp.map(res => res)))
          .then(episodes => {
            document.querySelector(".app__modal").innerHTML = this.showEpisodeDetails(episodes, this.personnage);
            document.body.classList.add('modal-active');
            document.querySelector('.close').addEventListener('click', (e) => {
              _replaceClass(e.target.parentNode, 'two', 'out');
              document.body.classList.remove('modal-active')
            });
            console.log(episodes);

            // document.querySelector('.dataList').innerHTML = this.showLocationDetails(residents);

          });
      });
  }

  createPersonnage(personnage) {
    return `
  <div class="card">
    <div class="card__header">    
      <img src="${personnage.image}" alt=''>
      <h2 data-url="${personnage.url}" class="face__name">${personnage.name}</h2>
    </div>
    <div class="card_body">
      <p>Statut: ${personnage.status}</p>
      <p>Espèce: ${personnage.species}</p>
      <p>Nombre d'episode: ${personnage.episode.length}</p>
    </div>
  </div>
    `
  }


  // nom, status, espèce, type, genre, planète d'origine, dernier lieux de positionnement connu, les épisodes dans le(s)quel(s) le personnage apparait

  showEpisodeDetails(episodes) {

    let str = `<div id="modal-container" class="two">
                      <a href="#" class="close"></a>
                      <div class="modal-background">
                          <div class="modal">`;
    episodes.forEach(episode => {
      str += this.episodeDetail(episode);
    });
    str += `</div>
                      </div>
                  </div>`;
    return str;
  }

  episodeDetail(episode) {
    return `<div class="locations_details">
                  <div class="card">
                      <div class="card-body"> 
                          <div class="card-date">
                              <span>Date de création: ${episode.air_date}</span>
                          </div>     
                          <div class="card-title">
                              <h3>Episode: ${episode.name}</h3>
                          </div>
                      </div>
                  </div>
              </div>`;
  }
}

new Personnage();

