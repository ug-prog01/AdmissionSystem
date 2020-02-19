const back_to_P = document.getElementById('back_to_P');
const back_to_E = document.getElementById('back_to_E');
const back_to_B = document.getElementById('back_to_B');

back_to_P.addEventListener('click', (event) => {
  event.preventDefault();

  form2.style.display = '';
  form.style.display = 'none';
});

back_to_E.addEventListener('click', (event) => {
  event.preventDefault();

  form.style.display = '';
  form5.style.display = 'none';
});

back_to_B.addEventListener('click', (event) => {
  event.preventDefault();

  form5.style.display = '';
  form4.style.display = 'none';
});
