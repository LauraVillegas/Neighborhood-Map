
export function load_google_maps() {
    return new Promise(function(resolve, reject) {
      window.resolveGoogleMapsPromise = function() {
        resolve(window.google);
        delete window.resolveGoogleMapsPromise;
      }
      window.gm_authFailure = function () {
        alert('Google maps API Failed to load, please check');
      };
      // Now, Load the Google Maps API
      const script = document.createElement("script");
      const API_KEY = 'AIzaSyDXBoXO0kTzybJGECtKZJoBqPfYld_8SUk';
      script.src = `https://maps.googleapis.com/maps/api/js?libraries=places&key=${API_KEY}&callback=resolveGoogleMapsPromise`;
      script.onerror = window.gm_authFailure;
      script.async = true;
      document.body.appendChild(script);
    });
  }

  export function load_sites() {
      let city = 'Bellevue, WA';
      let query = 'Restaurants';
      var apiURL = 'https://api.foursquare.com/v2/venues/search?client_id=OMZNMDVZSII4X3S3BYSX4XYKWY2AGHZ3V0S5JU5JURM2MLZE&client_secret=LOTFZMXVVIVDJF2LGFA11XOAYT4ZKQ3HWK4QAWPXX3NNJ4DR&v=20180323&limit=50&near='+ city +'&query='+ query;
      return fetch(apiURL).then(resp => resp.json())
  }

  export function get_view (lat, len) {
    var url= 'https://maps.googleapis.com/maps/api/streetview?size=400x400&location='+ lat +','+ len +'&fov=90&key=AIzaSyDXBoXO0kTzybJGECtKZJoBqPfYld_8SUk';
    return url;
}