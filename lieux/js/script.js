
const {_fetchData} = require('./utils');
const {API_LINK} = require('./conf');

class Location{
    curent_page = 1;
    info = {};
    locations = [];
    constructor(){
      _fetchData(API_LINK.rick + "?page=" + this.curent_page)
        .then((locations) => {
            this.location = locations;
            console.log(locations)
        })
      }
      createLocations(){
        return  `<div class="locations_body">
                    <h1 class="locations_title">Rick And Morty</h1>
                    <span class="locations_count">Location (${this.info.count})</span>
                    <a href="${this.info.next}" class="locations_link" href="">Pages suivante</a>
                    <ul class="locations_list">
                    ${this.locations.forEach(location => {
                        this.createLocation(location)
                    })}
                    </ul>
                </div>`;
      }

      createLocation(location){
        return  `<li>
                    <a id="1" href="#" class="location_name">${location.name}</span>
                    <span class="location_dimension">${location.dimension}</span>
                </li>`;
      }
  }

  
  
  
  
  new Location();