
    
var inputField = document.getElementById("input-company"); /* the input element */
var searchList = document.getElementById("search-terms"); /* the list of terms */ //fix me
var searchTermsWrapper = document.getElementById("search-terms-wrapper"); //fix me
var hiddenInputField = document.getElementById("input-company-id"); /* the input element */



// $(".rr-toggle").each(function(index) {
//     $(this).on("click", function() {
//         var rri_version = this.attr("data-rri-version"); /* get version */
//         versionInput.value = rri_version;
//         console.log(rri_version);
//     });
// });


// Source items from CMS START

var companyEls = document.getElementsByClassName('rri-companies__item-data');
var companies = [];
for (var i = 0; i < companyEls.length; i++) {
    companies[i] = {};
    companies[i].name = companyEls[i].dataset.companyName;
    companies[i].slug = companyEls[i].dataset.companySlug;
    console.log();
}

// Source items from CMS END

inputField.setAttribute("onkeyup", "typeSearch()");
searchTermsWrapper.style.display = "none";



function searchTerms() {

    // add terms to dropdown list.
    for (i = 0; i < companies.length; i++) {
        var li = document.createElement("li");
        li.classList.add("rri-form__list-item");
        li.innerHTML = '<a href="#" class="rri-form__list-term">' + companies[i].name + '</a>';
        li.setAttribute("data-company-slug", companies[i].slug)
        searchList.appendChild(li);
    }

    // orders the list in alphabetical order.
    var list, i, switching, b, shouldSwitch;
    list = document.getElementById("search-terms");
    switching = true;

    while (switching) {

        switching = false;
        b = list.getElementsByTagName("LI");

        for (i = 0; i < (b.length - 1); i++) {
            shouldSwitch = false;
            if (b[i].innerHTML.toLowerCase() > b[i + 1].innerHTML.toLowerCase()) {
                shouldSwitch = true;
                break;
            }
        }

        if (shouldSwitch) {
            b[i].parentNode.insertBefore(b[i + 1], b[i]);
            switching = true;
        }
    }
}

// auto complete feature, activated on keystroke in the input.

function typeSearch() {

    searchTermsWrapper.style.display = 'block';

    if (inputField.value == "") {
        searchTermsWrapper.style.display = 'none';
        console.log('test');
    }

    var filter, ul, li, a, i, txtValue;
    filter = inputField.value.toUpperCase();
    ul = searchList;
    li = ul.getElementsByTagName("li");

    for (i = 0; i < li.length; i++) {
        a = li[i];
        txtValue = a.textContent || a.innerText;

        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";

        } else {
            li[i].style.display = "none";
        }
    }
}

searchTerms();

// detects selection of a search term. 
document.addEventListener('click', function(event) {

    if (!event.target.matches('.rri-form__list-term')) return;
    event.preventDefault();
    inputField.value = event.target.innerHTML;
    searchTermsWrapper.style.display = 'none';

    // update hidden field with company slug
    hiddenInputField.value = event.target.parentElement.dataset.companySlug; /* slug attribute is actually stored on parent <li> */
    // prevent user edited field from submitting
    // https://stackoverflow.com/questions/4869987/how-do-i-exclude-certain-form-fields-upon-submission-of-the-form-without-disabli
    inputField.removeAttribute('name');

});

function checkFocus(e) {

    var activeTextarea = document.activeElement.id;
    if (activeTextarea != 'autoInput') {
        searchTermsWrapper.style.display = "none";
    } 
    else {
        searchTermsWrapper.style.display = "block";
    }


}

document.addEventListener('mouseup', checkFocus, false);
