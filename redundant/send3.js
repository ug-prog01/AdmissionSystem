const form5 = document.querySelector('#form5');

// fetch('http://localhost:4000/show', {
//    headers: {
//        Authorization: 'Bearer EqFyi1Yq1tD9mxY8F38sxDfp73pFd7FP'
//    }
// })
// .then((response) => {console.log(response);response.blob()})
// .then((blob) => {
//     console.log(blob);
//     const imageUrl = URL.createObjectURL(blob);
//     const img = document.querySelector('img');
//     img.addEventListener('load', () => URL.revokeObjectURL(imageUrl));
//     document.querySelector('img').src = imageUrl;
// });

form5.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(form5);

	var B_Name    = formData.get('Bank_name');
  var Br_Name   = formData.get('Branch_name');
  var Acc_No    = formData.get('Acc_no');
  var Ifsc      = formData.get('IFSC');
  var Micr      = formData.get('MICR');

  var sendobj = {B_Name, Br_Name, Acc_No, Ifsc, Micr};

	fetch('http://localhost:4000/insert3', {
			method : 'POST',
			body : JSON.stringify(sendobj),
			headers : {
				'content-type' : 'application/json'
			}
		});
});
