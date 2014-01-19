App.Contact = DS.Model.extend({
  name: DS.attr('string')
});

App.ContactsRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('contact');
  }
});

App.ContactRoute = Ember.Route.extend({
  model: function(params) {
    return this.store.find('contact', params.contact_id);
  }
});

App.ContactsController = Ember.ArrayController.extend({

});

App.ContactController = Ember.ObjectController.extend({
  actions: {
    destroy: function(contact) {
      contact.deleteRecord();
      contact.save();
    },

    edit: function(contact) {
      this.render()
    }
  }
});

//http://reefpoints.dockyard.com/ember/2013/01/10/building-an-ember-app-with-rails-api-part-3.html
//http://blog.crowdint.com/2013/09/10/upgrading-your-old-ember-js-application.html
//http://virantha.com/2013/09/29/quick-web-app-with-go-ember-js-and-mongodb/
App.ContactsView = Ember.View.extend({layoutName: 'loggedin'});

App.ContactsEditController = Ember.Controller.extend({
  actions: {
    update: function() {
      console.log(this.get('name'))
      /*var contact = this.get('model')
      contact.set('name', this.get('name'))
      contact.save().then(function() {
        this.transitionToRoute('contacts')
      }.bind(this));*/
    }
  }
});

App.ContactsEditView = Ember.View.extend({
  submit: function(evt) {
    evt.preventDefault();
    this.get('controller').send('update')
    return false;
  }
})

App.ContactsNewController = Ember.Controller.extend({
  actions: {
    create: function() {
      var contact = this.store.createRecord('contact')
      contact.set('name', this.get('name'))
      contact.save().then(function() {
        this.transitionToRoute('contacts')
      }.bind(this))
    }
  }
});

App.ContactsNewView = Ember.View.extend({
  submit: function(evt) {
    evt.preventDefault();
    this.get('controller').send('create')
    return false;
  }
})

