//http://www.cerebris.com/blog/2012/03/06/understanding-ember-object/
App = Ember.Application.create({
  LOG_TRANSITIONS: true,
  LOG_BINDINGS: true,
  LOG_VIEW_LOOKUPS: true,
  LOG_STACKTRACE_ON_DEPRECATION: true,
  LOG_VERSION: true,
  debugMode: true
});

App.Router.map(function() {
  this.route('login', {path: "/"});
  this.route('signup');
  this.route('overview');
  this.route('logout');

  this.resource("notes", function() {
    this.route('new');
    this.resource('notes.show', {path: "/:note_id"}, function() {
      this.route('step1')
      this.route('step2')
      this.route('sign_contract', {path: "sign_contract/:type"})
    });
  });

  this.resource("cars", function() {
    this.route('new')
    this.route('edit', {path: '/:contact_id/edit'})
    this.route('destroy', {path: '/:contact_id/destroy'})
  });

  this.resource("contacts", function() {
    this.route('new')
    this.route('edit', {path: '/edit/:contact_id'})
    this.route('destroy', {path: '/destroy/:contact_id'})
  });
});

App.ApplicationSerializer = DS.RESTSerializer.extend({
  primaryKey: '_id'
});

App.ApplicationAdapter = DS.RESTAdapter.extend({
    url: 'http://localhost:8081',
    namespace: 'api'
})
