var app = {
	initialize: function () {
		var appTimeout = 2000;
		var bt = document.querySelectorAll('#ccbutton');
		var lbt = document.querySelectorAll('#loginbutton');
		var bbt = document.querySelectorAll('#babutton');
		var linkaddcc = document.querySelectorAll('#addcclink')[0];
		var linkaddba = document.querySelectorAll('#addbalink')[0];
		var loginform = document.querySelectorAll('#loginform')[0];
		var ccform = document.querySelectorAll('#addccform')[0];
		var baform = document.querySelectorAll('#addbaform')[0];
		var navi = document.querySelectorAll('#nav')[0];
		var ccn;
		var em;
		var bn;
		var result = document.querySelectorAll('#result');
		bt[0].addEventListener('click', function () {
			ccn = document.querySelectorAll('#cc')[0].value;
			console.log("ccn is", ccn);
			result[0].innerHTML = "Please wait";
			setTimeout(function () {
				result[0].innerHTML = (ccn === "1001001") ? "<p class='result bad'>Unable to add your card</p>" : "<p class='result good'>Successfully added your card</p>";
			}, appTimeout);
		});
		bbt[0].addEventListener('click', function () {
			result[0].innerHTML = "Please wait";
			setTimeout(function () {
				bn = document.querySelectorAll('#ban')[0].value;
				result[0].innerHTML = "Please wait";
				setTimeout(function () {
					result[0].innerHTML = (bn === "1001001") ? "<p class='result bad'>Unable to add your bank account</p>" : "<p class='result good'>Successfully added your bank account</p>";
				}, appTimeout);
			});
		});
		lbt[0].addEventListener('click', function () {
			em = document.querySelectorAll('#email')[0].value;
			console.log("email is", em);
			result[0].innerHTML = "Please wait";
			setTimeout(function () {
				if (em === "fail@fail.com") {
					result[0].innerHTML = "<p class='result bad'>Unable to login</p>";
				} else {
					result[0].innerHTML = "<p class='result good'>Logged in as " + em + "</p>";
					loginform.setAttribute('class', 'hidden');
					ccform.setAttribute('class', 'visible');
					navi.setAttribute('class', 'visible');
				}
			}, appTimeout);
		});
		linkaddcc.addEventListener('click', function () {
			result[0].innerHTML = "Please wait";
			setTimeout(function () {
				result[0].innerHTML = "";
				ccform.setAttribute('class', 'visible');
				baform.setAttribute('class', 'hidden');
			}, appTimeout);
		});
		linkaddba.addEventListener('click', function () {
			result[0].innerHTML = "Please wait";
			setTimeout(function () {

				result[0].innerHTML = "";
				ccform.setAttribute('class', 'hidden');
				baform.setAttribute('class', 'visible');

			}, appTimeout);
		});
		document.getElementsByTagName('body')[0].setAttribute('data-loaded', true);

	}

};

window.onload = app.initialize;
