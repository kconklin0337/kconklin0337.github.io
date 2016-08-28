function geoFindMe() {
  var output = document.getElementById("out");

  if (!navigator.geolocation){
    output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
    return;
  }
  function success(position) {
    var latitude  = position.coords.latitude;
    var longitude = position.coords.longitude;
    var accuracy = position.coords.accuracy;

    output.innerHTML = '<p style="margin-top:-30%;margin-left: -13%;color: white;"> Your current coordinate is: '+ '<br>' + latitude + '°' + longitude + '°</p>';

    var img = new Image();
    img.src = "https://maps.googleapis.com/maps/api/staticmap?center=" + latitude + "," + longitude + "&zoom=13&size=300x300&sensor=false";
    img.style.width ="75%";
    img.style.marginLeft ="9%";
    img.style.opacity = ".85";
    output.appendChild(img);
  };
  function error() {
    output.innerHTML = "Unable to retrieve your location";
  };
  output.innerHTML = "<p style='margin-top:-30%; margin-left: -13%;color: white;'>Big Brother is watching…</p>";
  navigator.geolocation.getCurrentPosition(success, error);
}

var locationData = {
  city: null,
  state: null,
  temperature: null,
  hourly : null,
  currentTime: null,
  dailyTemp: null,
  dailyLowTemp: null,
  dailyTime: null,
  summary: null,
};

  $(document).ready(function(){
  var base = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
  var local = 'https://api.forecast.io/forecast/236026fb27ec1cc754ee63351e9e9e41/'

  //wire up button to run getLocation
  $('#get-weather').on('click', getLocation);

  function getLocation(){
    //get the input
    var city = $('#city').val();
    var state = $('#state').val();
    var options = {
      method: 'GET',
      url: buildGoogleUrl(city, state),
      success: googleSuccess,
      error: errorHandler,
    };
    $.ajax(options);
}
    function buildGoogleUrl(city, state){
      var fullUrl = base +city+','+state;
      return fullUrl;
  };

  function googleSuccess(locationResults){
    var lat = locationResults.results[0].geometry.location.lat;
    var lon = locationResults.results[0].geometry.location.lng;
    locationData.currentTime = moment(locationResults.time).format('h:mm: a');
    locationData.city = locationResults.results[0].address_components[0].short_name;
    locationData.state = locationResults.results[0].address_components[2].short_name;
    var weather ={
      url: buildUrl(lat, lon),
      dataType: 'jsonp',
      success: successHandler,
      error: errorHandler,
  };

  $.ajax(weather);
};
      function buildUrl(long, short){
        var builtUrl = local +long+','+short;
        return builtUrl;
}
    function successHandler(processData){
      var source = $('#info').html();
      var template = Handlebars.compile(source);
      locationData.dailyTime = moment(processData.daily.data[1].temperatureMaxTime*1000).format('MMMM Do');
      locationData.dailyTemp = processData.daily.data[1].temperatureMax;
      locationData.dailyLowTemp = processData.daily.data[1].temperatureMin;
      locationData.summary = processData.currently.summary;
      var data = {
          icon: processData.currently.icon,
          // hourly: locationData.hourly,
          currentTime: locationData.currentTime,
          temperature: processData.currently.apparentTemperature,
          dailyTemp: locationData.dailyTemp,
          dailyLowTemp: locationData.dailyLowTemp,
          dailyTime: locationData.dailyTime,
          city: locationData.city,
          state: locationData.state,
          summary: locationData.summary,
      };

      var html = template(data);
      $('#test-output').html(html);
};
    function errorHandler(err){
    console.log(successHandler);
    console.error(err);
    console.log(processData)
  }


});
