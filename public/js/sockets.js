import React from 'react';
// making a request from the client to the server to open up a websocket and keep that connection open
var socket = io();


// function scrollToBottom() {
//     // selectors
//     var messages = jQuery('#messages');
//     var newMessage = messages.children('li:last-child');
//     // heights
//     var clientHeight = messages.prop('clientHeight');
//     var scrollTop = messages.prop('scrollTop');
//     var scrollHeight = messages.prop('scrollHeight');
//     var newMessageHeight = newMessage.innerHeight();
//     var lastMessageHeight = newMessage.prev().innerHeight();
//
//     if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
//         messages.scrollTop(scrollHeight);
//     }
// }

socket.on('connect', function () {
    console.log('Connected to server');
    var params = jQuery.deparam(window.location.search);

    socket.emit('join', params, function(err) {
        if (err) {
            alert(err);
            window.location.href = '/';
        } else {
            console.log('No error');
        }
    });
});

socket.on('updateUserList', function(usersArr) {
    console.log('Users list', usersArr);
    // var ol = jQuery('<ol></ol>');
    //
    // debugger;
    // usersArr.forEach(function(user) {
    //     ol.append(jQuery('<li></li>').text(user));
    // });
    //
    // jQuery('#users').html(ol);


});

// whenever the connection drops
socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

socket.on('newMessage', function(message) {
    console.log('new user in same room!');

    // var formattedTime = moment(message.createdAt).format('h:mm a');
    // var template = jQuery('#message-template').html();
    // var html = Mustache.render(template, {
    //     text: message.text,
    //     from: message.from,
    //     createdAt: formattedTime
    // });
    //
    // jQuery('#messages').append(html);
    // scrollToBottom();
});


socket.on('newLocationMessage', function(message) {
    var formattedTime = moment(message.createdAt).format('h:mm a');

    var template = jQuery('#location-template').html();
    var html = Mustache.render(template, {
        from: message.from,
        createdAt: formattedTime,
        url: message.url
    });

    jQuery('#messages').append(html);
    scrollToBottom();
});


jQuery('#message-form').on('submit', function(e) {
    e.preventDefault();

    var messageTextbox = jQuery('[name=message]')
    socket.emit('createMessage', {
        text: messageTextbox.val()
    }, function() {
        // clear the input
        messageTextbox.val('');
    });
});

var locationButton = jQuery('#send-location');

locationButton.on('click', function() {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser!');
    }

    locationButton.attr('disabled', 'disabled').text('Sending Location...');
    navigator.geolocation.getCurrentPosition(function(position) {
        locationButton.removeAttr('disabled').text('Send Location');
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function() {
        locationButton.removeAttr('disabled').text('Send Location');
        alert('Unable to fetch location');
    })
});