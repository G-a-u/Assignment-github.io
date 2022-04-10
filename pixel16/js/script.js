	var nameField = false;
	var emailField = false;
	var phoneField = false;
	var phone;
	// state Array to show state
	var stateArr = [
		{start:001, end:027, state:"West Bengal"},
		{start:028, end:055, state:"Uttarakhand"},
		{start:056, end:080, state:"Orissa"},
		{start:081, end:100, state:"Nagaland"},
		{start:101, end:128, state:"Tripura"},
		{start:129, end:160, state:"Telangana"},
		{start:161, end:180, state:"Himachal Pradesh"},
		{start:181, end:201, state:"Arunachal Pradesh"},
		{start:202, end:225, state:"Haryana"},
		{start:226, end:270, state:"Andhra Pradesh"},
		{start:271, end:300, state:"Assam"},
		{start:301, end:325, state:"Andaman and Nicobar (UT)"},
		{start:326, end:360, state:"Bihar"},
		{start:361, end:380, state:"Chandigarh (UT)"},
		{start:381, end:400, state:"Chhattisgarh"},
		{start:401, end:427, state:"Dadra and Nagar Haveli (UT)"},
		{start:428, end:460, state:"Daman and Diu (UT)"},
		{start:461, end:480, state:"Delhi"},
		{start:481, end:500, state:"Gujarat"},
		{start:501, end:527, state:"Goa"},
		{start:528, end:555, state:"Jammu and Kashmir"},
		{start:556, end:570, state:"Jharkhand"},
		{start:571, end:590, state:"Karnataka"},
		{start:591, end:620, state:"Mizoram"},
		{start:621, end:650, state:"Kerala"},
		{start:651, end:670, state:"Lakshadweep (UT)"},
		{start:671, end:700, state:"Madhya Pradesh"},
		{start:701, end:750, state:"Maharashtra"},
		{start:751, end:770, state:"Manipur"},
		{start:771, end:790, state:"Meghalaya"},
		{start:791, end:820, state:"Puducherry (UT)"},
		{start:821, end:856, state:"Punjab"},
		{start:857, end:880, state:"Rajasthan"},
		{start:881, end:920, state:"Sikkim"},
		{start:921, end:955, state:"Tamil Nadu"},
		{start:956, end:999, state:"Uttar Pradesh"}
]
	//Submit button enabled disable
	function toggleSubmit(){
		if(nameField && emailField && phoneField){
			document.getElementById("submit").disabled = false;
		}else{
			document.getElementById("submit").disabled = true;
		}
	}
	
	// validation for input fields
	function nameValidation(name){
	var regex = /^[a-zA-Z ]*$/;
	if(regex.test(name)){
	nameField = true;
	toggleSubmit()
		return true;
	}else{
		nameField = false;
			toggleSubmit()
	alert("Please enter valid name");
		return false;
	}
	}

	function emailValidation(email){
	var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z]{2,4})+$/;
	if(regex.test(email)){
		emailField = true;
		toggleSubmit()
		return true;
	}else{
	emailField = false;
		toggleSubmit()
		alert("Please enter valid email address");
	return false;
	}

	}

	function getState(stateString){
		var len = stateArr.length;
		var inputStr = parseInt(stateString);
		for(var i=0;i<len;i++){
			if(inputStr <= stateArr[i].end && inputStr >= stateArr[i].start ){
			return stateArr[i].state;
			}
		}
	}
	function detectOperator(number){

		if(number<= 799 && number>=621 ){
			return " Reliance Jio ";
		}else if(number<= 920 && number>=801 ){
			return "Idea ";
		}else if(number<= 999 && number>=921 ){
			return "Vodafone ";
		}  

	}
	function formatPhoneNumber(phoneNumberString) {
		phone = phoneNumberString;
	  var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
	  var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
	  if (match) {
		var intlCode = detectOperator(match[1])
		var state = getState(match[2]);
		var opAndState = intlCode+", "+state +" ";
		phoneField = true;
		toggleSubmit()
		document.getElementById("operatorState").value = opAndState;
		return  document.getElementById("phone").value=['(', match[1], ') - ', match[2], '-', match[3]].join('');
	   //console.log( [intlCode, '(', match[1], ') ', match[2], '-', match[3]].join(''))
	  }else {
	phoneField = false
	toggleSubmit()
	alert("Please enter valid Phone nubmber");
	return null;
	  //console.log(null)
}
	
	  
	}
	
	
	function submitData(e){
		var ranNum = Math.floor((Math.random() * 10000) + 4);
		
		localStorage.setItem("userName", document.getElementById("fname").value);
		localStorage.setItem("phone", document.getElementById("phone").value);
		localStorage.setItem("ranNumber", ranNum);
		document.getElementById("fname").value = "";
		document.getElementById("phone").value = "";
		document.getElementById("email").value = "";
		window.location.href = "./ThankYou.html";
	}
	
	/* THANK YOU page */
	
	var getRandomNUmber;
	var counter = 0
	function init(){
		getRandomNUmber = localStorage.getItem("ranNumber");
		console.log(getRandomNUmber)
		var uname = localStorage.getItem("userName").split(/(\s+)/);
		document.getElementById("userFname").innerText  = uname[0];
		document.getElementById("number").innerText  = localStorage.getItem("phone");
	}
	function validateNums(nums){
		
		let numLen = nums.length;
		let isNumber = parseInt(nums);
		
		if(numLen===4){
			document.getElementById("Validate").disabled = false;
		}else{
			document.getElementById("Validate").disabled = true;
		}
		if(!isNumber){
			alert("Please enter numbers only");
			return;
		}
	}
	function vCodeValidation(){
		var verification = document.getElementById("vCode").value;
		
		if(verification === getRandomNUmber){
			counter = 0
			document.getElementsByClassName("validationSuccess")[0].style.display  = "block";
			document.getElementsByClassName("ValidationForm")[0].style.display  = "none";
			document.getElementsByClassName("incorectCode")[0].style.display  = "none";
		}else{
		document.getElementsByClassName("incorectCode")[0].style.display  = "block";
			counter++;
			if(counter>2){
				localStorage.setItem("ranNumber", "");
				window.location.href = "./404Page.html";
			}
		}
		
			document.getElementById("vCode").value = "";
		
	}
	init();
