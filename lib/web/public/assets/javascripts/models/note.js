//http://embersherpa.com/articles/crud-example-app-without-ember-data/

var empty = Ember.isEmpty;

App.ImageTransform = DS.Transform.extend({
  deserialize: function(serialized) {
    return empty(serialized) ? null : serialized;
  },

  serialize: function(deserialized) {
    return empty(deserialized) ? null : deserialized;
  }
});

App.Note = DS.Model.extend({
  state: DS.attr('string'),
  vehicle: DS.attr('string'),
  generate_note: DS.attr('string'),
  seller_id: DS.belongsTo('contact'),
  buyer_id: DS.belongsTo('contact'),
  car_id: DS.belongsTo('car'),
  seller_sign: DS.attr('image'),
  buyer_sign: DS.attr('image'),
  created_at: DS.attr('date'),
  updated_at: DS.attr('date')
});

