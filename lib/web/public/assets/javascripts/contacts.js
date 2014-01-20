App.Contact = DS.Model.extend({
  name: DS.attr('string'),
  address: DS.attr('string'),
  city: DS.attr('string'),
  postcode: DS.attr('string'),
  phone: DS.attr('string'),
  email: DS.attr('string')
});

App.ContactsRoute = Ember.Route.extend({
  actions: {
    create: function(model) {
      model.save();
      this.transitionTo('contacts');
    },
    remove: function(model) {
      model.deleteRecord();
      model.save();
    },
    update: function(model) {
      model.save();
      this.transitionTo('contacts')
    }
  }
});

App.ContactRoute = Ember.Route.extend({
  model: function(params) {
    return this.store.find('contact', params.contact_id);
  },
});

App.ContactsIndexRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('contact');
  }
})

App.ContactsNewRoute = Ember.Route.extend({
  model: function() {
    return this.store.createRecord('contact');
  }
});

//http://reefpoints.dockyard.com/ember/2013/01/10/building-an-ember-app-with-rails-api-part-3.html
//http://blog.crowdint.com/2013/09/10/upgrading-your-old-ember-js-application.html
//http://virantha.com/2013/09/29/quick-web-app-with-go-ember-js-and-mongodb/

App.ContactsIndexController = Ember.ArrayController.extend({})

App.ContactsView = Ember.View.extend({layoutName: 'loggedin'});
