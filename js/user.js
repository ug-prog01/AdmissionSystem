//SHOW INFO

	fetch('http://localhost:4000/user')
    .then(response => response.json())
    .then(result => {
      document.getElementById('usename').value = result[0].Log_Id;
      document.getElementById('emailId').value = result[0].Email;
      document.getElementById('phone').value = result[0].Phone_Num;
    });
