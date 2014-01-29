App.ApplicationRoute = Ember.Route.extend({

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
    },
    sendMail: function(model) {
      Ember.$.ajax({ url: 'api/note/' + model.get('id') + "/sendMail", dataType: "json", type: 'POST' }).then(function (data) {
        console.log(data);
      });
    },
    download: function(model) {
      Ember.$.ajax({ url: 'api/note/' + model.get('id') + "/download", dataType: "json", type: 'POST' }).then(function (data) {
        window.location = data.url;
      });
    }
  }
});

App.NotesIndexRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('note');
  }
})

App.NotesNewRoute = Ember.Route.extend({
  model: function() {
    return this.store.createRecord('note')
  },
  actions: {
    save: function(model) {
      var self = this;
      model.save().then(function(object) {
        self.transitionTo('notes.show.step1', object.id)
      });
    },
  }
});

App.NotesShowRoute = Ember.Route.extend({
  model: function(params) {
    return this.store.find('note', params.note_id)
  },
  afterModel: function(note, transition) {
    var seller_id = note.get('seller_id'), buyer_id = note.get('buyer_id')
    var car_id = note.get('car_id')
    if (!seller_id || !buyer_id) {
      this.transitionTo('notes.show.step1')
    } else if (!car_id) {
      this.transitionTo('notes.show.step2')
    }
  },
  actions: {
    updateContact: function() {
      this.transitionTo('notes.show.step1')
    },
    updateCar: function() {
      this.transitionTo('notes.show.step2')
    }
  }
})

App.NotesShowIndexRoute = Ember.Route.extend({
  setupController: function(controller, model) {
    controller.set('model', this.modelFor('notes.show'))
    this._super(controller, model)
  }
});

App.NotesShowStep1Route = Ember.Route.extend({
  setupController: function(controller, model) {
    controller.set('model', this.modelFor('notes.show'))
    controller.set('contacts', this.store.find('contact'))
    this._super(controller, model)
  },
  actions: {
    save: function() {
      this.transitionTo('notes.show.step2')
    }
  }
})

App.NotesShowStep2Route = Ember.Route.extend({
  setupController: function(controller, model) {
    controller.set('model', this.modelFor('notes.show'))
    this._super(controller, model)
  },
  actions: {
    save: function() {
      this.transitionTo('notes.show.index')
    }
  }
});

App.NotesShowSignContractRoute = Ember.Route.extend({
  setupController: function(controller, model) {
    controller.set('note', this.modelFor('notes.show'));
    this._super(controller, model);
  },
  actions: {
    close: function() {
      this.transitionTo('notes.show.index')
    },
    save: function() {
      this.transitionTo('notes.show.index')
    }
  }
})

