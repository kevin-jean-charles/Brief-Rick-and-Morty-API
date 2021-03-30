const {_fetchData, _replaceClass, _autocomplete, _types} = require('./utils');
const {API_LINK} = require('./conf');

class Episode{
    info = {};
    episodes = [];
    characters = [];
    saisonsFilters = ["S01", "S02", "S03", "S04"];
    constructor(){
    _fetchData(API_LINK.episode + "/" + Array.from({length: 41}, (v, k) => k + 1))
      .then((episodes) => {
            this.episodes = episodes;
            this.createSectionEpisodes(); 
            this.addEventRadioButtons();
        });
    }

    closeNav(){
        let closeNav = document.querySelector('.closebtn');
        let overlay_content = document.querySelector('.overlay-content');
        closeNav.addEventListener('click', function(e){

            overlay_content.innerHTML= "";
            document.getElementById("myNav").style.width = "0%";
        });
    }

    addEventRadioButtons(){
        let radios = document.querySelectorAll('.radios input');
        radios.forEach(radio => {
            radio.addEventListener('change', (event) => {
                let app_list = document.querySelector('.app_lists');
                app_list.innerHTML = "";
                let number_saison = parseInt(event.target.value.replace(/\D/g, ''));
                if(event.target.value !== "all"){
                    let saisons = this.episodes.filter(saison => saison.episode.indexOf(event.target.value) > -1);
                    app_list.appendChild(
                        this.createHeaderWithEpisodes(saisons, number_saison)
                    );
                }else{ this.createSectionEpisodes(); }
            });
        });
    }

    createSectionEpisodes(){
        let app_lists = document.querySelector('.app_lists');
        this.saisonsFilters.forEach((saisonFilter, index) => {
            let episodes = this.episodes.filter(episode => episode.episode.indexOf(saisonFilter) > -1);
            app_lists.appendChild(
                this.createHeaderWithEpisodes(episodes, index + 1)
            );
        });
    }

    createEpisodes(episodes){
       let ul = document.createElement('ul');
       ul.className = "app_list";
       episodes.forEach(episode => {
            let li = document.createElement('li');
            li.innerHTML += `<div class="app_card">
                                <div class="ribbon up" style="--color: #8975b4;">
                                    <div class="content">${episode.characters.length}</div>
                                </div>
                                <div class="app_card_body">
                                    <span class="app_card_label">${episode.episode}</span>
                                    <a data-url="${episode.url}" href="#" class="episode_name">${episode.name}</a>
                                    <span class="episode_air_date">${episode.air_date}</span>
                                </div>
                                <div class="app_card_body_bg"></div>
                            </div>`;
            li.querySelector('a').addEventListener('click', this.showDetails.bind(this));
            ul.append(li);
        });
       return ul;
    }

    showDetails(e){
        e.preventDefault();
        _fetchData(e.target.dataset.url)
        .then((episode) => {
            Promise.all(episode.characters.map(url => _fetchData(url)))
            .then(resp => Promise.all( resp.map(res => res)))
            .then(characteres => {
               this.characters = characteres;
               this.createCharacters();
               let cpt = 0;
               document.getElementById("myNav").style.width = "100%";
               let decks = document.querySelectorAll(".overlay-content .deck");
               decks.forEach((elem, index) => {
                    setTimeout(function(){
                        let deck = decks[index];
                        deck.classList.add('is-showing');
                        deck.querySelector('.card').classList.add('active');
                    }, 200 * (index+1));
                    cpt++;
                });
                if(cpt == decks.length){
                    this.closeNav();
                }
            });
         });
    }

    createCharacters(){
        let overlay_content = document.querySelector('.overlay-content');
        overlay_content.innerHTML= "";
        this.characters.forEach(character => {
            overlay_content.innerHTML += this.createCharacter(character);
        });
    }

    createCharacter(character){
        return `<div class="deck">
                    <div class="card hovercard">
                        <div class="front face">
                            <h2>Rick and Morty</h2>
                            <div class="bottext">
                        </div>
                    </div>
                    <div class="back face">
                        <h2>${character.name}</h2>
                        <ul>
                            <li><img src="${character.image}"/></li>
                            <li>Genre: ${character.gender}</li>
                            <li>Èspèce: ${character.species}</li>
                            <li>Status: ${character.status}</li>
                        </ul>
                        <div class="botprice">
                            <h3>Type: ${character.type !== "" ? character.type : "Unknown"}</h3>
                        </div>
                    </div>
                    </div>
                </div>`;
    }

    createHeaderWithEpisodes(episodes, i){
        let div = document.createElement("div");
        let h2 = document.createElement("h2");
        h2.className = "episode_section"
        h2.textContent = "Saison : " + i;
        div.appendChild(h2);
        div.appendChild(this.createEpisodes(episodes));
        return div;
    }
}

new Episode();