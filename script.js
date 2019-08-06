window.addEventListener('load', () => {
  let longitude;
  let latitude;
  let temperatureDescription = document.querySelector('.temperature-description');
  let temperatureDegree = document.querySelector('.temperature-degree');
  let locationTimezone = document.querySelector('.location-timezone');
  let temperatureSection = document.querySelector('.temperature');
  const temperatureSpan = document.querySelector('.temperature span');

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
          const {temperature, summary, icon} = data.currently;
          // Set DOM Elements from the API
          temperatureDegree.textContent = temperature; 
          temperatureDescription.textContent = summary;
          locationTimezone.textContent = data.timezone;

          // Rumus Celcius
          let celcius = (temperature -32) * (5 / 9);

          // set icon
          setIcons(icon, document.querySelector('.icon'));

          // Change temperature F to C
        temperatureSection.addEventListener('click', () => {
        if(temperatureSpan.textContent === 'F') {
          temperatureSpan.textContent = 'C';
          temperatureDegree.textContent = Math.floor(celcius);
        } else {
          temperatureSpan.textContent = 'F';
          temperatureDegree.textContent = temperature;
        }
        });
      });
    });
  }

  function setIcons(icon, iconID) {
    const skycons = new Skycons({color: 'white'});
    const currentIcon = icon.replace(/-/g, '_').toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
  }


});