App.NotesIndexController = Ember.ArrayController.extend({});

App.NotesNewController = Ember.ObjectController.extend({
  states: [{id: 'buy', name:'Køb'}, {id: 'sell', name: 'Sælge'}],
  vehicles: [{id: 'car', name:'Personbil'}, {id: 'truck', name: 'Lastbil'}, {id: 'motorcycle', name: "Motorcykel"}],
  generate_notes: ['FDM', 'BilBasen']
});



//http://stackoverflow.com/questions/17252419/emberjs-own-view-with-value-binding

App.NotesShowStep1Controller = Ember.ObjectController.extend({
  modelReady: function() {
    var model = this.get('model');
    var seller = model.get('seller_id'), 
        buyer = model.get('buyer_id');
    
    this.set('seller', this.getContact(seller));
    this.set('buyer', this.getContact(buyer));

  }.observes('model'),
  getContact: function(contact) {
    if (contact) {
      return this.store.find('contact', contact.get('id'));
    } else {
      return this.store.createRecord('contact');
    }
  },
  actions: {
    save: function() {
      console.log(this.get('seller'));
      console.log(this.get('buyer'));
      /*var seller_id = this.get('seller_id'), buyer_id = this.get('buyer_id');

      var promises = {};

      if (seller_id !== null) {
        promises['seller'] = this.store.find('contact', seller_id)
      }

      if (buyer_id !== null ) {
        promises['buyer'] = this.store.find('contact', buyer_id)
      }

      var model = this.get('model')
      Ember.RSVP.hash(promises).then(function(results) {
        if ( results.buyer ) {
          model.set('buyer_id', results.buyer)
        }

        if ( results.seller )  {
          model.set('seller_id', results.seller)
        }

        model.save()
      });*/
    }
  }
});
