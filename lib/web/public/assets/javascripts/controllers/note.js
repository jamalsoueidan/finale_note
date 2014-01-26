App.NotesIndexController = Ember.ArrayController.extend({});

App.NotesNewController = Ember.ObjectController.extend({
  states: [{id: 'buy', name:'Køb'}, {id: 'sell', name: 'Sælge'}],
  vehicles: [{id: 'car', name:'Personbil'}, {id: 'truck', name: 'Lastbil'}, {id: 'motorcycle', name: "Motorcykel"}],
  generate_notes: ['FDM', 'BilBasen']
});


App.NotesShowStep2Controller = Ember.ObjectController.extend({
  modelReady: function() {
    var car = this.get('model').get('car_id') || this.store.createRecord('car')
    this.set('car', car)
  }.observes('model'),
  actions: {
    save: function() {
      var model = this.get('model')
      var car = this.get('car');
      car.save().then(function(object) {
        console.log(object)
        model.set('car_id', object)
        model.save();
      })

      return true;
    }
  }
});

//http://stackoverflow.com/questions/17252419/emberjs-own-view-with-value-binding
App.NotesShowStep1Controller = Ember.ObjectController.extend({
  modelReady: function() {
    var model = this.get('model');
    var seller = model.get('seller_id'), 
        buyer = model.get('buyer_id');
    
    this.set('seller', this.getContact(seller));
    this.set('buyer', this.getContact(buyer));

    this.set('seller_new_record', this.store.createRecord('contact'))
    this.set('buyer_new_record', this.store.createRecord('contact'))

  }.observes('model'),
  getContact: function(contact) {
    if (contact) {
      return this.store.find('contact', contact.get('id'));
    }
    return null;
  },
  saveModels: function(promises) {
    var model = this.get('model');
    Ember.RSVP.hash(promises).then(function(results) {
      console.log()
      if(results.buyer) {
        model.set('buyer_id', results.buyer)
      }
      if(results.seller) {
       model.set('seller_id', results.seller) 
      }

      model.save();
    })
  },
  actions: {
    save: function() {
      var seller = this.get('seller');
      var buyer = this.get('buyer');
      var model = this.get('model');

      promises = {};
      
      if(seller.get('isNew')) {
        promises.seller = seller.save();
      } else {
        model.set('seller_id', seller)
      }

      if(buyer.get('isNew')) {
        promises.buyer = buyer.save();
      } else {
        model.set('buyer_id', buyer)
      }

      if(promises.seller || promises.buyer) {
        this.saveModels(promises);
      } else {
        model.save();
      }

      return true;
    }
  }
});
