
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
		{"sponsor":"DVN GL", "url":"https://www.dnvgl.com/index.html"},
		{"sponsor":"ON&T", "url":"https://www.oceannews.com"},
		{"sponsor":"OffshoreSource", "url":"https://www.offshoresource.com"},
		{"sponsor":"aggreko", "url":"https://www.aggreko.com/"},
		{"sponsor":"GCube", "url":"http://www.gcube-insurance.com/"},
		{"sponsor":"Greenbyte", "url":"https://www.greenbyte.com/"},
		]

	}

	function processJSON () {

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

	processJSON()

	// var json_link = "https://dl.dropbox.com/s/44s2nvffe2srmfz/fwna-sponsors-2020.json";
	// let request = new XMLHttpRequest();
	// request.open('GET', json_link);
	// request.responseType = 'json';
	// request.send();
	// request.onload = function() {
	// 	var json_live = request.response;
	// 	processJSON(json_live);
	// }


}	




	function addIDToGallery () {

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



	function addSponsorsToAgenda () {

	//if no agenda on page, don't run the script
	if (document.querySelector(".page-agenda") == null) {
		return;
	}

	var ag = {};
	ag.sponsors = [{},{},{}];

	ag.sponsors[0].name = "UL";
	ag.sponsors[0].url = "https://www.ul.com";
	ag.sponsors[0].type = "Headline Sponsor";
	ag.sponsors[0].img = "https://northamerica.financingwind.com/wp-content/uploads/2020/02/UL-white.png";
	ag.sponsors[0].className = "agenda-headline-sponsor";

	ag.sponsors[1].name = "";
	ag.sponsors[1].url = "";
	ag.sponsors[1].type = "Day 1 Sponsor";
	ag.sponsors[1].img = "";
	ag.sponsors[1].className = "agenda-day-sponsor";


	ag.sponsors[2].name = "Lockton";
	ag.sponsors[2].url = "https://global.lockton.com/";
	ag.sponsors[2].type = "Day 2 Sponsor";
	ag.sponsors[2].img = "https://northamerica.financingwind.com/wp-content/uploads/2020/02/Lockton.png";
	ag.sponsors[2].className = "agenda-day-sponsor";

	for (var i=0; i<ag.sponsors.length; i++) {

		var sponsor = ag.sponsors[i];
		var sponsorObjs = sponsor.objects;
		sponsorObjs = {};

		sponsorObjs.div = document.createElement("div");
		sponsorObjs.div.className = sponsor.className;

		sponsorObjs.link = document.createElement("a");
		sponsorObjs.link.href = sponsor.url;

		sponsorObjs.text = document.createElement("h5");
		sponsorObjs.text.innerHTML = sponsor.type;

		sponsorObjs.image = document.createElement("img");
		sponsorObjs.image.src = sponsor.img;
		sponsorObjs.image.alt = sponsor.name; 

		sponsorObjs.div.appendChild(sponsorObjs.text);
		sponsorObjs.div.appendChild(sponsorObjs.link);
		sponsorObjs.link.appendChild(sponsorObjs.image);

		if(sponsor.name == "") {
			//if no sponsor name set, sponsor does not exist yet, so skip this element in the loop
			continue;
		}

		if(sponsor.type == "Headline Sponsor") {
			//if sponsor is a headline sponsor, add the div to the page header
			ag.parent = document.querySelector(".page-agenda .header h1").parentNode;
			ag.parent.appendChild(sponsorObjs.div);
		}

		else if (sponsor.type == "Day 1 Sponsor") {
			//if sponsor is Day 1, add the div to the second <li> under ul.tabs
			ag.parent = document.querySelector(".page-agenda .container.schedule ul.tabs li:nth-child(2) ");
			ag.parent.appendChild(sponsorObjs.div);
		}

		else if (sponsor.type == "Day 2 Sponsor") {
			//if sponsor is Day 2, add the div to the third <li> under ul.tabs
			ag.parent = document.querySelector(".page-agenda .container.schedule ul.tabs li:nth-child(3) ");
			ag.parent.appendChild(sponsorObjs.div);
		}

	}

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


}*/