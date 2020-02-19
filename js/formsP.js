const form = document.querySelector('#form');
const sub = document.querySelector('#submit');
const delete1 = document.querySelector('#del');
const user = document.getElementById('user');
const paragraph = document.getElementById('para');

const CaP 	 = document.getElementById('CAP');
const Mk10 	 = document.getElementById('MK 10');
const Mk12 	 = document.getElementById('MK 12');
const Lc 		 = document.getElementById('LC');
const Caste  = document.getElementById('Caste');
const Nation = document.getElementById('Nation');

console.log(CaP);

var FName  = document.getElementsByName('First_Name');
var MName  = document.getElementsByName('Middle_Name');
var LName  = document.getElementsByName('Last_Name');
var MoName = document.getElementsByName('Mother_Name');
var Email  = document.getElementsByName('Email_Id');
var TotT   = document.getElementsByName('Total_10th');
var OutT   = document.getElementsByName('Out_of10th');
var TotTw  = document.getElementsByName('Total_12th');
var OutTw  = document.getElementsByName('Out_off_12th');
var TotC   = document.getElementsByName('Total_CET');
var TotJ   = document.getElementsByName('Total_JEE');
var B_Name = document.getElementsByName('Bank_name');
var Br_Name= document.getElementsByName('Branch_name');
var Acc_No = document.getElementsByName('Acc_no');
var Ifsc   = document.getElementsByName('IFSC');
var Micr   = document.getElementsByName('MICR');
var F_Name = document.getElementsByName('Full_name');
var Contact= document.getElementsByName('Contact');
var EmailP = document.getElementsByName('Email_parent');
var Occu   = document.getElementsByName('Occupation');
var Ofad   = document.getElementsByName('Office_add');

form.style.display ='none';

delete1.addEventListener('click', (event) => {
	event.preventDefault();
	var User = {
		username : user.value
	};
	fetch('http://localhost:4000/deletef', {
			method : 'POST',
			body : JSON.stringify(User),
			headers : {
				'content-type' : 'application/json'
			}
		})
		.then(response => {
			form.reset();
			form.style.display = 'none';
			alert('Deleted!');
		});
});

form.addEventListener('submit', (event) => {
	event.preventDefault();

	var Roll = document.getElementsByName('A_Roll');
	var RollN = {
		username : user.value,
		Roll : Roll[0].value,
		FName : FName[0].value,
		MName : MName[0].value,
		LName : LName[0].value,
		MoName : MoName[0].value,
		Email : Email[0].value,
		TotT : TotT[0].value,
		OutT : OutT[0].value,
		TotTw : TotTw[0].value,
		OutTw : OutTw[0].value,
		TotC : TotC[0].value,
		TotJ : TotJ[0].value,
		B_Name : B_Name[0].value,
		Br_Name : Br_Name[0].value,
		Acc_No : Acc_No[0].value,
		Ifsc : Ifsc[0].value,
		Micr : Micr[0].value,
		F_Name : F_Name[0].value,
		Contact : Contact[0].value,
		EmailP : EmailP[0].value,
		Occu : Occu[0].value,
		Ofad : Ofad[0].value
	};
	fetch('http://localhost:4000/setconfirmed', {
			method : 'POST',
			body : JSON.stringify(RollN),
			headers : {
				'content-type' : 'application/json'
			}
		})
		.then(response => {
			form.reset();
			form.style.display = 'none';
			alert('Confirmed');
		});
});

sub.addEventListener('submit', (event) => {
	event.preventDefault();

	paragraph.innerHTML = user.value + "'s Form";

	form.style.display = '';
	sub.style.display = 'none';

	var username = {
		username : user.value
	};

	fetch('http://localhost:4000/form', {
			method : 'POST',
			body : JSON.stringify(username),
			headers : {
				'content-type' : 'application/json'
			}
		})
    .then(response => response.json())
    .then(result => {

			FName[0].value = result[0].First_N;
			MName[0].value = result[0].Father_N;
			LName[0].value = result[0].Last_N;
			MoName[0].value = result[0].Mother_N;
			Email[0].value = result[0].Email;

    });

	fetch('http://localhost:4000/form2', {
			method : 'POST',
			body : JSON.stringify(username),
			headers : {
				'content-type' : 'application/json'
			}
		})
    .then(response => response.json())
    .then(result => {



			TotT[0].value = result[0].SSC_Got;
			OutT[0].value = result[0].SSC_Out;

			TotTw[0].value = result[0].HSC_Got;
			OutTw[0].value = result[0].HSC_Out;

			TotC[0].value = result[0].CET_Total;
			TotJ[0].value = result[0].JEE_Total;
		});

	fetch('http://localhost:4000/form3', {
			method : 'POST',
			body : JSON.stringify(username),
			headers : {
				'content-type' : 'application/json'
			}
		})
    .then(response => response.json())
    .then(result => {

			B_Name[0].value = result[0].B_Name;
			Br_Name[0].value = result[0].B_Branch;
			Acc_No[0].value = result[0].Acc_No;
			Ifsc[0].value = result[0].IFSC_No;
			Micr[0].value = result[0].MICR_No;

		});

	fetch('http://localhost:4000/form4', {
			method : 'POST',
			body : JSON.stringify(username),
			headers : {
				'content-type' : 'application/json'
			}
		})
    .then(response => response.json())
	    .then(result => {

				F_Name[0].value = result[0].Name;
				Contact[0].value = result[0].Contact;
				EmailP[0].value = result[0].Email;
				Occu[0].value = result[0].Occupation;
				Ofad[0].value = result[0].Office_Add;
			});

	fetch('http://localhost:4000/docs', {
			method : 'POST',
			body : JSON.stringify(username),
			headers : {
				'content-type' : 'application/json'
			}
		})
		.then(response => response.json())
			.then(result => {
				CaP.src = result[0].img;
				Mk10.src = result[1].img;
				Mk12.src = result[2].img;
				Lc.src = result[3].img;
				Nation.src = result[4].img;
				Caste.src = result[5].img;
			});

});
