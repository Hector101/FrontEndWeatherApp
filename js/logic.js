$(function(){
	//open weather api key 
	const APPID = '9911d37ff4b4075137274d35a7053826';
	//get current day
	let day = new Date().getDay();
	let week = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
	//array to start from corrent day
	let newWeek = [];
	for(let i = day; i<week.length; i++){
		newWeek.push(week[i]);
	}
	for(let i = 0; i<day; i++){
		newWeek.push(week[i]);
	}
	//add day to dom
	for(let i = 0;i<newWeek.length;i++){
		$(`#day${i}`).html(newWeek[i]);
		$(`#day${i}`).css("font-weight", "bolder");
	}
	if(navigator.geolocation){
		let options = {enableHighAccuracy: true,timeout: 5000,maximumAge: 0};
		let error = (err)=>{
			alert(`You Disabled Geolocation`);
		}
		let success = (position)=>{
			let lat = position.coords.latitude;
			let lon = position.coords.longitude;
			$.getJSON(`http://api.openweathermap.org/data/2.5/forecast/daily?
				lat=${lat}&lon=${lon}&units=metric&cnt=7&APPID=${APPID}`, (data)=>{
				//console.log(data);
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
		}
		navigator.geolocation.getCurrentPosition(success, error, options);
	}

	$('.search-btn').on('click', ()=>{
		let val = $("#autocomplete").val();
		val = val.split(/\s+|[\s,]/);
		val = val[0];
		$.getJSON(`http://api.openweathermap.org/data/2.5/forecast/daily?
				q=${val}&units=metric&cnt=7&APPID=${APPID}`, (data)=>{
				//console.log(data);
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
	});
});

google.maps.event.addDomListener(window, 'load', initialize);
function initialize(){
	let autoComplete = new google.maps.places.Autocomplete(document.getElementById("autocomplete"));
	google.maps.event.addListener(autoComplete, "place_changed", ()=>{
	});
}