/* 

- get index and company name from URL parameters
- find company element on page in collection list
- get values from company element 
- update text on page
- hide/show relevant RRI section

- if one or both params missing, load fallback content
- if can't find company element, load fallback content

*/






$('document').ready(function(){

    /* hide fallback header */
    document.querySelector("#results-header-fail").style.display="none";
    /* hide results header */
    document.querySelector("#results-header-success").style.display="none";
    /* hide breakdown section */
    document.querySelector("#score-breakdown").style.display="none";
    /* hide report sections */
    var reportSections = document.getElementsByClassName("rri-results-reports__item");
    for (var i = 0; i < reportSections.length; i++) {
        reportSections[i].style.display="none";
    }

    var fallbackActive = false;
    var company, indexID, companyID;
    company = {};

    /* load data */
    function loadData() {

        /* get rri index and company from url params */
        const params = new URLSearchParams(window.location.search);
        /* id of the index version */
        indexID = params.get("rri-index");
        /* id of company */
        companyID = params.get("company-id");

        /* if no index, end */
        if(!indexID) {
            console.log("No index found")
            if (!fallbackActive) {
                fallback();
                return "noData";
            }
        }
        /* if no company, end */
        if(!companyID) {
            console.log("No company found")
            if (!fallbackActive) {
                fallback();
                return "noData";
            }
        }

        /* loop through companies on page and match on slug */
        const companies = document.querySelectorAll(".rri-companies__item-data");
        for (var i = 0; i < companies.length; i++) {
            console.log(companies[i].dataset.companySlug);
            /* if company slug matches submitted company ID */
            if(companies[i].dataset.companySlug == companyID) {

                /* pull company data into an obj */
                company.dataEl = companies[i]; /* data element for this company */
                company.name = company.dataEl.dataset.companyName; /* name */
                company.slug = company.dataEl.dataset.companySlug; /* slug */

                /* scores */
                company['rri eu total'] = company.dataEl.dataset.rriscoreEu2019Total;
                company['rri na total'] = company.dataEl.dataset.rriscoreNa2019Total;
                company['rri eu media'] = company.dataEl.dataset.rriscoreEu2019Media;
                company['rri eu social'] = company.dataEl.dataset.rriscoreEu2019Social;
                company['rri eu online'] = company.dataEl.dataset.rriscoreEu2019Online;
                company['rri na media'] = company.dataEl.dataset.rriscoreNa2019Media;
                company['rri na social'] = company.dataEl.dataset.rriscoreNa2019Social;
                company['rri na online'] = company.dataEl.dataset.rriscoreNa2019Online;

                /* append submitted index and company id to this company obj */
                company.indexID = indexID;
                company.companyID = companyID;

                /* end search */
                break;
            }
        }

        /* if no match for the company ID, end */
        if (!company.dataEl) {
            console.log("Bad company ID")
            if (!fallbackActive) {
                fallback();
                return "noData";
            }
        }

        return company;

    }
    
    /* update page content with results */
    function updatePage(company) {

        function showResults() {
            /* hide fallback header */
            document.querySelector("#results-header-fail").style.display="none";
            /* show results header */
            document.querySelector("#results-header-success").style.display="block";
            /* show breakdown section */
            document.querySelector("#score-breakdown").style.display="block";
            /* show report section for relevant index */
            document.querySelector(".rri-indices__item-data[data-index-id='" + indexID + "']").closest(".rri-results-reports__item").style.display="block";
        }

        /* which index to use */
        switch(company.indexID) {

            case "rri-na2019":
                /* if this company was in the NA RRI */
                if(company['rri na total']) {
                    /* update top heading */
                    document.querySelector("#subhead").innerHTML = "Your score in the North America Renewables Reputation Index 2019"; 
                    /* update name */
                    document.querySelector("#company-name").innerHTML = company.name; 
                    /* update scores */
                    document.querySelector("#score-total").innerHTML = company['rri na total']; 
                    document.querySelector("#score-media").innerHTML = company['rri na media'];
                    document.querySelector("#score-social").innerHTML = company['rri na social'];
                    document.querySelector("#score-online").innerHTML = company['rri na online'];
                    /* show results sections */
                    showResults();

                }
                else {
                    fallback();
                }
                break;

            case "rri-eu2019":
                /* if this company was in the EU RRI */
                if(company['rri eu total']) {
                    /* update top heading */
                    document.querySelector("#subhead").innerHTML = "Your score in the European Renewables Reputation Index 2019"; 
                    /* update name */
                    document.querySelector("#company-name").innerHTML = company.name; 
                    /* update scores */
                    document.querySelector("#score-total").innerHTML = company['rri eu total']; 
                    document.querySelector("#score-media").innerHTML = company['rri eu media'];
                    document.querySelector("#score-social").innerHTML = company['rri eu social'];
                    document.querySelector("#score-online").innerHTML = company['rri eu online'];
                    /* show results sections */
                    showResults();
                }
                else {
                    fallback();
                }
                break;

            default:
                if (!fallbackActive) {
                    fallback();
                    return "noData";
                }
        }
    }
    
    function fallback() {

        /* hide breakdown section */
        document.querySelector("#score-breakdown").style.display="none";
        /* hide top head */
        document.querySelector("#results-header-success").style.display="none";
        /* show alt top head */
        document.querySelector("#results-header-fail").style.display="block";

    }
    


    /* check if we are on staging or live */
    if (!window.location.hostname.match(/webflow\.io/)) {
        var TG_ENV = {
          "domain": "live"
        }
    }
    else {
        var TG_ENV = {
          "domain": "staging"
        }
    }


    /* start here */
    var company = loadData();
    if (company != "noData") {
        updatePage(company);
    }


});



