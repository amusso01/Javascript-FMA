/*return the document id selected*/
function id(elementId){
	var el = document.getElementById(elementId);
	return el;
}
/*return an element inside a form*/
function setForm(formName, elements){
	var form =document.forms[formName];
	form=form.elements[elements];
	return form;
}
/*change the class in case of error and display error*/
function showError(idName){
	var field = id(idName);
	var value = field.value;
	var text = document.createTextNode("Please enter a valid ");
	var span = id(idName).nextElementSibling;
	var actualText = span.firstChild;
	id(idName).nextElementSibling.setAttribute("class","required");
	span.insertBefore(text,actualText);
}
/*place a "message" inside a text input: document.form.elements["element"]
on focus remove the message*/
function placeholder(message, element){
	var text = message;
	var el = setForm("contactForm", element);
	el.value=text;
	el.setAttribute("class","placeholder");
	el.onfocus=function(){
		if(this.value===text){
			this.value="";
			this.setAttribute("class","text");
			
		}
	}
	el.onblur=function(){
		if(this.value===""){
			this.value=text;
			this.setAttribute("class","placeholder");
			blur("han",/^([Zz][Hh][Aa])[0-9]{6}$/);
		}
	}
}
function checkRegexSubmit(reg,idName){
	var input = id(idName).value;
	var regular = new RegExp(reg);
	if(input=="" || !regular.test(input)){
		return false;
	}else{
		return true;
	}
}
/*Check a field for the correct regular expression*/
function checkRegex(reg,idName){
	var input = id(idName).value;
	var regular = new RegExp(reg);
	var newText = document.createTextNode("The ");
	var newTextAfter =document.createTextNode(" is required");
	var span = id(idName).nextElementSibling;
	var actualText = span.firstChild;
	focus(idName);
	if(input==""){
		span.insertBefore(newText,actualText);
		span.appendChild(newTextAfter);
		id(idName).nextElementSibling.setAttribute("class","required");
		return false;
	}
	else if (!regular.test(input)){
		showError(idName);
		return false;
	}else{
		id(idName).nextElementSibling.setAttribute("class","error");
		return true;
	}
}
/* on focus remove the error message displayed*/
function focus(idName){
	var input = id(idName);
	var placeholder ="e.g. ZHA346783";
	input.onfocus=function(){
		if(id(idName).value==placeholder){
			id(idName).value="";
		}
		var span = id(idName).nextElementSibling;
		var text = span.firstChild.nextSibling;
		id(idName).setAttribute("class","error");
		id(idName).nextElementSibling.setAttribute("class","error");
		span.innerHTML= text.nodeValue;
	}
	
}

/*on blur check a field for regular expression*/
function blur(idName,regex){
	var reg = new RegExp(regex);
	id(idName).onblur=function(){
			checkRegex(reg,idName);
			
		}
	}
 /*Check the <select> element of the form*/
function select(idName){
	var select = id(idName).value;
	var newText = document.createTextNode("The ");
	var newTextAfter =document.createTextNode(" is required");
	var span = id(idName).nextElementSibling;
	var actualText = span.firstChild;
	focus(idName);
	if (select==-1){
		span.insertBefore(newText,actualText);
		span.appendChild(newTextAfter);
		id(idName).setAttribute("class","required");
		id(idName).nextElementSibling.setAttribute("class","required");
		return false;
	}else{
		id(idName).setAttribute("class","error");
		id(idName).nextElementSibling.setAttribute("class","error");
		return true;
	}
}
/*check if the select field has been properly completed(to use onsubmit*/
function selectSubmit(idName){
	var select = id(idName).value;
	if(select==-1){
		return false;
	}else{
		return true;
	}
}
/*Check any not required field for regular expression and return true or false*/
function optional(idName,reg){
	var option =id(idName).value;
	var regular = new RegExp(reg);
	var check=false;
	focus(idName);
	if(option==""){
		check=true;
	}else{
		var tCheck = regular.test(option);
		if(!tCheck){
			showError(idName);
			check = false;
		}else{
			id(idName).setAttribute("class","error");
			id(idName).nextElementSibling.setAttribute("class","error");
			check = true;
		}
	}
	return check;
}
/*check the optional field(to use onsubmit) */
function optionalSubmit(idName,reg){
	var option =id(idName).value;
	var regular = new RegExp(reg);
	var check=false;
	if(option==""){
		check=true;
	}else{
		var tCheck = regular.test(option);
		if(!tCheck){
			check = false;
		}else{
			check = true;
		}
	}
	return check;
}
/*return array of error(true,false) for each field of the form(to use onsubmit)*/
function errorCollection(){
	var error=[];
	var name = checkRegexSubmit(/^([a-zA-Z]){0,}(\'|\s|\-)?[a-zA-Z]{2,}$/g,"fname");
	var sname = checkRegexSubmit(/^([a-zA-Z]){0,}(\'|\s|\-)?[a-zA-Z]{2,}$/g, "sname");
	var title = selectSubmit("title");
	var han = checkRegexSubmit(/^([Zz][Hh][Aa])[0-9]{6}$/,"han");
	var email=checkRegexSubmit(/^\w+([\.! $ & * - = \^ ` | ~ # % ‘ + / ? _ { }]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/,"email");
	var tnumber = optionalSubmit("tnumber",/^\d{11}$/);
	error.push(name,sname,title,han,email,tnumber);

	return error;
}
/*change the class of selected p element to show error message */
function showSubmitMessage(idName){
	var p = id(idName);
	p.setAttribute("class","messageSubmit")
}
/*return the index of the false error in the form */
function errorIndex(){
	var error = errorCollection();
	var errorLenght =error.lenght;
	for (var i=0; i<errorLenght;i++){
		var index=[];
		if(!error[i]){
			index.push(i);
		}
	}
	return index;
}

/*Tooltip code*/
function toolTip(image, bgImg) {           
  id(image).onmouseover = function() {
  var toolTip = id(bgImg);
  toolTip.style.display='block';
  } 	    
  id(image).onmouseout = function() {
  var toolTip = id(bgImg);
  toolTip.style.display='none';
  } 	
}
/*select all the p messages error on submit and change to don't display*/
function pNodeList(){
	var p = document.getElementsByTagName("p");
	var lenght = p.length;
	for(var i=0;i<lenght;i++){
		if(p[i].className=="messageSubmit"){
			p[i].setAttribute("class","donotdisplay");
		}
	}
	
}
/*check form on submit return true or false and display error messages*/
function checkForm(){
	document.getElementById("contactForm").onsubmit=function(){
		pNodeList();
		var index;
		var arrayIndex=[];
		var error = errorCollection();
		var valid = true;
		var errorLenght = error.length;
		for(var i=0;i<errorLenght;i++){
			if(!error[i]){
				index=i;
				arrayIndex.push(index);
				valid=false;
			}
		}
		var l =arrayIndex.length;
		
		for(var x =0; x<l;x++){
			
			switch (arrayIndex[x]){
				case 0:
					showSubmitMessage("fnameMessage");
					break;
				case 1:
					showSubmitMessage("snameMessage");
					break;
				case 2:
					showSubmitMessage("titleMessage");
					break;
				case 3:
					showSubmitMessage("hanMessage");
					break;
				case 4:
					showSubmitMessage("emailMessage");
					break;
				case 5:
					showSubmitMessage("tnumberMessage");
			}
		}
		if(!valid){
			return false;
			
		}else{
			return true;
		}
		
	
	}
}
/*Set focus on first input field*/
function highlight(){
	var fname = setForm("contactForm", 1);
	fname.focus();
}

function bindings(){
	id("title").onblur=function(){
		select("title");
	}
	document.getElementById("tnumber").onblur=function(){
		
		optional("tnumber",/^\d{11}$/);
	};
	checkForm();
	toolTip("tooltip","bgtooltip");
	placeholder("e.g. ZHA346783",7);
}
window.onload=function(){
	highlight()
	blur("fname",/^([a-zA-Z]){0,}(\'|\s|\-)?[a-zA-Z]{2,}$/g);
	blur("sname",/^([a-zA-Z]){0,}(\'|\s|\-)?[a-zA-Z]{2,}$/g);
	blur("email",/^\w+([\.! $ & * - = \^ ` | ~ # % ‘ + / ? _ { }]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/)
	bindings();

}