
/* Sponsors updated */

// Firstly delete all hidden sponsors, else we get duplicates loading
$('.js-sponsor.w-condition-invisible.w-embed').parent().remove();

// Select all sponsor type container divs and iterate through them
// These are the containers that will directly contain the separate sponsor items
$('[data-fw-item="sponsor-type"]').each(function(index) {

  // Get the string we will be matching on - in this case the slug of the sponsor type
  // We also want to match on whether the event is primary or secondary
  var matchingSponsorType = $(this).attr("data-fw-sponsor-type");
  var matchingEventCategory = $(this).attr("data-fw-category");
  
  // Get the list item that will hold the sponsor items
  var $parentList = $(this).children('ul');

  // Loop through all sponsor objects on page
  $('[data-fw-item="sponsor"]').each(function(index) {
    var $sponsor = $(this);
    // If sponsor is same sponsor type as current sponsor type, and is same category (primary or secondary)
    if(($sponsor.attr('data-fw-sponsor-type') == matchingSponsorType) && ($sponsor.attr('data-fw-category') == matchingEventCategory)) {
      console.log(matchingSponsorType + " " + matchingEventCategory)
      // Update matched attr
      $sponsor.attr("data-fw-matched", "true");
      // Move sponsor to sponsor type list
      $parentList.append($sponsor);

    }
  });

  // If there are no sponsors moved into this sponsor type container, delete the whole sponsor type WF list item
  if($parentList.children().length == 0) {
    $parentList.closest('div.w-dyn-item').remove();
  }
  // Else show the sponsor type
  else {
    $(this).removeAttr("hidden");
  }  
});

$('[data-fw-item="sponsor"][data-fw-matched="false"').closest('div.w-dyn-item').remove();
 






/* Speakers updated */

/* loop through speakers */
$('[data-fw-item="speaker"]').each(function(index) {

  //var $parentList = $(this).closest('.w-dyn-list'); /* this is the parent list element we will place any duplicated elements into */

  var speakerName = $(this).attr("data-fw-speaker-name");
  var $speakerWFItem = $(this).closest('.w-dyn-item');

  //var $speaker = $(this).closest('li.speaker'); /* this is the actual speaker <li> object to copy */

  //console.log(speakerName + "  " + $(this).attr("data-fw-speaker-event-list"))

  var eventListArr = $(this).attr("data-fw-speaker-event-list").split(","); /* get arr of events from attr */
  
  /* loop through array and tidy */ // TO DO - CHECK THIS
  for (var i = eventListArr.length-1; i > -1; i--) {
    eventListArr[i] = eventListArr[i].trim() /* trim leading or trailing white space from event names */
    if (eventListArr[i] == "") {
      eventListArr.splice(i,1); /* if name is empty, remove this element from array*/
    }
  }

  /* if more than one event, duplicate element and update attr */
  if (eventListArr.length > 1) {
    console.log("this speaker has more than one event: " + speakerName);
    for (var i = eventListArr.length-1; i > -1; i--) {
      var $speakerWFClone = $speakerWFItem.clone().appendTo($speakerWFItem.parent()); /* clone this speaker */
      console.log($speakerWFClone)
      $speakerWFClone.find('[data-fw-item="speaker"]').attr("data-fw-speaker-event",eventListArr[i]); /* add a single event to this clone's attr */
    }
    //$speakerWFItem.remove(); /* remove original */
  }
  /* if only one event, just update this attr */
  else if (eventListArr.length == 1) {
    console.log("this speaker has only one event: " + speakerName);
    $(this).attr("data-fw-speaker-event",eventListArr[0]);
  }
  /* if no events, remove speaker */
  else {
    console.log("this speaker has no events: " + speakerName);
    $speakerWFItem.remove();
  }
});

/*
Loop through speaker-event container divs
  pull out event name
  get corresponding speaker items that match fw-speaker-event attributes - NB we are matching on event name, which is a bit risky, but alternative is asking editor to write the slug for each event, which is more fiddly and error prone for them
  if there are no speakers moved into this speaker event container, delete it (?) <- some sort of announcement?

  */

/* loop through speaker events */
$('[data-fw-item="speaker-event"]').each(function(index) {

  /* get event name from attr */
  var speakerEvent = $(this).attr("data-fw-speaker-event");

  /* get <ul> that we put speakers into */
  var $speakerList = $(this).children("ul");

  /* append all <li> speakers which match event name */
  $speakerList.append($('[data-fw-item="speaker"][data-fw-speaker-event="' + speakerEvent + '"]').closest('li.speaker'));

  /* If there are no speakers moved into this event, delete the parent WF list item of this event */
  if($speakerList.children().length == 0) {
    $(this).closest('.w-dyn-item').remove();
  }
  else {
    $(this).removeAttr("hidden");
  }  
});

/* Delete original speaker lists - these are now superfluous and any unmatched ones are not needed */
$(".js-speakers-all").remove();

// /* Delete any unmatched speaker items */
// $('div[data-fw-item="speaker"]').each(function(index) {
//   /* Test if ancestor is a speaker event */
//   if($(this).parent().closest('[data-fw-item]').attr("data-fw-item") != "speaker-event") { /* TODO - will this work if no parent matching closest() ? */
//     $(this).parent().closest('[role="listitem"]').remove();
//     }
// });   




















































/* Sponsors */

// Select all sponsor type container divs and iterate through them
// These are the containers that will directly contain the separate sponsor items
$('div[fw-item="sponsor-type"]').each(function(index) {

  // Get the string we will be matching on - in this case the slug of the sponsor type
  // We also want to match on whether the event is primary or secondary
  var matchingSponsorType = "fw-sponsor-type=" + $(this).attr("fw-sponsor-type");
	var matchingEventPrimary = "fw-event-primary=" + $(this).attr("fw-event-primary");
	var matchingEventSecondary = "fw-event-secondary=" + $(this).attr("fw-event-secondary");
  // For each sponsor type, get the corresponding sponsor items that match the fw-sponsor-type attribute
  // Note that we want the grandparents of this item, because WF wraps embeds in a div.
  $(this).append($('div[fw-item="sponsor"][' + matchingSponsorType + '][' + matchingEventPrimary + '][' + matchingEventSecondary + ']').parent().parent());

	// If there are no sponsors moved into this sponsor type container, delete it
	if($(this).children().length == 0) {
  	$(this).parent().parent().parent().remove();
  }  
});

// Delete any unmatched sponsor items
$('div[fw-item="sponsor"]').each(function(index) {
	// Test if great grandparents are a sponsor type, else remove
	if($(this).parent().parent().parent().attr("fw-item") != "sponsor-type") {
  	$(this).parent().parent().parent().remove();
    }
});  
    

/* Speakers */

/*
Loop through speakers
  get event name list string
  split string on commas into array of event name strings
  if speaker event name array length > 1, create duplicates of this speaker to match
  add custom HTML attributes to each speaker, something like fw-item="speaker" and fw-speaker-event=eventname
*/

/* NB we COULD place event list into fw-speaker-event attribute, but then we're opening up to issues of editor being able to insert any characters into attribute, which might (?) break things in some browsers */

/* loop through speakers */
$('div[fw-item="speaker"]').each(function(index) {
  console.log("looking at this speaker: ")
  console.log($(this))
  var parentList = $(this).parent().closest('[role="list"]'); /* this is the parent list element we will place any duplicated elements into */
  var eventNameListArr = $(this).text().split(","); /* get list of events from inner text, split on comma */
  
  /* loop through array and tidy */
  for (var i = eventNameListArr.length-1; i > -1; i--) {
    eventNameListArr[i] = eventNameListArr[i].trim() /* trim leading or trailing white space from event names */
    if (eventNameListArr[i] == "") {
      eventNameListArr.splice(i,1); /* if name is empty, remove this element from array*/
    }
  }

  /* if more than one event, duplicate element */
  if (eventNameListArr.length > 1) {
    console.log("this speaker has more than one event: " + $(this).parent().parent().first().text())
    for (var i = eventNameListArr.length-1; i > -1; i--) {
      $(this).attr("fw-speaker-event",eventNameListArr[i]); /* add a single event to this speaker's attr */
      if (i != 0) { /* make n-1 clones */
        var $clone = $(this).parent().closest('[role="listitem"]').clone(); /* clone speaker */
      }
      // $($clone).appendTo(parentList); /* place clone in parent list - EDIT not needed now*/
      // console.log("this is the clone: ")
      // console.log($clone);
    }
  }

  /* if only one event */
  else if (eventNameListArr.length == 1) {
    console.log("this speaker has only one event: " + $(this).parent().parent().first().text())
    $(this).attr("fw-speaker-event",eventNameListArr[0]);
  }

  /* if no events */
  else {
    console.log("this speaker has no events: " + $(this).parent().parent().first().text())
    $(this).parent().closest('[role="listitem"]').remove() /* remove parent list item element */
  }
});

/*
Loop through speaker-event container divs
  pull out event name
  get corresponding speaker items that match fw-speaker-event attributes - NB we are matching on event name, which is a bit risky, but alternative is asking editor to write the slug for each event, which is more fiddly and error prone for them
  if there are no speakers moved into this speaker event container, delete it (?) <- some sort of announcement?

  */

/* loop through speaker events */
$('div[fw-item="speaker-event"]').each(function(index) {

  /* get event name from attr */
  var matchingSpeakerEvent = $(this).attr("fw-speaker-event");

  /* append all speakers which match event name */
  $(this).append($('div[fw-item="speaker"][' + 'fw-speaker-event="' + matchingSpeakerEvent + '"]').parent().closest('[role="listitem"]'));

  /* If there are no speakers moved into this event, delete it */
  if($(this).children().length == 0) {
    $(this).parent().closest('[role="listitem"]').remove();
  }  
});

/* Delete any unmatched speaker items */
$('div[fw-item="speaker"]').each(function(index) {
  /* Test if ancestor is a speaker event */
  if($(this).parent().closest('[fw-item]').attr("fw-item") != "speaker-event") { /* TODO - will this work if no parent matching closest() ? */
    $(this).parent().closest('[role="listitem"]').remove();
    }
});  
    


