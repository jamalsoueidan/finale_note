//http://embersherpa.com/articles/crud-example-app-without-ember-data/

App.Note = DS.Model.extend({
  state: DS.attr('string'),
  seller_id: DS.belongsTo('contact'),
  buyer_id: DS.belongsTo('contact')
});

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

App.NoteRoute = Ember.Route.extend({
  model: function(note) {
    return this.store.find('note', note.note_id)
  }
})

App.NotesIndexRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('note');
  }
})

App.NotesNewRoute = Ember.Route.extend({
  model: function() {
    return this.store.createRecord('note');
  }
});

App.NotesIndexController = Ember.ArrayController.extend({})

App.NotesView = Ember.View.extend({layoutName: 'loggedin'});
