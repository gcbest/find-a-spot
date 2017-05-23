function initMap(centerLocation = {lat: -25.363, lng: 131.044}, markerLocationArr = [{lat: -25.363, lng: 131.044}]) {
    var uluru = {lat: -25.363, lng: 131.044};

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: centerLocation
    });

    markerLocationArr.forEach((spot) => {
        var marker = new google.maps.Marker({
            position: spot,
            animation: google.maps.Animation.DROP,
            map: map
        });
    });

}

module.exports = initMap;