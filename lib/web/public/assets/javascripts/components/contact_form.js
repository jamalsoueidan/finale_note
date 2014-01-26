var set = Ember.set,
    get = Ember.get,
    forEach = Ember.EnumerableUtils.forEach;

App.ContactFormComponent = Ember.Component.extend({
  isDisabled: true,
  fields: ['name', 'address', 'city', 'postcode', 'phone', 'email'],
  keyUpName: function(e) {
    this.set('isDisabled', false);
    var content = this.get('content'),
        value = this.get('name');

    var searchResult = content.filter(function(obj) {
      var name = get(obj, 'name') || ' ';
      return name.search(new RegExp(value, "i")) > -1;
    });

    this.set('items', searchResult.slice(0, 5));
  },
  focusOut: function() {
    var newRecord = this.get('newRecord')
    this._applyValues(newRecord, this)
    this.set('value', newRecord)
  },
  _applyValues: function(setObjectOn, getObjectFrom) {
    forEach(this.get('fields'), function(field) {
      setObjectOn.set(field, getObjectFrom.get(field))
    });
  },
  init: function() {
    var model = this.get('value');
    if (model) {
      var self =  this
      model.then(self._setValue.bind(this));
    }
    this._super();
  },
  didInsertElement: function() {
    this.$('input:first').bind('keyup', this.keyUpName.bind(this));
  },
  _setValue: function(model) {
    this._applyValues(this, model);
    this.set('value', model)
    this.set('isDisabled', true);
  },
  actions: {
    choose: function(model) {
      this._setValue(model)
    }
  }
});
