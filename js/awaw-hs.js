

//NB this is an IIFE https://flaviocopes.com/javascript-iife/
(function buttonClick() {
	
  //get email of logged in user
	var mem = memberstack.information.email;
  
  //associate this email with the currently tracked HS user (required if the user is not yet associated with a HS contact)
  //see https://legacydocs.hubspot.com/docs/methods/tracking_code_api/identify_visitor
  if (mem) { /* if a user is logged in */
    var _hsq = window._hsq = window._hsq || [];
    _hsq.push(["identify",{
        email: mem
    }]);
  }
 
  /* Use contact properties for tracking report downloads */
  /* api documentation https://developers.hubspot.com/docs/api/events/tracking-code */

  $("#aw-report-dl-mem").on('click', function(event){

    /* if user not logged in, don't do anything */
    if (!mem) {
      // console.log("User not logged in");
      return;
    }

      /* get datestamp */
      var date = new Date(); /* new date object at current time */
      date.setUTCHours(0,0,0,0); /* set time to midnight */
      date = +date; /* uses unary operator to convert date object to miliseconds since unix epoch, which is required format by HS API */
      // console.log(date);
      /* get report slug and create name of matching property on HS */
      //var reportSlug = {{wf {&quot;path&quot;:&quot;slug&quot;,&quot;type&quot;:&quot;PlainText&quot;\} }};

      /* temp solution for getting slug outside of WF */
      var thisPathName = window.location.pathname; 
      /* remove leading /reports/ to get slug, and remove any other slashes just in case url doesn't include /reports/ */
      var reportNameRegex = /\/?reports\//;
      var reportSlug = thisPathName.replace(reportNameRegex,"").replace("/",""); /* NB for now we will not replace hyphens (e.g. replace kebab-case with camelCase) */

      var reportPropertyName = "report_download__" + reportSlug.replace(/\-/g,"_");

    /* create an obj to pass with identify code */
    var reportPropertyObj = {}
    reportPropertyObj.email = mem;
    reportPropertyObj[reportPropertyName] = date;
    
    /* store mem and report data in tracker */
    _hsq.push(["identify",reportPropertyObj]);
    /* pass data to HS */
    _hsq.push(['trackPageView']);
    // console.log("pushed to HS:");
    // console.log(reportPropertyObj);
		
	}); /* close click handler */
  
  })(); /* close IIFE */

