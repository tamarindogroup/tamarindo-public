
    MemberStack.onReady.then(async function(member) {

    /* if member is logged in */
    if(member.loggedIn){

      /* load metadata */
      const metadata = await member.getMetaData();
      var timeNow = Date.now();
      var timeNowPretty = new Date(timeNow).toString(); 

      /* check if memberActions exists, create and add initial data if not */
      if (!metadata.memberActions) {
        var memberActionsNew = {
          visitCount: 0,
          lastActivity: timeNow,
        }
        metadata.memberActions = memberActionsNew;
      }

      /* else update count and time */
      else {

        /* we define a new visit as after 10 mins of inactivity. */
        /* So if timeNow is >= lastVisit + 10 mins, increment visitCount. */
        var timeSinceLastActivity = (timeNow - metadata.memberActions.lastActivity) / (1000*60);
        if (timeSinceLastActivity >= 10) {
          var newVisitCount = metadata.memberActions.visitCount + 1;
        }
        else {
          var newVisitCount = metadata.memberActions.visitCount;
        }

        var memberActionsNew = {
          visitCount: newVisitCount,
          lastActivity: timeNow,
        }
        metadata.memberActions = memberActionsNew;
      }


      /* --------- */
      function updateReportTracking() {

        console.log("Running tracking function")

        /* if we have not already tracked that the report has been clicked during this session, proceed */
        if (!awaw.reportDLMemTracked) {

          /* get path name, will be of form "/reports/how-to-de-risk-floating-offshore-wind-projects" */
          var thisPathName = window.location.pathname; 
          /* remove leading /reports/ to get slug, and remove any other slashes just in case url doesn't include /reports/ */
          var reportNameRegex = /\/?reports\//;
          var thisReportName = thisPathName.replace(reportNameRegex,"").replace("/",""); //NB for now we will not replace hyphens (e.g. replace kebab-case with camelCase)
          var updatedTimeNowPretty = new Date(timeNow).toString();

          /* function to create new report item for metadata */
          function createReportData() {
            var newData = [
              {
                "name": thisReportName,
                "downloadCount": 1,
                "lastDownload": updatedTimeNowPretty
              }
            ];
            console.log("New data is " + newData);
            return newData;
          }

          /* check if reportDownloads exists*/
          if (!metadata.reportDownloads) {

            console.log("reportDownloads does not exist");

            /* create initial data */
            metadata.reportDownloads = createReportData();
          }

          /* if reportDownloads DOES already exist */
          else {    

            console.log("reportDownloads does exist");        

            /* temp variable to track if we can find this report in JSON */
            var thisReportExists = false;

            /* loop through reports */
            for(var i = 0; i<metadata.reportDownloads.length; i++) { 
            
              /* if reportDownloads contains this report */
              if(metadata.reportDownloads[i].name == thisReportName) {
                /* increment download count and update last time */
                metadata.reportDownloads[i].downloadCount = metadata.reportDownloads[i].downloadCount + 1; // we should really test that downloadCount is a number
                metadata.reportDownloads[i].lastDownload = updatedTimeNowPretty;
                /* update temp variable */
                thisReportExists = true; 
                console.log("found report in JSON");
                console.log(metadata.reportDownloads[i].downloadCount);
                console.log(metadata.reportDownloads[i].lastDownload);
                /* break out of for loop */
                break; 
              }
            }

            /* If no successful updating in for loop - ie we couldn't find report in JSON */
            if (thisReportExists == false) {
              console.log("couldn't find report in JSON");
              /* create report data and push into metadata */
              metadata.reportDownloads.push(createReportData()[0]);
            }            
          }

          /* we have successfully tracked report this session, so no need to run this function if clicked again */
          awaw.reportDLMemTracked = true;

          //update metadata
          console.log("Updating with this data: ");
          console.log(metadata);      
          member.updateMetaData(metadata);

        }

        else {
          console.log("This report has been tracked this session")
          /* if we have already tracked this during this session, don't do anything */
        }

      }
      /* --------- */


      /* We have already added an on click event to report download button to capture any clicks before MS loads (is this necessary?) */
      /* We first check the awaw object to see if this button has been clicked yet */
      if (awaw.reportDlMem == true) {
        /* if btn has been clicked already */
        console.log("button has already been clicked")
        updateReportTracking();
      }
      else {
        /* if btn has not been clicked yet, we add another event to the click to fire updateReportTracking */
        $("#aw-report-dl-mem").click(function() {
          console.log("button clicked")
          updateReportTracking();
          /* update click tracker */
          awaw.reportDlMem = true;
        });
      }

      console.log("Updating with this data: ")
      console.log(metadata)

      //update metadata
      member.updateMetaData(metadata)

      //update profile
      member.updateProfile({
        "visit-count": newVisitCount,
        "last-activity": timeNowPretty 
    }, false)

    }
  });
