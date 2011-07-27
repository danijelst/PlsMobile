var db;
var base_uri = 'd/index.php';
var jQT = $.jQTouch({
    icon: 'favicon.ico',
    startupScreen: 'pls-startup.png',
    statusBar: 'black',
    preloadImages: [
        'themes/jqt/img/button.png',
        'themes/jqt/img/back_button.png',
        'themes/jqt/img/back_button_clicked.png',
        'themes/jqt/img/button_clicked.png',
        'themes/jqt/img/grayButton.png',
        'themes/jqt/img/whiteButton.png',
        'themes/jqt/img/loading.gif', 
        'themes/jqt/img/chevron_circle.png',
        'themes/jqt/img/chevron.png'
        ]
});

$(document).ready(function() {
  var lookup = jQT.updateLocation(function(coords){
                                    if (coords) {
                                        localStorage.latitude = coords.latitude;
                                        localStorage.longitude = coords.longitude;
                                        loadParkingListByLocation(coords.latitude + ',' + coords.longitude);
                                        jQT.goTo('#parking');
                                    }
                                  });
  var appCache = window.applicationCache;
  function updateCache(){
      appCache.swapCache();
      window.location.reload();
  }

  appCache.addEventListener("updateready", updateCache, false);
})

$(document).ready(function() {
  refreshEntries();
  
  $('#search').click(function(){
      loadCountryList();
      refreshEntries();
  });
  
  $('#country .refresh').click(function(){
    loadCountryList();
  });
  
  $('#city .refresh').click(function(){
    loadCityList();
  });
  
  $('#parking .refresh').click(function(){
    loadParkingList();
  });
  
  $('#parkingDetails .refresh').click(function(){
    //loadParkingDetailsList
  });
  
  /*
  var shortName = 'PlsMobile';
  var version = '1.0';
  var displayName = 'PlsMobile';
  var maxSize = 65536;
  db = openDatabase(shortName, version, displayName, maxSize);
  db.transaction(
      function(transaction) {
          transaction.executeSql(
              'CREATE TABLE IF NOT EXISTS config ' +
              ' (defaultCity TEXT NOT NULL, defaultCityDisplay TEXT NOT NULL );'
          );
      }
  );
  */
});

function fillCountryList(data) {
  $.each(data, 
          function(key, item)
          {
            var newEntryRow = $('#entryCountry').clone();
            newEntryRow.removeAttr('id');
            newEntryRow.removeAttr('style');
            newEntryRow.appendTo('#country ul');
            
            newEntryRow.find('a').attr('id', key);
            newEntryRow.find('a').text(item);
            
            newEntryRow.find('a').click(function(){
                                                      var value = this.id;
                                                      var display = this.text;
                                                      localStorage.country = value;
                                                      localStorage.countryDisplay = display;
                                                      
                                                      loadCityList(value, display);
                                                      refreshEntries();
                                                  });
          }
        );
}

function loadCountryList() {
  $('body').append('<div id="progress">Loading...</div>');
  $('#country ul li:gt(0)').remove();

  $.ajax({url:            base_uri,
          dataType:       'json',
          data:           {v:1, func: 'country'},
          type:           'POST',
          success:        function(data) {
                            fillCountryList(data);
                            $('#progress').remove();
                          }
          }
        );
}

function fillCityList(data, country) {
  $.each(data, 
          function(key, item)
          {
            var newEntryRow = $('#entryCity').clone();
            newEntryRow.removeAttr('id');
            newEntryRow.removeAttr('style');
            newEntryRow.appendTo('#city ul');
            
            newEntryRow.find('a').attr('id', item.provider);
            newEntryRow.find('a').text(item.city);
            
            newEntryRow.find('a').click(function(){
                                                      var value = this.id;
                                                      var display = this.text;
                                                      localStorage.city = value;
                                                      localStorage.cityDisplay = display;
                                                      
                                                      loadParkingListByCity(localStorage.countryDisplay, display);
                                                      refreshEntries();
                                                  });
          });
}

function loadCityList(country, countryDisplay) {
  $('body').append('<div id="progress">Loading...</div>');
  $('#city ul li:gt(0)').remove();
            
  $.ajax({url:            base_uri,
          dataType:       'json',
          data:           {v:1, func: 'cities', q1: countryDisplay},
          type:           'POST',
          success:        function(data) {
                            fillCityList(data, countryDisplay);
							$('#progress').remove();
                          }
          }
        );
}

function fillParkingListByCity(data, country, city) {
  $.each(data[0], 
          function(key, item)
          {
            localStorage.city = item.city;
            localStorage.cityDisplay = item.city;
            $('#parking h1').text(localStorage.cityDisplay);
          }
        );
  $.each(data[1], 
          function(key, item)
          {
              var newEntryRow = $('#entryParking').clone();
              newEntryRow.removeAttr('id');
              newEntryRow.removeAttr('style');
              newEntryRow.appendTo('#parking ul');
              
              newEntryRow.find('a').attr('id', item.key);
              newEntryRow.find('.parkingName').text(item.name);
              freeOpen = item.free
              if (typeof item.capacity != 'undefined') {  
                if (item.capacity.toLowerCase() != 'n/a') {
                  freeOpen = freeOpen + ' of ' + item.capacity;
                }
              }
              newEntryRow.find('.free_open').text(freeOpen);
              
              if (typeof item.distance != 'undefined') {
                newEntryRow.find('.distance').text(item.distance);
              } else {
                newEntryRow.find('.distance').text('');
              }
              /*
              newEntryRow.find('.map').click(function(){
                                                            var value = this.id;
                                                            var display = this.text;
                                                            localStorage.parking = value;
                                                            localStorage.parkingDisplay = display;
                                                            
                                                            //loadParkingDetails(sessionStorage.country, sessionStorage.city, sessionStorage.parking);
                                                            refreshEntries();
                                                        });*/
        });
  
}

function loadParkingListByCity(country, city) {
  $('body').append('<div id="progress">Loading...</div>');
  $('#parking ul li:gt(0)').remove();
  
  $.ajax({url:            base_uri,
          dataType:       'json',
          data:           {v:1, q3: city}, 
          type:           'POST',
          success:        function(data) {
                            fillParkingListByCity(data, country, city);
                            $('#progress').remove();
                          }
          }
        );
  $('#progress').remove();
}


function loadParkingListByLocation(location) {
  $('body').append('<div id="progress">Loading...</div>');
  $('#parking ul li:gt(0)').remove();
  $('#parking h1').text('locating...');
  $.ajax({url:            base_uri,
          dataType:       'json',
          data:           {v:1, ll: location}, 
          type:           'POST',
          success:        function(data) {
                            fillParkingListByCity(data, '', '');
                            $('#progress').remove();
                          }
          }
        );
}

function saveSettings() {

}

function loadSettings() {

}

function refreshEntries() {
    
    var city = localStorage.city;
    var display = localStorage.cityDisplay;
    
    $('#parking h1').text(display);
    /*
    db.transaction(
        function(transaction) {
            transaction.executeSql(
                'SELECT * FROM config;',
                function (transaction, result) {
                    for (var i=0; i < result.rows.length; i++) {
                        var row = result.rows.item(i);
                        localStorage.city = row.defaultCity;
                        sessionStorage.city = row.defaultCity;
                        $('#default_city').val(localStorage.city);
                        $('#selected_city').text(localStorage.city);
                        
                        var newEntryRow = $('#entryTemplate').clone();
                        newEntryRow.removeAttr('id');
                        newEntryRow.removeAttr('style');
                        newEntryRow.data('entryId', row.defaultCity);
                        newEntryRow.appendTo('#date ul');
                        newEntryRow.find('.label').text(row.food);
                        newEntryRow.find('.calories').text(row.calories);
                        newEntryRow.find('.delete').click(function(){
                            var clickedEntry = $(this).parent();
                            var clickedEntryId = clickedEntry.data('entryId');
                            deleteEntryById(clickedEntryId);
                            clickedEntry.slideUp();
                        });
                        
                    }
                },
                errorHandler
            );
        }
    );*/

}


function errorHandler(transaction, error) {
    alert('Oops. Error was '+error.message+' (Code '+error.code+')');
    return true;
}

