import React, { Component } from 'react';
import './App.css';
import { load_google_maps, load_sites, get_view } from './utility'
import Toolbar from './Toolbar'
import Sidebar from './components/Sidebar'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      query: '',
      venuesFiltered:[],
      sidebarOpen: false,
      markers: []
    }
  }
  componentDidMount() {
    let googleMapsPromise = load_google_maps();
    let sitesPromise = load_sites();
    Promise.all([ googleMapsPromise, sitesPromise ]).then(values => {
      let google = values[0];
      this.venues = values[1].response.venues;
      this.google = google;
      this.markers = [];
      this.infoWindows = [];
      this.infowindow = new google.maps.InfoWindow();
      this.map = new google.maps.Map(document.getElementById('map'),{
        zoom: 12,
        scrollwheel: true,
        center: { lat: this.venues[0].location.lat, lng: this.venues[0].location.lng }
      });
      this.venues.forEach(venue => {
        venue.image = get_view(venue.location.lat, venue.location.lng);
        let marker = new google.maps.Marker({
          position: {lat: venue.location.lat, lng: venue.location.lng },
          map: this.map,
          venue: venue,
          id: venue.id,
          name: venue.name,
          animation: google.maps.Animation.DROP,
          image: venue.image,
          address: venue.location.formattedAddress.join(', ')
        });
        let markerContent = `<div class="marker-content card p-1"><img width="100%" alt=${marker.name} src='${venue.image}'/><div class="card-body marker-info"><div class="card-title"><h3 class="medium-font">${marker.name}</h3><h5 class="font-weight-bold"></h5></div><div class="card-text"><p class="small-font">${marker.address}</p></div></div></div>`;

        marker.addListener('click', () => {
          if (marker.getAnimation() !== null) { marker.setAnimation(null); }
          else { marker.setAnimation(google.maps.Animation.BOUNCE); }
          setTimeout(() => {marker.setAnimation(null) }, 1500);
        });
        google.maps.event.addListener(marker, 'click', () => {
          
          this.infowindow.setContent(markerContent);
          this.map.setZoom(15);
          this.infowindow.open(this.map, marker);
          this.map.panBy(0, -125);
          this.map.setCenter(marker.position);
        });
        this.markers.push(marker);
        this.infoWindows.push({ name: venue.name, contents: markerContent, id: venue.id, });
      });
      this.setState({ venuesFiltered: this.venues, sidebarOpen: true })
    }).catch(error => {
      alert("Oops.. This page isn't loading so well right now")
    })
  }
  changeQuery = (query) => {
    let f = this.venues.filter(venue=> venue.name.toLowerCase().includes(query.toLowerCase()));
    this.markers.forEach(marker => {
      marker.name.toLowerCase().includes(query.toLowerCase())=== true ? 
      marker.setVisible(true) : marker.setVisible(false);
    });
    this.setState({ venuesFiltered: f, query, markers: this.markers });
  }
  toggleSideBar = () => {
      this.setState({
        sidebarOpen: !this.state.sidebarOpen
        
      });
    }

    card_click = (venue) => {
      let marker = this.markers.filter(mar => mar.venue.id === venue.id)[0];
      let info = this.infoWindows.filter(i => i.id === venue.id)[0];
      let markerContent = info && info.contents || "nope";
      if(marker && markerContent) {
        if (marker.getAnimation() !== null) { marker.setAnimation(null); }
         else { marker.setAnimation(this.google.maps.Animation.BOUNCE); }
         setTimeout(() => { marker.setAnimation(null) }, 1800);
          this.infowindow.setContent(markerContent);
          this.map.setZoom(15);
          this.map.setCenter(marker.position);
          this.infowindow.open(this.map, marker);
          this.map.panBy(0, -125);
          if(window.innerWidth < 769) {
            this.toggleSideBar();
        }
      }
    }
  

render() {

    return (
      <div>
      <main>
      <div  aria-label="Map"                    
      role="application" id="map">
      </div>
      <Toolbar tabIndex="1" close={this.toggleSideBar}/>
      </main>
      <aside>
        {this.state.sidebarOpen === true &&
        <Sidebar tabIndex="0" ard_click={this.card_click} venues={this.state.venuesFiltered} changeQuery={this.changeQuery} query={this.state.query}/>
        }
      </aside>
      </div>
      )
}
}

export default App;
