App.NotesIndexController = Ember.ArrayController.extend({});

App.NotesNewIndexController = Ember.ObjectController.extend({
  states: [{id: 'buy', name:'Køb'}, {id: 'sell', name: 'Sælge'}],
  vehicles: [{id: 'car', name:'Personbil'}, {id: 'truck', name: 'Lastbil'}, {id: 'motorcycle', name: "Motorcykel"}],
  generate_notes: ['FDM', 'BilBasen']
});

//http://stackoverflow.com/questions/17252419/emberjs-own-view-with-value-binding
App.NotesNewStep1Controller = Ember.ObjectController.extend({
  seller_id: null,
  buyer_id: null,

  actions: {
    gotoSecond: function() {
      var seller_id = this.get('seller_id'), buyer_id = this.get('buyer_id');

      if (seller_id === undefined) {
        
      }

      /*var promises = {
        seller: this.store.find('contact', this.get('seller_id')),
        buyer: this.store.find('contact', this.get('buyer_id'))
      }

      var model = this.get('model')
      Ember.RSVP.hash(promises).then(function(results) {
        model.set('buyer_id', results.buyer)
        model.set('seller_id', results.seller)
      });*/
      //return true;
    },
    fillInfo: function(contact_id, contact_type) {
      var self = this
      var fields = Ember.A(["id", 'address', 'city', 'postcode', 'phone', 'email'])
      this.store.find('contact', contact_id).then(function(object) {
        fields.forEach(function(field) {
          self.set(contact_type + "_" + field, object.get(field))
        })
      });
    }
  }
});
