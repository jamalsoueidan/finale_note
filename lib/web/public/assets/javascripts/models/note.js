//http://embersherpa.com/articles/crud-example-app-without-ember-data/

App.Note = DS.Model.extend({
  state: DS.attr('string'),
  vehicle: DS.attr('string'),
  generate_note: DS.attr('string'),
  seller_id: DS.belongsTo('contact'),
  buyer_id: DS.belongsTo('contact'),
  car_id: DS.belongsTo('car')
});
