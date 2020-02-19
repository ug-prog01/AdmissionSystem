fetch('http://localhost:4000/confirmed')
.then(response => response.json())
.then(result => {
	var name, roll, branch, prn;
	for(var i=0;i<result.length;i++) {
		name=result[i].Log_Id;
		roll=result[i].Roll_No;
		branch=result[i].Branch;
		add(name, roll, branch);
	}
});

function add(name, roll_no, branch) {
	var tabrow = document.getElementById("tab");
	var tabr = tabrow.insertRow(1);
	var cell1 = tabr.insertCell(0);
	var cell2 = tabr.insertCell(1);
	var cell3 = tabr.insertCell(2);

	cell1.innerHTML = name;
	cell2.innerHTML = roll_no;
	cell3.innerHTML = branch;
}
