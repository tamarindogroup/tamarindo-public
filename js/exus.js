/*Copyright (c) 2021 Sam Pilgrim www.sampilgrim.com*/

//create dyanimic capacity tracker on ESG page
function animateCapacityTracker() {

  //load in total capacity (in MW) from countries CMS data stored on page
  exusData.capacityTotal = 0;
  for (let i = 0; i < exusData.countries.length; i++) {
    exusData.capacityTotal = exusData.capacityTotal + exusData.countries[i].properties.capacityTotal;
  }

  function getCurrentKWh() {
    //figure out energy up until now
    exusData.currentTime = new Date();
    exusData.currentTimeInSeconds = (exusData.currentTime.getHours() * 3600) + (exusData.currentTime.getMinutes() * 60) + exusData.currentTime.getSeconds();
    exusData.currentTimeInHours = exusData.currentTimeInSeconds / 3600;
    exusData.currentMWh = exusData.capacityTotal * exusData.currentTimeInHours * 1;
  }

  function animateText(el, value) {
    el.prop('counter', 0).animate({
      Counter: value
      }, {
      duration: 1000,
      easing: 'swing',
      step: function(now) {
        el.text(Math.ceil(now));
        // el.text(Math.ceil(now) + " MWh");
      }
    });
  }


  var animateTextEl = $("#dynamic-mwh-value");
  var animatedCounter = 0;
  //animateTextEl.dataset('energy-kwh') = exusData.currentkWh;

  getCurrentKWh();
  animateText(animateTextEl, exusData.currentMWh);

  var myInterval = window.setInterval(function(){
    getCurrentKWh();
    console.log(Math.ceil(exusData.currentMWh) + " MWh has been generated today.");
    animateText(animateTextEl, exusData.currentMWh);
    animatedCounter ++;
    if (animatedCounter > 20) {
      clearInterval(myInterval);
    }
  }, 5000);


  //clearInterval(intervalId) 



}

//Hide sections with empty collections in them - except on portfolio page
function hideEmptySections() {
	$('.w-dyn-empty').parents('.section').each(function(){
	 $(this).hide();
	 console.log("Empty collections have been hidden.");
	});
}


//Add commas to capacity values in assets
function addCommasToNumber(string) {
  return string.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function addCommasToCapacities() {
  var els = $("case-study__capacity");
  if(els) {
    for (let i = 0; i < els.length; i++) {
      els.innerHTML = addCommasToNumber(els.innerHTML);
      console.log(els.innerHTML + " KW")
    }
  }
}


//update year in footer
function updateCopyrightYear() {
  document.querySelector(".js--copyright").innerHTML = new Date().getFullYear();
}

function resizeDiags() {

  function doResize() {
    var viewportWidth = window.innerWidth; //viewport size     
    if (viewportWidth > 767) { //if not on mobile, resize diag       
      var diagContent = document.querySelector("#hcw").offsetHeight; //get height of content inside diag
      var newDiagWidth = (720 + (diagContent / 1.732)) + 'px';
      diag.style.width = newDiagWidth; //update diag
      console.log("diag change to " + newDiagWidth);
    }
  }

  var diag = document.querySelector("#diag"); //get diag
  if(diag) { //if diag exists, do resize on page load AND add event listener
    doResize();
    window.onresize = function() {doResize();}
  }
}


//**** Start replace Buttons
//custom code to convert text links in buttons to full buttons. See site guidance notes for more information.****

//helper function to copy attributes from one node to another
function copyAttrs(src, target) {
  for(let attr of src.attributes) {
    target.setAttribute(attr.name, attr.value);
  }
}

function replaceButtons() {

  var btnText = document.querySelectorAll('.button__text');
  var counter = 0;
  for(let i = btnText.length-1; i > -1; i--) {
      //console.log(btnText[i]);
      var txtLink = btnText[i] //this is the text link we want to replace with a div with text in
      var div = txtLink.parentNode.parentNode;  //this is the .button div which we want to replace with an <a>

      var linkBlock = document.createElement('a'); //this is our new <a>
      var txtDiv = document.createElement('div'); //this is our new div to hold link text

      var href = txtLink.href; //our link destination. We store a reference since we're going to destroy the existing txtLink

      txtDiv.innerHTML=txtLink.innerHTML; //first copy across contents and attrs for text link to div replacement
      copyAttrs(txtLink,txtDiv);

      txtLink.parentNode.replaceChild(txtDiv,txtLink); //replace text element

      linkBlock.innerHTML = div.innerHTML; //copy across contents and attrs for div to link replacement - the inner HTML includes the new text div we've made
      copyAttrs(div,linkBlock);

      linkBlock.href = href; //set the link on the link block

      linkBlock.classList.add("w-inline-block"); 
      /*this bugged me a while - without it the link element was breaking over multipe lines weirdly
      WF adds in this class to assign display:inline-block and max-width:100% to a block link, which obv our new <a> didn't have
      */	

      div.parentNode.replaceChild(linkBlock,div); //replace div/link element
      //important we do the replacement of the descendent link element first, otherwise if we did the ancestor link block/div replacement first, we'd lose the reference to the text element

      //linkBlock.style=""; //Makes the buttons visible if they've not loaded on the page yet, since we're not carrying across any events to the new button node. Soon to be not required once we shift all animation to the button__anim wrapper
      counter++;
    }
  console.log(counter + " buttons updated.");

  //now we do the same with the white arrow links on the exp page
  var linkText = document.querySelectorAll('.arrow-link__text');
  var counter = 0;
  for(let i = linkText.length-1; i > -1; i--) {

      var txtLink = linkText[i] //this is the text link we want to replace with a div with text in
      var div = txtLink.parentNode;  //this is the div which we want to replace with an <a>

      var linkBlock = document.createElement('a'); //this is our new <a>
      var txtDiv = document.createElement('div'); //this is our new div to hold link text

      var href = txtLink.href; //our link destination. We store a reference since we're going to destroy the existing txtLink

      txtDiv.innerHTML=txtLink.innerHTML; //first copy across contents and attrs for text link to div replacement
      copyAttrs(txtLink,txtDiv);

      txtLink.parentNode.replaceChild(txtDiv,txtLink); //replace text element

      linkBlock.innerHTML = div.innerHTML; //copy across contents and attrs for div to link replacement - the inner HTML includes the new text div we've made
      copyAttrs(div,linkBlock);

      linkBlock.href = href; //set the link on the link block

      linkBlock.classList.add("w-inline-block"); 
      /*this bugged me a while - without it the link element was breaking over multipe lines weirdly
      WF adds in this class to assign display:inline-block and max-width:100% to a block link, which obv our new <a> didn't have
      */  

      div.parentNode.replaceChild(linkBlock,div); //replace div/link element
      //important we do the replacement of the descendent link element first, otherwise if we did the ancestor link block/div replacement first, we'd lose the reference to the text element

      //linkBlock.style=""; //Makes the buttons visible if they've not loaded on the page yet, since we're not carrying across any events to the new button node. Soon to be not required once we shift all animation to the button__anim wrapper
      counter++;
    }

  console.log(counter + " arrow links updated.");
}   
//**** End replace buttons



//**** Start finsweetLoadMore
//for pages that just need pagination and not filters. 
function finsweetLoadMore() {
  console.log("Running finsweetLoadMore.");
  (function() {
    var loadmoreList = new FsLibrary('.js--list-loadmore'); //this class defines the lists this function looks at
    loadmoreList.loadmore({
      button: ".js--button-loadmore", // class of Webflow Pagination button
      resetIx: true, // adds Webflow interactions to newly loaded item
      loadAll: true, // this loads all elements
      animation: {
        enable: true,
        duration: .3,
        easing: 'ease',
        effects: 'fade'
      }
    })
  })();
}
//**** End finsweetLoadMore



//**** Start finsweetPagination
//for pages that need pagination
function finsweetPagination() {
  console.log("Running finsweetPagination.");
  (function() {
    var paginatedList = new FsLibrary('.js--list-pagination'); //this class defines the lists this function looks at
    paginatedList.loadmore({
      button: ".js--button-loadmore", // class of Webflow Pagination button
      resetIx: true, // adds Webflow interactions to newly loaded items
      loadAll: true, // loads ALL items in your collection load on the page. Required for pagination
      paginate: {
        enable: true,
        itemsPerPage: 3,
        insertPagination: '.js--pagination-container',
        bgColor: '#FFFFFF',
        bgColorActive: '#000000',
        textColor: '#005b6c',
        textColorActive: '#FFFFFF',
        borderColor: '#000000'
      },
      animation: {
        enable: false
      }
    })
  })();
} 
//**** End finsweetPagination


//Start finweetFilters - used on Insight and Team pages
function finweetFilters(filterCount, paginationBool, filterNames) {

  //find our dynamic filter controls and append a custom attribute of 
  //filter-by: filter-tag to each control, where filter-tag is a unique value 
  //to be found in each of the searched CMS items

  var myFilters = [];

  for (let i = 0; i < filterNames.length; i++) {
    //get the hidden tag text for each filter type
    var textElements = document.getElementsByClassName("js--filter-by-text--" + filterNames[i]);
    for (element of textElements) {
      var elementText = element.innerText;
      element.parentElement.parentElement.setAttribute('filter-by', elementText);
    }

    //load filter details into an array we can pass to IIFE
    myFilters[i] = {};
    myFilters[i].filterWrapper = ".js--filters-list--" + filterNames[i];
    myFilters[i].filterType = "exclusive";

  }

  //IIFE
  (function(filterCount, paginationBool, myFilters) { //params are named/passed here and at end
    
    // create a new Library instance and store it in a variable called "filteredList"
    var filteredList = new FsLibrary('.js--filtered-list')

    // define filter groups in an array and store it in a variable called myFilters
    // var myFilters = [
    // {
    //     filterWrapper: ".js--filters-list",  // parent wrapper of filter group1
    //     filterType: "exclusive"
    //   }
    // ]

    // run the filter Library component on your instance
    filteredList.filter({
      filterArray: myFilters, // variable of the array we created above
      activeClass: 'filter-button--active', // class that styles the active state (optional)
      emptyMessage: '.empty-message',
      animation: {
        enable: false,
      }
    })

    // load more component
    filteredList.loadmore({
      button: ".js--button-loadmore", // class of Webflow Pagination button
      resetIx: true, // adds Webflow interactions to newly loaded item
      loadAll: true, // this loads all elements
      paginate: {
        enable: paginationBool,
        itemsPerPage: filterCount,
        insertPagination: '.js--pagination-container',
        bgColorActive: '#000000',
        textColor: '#000000',
        textColorActive: '#FFFFFF',
        borderColor: '#000000'
      },
      animation: {
        enable: false,
        duration: .3,
        easing: 'ease',
        effects: 'fade'
      }
    })

  })(filterCount, paginationBool, myFilters); //for an IIFE params must be passed here
  //end IIFE

//Load All items when a filter or sort button is clicked - this works, but the filter is not applied ntil the second click

//   const filterButtonsClass = '.js--filter-button';
// const loadMoreBtnClass = '.js--button-loadmore';
// let filterButtons = document.querySelectorAll(filterButtonsClass);
// filterButtons.forEach((button) => {
//  button.addEventListener('click', (event) => {
//     let loadMoreButton = document.querySelector(loadMoreBtnClass);
//     if (loadMoreButton) {
//       event.stopPropagation();
//       triggerLoadMoreUntilAllItemsLoad(loadMoreButton);
//     }   })
// })
// function triggerLoadMoreUntilAllItemsLoad(loadMoreBtn) {
//    if (loadMoreBtn) {
//        loadMoreBtn.click();
//        setTimeout(500, triggerLoadMoreUntilAllItemsLoad);
//    }
// }

} 
//**** End finweetFilters
     

//wrapper function to run all deferred scripts on load
function runExusScripts() {
  
  console.log("DOM ready.");

  //load weglot translation
  Weglot.initialize({
    api_key: 'wg_bf470710182370ce01b08ce4a468ed368',
    wait_transition: true
  });

  //if we're not on the portfolio page, hide empty collections
	if (!window.location.href.match('portfolio') && !window.location.href.match('environmental-social-and-governance')) {
	  	hideEmptySections();
	  }

  replaceButtons();

  resizeDiags();
  
  if(document.querySelector(".js--list-pagination")) {
    finsweetPagination();
  };

  if(document.querySelector(".js--filtered-list--6")) {
    finweetFilters(6, true, ["insight"]);
  };

  if(document.querySelector(".js--filtered-list--24")) {
    finweetFilters(24, false, ["department", "location"]);
  };

    //if we're on the ESG page, run the tracker
  if (window.location.href.match('environmental-social-and-governance')) {
    document.addEventListener('DOMContentLoaded', (event) => {
      setTimeout(() => { animateCapacityTracker(); }, 2000);
      
    })    
  }

  updateCopyrightYear();

  //addCommasToCapacities();

}

// function fintest() {

//   // create a new Library instance and store it in a variable called "projectsGrid"
//   var projectsGrid = new FsLibrary('.collection-list')
  
//   // run loadmore on our instance
//   projectsGrid.loadmore({
//     button: ".load-more-button",
//     resetIx: true,
//     loadAll: true,
//     paginate: {
//       enable: true,
//       itemsPerPage: 5,
//       insertPagination: '.pagination-container',
//       bgColor: '#ffffff',
//       bgColorActive: '#7757ff',
//       textColor: '#000000',
//       textColorActive: '#FFFFFF',
//       borderColor: '#3D315B'
//     },
//     animation: {
//       enable: false
//     }
//   })

// }

runExusScripts();

//when all page content loaded, run wrapper function    
//document.addEventListener('DOMContentLoaded', fintest);    
// document.addEventListener('DOMContentLoaded', runExusScripts);    



    //a short test script to hide buttons if they have no 
    //text content in them set via the symbol overrides
    //works for my specific button structure only

    //create exus.wf obj
    // var exus = exus || {};
    // exus.wf = exus.wf || {};
    
    // //get buttons on page
    // exus.wf.buttons = [];
    // exus.wf.buttons = document.querySelectorAll(".button");
    // for (let i = 0; i < exus.wf.buttons.length; i++) {
    //   //if button empty, hide it
    //   if (exus.wf.buttons[i].querySelector(".button__text").innerHTML == "") {
    //     exus.wf.buttons[i].style.display = 'none';
    //   }
    // }



