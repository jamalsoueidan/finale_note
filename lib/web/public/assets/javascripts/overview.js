App.OverviewView = Ember.View.extend({
  layoutName: 'loggedin'
});

App.OverviewController = Ember.Controller.extend({
  init: function() {
    console.log('c')
    this._super();
  }
});
