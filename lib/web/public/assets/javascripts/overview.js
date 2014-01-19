App.OverviewView = Ember.View.extend({
  layoutName: 'loggedin'
});

App.OverviewController = Ember.Controller.extend({
   /*init: function() {


   $.ajax({type: "POST",
            url: "http://localhost:8081/account/login",
            data: {email: "jamal@soueidan.com", password: "jamals"},
            dataType: 'json',
            xhrFields: {
              withCredentials: true
            },
            error: function(data) {
              console.log(data);
            }});

    $.ajax({
            url: "http://localhost:8081/notes",
            xhrFields: {
     withCredentials: true
   }
})
  .done(function( data ) {
    if ( console && console.log ) {
      console.log( "Sample of data:", data.slice( 0, 100 ) );
    }
  });
    this._super();
  }*/
});
