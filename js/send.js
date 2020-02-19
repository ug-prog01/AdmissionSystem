const signup = document.getElementById('sign');
const login = document.getElementById('login');
const sory = document.getElementById('sry');

sory.style.display = 'none';

//REGISTER
signup.addEventListener('click', (event) => {
	event.preventDefault();

	var IDe = document.getElementById('USENAME').value;
	var password = document.getElementById('PASS').value;
	var Email = document.getElementById('EMAIL').value;
	var Phone = document.getElementById('PHONE').value;

	if (IDe == "" || password == "" || Email == "" || Phone =="") {
		document.body.style.background = 'red';
		alert("Empty Fields Present!");
	} else if (password.length < 5) {
		document.body.style.background = 'red';
		alert("Password more than 5!");
	} else if (Phone.length != 10) {
		document.body.style.background = 'red';
		alert("Invalid Phone Number!");
	} else {

		var obj = {
			IDe,
			password,
			Email,
			Phone
		};

		var test = 0;

		fetch('http://localhost:4000/signup', {
			method : 'POST',
			body : JSON.stringify(obj),
			headers : {
				'content-type' : 'application/json'
			}
		})
		.then(response => {
			test = response.status;
			if(response.status === 500) {
				document.body.style.background = '#3A4366';
				alert('Registered Successfully');
			} else {
				alert('Encountered some problem!');
			}
		})
		.then(func => {
			if(test === 0) {
			document.body.style.background = 'orange';
			alert('Connection Error!');
		}
	});
	document.getElementById('USENAME').value ="";
	document.getElementById('PASS').value ="";
	document.getElementById('EMAIL').value ="";
	document.getElementById('PHONE').value ="";
	}
});

//LOGIN
login.addEventListener('click', (event) => {
	event.preventDefault();

	var username = document.getElementById('2USENAME').value;
	var password = document.getElementById('2PASS').value;

	if (username == "" || password == "") {
		document.body.style.background = 'red';
		alert("Empty Fields Present!");
	} else {

		var obj = {
			username,
			password
		};

		var test = 0;

		fetch('http://localhost:4000/login', {
			method : 'POST',
			body : JSON.stringify(obj),
			headers : {
				'content-type' : 'application/json'
			}
		})
		.then(response => {
			test = response.status;
			if(response.status === 500) {
				window.location.href="dashboard.html";
			} else if(response.status === 200) {
				window.location.href="admin.html";
			}	else if(response.status === 400) {
				document.body.style.background = 'red';
				alert('Invalid Credentials!!');
			}
		})
		.then(func => {
			if(test === 0) {
				document.body.style.background = 'orange';
				alert('Connection Error!');
			}
		});
	}



	document.getElementById('2USENAME').value ="";
	document.getElementById('2PASS').value ="";
});

// sory.addEventListener('click', (event) => {
// 	event.preventDefault();
//
// 	document.body.style.background = '#3A4366';
// 	sory.style.display = 'none';
// });
