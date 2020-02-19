const form5 = document.querySelector('#form5');

form5.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(form5);
  
	var F_Name    = formData.get('Full_name');
  var Contact   = formData.get('Contact');
  var EmailP    = formData.get('Email_parent');
  var Occu      = formData.get('Occupation');
  var Ofad      = formData.get('Office_add');

  var sendobj = {F_Name, Contact, EmailP, Occu, Ofad};

	fetch('http://localhost:4000/insert3', {
			method : 'POST',
			body : JSON.stringify(sendobj),
			headers : {
				'content-type' : 'application/json'
			}
		});
});
