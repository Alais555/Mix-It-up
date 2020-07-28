const btn = document.getElementById("searchbtn");
const reqArray = [];
btn.onclick = function(event) {
  event.preventDefault();
  const alchoholForm = document.getElementsByName("alcohol");
  for (i = 0; i < alchoholForm.length; i++) {
    if (alchoholForm[i].checked) {
      reqArray.push(alchoholForm[i].value);
    }
    console.log(alchoholForm[i]);
  }
  const sweetnerForm = document.getElementsByName("sweetner");
  for (i = 0; i < sweetnerForm.length; i++) {
    if (sweetnerForm[i].checked) {
      reqArray.push(sweetnerForm[i].value);
    }
  }
  const sourInputs = document.getElementsByName("sour");
  for (i = 0; i < sourInputs.length; i++) {
    if (sourInputs[i].checked) {
      reqArray.push(sourInputs[i].value);
    }
  }
  const url = `/cocktails?ingredients=${reqArray.join(",")}`;
  window.location.href = url;
};
