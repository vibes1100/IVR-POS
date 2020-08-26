async function initial() {
	document.getElementById("home").style.display = "block";
	document.getElementById("displaycart").style.display = "none";
}
async function generateTable() {
	document.getElementById("home").style.display = "none";
	document.getElementById("displaycart").style.display = "block";
	var data = document.getElementById("data").value
	eel.eel_printer()(dispTable)
}

async function generateBill() {
	var data = document.getElementById("data").value
	eel.eel_printer()(dispTable)
}
// function setImage(string) {
// 	alert(string)
// 	document.getElementById("test").innerHTML = string
// }
function dispTable(table) {
	var tablehtml ="<table class='sqldisp'>"
	var i,j=0
	for(i=0;i<table.length;i++){
		tablehtml+="<tr>"
		for(j=0;j<table[i].length;j++){
			tablehtml += "<td>"+table[i][j]+"<td>"
		}
		tablehtml+="</tr>"
	}
	tablehtml+="</table>"
	document.getElementById("test").innerHTML = tablehtml
}