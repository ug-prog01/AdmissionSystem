const form = document.querySelector('#form4');


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

	var sendobj = {RollT, YoPT, BoardT, MathT, TotT, OutT, RollTw, YoPTw, BoardTw, MathTw, PhyTw, ChemTw, TotTw, OutTw, RollC, BoardC, YoPC, PhyC, ChemC, MathC, TotC, RollJ, YoPJ, PhyJ, ChemJ, MathJ, TotJ};

	fetch('http://localhost:4000/insert1', {
			method : 'POST',
			body : JSON.stringify(sendobj),
			headers : {
				'content-type' : 'application/json'
			}
		});
});
