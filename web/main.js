async function generateHome() {
	removeInitial();
	document.getElementById("home").style.display = "block";
	document.getElementById("displaycart").style.display = "none";
	document.getElementById("assistant").style.display = "none";
	document.getElementById("services").style.display = "none";
	document.getElementById("inventory").style.display = "none";
	removevoicedots();
}
async function generateTable() {
	removeInitial();
	document.getElementById("test").innerHTML = "";
	document.getElementById("home").style.display = "none";
	document.getElementById("displaycart").style.display = "block";
	document.getElementById("assistant").style.display = "none";
	document.getElementById("services").style.display = "none";
	document.getElementById("inventory").style.display = "none";
	removevoicedots();
	var data = document.getElementById("data").value;
	eel.basket_printer()(dispInvoiceTable);
}

async function generateAssistant() {
	removeInitial();
	document.getElementById("home").style.display = "none";
	document.getElementById("displaycart").style.display = "none";
	document.getElementById("assistant").style.display = "block";
	document.getElementById("services").style.display = "none";
	document.getElementById("inventory").style.display = "none";
	// for(i=0;i<voicedots.length;i++){
	// 	voicedots[i].classList.toggle("active");
	// }
	togglevoicedots();
	eel.tryblock();
	// var x = await 
	// eel.myCommand()(dispTable);
	// for(i=0;i<voicedots.length;i++){
	// 	voicedots[i].classList.remove("active");
	// }
}
async function generateServices() {
	removeInitial();
	document.getElementById("home").style.display = "none";
	document.getElementById("displaycart").style.display = "none";
	document.getElementById("assistant").style.display = "none";
	document.getElementById("services").style.display = "block";
	document.getElementById("inventory").style.display = "none";
	removevoicedots();

}
async function generateBill() {
	var data = document.getElementById("data").value;
	eel.basket_printer()(dispTable);
}

async function generateInventory() {
	removeInitial();
	document.getElementById("stock").innerHTML = "";
	document.getElementById("home").style.display = "none";
	document.getElementById("displaycart").style.display = "none";
	document.getElementById("assistant").style.display = "none";
	document.getElementById("services").style.display = "none";
	document.getElementById("inventory").style.display = "block";
	removevoicedots();
	var data = document.getElementById("data").value;
	eel.inv_printer()(dispStockTable);
}

function removeInitial(){
	sections=document.getElementsByTagName("section");
	for(i=0;i<sections.length;i++){
		sections[i].classList.remove("initial");
	}
}
// function setImage(string) {
// 	alert(string)
// 	document.getElementById("test").innerHTML = string
// }
eel.expose(right_printer);
function right_printer(str) {
	  var chat = document.getElementById("chat");
	  var chathtml = "<div class='message-orange'><p class='message-content'>";
	  chathtml += str;
	  chathtml += "</p></div>";
	  chat.innerHTML += chathtml;
	  updateScroll();
}

eel.expose(left_printer);
function left_printer(str) {
	  var chat = document.getElementById("chat");
	  var chathtml = "<div class='message-blue'><p class='message-content'>";
	  chathtml += str;
	  chathtml += "</p></div>";
	  chat.innerHTML += chathtml;
	  updateScroll();
}

function updateScroll(){
    var element = document.getElementById("chat");
    element.scrollTop = element.scrollHeight;
}

eel.expose(togglevoicedots);
function togglevoicedots(){
	var voicedots = document.getElementsByClassName("voicedot");
	for(i=0;i<voicedots.length;i++){
		voicedots[i].classList.toggle("active");
	}
}

eel.expose(removevoicedots);
function removevoicedots(){
	var voicedots = document.getElementsByClassName("voicedot");
	for(i=0;i<voicedots.length;i++){
		voicedots[i].classList.remove("active");
	}
}

function dispInvoiceTable(table) {
	var tablehtml ="<h2 class='sqldisp'>Invoice Number: "+table[0][0]+"</h2><table class='sqldisp'><tr><th>Name</th><th></th><th>Cost</th><th></th><th>Quantity</th><th></th><th>Total</th><th></th>";
	var i,j=0;
	for(i=0;i<table.length;i++){
		if(i%2==0){
			tablehtml+="<tr style='background: lavender'>";
		}
		else{
			tablehtml+="<tr style='background: white'>"	;
		}
		for(j=1;j<table[i].length;j++){
			tablehtml += "<td><pre>"+table[i][j]+"\t</pre><td>";
		}
		tablehtml+="</tr>";
	}
	tablehtml+="</table>";
	document.getElementById("test").innerHTML = tablehtml;
	document.getElementById("stock").innerHTML = tablehtml;
	// var voicedots = document.getElementsByClassName("voicedot")
	// for(i=0;i<voicedots.length;i++){
	// 	voicedots[i].classList.remove("active");}
}

function dispStockTable(table) {
	var tablehtml ="<table class='sqldisp'><tr><th>Product ID</th><th></th><th>Name</th><th></th><th>Cost</th><th></th><th>Stock Left</th><th></th>";
	var i,j=0;
	for(i=0;i<table.length;i++){
		if(i%2==0){
			tablehtml+="<tr style='background: lavender'>";
		}
		else{
			tablehtml+="<tr style='background: white'>"	;
		}
		for(j=0;j<table[i].length;j++){
			if(j==1 || j==4){
				continue;
			}
			tablehtml += "<td><pre>"+table[i][j]+"\t</pre><td>";
		}
		tablehtml+="</tr>";
	}
	tablehtml+="</table>";
	document.getElementById("test").innerHTML = tablehtml;
	document.getElementById("stock").innerHTML = tablehtml;
	// var voicedots = document.getElementsByClassName("voicedot")
	// for(i=0;i<voicedots.length;i++){
	// 	voicedots[i].classList.remove("active");}
}

/////////////////////////test
function generateNewPage(){
	eel.newPage();
	window.close()
}
