$(document).ready(function(){

  function k2c (k) {
    return k - 273.15;
  };
  
  function k2f (k) {
    return (k * (9/5) - 459.67);
  };
  
  $.getJSON( 'http://ip-api.com/json', function( clientInfo ) {
    
     var lat = clientInfo.lat,
         lon = clientInfo.lon;
     
     var urlPath ='//api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon;
     var APPID ='&APPID=92ba4681eeeee67ecffc537ab03ce839';

     var URL = urlPath + APPID;
    
     $.getJSON( URL, function( json ) {
 
      $('.location').html( json.name + '<span id="country">' + ', ' + json.sys.country + '</span>' );
      $('.weather').html( Math.round( k2f ( json.main.temp ) ) + '°'); //default to F
      $('.desc').html( json.weather[0].description);
      
      //Background colour palette
      //https://academo.org/demos/colour-temperature-relationship/ 
      //https://color.adobe.com
      if (  Math.round( k2f ( json.main.temp ) ) <= 0 ) {
          $('body').css('background', '#2276E8').fadeIn(2000);
      } else if ( Math.round( k2f ( json.main.temp ) ) > 0 && Math.round( k2f ( json.main.temp ) ) <= 32 ) {
          $('body').css('background', '#B5CDFF').fadeIn(2000);
     } else if ( Math.round( k2f ( json.main.temp ) ) >= 33 && Math.round( k2f ( json.main.temp ) ) <= 50 ) {
          $('body').css('background', '#10FEFF').fadeIn(2000);
      } else if ( Math.round( k2f ( json.main.temp ) ) >= 51 && Math.round( k2f ( json.main.temp ) ) <= 60 ) {
          $('body').css('background', '#CBE835').fadeIn(2000);
      } else if ( Math.round( k2f ( json.main.temp ) ) >= 61 && Math.round( k2f ( json.main.temp ) ) <= 80 ) {
          $('body').css('background', '#FF530D').fadeIn(2000);
      } else if ( Math.round( k2f ( json.main.temp ) ) >= 81 && Math.round( k2f ( json.main.temp ) ) <= 90 ) {
          $('body').css('background', '#E82C0C').fadeIn(2000);
      } else if ( Math.round( k2f ( json.main.temp ) ) > 100 ) {
          $('body').css('background', '#FF0000').fadeIn(2000);
      } 
     
      //icons
      $('.image').html('<img src="http://openweathermap.org/img/w/' + json.weather[0].icon + '.png" style="height:85px"/>'); 
       
      //user interaction with navbar
      $('#fahrenheit').on('mouseover', function(){ 
          $('.weather').html( Math.round( k2f ( json.main.temp ) ) + '°' );
      });
      
      $('#celsius').on('mouseover', function(){ 
          $('.weather').html( Math.round( k2c ( json.main.temp ) ) + '°' );
      });
      
       $('.windSpeed').on('mouseover', function(){ 
        var direction,
            deg = json.wind.deg;
         
         if ( deg == 0 || deg == 360 ) { direction = 'N'; }
         else if ( deg > 0 && deg <= 89 ) { direction = 'NE'; }
         else if ( deg > 90 && deg <= 179 ) { direction = 'SE'; }
         else if ( deg > 180 && deg <= 269 ) { direction = 'SW'; }
         else if ( deg > 270 && deg <= 359 ) { direction = 'NW'; }
         else if ( deg == 90 ) { direction = 'E'; }
         else if ( deg == 180 ) { direction = 'S'; }
         else if ( deg == 270 ) { direction = 'W'; }
         
         $('.weather').html(  Math.round( json.wind.speed )  + ' m/s ' + direction );
      });
      
      
       //custom search
       $('.search').click(function() {
         $('#searchPanel').slideToggle("slow");
         
         //do something with input
          $('#submit').on('click', function( data ) {
           data.preventDefault(); 
           var input =  $('#input').val();
            
            if ( !input ) {
             alert("please enter a city");
            } else {
             urlPath ='//api.openweathermap.org/data/2.5/weather?q=';
             URL = urlPath + input + APPID;
             $.getJSON(URL, function( json ) {
               $('.location').html( json.name + '<span id="country">' + ', ' + json.sys.country + '</span>' );
               $('.weather').html( Math.round( k2f ( json.main.temp ) ) + '°'); //default to F
               $('.image').html('<img src="http://openweathermap.org/img/w/' + json.weather[0].icon + '.png" style="height:85px"/>'); 
               $('.desc').html( json.weather[0].description);
             });
            }
          });
       });
      }); //openweathermap.org API call
  }); //clientInfo   
}); // $ end