App.NotesView = Ember.View.extend({layoutName: 'loggedin'});

App.NotesShowStep1View = Ember.View.extend({
  submit: function() {
    var seller = this.get('controller.seller')
    if (!seller) {
      alert('Sælger information mangler');
      return;
    } 

    var buyer = this.get('controller.buyer');
    if(!buyer) {
      alert('Køber information mangler')
      return;
    }

    this.get('controller').send('save');
  }
})
