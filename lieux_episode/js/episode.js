
const {_fetchData, _replaceClass, _autocomplete, _types} = require('./utils');
const {API_LINK} = require('./conf');

class Episode{
    curent_page = 1;
    info = {};
    episodes = [];
    constructor(){
    _fetchData(API_LINK.api + "?page=" + this.curent_page)
      .then((episodes) => {
            let episodes_bg = document.querySelector('.episodes');
            const {info, results} = episodes;
            this.episodes = results;
            this.info = info;
           // episodes_bg.innerHTML += this.init();
           // _autocomplete(document.getElementById("myInput"), _types);
           // this.createEpisodes(this.episodes);
           // this.searchByType();
        });
    }

}