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
  model: function() {
    return this.store.createRecord('note')
  },
  actions: {
    save: function(model) {
      model.save();
      this.transitionTo('notes')
    },
  }
});

App.NotesShowRoute = Ember.Route.extend({
  model: function(params) {
    return this.store.find('note', params.note_id)
  }
})

App.NotesShowIndexRoute = Ember.Route.extend({
  beforeModel: function() {
    this.transitionTo('notes.show.step1');
  }
})

App.NotesShowStep1Route = Ember.Route.extend({
  setupController: function(controller, model) {
    controller.set('model', this.modelFor('notes.show'))
    controller.set('contacts', this.store.find('contact'))
    this._super(controller, model)
  },
  actions: {
    save: function() {
      //this.transitionTo('notes.show.step2')
    }
  }
})


App.NotesShowStep2Route = Ember.Route.extend({
  setupController: function(controller, model) {
    controller.set('model', this.modelFor('notes.show'))
    this._super(controller, model)
  }
});

