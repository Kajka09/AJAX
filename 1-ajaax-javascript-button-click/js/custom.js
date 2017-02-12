 'use strict';
//definicja funkcji ajax
function ajax (ajaxOptions) {
	
//	parametry połączenia i jego typu
	var options = {
		type:ajaxOptions.type || "POST",
		url:ajaxOptions.url || "",
		onComplete:ajaxOptions.onComplete || function (){},
		onError:ajaxOptions.onError || function () {},
		onSuccess:ajaxOptions.onSuccess || function () {},
		dataType: ajaxOptions.dataType || "text"
	};
	
//	funkcja sprawdzająca czy połączenie się udało?
	function httpSuccess (httpRequest) {
		try {
			return (httpRequest.status >=200 && httpRequest.status <300 ||
				httpRequest.status ==304 ||
				navigator.userAgent.indexOf("Safari") >= 0 && typeof httpRequest.status =="undefined");
		} catch (e) {
			return false; 
		}
	}
	
	
//	utworzenie obiektu
	var httpReq = new XMLHttpRequest();
	
//	otwarcie połączenia
	httpReq.open(options.type, options.url, true);
	
	
//	jeśli stan dokumentu został zmieniony --> httpReq.readyState
//	0:połączenie nienawiązane,
//	1:połączenie nawiązane,
//	2:żądanie odebrane,
//	3:przetwarzanie,
//	4:dane zwrócone i gotowe do użycia
	
	httpReq.onreadystatechange = function () {

		//	jeśli 4: dane zwrócone i gotowe do użycia
		if (httpReq.readyState == 4){
		
			//sprawdź status połączenia
			if (httpSuccess (httpReq)) {
				
				//jeśli dane w formacie XML to zwróć obiektreturnXML, w przeciwnym wypadku responseText (JSON to tekst)
				var returnData = (options.dataType =="xml")? httpReq.responseXML: httpReq.responseText;
				
				//jesli wszystko ok
				options.onSuccess(returnData);
				//console.log(returnData);
				
				//zeruj obiekt, aby nie utrzymywać niepotrzebnego już połączenia z serwerem
				httpReq = null;
				
			}	else {
				//w przypadku błędu
				options.onError(httpReq.statusText);
			}
		
		}	
	}
	
	httpReq.send();
}







function pobierzDane (event) {
	event.preventDefault();
	
//	console.log("działa");
	
	ajax({
		type: "GET",
		url:
		"http://echo.jsontest.com/userId/108/userName/Akademia108/userURL/akademia108.pl",
		onError: function (msg) {
			console.log(msg);
		},
		onSuccess: function (response) {
			console.log("połączenie działa i dane sa pobierane");
			var jsonObj = JSON.parse(response);
//			console.log(jsonObj);
			
			var pUserId = document.createElement('p');
			var pUserName = document.createElement('p');
			var pUserURL = document.createElement('p');
			
			pUserId.innerHTML = "User ID: " + jsonObj.userId;
			pUserName.innerHTML = "User Name: " + jsonObj.userName;
			pUserURL.innerHTML = "User URL: http://" + jsonObj.userURL + "<br>-------";
			
			document.body.appendChild(pUserId);
			document.body.appendChild(pUserName);
			document.body.appendChild(pUserURL);
			
		}
	})
}