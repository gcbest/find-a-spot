function initMap(centerLocation = {lat: -25.363, lng: 131.044}, markerLocationArr = [{lat: -25.363, lng: 131.044}]) {
    var geocoder = new google.maps.Geocoder();

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: centerLocation
    });

    markerLocationArr.forEach((spot) => {
        var marker = new google.maps.Marker({
            position: spot,
            animation: google.maps.Animation.DROP,
            map: map
        });

        marker.addListener('click', () => {
            var position = marker.getPosition();
            var infowindow = new google.maps.InfoWindow;
            map.setCenter(position);

            geocoder.geocode({'location': spot}, function(results, status) {
                if (status === 'OK') {
                    if (results[0]) {
                        infowindow.setContent(results[0].formatted_address);
                        infowindow.open(map, marker);
                    } else {
                        window.alert('No results found');
                    }
                } else {
                    window.alert('Geocoder failed due to: ' + status);
                }
            });
        });
    });

    // Close info window if open
    map.addListener('click', () => {
        alert('Clicked');
        if (infowindow) {
            infowindow.close();
        }
    });
}

module.exports = initMap;