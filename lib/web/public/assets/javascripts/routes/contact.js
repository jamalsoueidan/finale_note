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
