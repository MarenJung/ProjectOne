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
    var endDateTime = ((midnight.diff(now, "hours") > 5) ? midnight : moment(midnight).add(1, "days")).format("YYYY-MM-DDTHH:mm:ssZ");

    var url = `${TM_API.EVENTS_URL}.json?size=${TM_API.LIMIT}&apikey=${TM_API.KEY}&latlong=${latlong}&radius=10&startDateTime=${startDateTime}&endDateTime=${endDateTime}`;

    window.open(url);//TEMP

    $.ajax({
        type: "GET",
        url: url
    }).then(function(response) {
        var events = response._embedded.events;

        if (events && events.length) {
            var hrefs = ["#one!", "#two!", "#three!", "#four!"];
            
            for (var i = 0; i < events.length; i++) {
                var data = events[i];

                var event = {
                    name: data.name,
                    id: data.id,
                    url: data.url,
                    imageUrl: ((data.images && data.images.length) ? data.images[0].url : null),
                    startDate: data.dates.start.localDate,
                    startTime: data.dates.start.localTime,
                    startDateTime: data.dates.start.dateTime,
                    priceMin: ((data.priceRanges && data.priceRanges.length) ? data.priceRanges[0].min : null),
                    priceMax: ((data.priceRanges && data.priceRanges.length) ? data.priceRanges[0].max : null),
                    eventDetailUrl: `${TM_API.EVENTS_URL}/${data.id}.json?apikey=${TM_API.KEY}`
                }

                if (data._embedded.venues && data._embedded.venues.length) {
                    var ven = data._embedded.venues[0];

                    event.venue = {
                        name: ven.name || "",
                        address: ven.address.line1 || "",
                        city: ven.city.name || "",
                        state: {
                            stateCode: ven.state.stateCode || "",
                            name: ven.state.name || ""
                        },
                        postalCode: ven.postalCode || "",
                        location: {
                            longitude: ven.location.longitude || "",
                            latitude: ven.location.latitude || ""
                        }
                    }
                }

                //Create carousel items
                // <div class="carousel-item cyan darken-2 white-text" href="#one!">
                //     <div id="l1"></div>
                // </div>

                var item = $("<div>");
                item.addClass("carousel-item cyan darken-2 white-text center");
                item.attr("href", hrefs[i % (hrefs.length)]);

                var priceStr = event.priceMin ? `$${event.priceMin}` : "";

                if (event.priceMax && (event.priceMax > event.priceMin)) {
                    priceStr += ` - $${event.priceMax}`;
                }

                var title = $(`<h2>${event.name}</h2>`);
                var date = $(`<p>Date: ${event.startDate}</p>`);
                var time = $(`<p>Time: ${event.startTime}</p>`);
                var price = $(`<p>Price: ${priceStr ? priceStr : "???"}</p>`);
                var venue = $(`<p>Venue: ${event.venue.name}</p>`);
                var address = $(`<p>${event.venue.address}<br>${event.venue.city}, ${event.venue.state.stateCode} ${event.venue.postalCode}</p>`);

                item.append(title);
                item.append(date);
                item.append(time);
                item.append(price);
                item.append(venue);
                item.append(address);
                
                $("#eventCarousel").append(item);

                if ($("#eventCarousel").hasClass("initialized")) {
                    $("#eventCarousel").removeClass("initialized");
                }

                $("#eventCarousel").carousel({
                    fullWidth: true,
                    indicators: true
                });
            }
        } else {
            //no events tonight
        }

    });
}

$(document).ready(function() {
   
    // IMPORTANT: ONLY INITIALIZE AFTER FETCHING DATA (See GetEntertainmentOptions() for example)
    // //Initialize carousel
    // $('.carousel.carousel-slider').carousel({
    //     fullWidth: true,
    //     indicators: true
    // });

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
