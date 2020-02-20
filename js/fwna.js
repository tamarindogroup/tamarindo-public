
//add links to sponsors
function addAllLinks () {

		function getNode(sponsor) {
			return document.querySelector('img.img-fluid[alt=' + CSS.escape(sponsor) + ']'); 
		}

		function addLink(node, url, sponsor) {
			var parentNode = node.parentNode;
			//create link
			var wrapperNode = document.createElement('a');
			wrapperNode.setAttribute("href", url, sponsor);
			wrapperNode.setAttribute("target", "_blank");
			//set wrapper as child
			parentNode.replaceChild(wrapperNode, node);
			//set node as child of wrapper
			wrapperNode.appendChild(node);
		}

		var json = {
			"addresses":[
			{"sponsor":"Greentech Capital Advisors", "url":"https://www.greentechcapital.com/"},
			{"sponsor":"Holland & Hart", "url":"https://www.hollandhart.com/energy-and-resources"},
			{"sponsor":"Jones Day", "url":"https://www.jonesday.com/en"},
			{"sponsor":"KeyBank", "url":"https://www.key.com/businesses-institutions/industry-expertise/energy/overview.jsp"},
			{"sponsor":"McDermott Will & Emery", "url":"https://www.mwe.com/industries/energy/renewable-energy/"},
			{"sponsor":"Norton Rose Fulbright", "url":"https://www.nortonrosefulbright.com/en-US"},
			{"sponsor":"Pierce Atwood", "url":"https://www.pierceatwood.com/practice-areas/energy-infrastructure-project-development-finance"},
			{"sponsor":"Scout Clean Energy", "url":"http://www.scoutcleanenergy.com/"},
			{"sponsor":"Utopus Insights", "url":"https://www.utopusinsights.com/"},
			{"sponsor":"WilmerHale", "url":"https://www.wilmerhale.com/"},
			{"sponsor":"AFRY", "url":"https://afry.com/en"},
			{"sponsor":"Stantec", "url":"https://www.stantec.com/en"},
			{"sponsor":"Principle Power", "url":"http://www.principlepowerinc.com/"},
			{"sponsor":"Energy Acuity", "url":"https://energyacuity.com/"},
			{"sponsor":"McGuireWoods", "url":"https://www.mcguirewoods.com/"},
			{"sponsor":"UL", "url":"https://www.ul.com/"},
			{"sponsor":"Lockton", "url":"https://global.lockton.com/"},
			{"sponsor":"GreenbergTraurig", "url":"https://www.gtlaw.com/en"},
			{"sponsor":"AWEA", "url":"https://www.awea.org/"},
			{"sponsor":"BloombergNewEnergyFinance", "url":"https://about.bnef.com/"},
			{"sponsor":"Alliant", "url":"http://www.alliant.com/pages/default.aspx"},
			]
		}

		for (var i = 0; i < json.addresses.length; i++) {
			var url = json.addresses[i].url;
			var sponsor = json.addresses[i].sponsor;
			//find the img node that matches the alt text
			var foundNode = getNode(sponsor);
			if (foundNode !== null) {
				console.log("Found: " + sponsor);
				addLink(foundNode, url, sponsor);
			}
			else {
				console.log("Couldn't find: " + sponsor);
			}
		}
	}

	addAllLinks() 

function addIDToGallery() {

e = document.getElementsByClassName('carousel-container');
for(var i = 0; i < e.length; i++) {
    // Only if there is only single class
    if(e[i].className == 'carousel-container') {
        // Do something with the element e[i]
       e[i].id="gallery";
return;
    }
}
}

addIDToGallery()


function addSponsorsToAgenda() {
	var ag = {};
	ag.sponsors = [{},{},{}];

	ag.sponsors[0].name = "UL";
	ag.sponsors[0].url = "https://www.ul.com";
	ag.sponsors[0].type = "Headline Sponsor";
	ag.sponsors[0].img = "";

	ag.sponsors[1].name = "";
	ag.sponsors[1].url = "";
	ag.sponsors[1].type = "Day 1 Sponsor";
	ag.sponsors[1].img = "";

	ag.sponsors[2].name = "Lockon";
	ag.sponsors[2].url = "https://global.lockton.com/";
	ag.sponsors[2].type = "Day 2 Sponsor";
	ag.sponsors[2].img = "";

	for (var i=0; i<ag.sponsors.length; i++) {

		var sponsor = ag.sponsors[i];
		var sponsorObjs = sponsor.objects

		sponsor.div = document.createElement("div");
		sponsor.div.class = "agenda-host-sponsor";

		sponsor.link = document.createElement("a");
		sponsor.link.href = sponsor.url;

		sponsor.text = document.createElement("img");
		sponsor.text.innerHTML = sponsor.type;

		sponsor.image = document.createElement("img");
		sponsor.image.src = sponsor.img;
		sponsor.image.alt = "UL"; 
	}


	var sibling = document.querySelector(".page-agenda .header h1");
	for(var i = 0; i < sibling.length; i++) {
		var newDiv = document.createElement("div");
			newDiv.class = "genda-host-sponsor";
		var newLink = document.createElement("a");
			newLink.href = "https://www.ul.com";
		var newText = document.createElement("img");
			newText.innerHTML="Day Sponsor";
		var newImage = document.createElement("img");
			newLink.src = "https://www.ul.com";
			newLink.alt = "UL";



return;
}

/*deprecated functions

function AddRegistrationComment() {
	var parentEl = document.querySelector("div.page-register");
        if (!parentEl) return;
        var parentEl = parentEl.querySelector(".col-12.pt-md-5.pt-3");
        if (!parentEl) return;
	var divEl = document.createElement("div");
	var pEl1 = document.createElement("p");
	var pEl2 = document.createElement("p");
	var tEl1 = document.createTextNode("Registration for Financing Wind North America 2020 will open soon.");
	var tEl2 = document.createTextNode("Enter your email below to stay updated about Financing Wind and other events from A Word About Wind.");
	parentEl.appendChild(divEl);
	divEl.appendChild(pEl1);
	divEl.appendChild(pEl2);
	pEl1.appendChild(tEl1);
	pEl2.appendChild(tEl2);
	divEl.classList.add("registration-comment");
}

//AddRegistrationComment()

function AddAgendaComment() {
	var parentEl = document.querySelector("div.page-agenda");
        if (!parentEl) return;
        var parentEl = parentEl.querySelector(".col-12.pt-md-5.pt-3");
        if (!parentEl) return;
	var divEl = document.createElement("div");
	var pEl1 = document.createElement("p");
	var pEl2 = document.createElement("p");
	var tEl1 = document.createTextNode("The agenda for Financing Wind North America 2020 will be announced soon.");
	var tEl2 = document.createTextNode("Enter your email at the end of the page to stay updated about Financing Wind and other events from A Word About Wind.");
	parentEl.appendChild(divEl);
	divEl.appendChild(pEl1);
	divEl.appendChild(pEl2);
	pEl1.appendChild(tEl1);
	pEl2.appendChild(tEl2);
	divEl.classList.add("registration-comment");
}

//AddAgendaComment()

function ModifyAgendaPageText() {
var dates = document.querySelectorAll(".container.schedule h2");
dates[0].firstChild.data = "April 24 2019";
dates[1].firstChild.data = "April 25 2019";
var pageTitle = document.querySelector(".page-agenda h1");
pageTitle.firstChild.data = "AGENDA 2019";
}

if (window.location.href.match("agenda")) {
//ModifyAgendaPageText();

*/
}