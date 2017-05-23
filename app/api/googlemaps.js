function initMap(centerLocation = {lat: -25.363, lng: 131.044}, markerLocationArr = [{lat: -25.363, lng: 131.044}]) {
    var geocoder = new google.maps.Geocoder();
    var uluru = {lat: -25.363, lng: 131.044};

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
            map.setCenter(position);
            geocoder.geocode({
                'latLng': position
            }, function(results, status) {
                if (status === google.maps.GeocoderStatus.OK) {
                    if (results[0]) {
                        alert(results[0].formatted_address);
                    }
                }
            });
        })
    });
}

module.exports = initMap;