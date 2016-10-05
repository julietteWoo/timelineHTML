jQuery.fn.timelinr = function(options){

  //init settings
  settings = jQuery.extend({
    containerDiv:             '#timeline',  // value: HTML tag #timeline
    datesDiv:                 '#dates',     // value: HTML tag #dates
    datesSelectedClass:       'selected',   // value: default to selected
    datesSpeed:               'normal',     // value: integer between 100 and 1000 (recommended) or 'slow', 'normal' or 'fast'; default to normal
    issuesDiv:                '#issues',    // value: HTML tag  #issues
    issuesSelectedClass:      'selected',   // value: class, default to selected
    issuesSpeed:              'fast',       // value: integer between 100 and 1000 (recommended) or 'slow', 'normal' or 'fast'; default to fast
    issuesTransparency:       0.2,          // value: integer between 0 and 1 (recommended), default to 0.2
    issuesTransparencySpeed:  500,          // value: integer between 100 and 1000 (recommended), default to 500 (normal)
    prevButton:               '#prev',      // value: HTML tag #prev
    nextButton:               '#next',      // value: HTML tag #next
    arrowKeys:                'false',      // value: default to false
    startAt:                  1,            // value: integer
  }, options);

  //the main functions been called by resize listener and init
  setting=function(){
    // Checks if required elements on page before initializing timelinr
    if ($(settings.datesDiv).length > 0 && $(settings.issuesDiv).length > 0) {
      // setting variables
      var howManyDates = $(settings.datesDiv+' li').length;
      var howManyIssues = $(settings.issuesDiv+' li').length;
      var currentDate = $(settings.datesDiv).find('a.'+settings.datesSelectedClass);
      var currentIssue = $(settings.issuesDiv).find('li.'+settings.issuesSelectedClass);
      var widthContainer = $(settings.containerDiv).width();
      //you can modify here to adjust the ratio of width between the timeline and issues(content)
      var widthIssues =$(settings.containerDiv).width();
      var widthIssue = $(settings.containerDiv).width();
      var heightContainer = $(settings.containerDiv).height();
      var heightIssues = $(settings.issuesDiv).height();
      var heightIssue = $(settings.issuesDiv+' li').height();
      var widthDates = $(settings.datesDiv).width();
      var heightDates = $(settings.datesDiv).height();
      var widthDate = $(settings.datesDiv+' li').width();
      var heightDate = $(settings.datesDiv+' li').height();

      $('#issues').css('width', widthIssue);
      $('#issues li').css('width', widthIssue);
      // set positions!

        $(settings.issuesDiv).width(widthIssue*howManyIssues);
        $(settings.datesDiv).width(widthDate*howManyDates).css('marginLeft',widthContainer/2-widthDate/2);
        var defaultPositionDates = parseInt($(settings.datesDiv).css('marginLeft').substring(0,$(settings.datesDiv).css('marginLeft').indexOf('px')));
      

      $(settings.datesDiv+' a').click(function(event){
        event.preventDefault();
        // first vars
        var whichIssue = $(this).text();
        var currentIndex = $(this).parent().prevAll().length;

        // moving the elements
        $(settings.issuesDiv).animate({'marginLeft':-widthIssue*currentIndex},{queue:false, duration:settings.issuesSpeed});
        $(settings.issuesDiv+' li').animate({'opacity':settings.issuesTransparency},{queue:false, duration:settings.issuesSpeed}).removeClass(settings.issuesSelectedClass).eq(currentIndex).addClass(settings.issuesSelectedClass).fadeTo(settings.issuesTransparencySpeed,1);
        
        // prev/next buttons disappears on first/last issue 
        if(howManyDates == 1) {
          $(settings.prevButton+','+settings.nextButton).fadeOut('fast');
        } else if(howManyDates == 2) {
          if($(settings.issuesDiv+' li:first-child').hasClass(settings.issuesSelectedClass)) {
            $(settings.prevButton).fadeOut('fast');
            $(settings.nextButton).fadeIn('fast');
          }
          else if($(settings.issuesDiv+' li:last-child').hasClass(settings.issuesSelectedClass)) {
            $(settings.nextButton).fadeOut('fast');
            $(settings.prevButton).fadeIn('fast');
          }
        } else {
          if( $(settings.issuesDiv+' li:first-child').hasClass(settings.issuesSelectedClass) ) {
            $(settings.nextButton).fadeIn('fast');
            $(settings.prevButton).fadeOut('fast');
          }
          else if( $(settings.issuesDiv+' li:last-child').hasClass(settings.issuesSelectedClass) ) {
            $(settings.prevButton).fadeIn('fast');
            $(settings.nextButton).fadeOut('fast');
          }
          else {
            $(settings.nextButton+','+settings.prevButton).fadeIn('slow');
          }
        }

        // now moving the dates
        $(settings.datesDiv+' a').removeClass(settings.datesSelectedClass);
        $(this).addClass(settings.datesSelectedClass);
        $(settings.datesDiv).animate({'marginLeft':defaultPositionDates-(widthDate*currentIndex)},{queue:false, duration:'settings.datesSpeed'});
        
      });

      $(settings.nextButton).bind('click', function(event){
        event.preventDefault();
        var currentIndex = $(settings.issuesDiv).find('li.'+settings.issuesSelectedClass).index();
          var currentPositionIssues = parseInt($(settings.issuesDiv).css('marginLeft').substring(0,$(settings.issuesDiv).css('marginLeft').indexOf('px')));
          var currentIssueIndex = currentPositionIssues/widthIssue;
          var currentPositionDates = parseInt($(settings.datesDiv).css('marginLeft').substring(0,$(settings.datesDiv).css('marginLeft').indexOf('px')));
          var currentIssueDate = currentPositionDates-widthDate;
          if(currentPositionIssues <= -(widthIssue*howManyIssues-(widthIssue))) {
            $(settings.issuesDiv).stop();
            $(settings.datesDiv+' li:last-child a').click();
          } else {
            if (!$(settings.issuesDiv).is(':animated')) {
              $(settings.datesDiv+' li').eq(currentIndex+1).find('a').trigger('click');
            }
          }
   
        // prev/next buttons now disappears on first/last issue
        if(howManyDates == 1) {
          $(settings.prevButton+','+settings.nextButton).fadeOut('fast');
        } else if(howManyDates == 2) {
          if($(settings.issuesDiv+' li:first-child').hasClass(settings.issuesSelectedClass)) {
            $(settings.prevButton).fadeOut('fast');
            $(settings.nextButton).fadeIn('fast');
          }
          else if($(settings.issuesDiv+' li:last-child').hasClass(settings.issuesSelectedClass)) {
            $(settings.nextButton).fadeOut('fast');
            $(settings.prevButton).fadeIn('fast');
          }
        } else {
          if( $(settings.issuesDiv+' li:first-child').hasClass(settings.issuesSelectedClass) ) {
            $(settings.prevButton).fadeOut('fast');
          }
          else if( $(settings.issuesDiv+' li:last-child').hasClass(settings.issuesSelectedClass) ) {
            $(settings.nextButton).fadeOut('fast');
          }
          else {
            $(settings.nextButton+','+settings.prevButton).fadeIn('slow');
          }
        }
      });

      $(settings.prevButton).click(function(event){
        event.preventDefault();
        // bugixed from 0.9.54: now the dates gets centered when there's too much dates.
        var currentIndex = $(settings.issuesDiv).find('li.'+settings.issuesSelectedClass).index();
 
          var currentPositionIssues = parseInt($(settings.issuesDiv).css('marginLeft').substring(0,$(settings.issuesDiv).css('marginLeft').indexOf('px')));
          var currentIssueIndex = currentPositionIssues/widthIssue;
          var currentPositionDates = parseInt($(settings.datesDiv).css('marginLeft').substring(0,$(settings.datesDiv).css('marginLeft').indexOf('px')));
          var currentIssueDate = currentPositionDates+widthDate;
          if(currentPositionIssues >= 0) {
            $(settings.issuesDiv).stop();
            $(settings.datesDiv+' li:first-child a').click();
          } else {
            if (!$(settings.issuesDiv).is(':animated')) {
              // bugixed from 0.9.54: now the dates gets centered when there's too much dates.
              $(settings.datesDiv+' li').eq(currentIndex-1).find('a').trigger('click');
            }
          }
     
        // prev/next buttons now disappears on first/last issue | bugfix from 0.9.51: lower than 1 issue hide the arrows
        if(howManyDates == 1) {
          $(settings.prevButton+','+settings.nextButton).fadeOut('fast');
        } else if(howManyDates == 2) {
          if($(settings.issuesDiv+' li:first-child').hasClass(settings.issuesSelectedClass)) {
            $(settings.prevButton).fadeOut('fast');
            $(settings.nextButton).fadeIn('fast');
          }
          else if($(settings.issuesDiv+' li:last-child').hasClass(settings.issuesSelectedClass)) {
            $(settings.nextButton).fadeOut('fast');
            $(settings.prevButton).fadeIn('fast');
          }
        } else {
          if( $(settings.issuesDiv+' li:first-child').hasClass(settings.issuesSelectedClass) ) {
            $(settings.prevButton).fadeOut('fast');
          }
          else if( $(settings.issuesDiv+' li:last-child').hasClass(settings.issuesSelectedClass) ) {
            $(settings.nextButton).fadeOut('fast');
          }
          else {
            $(settings.nextButton+','+settings.prevButton).fadeIn('slow');
          }
        }
      });

      // keyboard navigation
      if(settings.arrowKeys=='true') {
    
          $(document).keydown(function(event){
            if (event.keyCode == 39) {
                 $(settings.nextButton).click();
              }
            if (event.keyCode == 37) {
                 $(settings.prevButton).click();
              }
          });
      
      }
      
      // default position startAt
      $(settings.datesDiv+' li').eq(settings.startAt-1).find('a').trigger('click');
     
    }
  };

  //windows resize listener
  $(window).resize(function(){
        setting();
      });

  //init
  $(function(){
    setting();
  });
};
