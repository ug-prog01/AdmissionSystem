fetch('http://localhost:4000/notconfirmed')
.then(response => response.json())
.then(result => {
	var name, branch;
	for(var i=0;i<result.length;i++) {
		name=result[i].Log_Id;
		branch=result[i].Branch;
		console.log(branch);
		add(name, branch);
	}
});

function add(name, branch) {
	var tabrow = document.getElementById("tab");
	var tabr = tabrow.insertRow(1);
	var cell1 = tabr.insertCell(0);
	var cell2 = tabr.insertCell(1);

	cell1.innerHTML = name;
	cell2.innerHTML = branch;

}
