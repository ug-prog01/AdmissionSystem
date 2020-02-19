//SHOW Username

fetch('http://localhost:4000/session')
  .then(response => response.json())
  .then(result => {
      document.getElementById('parapara').innerHTML = "Welcome, " + result.userId;
  });

	console.log(test);
