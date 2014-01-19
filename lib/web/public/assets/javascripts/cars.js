App.CarsController = Ember.ArrayController.extend({});

App.CarsView = Ember.View.extend({
  layoutName: 'loggedin'
});

App.CarsRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('car');
  }
});

App.Car = DS.Model.extend({
  _id: DS.attr('string'),
  brand: DS.attr('string'),
  model: DS.attr('string'),
  year: DS.attr('number'),
  chassis_number: DS.attr('string'),
  odometer: DS.attr('string'),
  first_registered: DS.attr('string'),
  last_registered: DS.attr('string')
});
