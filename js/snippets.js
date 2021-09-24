/* Add dynamic links to social share buttons */

/* wrap in IIFE to isolate from global */
(function () {

/* for all twitter and linkedin buttons on page with these classes */
var twitterShares = document.querySelectorAll(".share--twitter");
var linkedinShares = document.querySelectorAll(".share--linkedin");

var title = encodeURIComponent(document.title);
var url = encodeURIComponent(document.URL);

/* set the twitter share link */
for (var i = 0; i < twitterShares.length; i++) {
	twitterShares[i].href = "https://twitter.com/intent/tweet?" + "title=" + title + '&url=' + url;
  }

/* set the linkedin share link, and add an onclick event to specify the window size */
for (var i = 0; i < linkedinShares.length; i++) {
	linkedinShares[i].href = "https://www.linkedin.com/shareArticle?" + "mini=true" + "&title=" + title + '&url=' + url;
  linkedinShares[i].onclick= function() {
		window.open(
			this.href, 
			'linkedinwindow',
			'left=20,top=20,width=600,height=700,toolbar=0,resizable=1'
			); 
		return false;
    }
  }

})();