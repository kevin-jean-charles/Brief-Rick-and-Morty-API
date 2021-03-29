const {_fetchData, _replaceClass, _autocomplete, _types} = require('./utils');
const {API_LINK} = require('./conf');

class Episode{
    curent_page = 1;
    info = {};
    episodes = [];
    characters = [];
    constructor(){

        
    _fetchData(API_LINK.episode + "/" + Array.from({length: 41}, (v, k) => k + 1))
      .then((episodes) => {
            this.episodes = episodes;
            this.saisonsFilters = ["S01", "S02", "S03", "S04"];
            this.createSectionEpisodes(); 
            this.addEventRadioButton();
            this.closeNav();
        });
    }

    closeNav(){
        let closeNav = document.querySelector('.closebtn');
        closeNav.addEventListener('click', function(e){
            document.getElementById("myNav").style.width = "0%";
        });
    }

    addEventRadioButton(){
        let radios = document.querySelectorAll('.radios input');
        radios.forEach(radio => {
            radio.addEventListener('change', (event) => {
                let app_list = document.querySelector('.app_lists');
                app_list.innerHTML = "";
                let number_saison = parseInt(event.target.value.replace(/\D/g, ''));
                if(event.target.value !== "all"){
                    let saisons = this.episodes.filter(saison => saison.episode.indexOf(event.target.value) > -1);
                    app_list.appendChild(
                        this.createHeaderHeaderWithEpisodes(saisons, number_saison)
                    );
                }else{ this.createSectionEpisodes(); }
            });
        });
    }

    createSectionEpisodes(){
        let app_list = document.querySelector('.app_lists');
        this.saisonsFilters.forEach((saisonFilter, index) => {
            let episodes = this.episodes.filter(saison => saison.episode.indexOf(saisonFilter) > -1);
            app_list.appendChild(
                this.createHeaderWithEpisodes(episodes, index + 1)
            );
        });
    }

    createEpisodes(saisons){
       let ul = document.createElement('ul');
       ul.className = "app_list";
       saisons.forEach(episode => {
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
            if(episode.characters.length > 0){
                Promise.all(episode.characters.map(url => _fetchData(url)))
                .then(resp => Promise.all( resp.map(res => res)))
                .then(characteres => {
                    this.characters = characteres;
                   console.log(characteres)

                //    $(elem + ' figure').each(function(i){
                //     setTimeout(function(){
                //         $(elem + ' figure').eq(i).addClass('is-showing');
                //     }, 150 * (i+1));
                // });
                   document.getElementById("myNav").style.width = "100%";
                });
            }
         });
    }

    createCharacters(){
        this.characters

    }

    createCharacter(character){
        return `<div class="deck">
                    <div class="card hovercard">
                    <div class="front face">
                        <h2>Hover</h2>
                        <div class="bottext">
                        <h3>6000kr</h3>
                        </div>
                    </div>
                    <div class="back face">
                        <h2>Basic</h2>
                        <ul>
                        <li>6 Sider</li>
                        <li>Kontaktside</li>
                        <li>SEO optimeret</li>
                        <li>Mobilvenlig</li>
                        </ul>
                        <div class="botprice">
                        <h3>6000kr</h3>
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