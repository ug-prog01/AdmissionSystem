const form2 = document.querySelector('#formPersonal');
const form5 = document.querySelector('#formBank')
const form = document.querySelector('#formAca');
const form4 = document.querySelector('#formParent');
const form6 = document.querySelector('#formDocs');
const suces = document.querySelector('#success');
const pa = document.querySelector('#para');
const final = document.getElementById("final");
const Bank = document.getElementById("Bank");
const Personal = document.getElementById("Personal");
const Academic = document.getElementById("Academic");

var sendobj1, sendobj2, sendobj3, sendobj4, sendobj5;

form6.style.display='none';
suces.style.display='none';
form4.style.display='none';
form.style.display='none';
form5.style.display='none';
//INSERT PERSONAL
form2.addEventListener('submit', (event) => {
	event.preventDefault();

	const formData2 = new FormData(form2);
	var FName = formData2.get('First_Name');
	var MName = formData2.get('Middle_Name');
	var LName = formData2.get('Last_Name');
	var MoName = formData2.get('Mother_Name');
	var DaOB = formData2.get('Birthday_Day');
	var Email = formData2.get('Email_Id');
	var Phone = formData2.get('Mobile_Number');
	var Aadhar = formData2.get('Aadhar Number');
	var Gender = formData2.get('Gender');
	var Branch = formData2.get('Branch');
	var Address = formData2.get('Address');
	var City = formData2.get('City');
	var Pin = formData2.get('Pin_Code');
	var State = formData2.get('State');
	var Category = formData2.get('Category1');
	var SubCategory = formData2.get('Category');
	var StOD = formData2.get('Category2');
	var Branch = formData2.get('Branch');

	sendobj1 = {FName, MName, LName, MoName, DaOB, Email, Phone, Aadhar, Gender, Branch, Address, City, Pin, State, Category, SubCategory, StOD, Branch};

		form2.style.display='none';
		pa.innerHTML = "Academics";
		form.style.display='';
});

form.addEventListener('submit', (event) => {
	event.preventDefault();

	const formData2 = new FormData(form);

	var RollT  = formData2.get('Roll_no_10th');
  var YoPT   = formData2.get('YOP_10th');
  var BoardT = formData2.get('Board_10th');
  var MathT  = formData2.get('Maths_10th');
  var TotT   = formData2.get('Total_10th');
  var OutT   = formData2.get('Out_of10th');

  var RollTw  = formData2.get('Roll_no12th');
  var YoPTw   = formData2.get('YOP_12th');
  var BoardTw = formData2.get('Board_12th');
  var MathTw  = formData2.get('Maths_12th');
  var PhyTw   = formData2.get('Phy_12th');
  var ChemTw  = formData2.get('Chem_12th');
  var TotTw   = formData2.get('Total_12th');
  var OutTw   = formData2.get('Out_off_12th');

  var RollC   = formData2.get('Roll_no');
  var BoardC  = formData2.get('Board_CET');
  var YoPC    = formData2.get('YOP_CET');
  var PhyC    = formData2.get('Phy_CET');
  var ChemC   = formData2.get('Chem_CET');
  var MathC   = formData2.get('Math_CET');
  var TotC    = formData2.get('Total_CET');

  var RollJ   = formData2.get('Roll_no_JEE');
  var YoPJ    = formData2.get('YOP_JEE');
  var PhyJ    = formData2.get('Phy_JEE');
  var ChemJ   = formData2.get('Chem_JEE');
  var MathJ   = formData2.get('Maths_JEE');
  var TotJ    = formData2.get('Total_JEE');

	sendobj2 = {RollT, YoPT, BoardT, MathT, TotT, OutT, RollTw, YoPTw, BoardTw, MathTw, PhyTw, ChemTw, TotTw, OutTw, RollC, BoardC, YoPC, PhyC, ChemC, MathC, TotC, RollJ, YoPJ, PhyJ, ChemJ, MathJ, TotJ};

		form.style.display='none';
		pa.innerHTML = "Bank";
		form5.style.display='';
});

form5.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(form5);

	var B_Name    = formData.get('Bank_name');
  var Br_Name   = formData.get('Branch_name');
  var Acc_No    = formData.get('Acc_no');
  var Ifsc      = formData.get('IFSC');
  var Micr      = formData.get('MICR');

  sendobj3 = {B_Name, Br_Name, Acc_No, Ifsc, Micr};

		form5.style.display='none';
		pa.innerHTML = "Parent/Guardian";
		form4.style.display='';
});

form4.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(form4);

	var F_Name    = formData.get('Full_name');
  var Contact   = formData.get('Contact');
  var EmailP    = formData.get('Email_parent');
  var Occu      = formData.get('Occupation');
  var Ofad      = formData.get('Office_add');

  sendobj4 = {F_Name, Contact, EmailP, Occu, Ofad};

	fetch('http://localhost:4000/insert', {
			method : 'POST',
			body : JSON.stringify(sendobj1),
			headers : {
				'content-type' : 'application/json'
			}
		});
	fetch('http://localhost:4000/insert1', {
			method : 'POST',
			body : JSON.stringify(sendobj2),
			headers : {
				'content-type' : 'application/json'
			}
		});
	fetch('http://localhost:4000/insert2', {
			method : 'POST',
			body : JSON.stringify(sendobj3),
			headers : {
				'content-type' : 'application/json'
			}
		});
	fetch('http://localhost:4000/insert3', {
			method : 'POST',
			body : JSON.stringify(sendobj4),
			headers : {
				'content-type' : 'application/json'
			}
		});

		pa.innerHTML = "Documents";
		form4.style.display='none';
		form6.style.display='';
});




form6.addEventListener('submit', (event) => {
		form6.style.display='none';
		pa.innerHTML = "";
		suces.style.display='';
});



suces.addEventListener('submit', (event) => {
	event.preventDefault();

	suces.style.display = 'none';
	form2.style.display = '';
	form.style.display = '';
	form5.style.display = '';
	form4.style.display = '';
	final.style.display = 'none';
	back_to_B.style.display = 'none';
	back_to_E.style.display = 'none';
	back_to_P.style.display = 'none';
	Bank.style.display = 'none';
	Academic.style.display = 'none';
	Personal.style.display = 'none';
});
