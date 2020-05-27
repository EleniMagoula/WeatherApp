window.addEventListener('load', () => {
    let long, lat;
    let temperatureDescription = document.querySelector(".temperature-description");
    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationTimezone = document.querySelector(".location-timezone");
    let temperatureSection = document.querySelector(".temperature");
    const temperatureSpan = document.querySelector(".temperature span");

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition (position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `${proxy}https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${lat},${long}`;

            fetch(api)
            .then(response => {
                return response.json();
            })
            .then(data => {
                const { temperature, summary, icon } = data.currently;
                // Set DOM Elements from the API
                temperatureDegree.textContent = temperature;
                temperatureDescription.textContent = summary;
                locationTimezone.textContent = data.timezone;

                // FORMULA FOR CELCIUS
                let celcius = (temperature - 32) * (5 / 9);

                //Set Icon
                setIcons(icon, document.querySelector("#icon"));
                console.log(icon);
                document.body.style.backgroundImage = `url('/background/${icon}.jpg')`;

                //Change temperature to Celcius/Farenheit
                temperatureSection.addEventListener('click', () => {
                    if (temperatureSpan.textContent === "F") {
                        temperatureSpan.textContent = "C";
                        temperatureDegree.textContent = Math.floor(celcius);
                    } else {
                        temperatureSpan.textContent = "F";
                        temperatureDegree.textContent = temperature;
                    }
                });
            });
        });
    }

    function setIcons(icon, iconID) {
        const skycons = new Skycons({ color: "white" }); // in Skycons everything is with '-' and upper case
        const currentIcon = icon.replace(/-/g, "_").toUpperCase(); // look for a '-' in every line, and replaces it with '_'
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});