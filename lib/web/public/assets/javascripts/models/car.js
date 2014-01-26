//http://embersherpa.com/articles/crud-example-app-without-ember-data/

App.Car = DS.Model.extend({
  register_number: DS.attr('number'),
  brand: DS.attr('string'),
  model_name: DS.attr('string'),
  model_year: DS.attr('number'),
  miles: DS.attr('number')
});
