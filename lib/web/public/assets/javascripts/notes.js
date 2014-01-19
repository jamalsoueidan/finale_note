App.NotesController = Ember.ArrayController.extend({});

App.NotesView = Ember.View.extend({
  layoutName: 'loggedin'
});

App.NotesRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('note');
  }
});

App.Note = DS.Model.extend({
  state: DS.attr('string'),
  seller_id: DS.belongsTo('contact'),
  buyer_id: DS.belongsTo('contact')
});
