window.addEventListener('load', () => {
  let longitude;
  let latitude;

  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      longitude = position.coords.longitude;
      latitude = position.coords.latitude;

      const proxy = 'https://cors-anywhere.herokuapp.com/';
      
      const api = `${proxy}https://api.darksky.net/forecast/007cef6d23c755595cd48bc085286477/${latitude},${longitude}`;
      fetch(api)
        .then(reponse => {
          return reponse.json();
        })
        .then(data => {
          console.log(data);
        });
    });
  }
});