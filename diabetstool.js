function id(elementId){
	var el = document.getElementById(elementId);
	return el;
}
/*This function return array of element with attribute name = fn(argument)*/
function radioLi(name){
	var el = document.getElementsByName(name);
	return el;
}
/*Set attribute checked to true on row*/
function check(row){
	var el = radioLi(row);
	el[0].checked = true;
}
/*Return a value of field as an integer*/
function value(field) {
    var int;
	var row = radioLi(field);
        for (var i=0; i < row.length; i++) {
            if (row[i].checked==true) {    
            int = row[i].value;
			int = parseFloat(int);
			return int;
        }
    }
}
/*Return the value of each row in an array[first Row, second,....]*/
function totalValue(){
	var firstRow = value("age");
	var secondRow = value("bmi");
	var thirdRow = value("fstory");
	var fourthRow = value("diet");
	var total=[firstRow,secondRow,thirdRow,fourthRow];
	return total;
}
/*Return the total risk factor for the form.*/
function risk(){
	var total=0;
	var totalRow = totalValue();
	for(var i= 0; i < totalRow.length; i++){
		total += totalRow[i];
	}
	return total;
}
/*Retunr the major risk factor for the form in an array*/
function riskFactor(){
	var riskFactor = [];
	var totalRow = totalValue();
	for(var i= 0; i < totalRow.length; i++){
		if(totalRow[i]>=10){
			riskFactor.push(i);
		}
	}
	var lenght =riskFactor.length;
	for(var x= 0; x < lenght; x++){
		if(riskFactor[x]==0){
			riskFactor.splice(x,1,"Age");
		}else if(riskFactor[x]==1){
			riskFactor.splice(x,1,"BMI");
		}else if(riskFactor[x]==2){
			riskFactor.splice(x,1,"Family");
		}else if(riskFactor[x]==3){
			riskFactor.splice(x,1,"Diet");
		}
	}
	return riskFactor;
}
/*return the string with the main risk factor(s)*/
function mainRisk(){
	var highRisk = "Your main risk factor";
	var risk = riskFactor();
	switch (risk.length){
		case 1:
			highRisk+= " is your " + risk[0]+".";
			break;
		case 2:
			highRisk+= "s are your "+risk[0]+" and your "+risk[1]+".";
			break;
		case 3:
			highRisk+="s are your " +risk[0]+ ", "+risk[1]+" and your "+risk[2]+".";
			break;
		case 4:
			highRisk+="s are your "+ risk[0]+ ", "+risk[1]+", "+risk[2]+" and your "+risk[3]+".";
			break;
		default:
			highRisk="";
			break;
	}
	return highRisk;
}
/*return the risk factor as high||medium||low*/
function message(){
	var rMessage = risk();
	var fMessage;
	if (rMessage >25){
		fMessage = "high"
	}else if(rMessage>15){
		fMessage="medium"
	}else{
		fMessage="low"
	}
	return fMessage
}

/*On click fill the <p> and <a> element of the aside pannel*/
id("calculate").onclick=function(){
	this.setAttribute("disabled","disabled");
	var mess = message(); 
	var p = id("risk");
	var a = id("link");
	var fMessage;
	var sMessage;
	var link;
	switch(mess){
		case "high":
			fMessage = document.createTextNode("Your results show that you currently have a HIGH risk of developing diabetes. "+ mainRisk()+" We advise that you contact the Health Authority to discuss your risk factors as soon as you can. Please fill in our ")
			sMessage = document.createTextNode(" and a member of the Health Authority Diabetes Team will be in contact with you.")
			link = document.createTextNode("contact form");
			a.setAttribute("href","contactform.html");
			a.appendChild(link);
			p.insertBefore(fMessage,a);
			p.appendChild(sMessage);
			break;
		case "medium":
			fMessage= document.createTextNode("Your results show that you currently have a medium risk of developing diabetes. For more information on your risk factors, and what to do about them, please visit our diabetes advice website at ");
			link =document.createTextNode("http://www.zha.org.zd.");
			a.setAttribute("href","https://www.diabetes.org.uk/ndpp?gclid=Cj0KEQjw2ay8BRC7sYequMydsq0BEiQAbEX9UFOg5rNs1F_XMva0AiC67P3bGSh5z7KtJFKcmCI3jboaAkUx8P8HAQ");
			p.insertBefore(fMessage,a);
			a.appendChild(link);
			break;
		default:
			fMessage=document.createTextNode("Your results show that you currently have a low risk of developing diabetes. However, it is important that you maintain a healthy lifestyle in terms of diet and exercise.");
			p.appendChild(fMessage);
			break;
	}
	var box = document.getElementById("message");
	var h2 = p.previousElementSibling;
	h2.innerHTML="Your Result";
	box.setAttribute("class","displayResult");

}


window.onload = function(){
id("calculate").disabled=false;
	check("fstory");
	check("age");
	check("bmi");
	check("diet");
}