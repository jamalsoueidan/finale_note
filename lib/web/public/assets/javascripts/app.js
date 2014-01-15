App = Ember.Application.create({
  LOG_TRANSITIONS: true
});

App.Store = DS.Store.extend({
})

App.Router.map(function() {
  this.route('login', {path: "/"});
  this.route('signup');
  this.route('overview');
  this.route('logout')
});

App.LogoutController = Ember.Controller.extend({
  logout: function() {
    this.transitionToRoute('login');
  }
});

App.LogoutRoute = Ember.Route.extend({
  renderTemplate: function(controller, model) {
    controller.logout();
  }
});
