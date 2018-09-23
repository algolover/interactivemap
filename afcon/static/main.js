
document.getElementById('resetzoom').addEventListener('click', function () {
    map.flyTo({
        center: [1.73,1.4 ],
        zoom: 2.3
    });
});


mapboxgl.accessToken = 'pk.eyJ1IjoiZGl2eWFuc2h1YmFuc2FsIiwiYSI6ImNqbTh5MnRjMTAwNzYza2xoMXRucGE5eWoifQ.bQE6vlATazllsVP8de7Ckg';

var map = new mapboxgl.Map({
  container: 'map', 
  style: 'mapbox://styles/mapbox/streets-v9', // controls the style of the map.
  minZoom: 2.3,
  maxZoom: 6
});

map.on('load', function() { 
  map.addLayer({ 
    'id': 'countries',
    'source': {
      'type': 'vector',
      'url': 'mapbox://divyanshubansal.agemfrr6' //  Map ID 
    },
    'source-layer': 'ne_10m_admin_0_countries-01hhky', // source layer name
    'type': 'fill',
    'paint': {
      'fill-color': '#00FF00', // color of tileset 
      'fill-outline-color': '#F2F2F2'
    }


  });


map.setFilter('countries', ['in', 'ADM0_A3_IS'].concat(nations2002)); //default startin value
  map.loadImage('https://i.imgur.com/ascTPMO.png', function(error, image) {
        if (error) throw error;
        map.addImage('trophy', image);
        map.addLayer({
            "id": "points",
            "type": "symbol",
            "source": {
                "type": "geojson",
                "data": {
                    "type": "FeatureCollection",
                    "features": [{
                        "type": "Feature",
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-3.98,17.57]
                        }
                    }]
                }
            },
            "layout": {
                "icon-image": "trophy",
                "icon-size": 0.25
            }
        });
    });

// function to display trophy icon
var trophyicon = function(lon,lat){
  try{
    map.removeLayer('points');}
  catch(err){}
  try{
    map.removeImage('trophy');}
  catch(err){}
  try{
    map.removeSource('points');}
  catch(err){}

map.loadImage('https://i.imgur.com/ascTPMO.png', function(error, image) {
        if (error) throw error;
        map.addImage('trophy', image);
        map.addLayer({
            "id": "points",
            "type": "symbol",
            "source": {
                "type": "geojson",
                "data": {
                    "type": "FeatureCollection",
                    "features": [{
                        "type": "Feature",
                        "geometry": {
                            "type": "Point",
                            "coordinates": [lon, lat]
                        }
                    }]
                }
            },
            "layout": {
                "icon-image": "trophy",
                "icon-size": 0.25
            }
        });
    });
};

// function to display top goals 
var updateGoals = function(data){
  $("#goals").remove();
  $("#childgoal").append('<div class="list-group" id="goals"></div>');
var items = [];
 $.each(data, function(i, item) {
        items.push('<a href="'+item[1]+'" class="list-group-item" title="click to watch" id="ytvid" style="color:#000" target="_blank" >' + item[0] + '</a>' );
 });
 $('#goals').append( items.join('') );
};

// function to display name of host
var updateHost = function(data){
  $("#host").remove();
  $("#childhost").append('<div class="list-group" id="host"></div>');
var items = [];
 $.each(data, function(i, item) {
        items.push('<a href="'+item[1]+'" class="list-group-item" title="click to read more" id="editionHost" style="color:#000" target="_blank" >' + item[0] + '</a>' );
 });
 $('#host').append( items.join('') );
};

// function to display stadiums used
var updateStadiums = function(data){
  $("#stadiums").remove();
  $("#childStadium").append('<div class="list-group" id="stadiums"></div>');

var items = [];
 $.each(data, function(i, item) {
        items.push('<a href="'+item[2]+'" class="list-group-item" title="click to read more" id="stadiumhover" style="color:#000" target="_blank" >' + item[0] + ' <div style="color:red">' + item[1] + '</div></a>' );
 });
 $('#stadiums').append( items.join('') );
};



map.setFilter('countries', ['in', 'ADM0_A3_IS'].concat(nations2002)); //default startin value
updateStadiums(stadiums2002);
updateGoals(goals2002);  
updateHost(host2002);
  map.on('click', 'countries', function (mapElement) {
  const countryCode = mapElement.features[0].properties.ADM0_A3_IS; 


  fetch(`https://restcountries.eu/rest/v2/alpha/${countryCode}`) 

    .then((data) => data.json()) 
    .then((country) => { //country contains the data from the API request
      const html = ` 
        <img src='${country.flag}' /> 
        <ul>
          <li><h3>${country.name}</h3></li>
          <li><strong>Capital:</strong> ${country.capital}</li>
          <li><strong>Population:</strong> ${country.population}</li>
        </ul>
      `;
      new mapboxgl.Popup() 
      .setLngLat(mapElement.lngLat)
      .setHTML(html) 
      .addTo(map); 
    });
  });


    document.getElementById('slider').addEventListener('input', function(e) {

  // update text in the UI
  var slider1 = document.getElementById("slider");

  document.getElementById('active-year').innerHTML = document.getElementById('slider').value;
  if(slider1.value == "2002")
  { map.setFilter('countries', ['in', 'ADM0_A3_IS'].concat(nations2002)); 
    trophyicon(-3.98,17.57);
    updateStadiums(stadiums2002);
    updateGoals(goals2002);
    updateHost(host2002);
  }
  else if(slider1.value=="2004")
  {
    map.setFilter('countries', ['in', 'ADM0_A3_IS'].concat(nations2004)); // filter by country
    trophyicon(10.16,36.81);
    updateStadiums(stadiums2004);
    updateGoals(goals2004);
    updateHost(host2004);
  }
    else if(slider1.value=="2006")
  {
    map.setFilter('countries', ['in', 'ADM0_A3_IS'].concat(nations2006));
    trophyicon(30.80,26.82);
    updateStadiums(stadiums2006);
    updateGoals(goals2006);
    updateHost(host2006);
  }
    else if(slider1.value=="2008")
  {
    map.setFilter('countries', ['in', 'ADM0_A3_IS'].concat(nations2008));
    trophyicon(30.80,26.82);
    updateStadiums(stadiums2008);
    updateGoals(goals2008);
    updateHost(host2008);
    
  }
    else if(slider1.value=="2010")
  {
    map.setFilter('countries', ['in', 'ADM0_A3_IS'].concat(nations2010));
    trophyicon(30.80,26.82);
    updateStadiums(stadiums2010);
    updateGoals(goals2010);
    updateHost(host2010);
  }
  else
  {
   map.setFilter('countries', ['in', 'ADM0_A3_IS'].concat([])); // filter by country   
  }
});


});

$("#resetzoom").hide();
map.on('zoom', function(){
        if(map.getZoom() < 2.4)
            $("#resetzoom").hide("slow");
        else
            $("#resetzoom").show(100);
});


// hover function for youtube video(ytvid)
// $(document).on('mouseenter','#stadiumhover', function (event) {
//     $("#tooltiptextid").show();
//     console.log("okay");
// }).on('mouseleave','#stadiumhover',  function(){
//     $("#tooltiptextid").hide();
// });