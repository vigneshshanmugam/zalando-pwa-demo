'use strict';

var button = document.querySelector('button');

button.addEventListener('click', function() {
	Notification.requestPermission().then(function(result) {  
        if (result!== 'denied') console.log('Permission granted');
	});
});