/**
 * This application is a front end weather application,
 * that gets the user's location automatically using
 * http://ip-api.com/json api to get user's coordinates.
 * This application consunmes the open weather api to get
 * the forecast of a particular location.
 * @author Johnson Okoro
 */



$(()=>{
	//open weather api key 
	const APPID = '9911d37ff4b4075137274d35a7053826';
	//get current day
	let day = new Date().getDay();
	let week = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
	/**
	 * Rearrange the week array starting from the
	 * the current day to the next seven days
	 */
	let newWeek = [];
	for(let i = day; i<week.length; i++){
		newWeek.push(week[i]);
	}
	for(let i = 0; i<day; i++){
		newWeek.push(week[i]);
	}
	//load days in the new week array to the dom
	for(let i = 0;i<newWeek.length;i++){
		$(`#day${i}`).html(newWeek[i]);
		$(`#day${i}`).css("font-weight", "bold");
	}
	/**
	 * Get user's location automatically using the http://ip-api.com/json api,
	 * use the returned data the make another api call to the open weather api,
	 * to get all the weather data to display to the user.
	 * if the api fails to call, use the HTML5's navigator geolocation method
	 * to get user location instead.
	 */

	$.getJSON("http://ip-api.com/json", ()=>{	
	}).done((data)=>{
		let lat = data.lat;
		let lon = data.lon;
		$.getJSON(`http://api.openweathermap.org/data/2.5/forecast/daily?
				lat=${lat}&lon=${lon}&units=metric&cnt=7&APPID=${APPID}`, (data)=>{
				$(".overview").html(`<div class="city"></div>
				<br>
				<span>Temperature: <span class="temp-main"></span>&deg;C</span>
				<hr>
				<span>Wind speed: <span class="wind-main"></span>m/s</span>
				<hr>
				<span>Pressure: <span class="pressure-main"></span> hPa</span>
				<hr>
				<span>Humidity: <span class="humidity-main"></span>%</span>`);
				$(".city").html(data.city.name);
				$(".temp-main").html(data.list[0].temp.day);
				$(".wind-main").html(data.list[0].speed);
				$(".pressure-main").html(data.list[0].pressure);
				$(".humidity-main").html(data.list[0].humidity);
				for(let i = 0;i<newWeek.length;i++){
					$(`.icon${i} img`).attr("src", `http://openweathermap.org/img/w/${data.list[i].weather[0].icon}.png`);
					$(`#temp${i}`).html(`${data.list[i].temp.day}&deg;C`);
					$(`#temp${i}`).css("font-weight", "bolder");
					$(`.description${i}`).html(`${data.list[i].weather[0].description}`);
				}
				$(".day").html("Today");
				$(".day-des").html(`${newWeek[0]}`);
				$(".main-img").attr("src", `http://openweathermap.org/img/w/${data.list[0].weather[0].icon}.png`);
				$(".weather").html(`${data.list[0].weather[0].description}`);
			});
	}).fail((err)=>{//if api call fails, use the navigator to get user cooordinates to get weather information.
		if(navigator.geolocation){
			navigator.geolocation.getCurrentPosition((position)=>{
				let lat = position.coords.lat;
				let lon = position.coords.lon;
				console.log("Failed")
				$.getJSON(`http://api.openweathermap.org/data/2.5/forecast/daily?
						lat=${lat}&lon=${lon}&units=metric&cnt=7&APPID=${APPID}`, (data)=>{
						$(".overview").html(`<div class="city"></div>
						<br>
						<span>Temperature: <span class="temp-main"></span>&deg;C</span>
						<hr>
						<span>Wind speed: <span class="wind-main"></span>m/s</span>
						<hr>
						<span>Pressure: <span class="pressure-main"></span> hPa</span>
						<hr>
						<span>Humidity: <span class="humidity-main"></span>%</span>`);
						$(".city").html(data.city.name);
						$(".temp-main").html(data.list[0].temp.day);
						$(".wind-main").html(data.list[0].speed);
						$(".pressure-main").html(data.list[0].pressure);
						$(".humidity-main").html(data.list[0].humidity);
						for(let i = 0;i<newWeek.length;i++){
							$(`.icon${i} img`).attr("src", `http://openweathermap.org/img/w/${data.list[i].weather[0].icon}.png`);
							$(`#temp${i}`).html(`${data.list[i].temp.day}&deg;C`);
							$(`#temp${i}`).css("font-weight", "bolder");
							$(`.description${i}`).html(`${data.list[i].weather[0].description}`);
						}
						$(".day").html("Today");
						$(".day-des").html(`${newWeek[0]}`);
						$(".main-img").attr("src", `http://openweathermap.org/img/w/${data.list[0].weather[0].icon}.png`);
						$(".weather").html(`${data.list[0].weather[0].description}`);
					});
			})
		}
	});
	/**
	 * When the search button is clicked, it gets the user input,
	 * and then use the value to get weather forcast of the location
	 * entered by user.
	 */
	$('.search-btn').on('click', ()=>{
		let val = $("#autocomplete").val();
		val = val.split(/\s+|[\s,]/);
		val = val[0];
		$.getJSON(`http://api.openweathermap.org/data/2.5/forecast/daily?
				q=${val}&units=metric&cnt=7&APPID=${APPID}`, (data)=>{
				let lat = data.city.coord.lat;
				let lon = data.city.coord.lon;
				$(".city").html(data.city.name);
				$(".temp-main").html(data.list[0].temp.day);
				$(".wind-main").html(data.list[0].speed);
				$(".pressure-main").html(data.list[0].pressure);
				$(".humidity-main").html(data.list[0].humidity);
				for(let i = 0;i<newWeek.length;i++){
					$(`.icon${i} img`).attr("src", `http://openweathermap.org/img/w/${data.list[i].weather[0].icon}.png`);
					$(`#temp${i}`).html(`${data.list[i].temp.day}&deg;C`);
					$(`.description${i}`).html(`${data.list[i].weather[0].description}`);
				}
				
				$(".day").html("Today");
				$(".day-des").html(`${newWeek[0]}`);
				$(".main-img").attr("src", `http://openweathermap.org/img/w/${data.list[0].weather[0].icon}.png`);
				$(".weather").html(`${data.list[0].weather[0].description}`);
				/**
				 * @method initMap
				 * @static 
				 * @private only exist within this lexical scope.
				 * Method initializes map on the page of the location
				 * user enteres on the search box.
				 */
				function initMap(){
					let center = new google.maps.LatLng(lat,lon);
					map = new google.maps.Map(document.getElementById("map"), {
						center,
						zoom: 12
					});
					
					let request = {
						location: center,
						radius: 150047,
						types: ["park"]
					}

					let service = new google.maps.places.PlacesService(map);
					service.nearbySearch(request, callback);
    			}
				//initialize map
				initMap();

			});
	});
	//Create a click effect when any of the days container is clicked
	let eachWeather = Array.from(document.querySelectorAll(".days"));
	function mousedown(e){
		this.style.background = "rgba(0,0,0,.2)";
	}
	function mouseup(){
		this.style.background = "#ccc";
	}
	eachWeather.map(function(button){
		return button.addEventListener("mousedown", mousedown);
	});
	eachWeather.map(function(button){
		return button.addEventListener("mouseup", mouseup);
	});

	/**
	 * Display full weather details of any any day,
	 * when it's container is clicked.
	 * @static onClick
	 */
	function onClick(){
		let val = $("#autocomplete").val();
		val = val.split(/\s+|[\s,]/);
		val = val[0];
		let index = $(this).index();
		if(val){//if there's a value in the searched box
			$.getJSON(`http://api.openweathermap.org/data/2.5/forecast/daily?
				q=${val}&units=metric&cnt=7&APPID=${APPID}`, (data)=>{
				if(index === 0){//if the container clicked is the current day, tell user it's today
					$(".day").html("Today");
					$(".day-des").html(`${newWeek[0]}`);
					$(".main-img").attr("src", `http://openweathermap.org/img/w/${data.list[0].weather[0].icon}.png`);
					$(".weather").html(`${data.list[0].weather[0].description}`);

					$(".city").html(data.city.name);
					$(".temp-main").html(data.list[0].temp.day);
					$(".wind-main").html(data.list[0].speed);
					$(".pressure-main").html(data.list[0].pressure);
					$(".humidity-main").html(data.list[0].humidity);
				}else if(index !== 0){//if the container clicked is the not current day remove 'Today' from DOM
					$(".day").html(`${newWeek[index]}`);
					$(".day-des").html(``);
					$(".main-img").attr("src", `http://openweathermap.org/img/w/${data.list[index].weather[0].icon}.png`);
					$(".weather").html(`${data.list[index].weather[0].description}`);

					$(".city").html(data.city.name);
					$(".temp-main").html(data.list[index].temp.day);
					$(".wind-main").html(data.list[index].speed);
					$(".pressure-main").html(data.list[index].pressure);
					$(".humidity-main").html(data.list[index].humidity);
				}
			});
		}else{//if there's no value in the searched box
			$.getJSON("http://ip-api.com/json", (data)=>{
				let lat = data.lat;
				let lon = data.lon;
				$.getJSON(`http://api.openweathermap.org/data/2.5/forecast/daily?
						lat=${lat}&lon=${lon}&units=metric&cnt=7&APPID=${APPID}`, (data)=>{
						if(index === 0){
							$(".day").html("Today");
							$(".day-des").html(`${newWeek[0]}`);
							$(".main-img").attr("src", `http://openweathermap.org/img/w/${data.list[0].weather[0].icon}.png`);
							$(".weather").html(`${data.list[0].weather[0].description}`);

							$(".city").html(data.city.name);
							$(".temp-main").html(data.list[0].temp.day);
							$(".wind-main").html(data.list[0].speed);
							$(".pressure-main").html(data.list[0].pressure);
							$(".humidity-main").html(data.list[0].humidity);
						}else if(index !== 0){
							$(".day").html(`${newWeek[index]}`);
							$(".day-des").html(``);
							$(".main-img").attr("src", `http://openweathermap.org/img/w/${data.list[index].weather[0].icon}.png`);
							$(".weather").html(`${data.list[index].weather[0].description}`);

							$(".city").html(data.city.name);
							$(".temp-main").html(data.list[index].temp.day);
							$(".wind-main").html(data.list[index].speed);
							$(".pressure-main").html(data.list[index].pressure);
							$(".humidity-main").html(data.list[index].humidity);
						}
					});
				});
		}
		
	}
	//Listen to each .days container when clicked to show in full detail
	eachWeather.map(function(button){
		return button.addEventListener("click", onClick);
	});
	//Initalize the autocomplete api
	function initAutocomplete(){
		let autoComplete = new google.maps.places.Autocomplete(document.getElementById("autocomplete"));
		google.maps.event.addListener(autoComplete, "place_changed", ()=>{
		});
	}

	let map;
	/**
	 * @method initMap
	 * @static 
	 * @public exist within the global lexical scope.
	 * Method initializes map on the page of the location
	 * using the HTML5 geolocation coordinates.
	 */
    function initMap(){
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition((position)=>{
                let lat = position.coords.latitude;
                let lon = position.coords.longitude;
                let center = new google.maps.LatLng(lat,lon);
				//load map to the dom with id map
                map = new google.maps.Map(document.getElementById("map"), {
                    center,
                    zoom: 12
                });
                //set the request parameters of the loaded map
                let request = {
                    location: center,
                    radius: 150047,
                    types: ["park"]
                }
				//Instantiating the google places services from the map.
                let service = new google.maps.places.PlacesService(map);
                service.nearbySearch(request, startPlacesServices);
            });
        }
    }
            
	/**
	 * 
	 * @param {*} results 
	 * @param {*} status 
	 * @static
	 * check if status is 200 to get all the coordinates
	 * of the nearby location and call createMaker function,
	 * with each coordinates on the map.
	 */
    function startPlacesServices(results, status){
        if(status === google.maps.places.PlacesServiceStatus.OK){
            for(let i = 0; i<results.length; i++){
                createMarker(results[i]);
            }
        }
    }
	/**
	 * 
	 * @param {*} place 
	 * @static
	 * Create makers on the map with a list of nearby coordinates.
	 */
    function createMarker(place){
        let marker = new google.maps.Marker({
            map: map,
            position: place.geometry.location,
        });
		/**
		 * google event listen to get coordinates from a clicked
		 * marker to get the weather forecast of the location
		 */
		google.maps.event.addListener(marker, "click", function(){
            let lat = marker.getPosition().lat();
            let lon = marker.getPosition().lng();
			$.getJSON(`http://api.openweathermap.org/data/2.5/forecast/daily?
				lat=${lat}&lon=${lon}&units=metric&cnt=7&APPID=${APPID}`, (data)=>{
				$(".overview").html(`<div class="city"></div>
				<br>
				<span>Temperature: <span class="temp-main"></span>&deg;C</span>
				<hr>
				<span>Wind speed: <span class="wind-main"></span>m/s</span>
				<hr>
				<span>Pressure: <span class="pressure-main"></span> hPa</span>
				<hr>
				<span>Humidity: <span class="humidity-main"></span>%</span>`);
				$("#autocomplete").val(data.city.name);
				$(".city").html(data.city.name);
				$(".temp-main").html(data.list[0].temp.day);
				$(".wind-main").html(data.list[0].speed);
				$(".pressure-main").html(data.list[0].pressure);
				$(".humidity-main").html(data.list[0].humidity);
				for(let i = 0;i<newWeek.length;i++){
					$(`.icon${i} img`).attr("src", `http://openweathermap.org/img/w/${data.list[i].weather[0].icon}.png`);
					$(`#temp${i}`).html(`${data.list[i].temp.day}&deg;C`);
					$(`#temp${i}`).css("font-weight", "bolder");
					$(`.description${i}`).html(`${data.list[i].weather[0].description}`);
				}
				$(".day").html("Today");
				$(".day-des").html(`${newWeek[0]}`);
				$(".main-img").attr("src", `http://openweathermap.org/img/w/${data.list[0].weather[0].icon}.png`);
				$(".weather").html(`${data.list[0].weather[0].description}`);
				
				$("html, body").animate({ scrollTop: 0 }, "slow");
			});
        });
    }

	/**
	 * google maps event listener to initialize map,
	 * and auto complete apii when dom is filly loaded.
	 */
    google.maps.event.addDomListener(window, "load", function(){
        initMap();
		initAutocomplete();
    });
});

