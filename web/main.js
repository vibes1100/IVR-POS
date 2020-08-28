async function generateHome() {
	document.getElementById("home").style.display = "block";
	document.getElementById("displaycart").style.display = "none";
	document.getElementById("assistant").style.display = "none";
	var voicedots = document.getElementsByClassName("voicedot");
	for(i=0;i<voicedots.length;i++){
		voicedots[i].classList.remove("active");
	}
}
async function generateTable() {
	document.getElementById("test").innerHTML = "";
	document.getElementById("home").style.display = "none";
	document.getElementById("displaycart").style.display = "block";
	document.getElementById("assistant").style.display = "none";
	var voicedots = document.getElementsByClassName("voicedot");
	for(i=0;i<voicedots.length;i++){
		voicedots[i].classList.remove("active");
	}
	var data = document.getElementById("data").value;
	eel.eel_printer()(dispTable);
}

async function generateAssistant() {
	document.getElementById("home").style.display = "none";
	document.getElementById("displaycart").style.display = "none";
	document.getElementById("assistant").style.display = "block";
	var voicedots = document.getElementsByClassName("voicedot")
	for(i=0;i<voicedots.length;i++){
		voicedots[i].classList.toggle("active");
	}
}

async function generateBill() {
	var data = document.getElementById("data").value;
	eel.eel_printer()(dispTable);
}
// function setImage(string) {
// 	alert(string)
// 	document.getElementById("test").innerHTML = string
// }
function dispTable(table) {
	var tablehtml ="<table class='sqldisp'>";
	var i,j=0;
	for(i=0;i<table.length;i++){
		if(i%2==0){
			tablehtml+="<tr style='background: lavender'>";
		}
		else{
			tablehtml+="<tr style='background: white'>"	;
		}
		for(j=0;j<table[i].length;j++){
			tablehtml += "<td><pre>"+table[i][j]+"\t</pre><td>";
		}
		tablehtml+="</tr>";
	}
	tablehtml+="</table>";
	document.getElementById("test").innerHTML = tablehtml;
}