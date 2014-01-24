App.Contact = DS.Model.extend({
  name: DS.attr('string'),
  address: DS.attr('string'),
  city: DS.attr('string'),
  postcode: DS.attr('string'),
  phone: DS.attr('string'),
  email: DS.attr('string')
});
