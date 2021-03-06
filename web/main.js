async function generateHome() {
	hideAll();
	document.getElementById("home").classList.add("activesec");
	document.getElementById("one").checked = true;
}
async function generateInvoice() {
	document.getElementById("test").innerHTML = "";
	hideAll();
	document.getElementById("displaycart").classList.add("activesec");
	eel.basket_printer()(dispInvoiceTable);
	eel.bill_amount()(dispInvoiceAmount);
}

async function generateAssistant() {
	hideAll();
	document.getElementById("assistant").classList.add("activesec");
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

async function generateWishlist(){
	hamburger();
	hideAll();
	document.getElementById("wishlist").classList.add("activesec");

}

async function insertWishlist(){
    wishlist=document.getElementById("wishlist");
    count=wishlist.getElementsByTagName('input').length;
    count=count+1
    newItem = document.createElement("input");
    newItem.id="item"+count
	newItem.setAttribute("type", "checkbox");
	newItem.setAttribute("class", "tasks");
    newLabel=document.createElement("label");
	newLabel.setAttribute("for", newItem.id);
	newLabel.setAttribute("class", "wishlistitem");
	newLabel.innerHTML=await eel.myCommand("Wishlist Item?")()
	wishlistinsert=document.getElementById("wishlistinsert");
	wishlistinsert.parentNode.insertBefore(newItem, wishlistinsert);
	wishlistinsert.parentNode.insertBefore(newLabel, wishlistinsert);
}

async function generateproductReturns() {
	hideAll();
	document.getElementById("assistant").classList.add("activesec");
	// for(i=0;i<voicedots.length;i++){
	// 	voicedots[i].classList.toggle("active");
	// }
	togglevoicedots();
	eel.productReturns();
	// var x = await 
	// eel.myCommand()(dispTable);
	// for(i=0;i<voicedots.length;i++){
	// 	voicedots[i].classList.remove("active");
	// }
}
async function generateBillingIssues() {
	hideAll();
	document.getElementById("assistant").classList.add("activesec");
	// for(i=0;i<voicedots.length;i++){
	// 	voicedots[i].classList.toggle("active");
	// }
	togglevoicedots();
	eel.BillingIssues();
	// var x = await 
	// eel.myCommand()(dispTable);
	// for(i=0;i<voicedots.length;i++){
	// 	voicedots[i].classList.remove("active");
	// }
}

async function generateSendFeedback() {
	hideAll();
	document.getElementById("assistant").classList.add("activesec");
	// for(i=0;i<voicedots.length;i++){
	// 	voicedots[i].classList.toggle("active");
	// }
	togglevoicedots();
	eel.SendFeedback();
	// var x = await 
	// eel.myCommand()(dispTable);
	// for(i=0;i<voicedots.length;i++){
	// 	voicedots[i].classList.remove("active");
	// }
}

async function gender_preference_change() {
	hideAll();
	document.getElementById("assistant").classList.add("activesec");
	// for(i=0;i<voicedots.length;i++){
	// 	voicedots[i].classList.toggle("active");
	// }
	togglevoicedots();
	eel.gender_preference();
	// var x = await 
	// eel.myCommand()(dispTable);
	// for(i=0;i<voicedots.length;i++){
	// 	voicedots[i].classList.remove("active");
	// }
}

async function generateBillingIssues() {
	hideAll();
	document.getElementById("assistant").classList.add("activesec");
	// for(i=0;i<voicedots.length;i++){
	// 	voicedots[i].classList.toggle("active");
	// }
	togglevoicedots();
	eel.billingIssues();
	// var x = await 
	// eel.myCommand()(dispTable);
	// for(i=0;i<voicedots.length;i++){
	// 	voicedots[i].classList.remove("active");
	// }
}
async function generateServices() {
	hideAll();
	document.getElementById("services").classList.add("activesec");
}
// async function generateBill() {
// 	var data = document.getElementById("data").value;
// 	eel.basket_printer()(dispTable);
// }

async function generateInventory() {
	hideAll();
	document.getElementById("inventory").classList.add("activesec");
	eel.inv_printer()(dispStockTable);
}

async function generateMenu(){
	hideAll();
	document.getElementById("menu").classList.add("activesec");
}

function removeInitial(){
	sections=document.getElementsByTagName("section");
	for(i=0;i<sections.length;i++){
		sections[i].classList.remove("initial");
	}
}

function hideAll(){
	sections=document.getElementsByTagName("section");
	for(i=0;i<sections.length;i++){
		sections[i].style.display= "none";
		sections[i].classList.remove("activesec");
	}
	removevoicedots();
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

// function askPython(param){
// 	var x = await eel.myCommand(param);
// 	alert(x);
// 	return x;
// }

function dispInvoiceTable(table) {
	var tablehtml ="<h2 class='sqldisp'>Invoice Number: "+table[0][0]+"</h2><table class='sqldisp'><tr><th>Name</th><th>Cost</th><th>Quantity</th><th>Total</th></tr>";
	var i,j=0;
	for(i=0;i<table.length;i++){
		tablehtml+="<input type='hidden' value='"+table[i][1]+"' id='hiddenrow"+i+"'>"
		if(i%2==0){
			tablehtml+="<tr style='background: lavender'>";
		}
		else{
			tablehtml+="<tr style='background: white'>"	;
		}
		for(j=2;j<table[i].length;j++){
			if(j==table[i].length-2)
				tablehtml += "<td><pre><i class='fal fa-minus fa-sm' aria-hidden='true' onclick='minusitem(this.id)' id='hiddenrow"+i+"'></i></pre><pre>   "+table[i][j]+"   </pre><pre><i class='fal fa-plus fa-sm' aria-hidden='true' onclick='additem(this.id)' id='hiddenrow"+i+"'></i></pre></td>";
			else
				tablehtml += "<td><pre>"+table[i][j]+"\t</pre></td>";
		}
		tablehtml+="</tr>";
	}
	tablehtml+="</table>";
	document.getElementById("test").innerHTML = tablehtml;
	// var voicedots = document.getElementsByClassName("voicedot")
	// for(i=0;i<voicedots.length;i++){
	// 	voicedots[i].classList.remove("active");}
}

function dispInvoiceAmount(table) {
	tablehtml = document.getElementById("test").innerHTML;
	tablehtml+="<h2 class='sqldisp' style='text-align:right'>Total Price: <span>&#x20B9<span>"+table[0][0]+"</h2>";
	document.getElementById("test").innerHTML = tablehtml;
}

function additem(rowid){
	var value=document.getElementById(rowid).value;
	eel.invoice_inc(value);
	generateInvoice();
}

function minusitem(rowid){
	var value=document.getElementById(rowid).value;
	eel.invoice_dec(value);
	generateInvoice();
}

function dispStockTable(table) {
	var tablehtml ="<table class='sqldisp'><tr><th>Product ID</th><th>Name</th><th>Cost</th><th>Stock Left</th>";
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
			tablehtml += "<td><pre>"+table[i][j]+"\t</pre></td>";
		}
		tablehtml+="</tr>";
	}
	tablehtml+="</table>";
	document.getElementById("stock").innerHTML = tablehtml;
	// var voicedots = document.getElementsByClassName("voicedot")
	// for(i=0;i<voicedots.length;i++){
	// 	voicedots[i].classList.remove("active");}
}

function initialDisp(){
	hideAll();
	removeInitial();
	document.getElementById("home").classList.add("activesec");
}
/////////////////////////test
function generateNewPage(){
	// eel.newPage();
	window.open("index.html","_self");
}

function hamburger(){
	var hamburger = document.getElementsByClassName("hamburgermenu");
	for(i=0;i<hamburger.length;i++){
		hamburger[i].classList.toggle("shown");
		hamburger[i].classList.toggle("hideicon");
	}
	var hamburger = document.getElementsByClassName("hamburgerarrow");
	for(i=0;i<hamburger.length;i++){
		hamburger[i].classList.toggle("shown");
		hamburger[i].classList.toggle("hideicon");
	}
	var mobile_nav = document.getElementsByClassName("mobile-nav-overlay");
	for(i=0;i<mobile_nav.length;i++){
		mobile_nav[i].classList.toggle("hide");
		mobile_nav[i].classList.toggle("show");
	}
	var mobile_nav = document.getElementsByClassName("mobile-nav");
	for(i=0;i<mobile_nav.length;i++){
		mobile_nav[i].classList.toggle("hide");
		mobile_nav[i].classList.toggle("show");
	}
}

function noguimode(){
	var mobile_nav = document.getElementsByClassName("mobile-nav");
	for(i=0;i<mobile_nav.length;i++){
		mobile_nav[i].classList.toggle("hide");
		mobile_nav[i].classList.toggle("show");
	}
	var mobile_nav = document.getElementsByClassName("mobile-nav-overlay");
	for(i=0;i<mobile_nav.length;i++){
		mobile_nav[i].classList.remove("hide");
		mobile_nav[i].classList.remove("show");
		mobile_nav[i].classList.add("nogui");
	}
	eel.fullVoice();
}