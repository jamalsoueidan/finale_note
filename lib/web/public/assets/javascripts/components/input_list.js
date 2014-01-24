var set = Ember.set,
    get = Ember.get,
    forEach = Ember.EnumerableUtils.forEach;

App.InputListComponent = Ember.Component.extend({
  keyUp: function() {
    var content = this.get('content'),
        value = this.get('name');

    var searchResult = content.filter(function(obj) {
      return get(obj, 'name').search(new RegExp(value, "i")) > -1;
    });

    this.set('items', searchResult.slice(0, 5))
  },
  init: function() {
    this._super();
    var content = this.get('content')
    if (content !== undefined)
      this.set('items', content.slice(0, 5))
  },
  actions: {
    choose: function(item) {
      this.sendAction('action', item.get('id'), this.get('type'))
    }
  }
});
