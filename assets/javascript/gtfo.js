var pos;

const TM_API = {
    KEY: "Njb3fZybqMZ4T6Q6xVbume5AmraEy7zY",
    SECRET: "SaUIaIFwRwKAr3tV",
    LIMIT: 10,
    EVENTS_URL: "https://app.ticketmaster.com/discovery/v2/events",
}

function GetEntertainmentOptions() {
    var latlong = `${pos.lat},${pos.lng}`;
    
    const now = moment();
    const midnight = moment().add(1, "days").startOf("day");

    var startDateTime = now.format("YYYY-MM-DDTHH:mm:ssZ");
    var endDateTime = ((midnight.diff(now, "hours") > 2) ? midnight : moment(midnight).add(1, "days")).format("YYYY-MM-DDTHH:mm:ssZ");

    var url = `${TM_API.EVENTS_URL}.json?size=${TM_API.LIMIT}&apikey=${TM_API.KEY}&latlong=${latlong}&radius=10&startDateTime=${startDateTime}&endDateTime=${endDateTime}`;

    window.open(url);//TEMP

    $.ajax({
        type: "GET",
        url: url
    }).then(function(response) {
        var events = response._embedded.events;

        if (events && events.length) {
            for (var i = 0; i < events.length; i++) {
                var data = events[i];

                var event = {
                    name: data.name,
                    id: data.id,
                    url: data.url,
                    imageUrl: ((data.images && data.images.length) ? data.images[0].url : null),
                    localDate: data.dates.start.localDate,
                    localTime: data.dates.start.localTime,
                    startDateTime: data.dates.start.dateTime,
                    priceMin: ((data.priceRanges && data.priceRanges.length) ? data.priceRanges[0].min : null),
                    priceMax: ((data.priceRanges && data.priceRanges.length) ? data.priceRanges[0].max : null),
                    eventDetailUrl: `${TM_API.EVENTS_URL}/${data.id}.json?${TM_API.KEY}`
                }

                var priceStr = `$${event.priceMin}`;
                
                if (event.priceMax !== event.priceMin) {
                    priceStr += ` - $${event.priceMax}`;
                }

                var newDiv = $("<div>");
                newDiv.addClass("event-item");
                newDiv.html(
                    `name: ${event.name}<br>
                    id: ${event.id}<br>
                    url: ${event.url}<br>
                    eventDetailQueryUrl: ${event.eventDetailUrl}<br>
                    imageUrl: ${event.imageUrl}<br>
                    localDate: ${event.localDate}<br>
                    localTime: ${event.localTime}<br>
                    startDateTime: ${event.startDateTime}<br>
                    price: ${priceStr}`
                );
                
                $("#results").append(newDiv);
            }
        } else {
            //no events tonight
        }

    });
}

$(document).ready(function() {
   
    //Initialize carousel
    $('.carousel.carousel-slider').carousel({
        fullWidth: true
    });

    //Get and store user location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            }

            //call functions that require user position here
            GetEntertainmentOptions();
        });
    }

});
