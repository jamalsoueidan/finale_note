App.NotesRoute = Ember.Route.extend({
  actions: {
    create: function(model) {
      model.save();
      this.transitionTo('notes');
    },
    remove: function(model) {
      model.deleteRecord();
      model.save();
    },
    update: function(model) {
      model.save();
      this.transitionTo('notes')
    }
  }
});

App.NotesIndexRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('note');
  }
})

App.NotesNewRoute = Ember.Route.extend({
  findContact: function(id) {
    this.store.find('contact', id)
  },
  actions: {
    gotoFirst: function(model) {
      var self = this
      model.save().then(function() {
        self.transitionTo('notes.new.step1', model.get('id'))
      })
    },
    gotoSecond: function() {
      this.transitionTo('notes.new.second')
    }
  }
});

App.NotesNewIndexRoute = Ember.Route.extend({
  model: function() {
    return this.store.createRecord('note')
  }
});

App.NotesNewStep1Route = Ember.Route.extend({
  setupController: function(controller, model) {
    controller.set('model', model)
    controller.set('contacts', this.store.find('contact'))
  }
});

App.NotesNewStep2Route = Ember.Route.extend({
  
});

