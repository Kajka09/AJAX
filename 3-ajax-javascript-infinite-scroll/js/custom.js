$(document).ready(function () {
	'use strict';
	
	$(window).scroll(function () {
//		console.log($(window).scrollTop());
		
		if ($(window).scrollTop() + $(window).height() == $(document).height()) {
			var begining = document.createElement('p');	
			begining.innerHTML = "<br><br><br><br><br><br><br><br><br>---BEGINING---";	
			document.body.appendChild(begining);
			
			$.getJSON("https://jsonplaceholder.typicode.com/users", function(data) {
//				console.log(data);
				$(data).each(function (i){
			
				var pUserId = document.createElement('p');
                var pUserName = document.createElement('p');
                var pUserURL = document.createElement('p');
				
                pUserId.innerHTML = "User ID: " + data[i].id;
                pUserName.innerHTML = "User Name: " + data[i].name;
                pUserURL.innerHTML = "User URL: http://" + data[i].website + "<br>----";
				
				
                document.body.appendChild(pUserId);
                document.body.appendChild(pUserName);
                document.body.appendChild(pUserURL);
				
				})
			var end = document.createElement('p');
			end.innerHTML = "----END----";
			document.body.appendChild(end);
			});
		}
	});
	
	
	
	
	
});