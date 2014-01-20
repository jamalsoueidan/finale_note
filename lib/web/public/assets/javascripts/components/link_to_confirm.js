App.LinkToConfirmComponent = Ember.Component.extend({
  tagName: 'a',
  attributeBindings: ["href"],
  href: "#",
  click: function(evt) {
    evt.preventDefault();
    if(confirm("Are you sure?")) {
      this.sendAction('action', this.get('item'))
    }
    return false;
  }
});
