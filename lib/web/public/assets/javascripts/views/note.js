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

App.NotesShowSignContractView = Ember.View.extend({
  started: false,
  didInsertElement: function() {
    canvas = this.$('canvas').get(0);
    context = canvas.getContext('2d');

    context.canvas.width = window.innerWidth;
    context.canvas.height = window.innerHeight;
    
    this.set('board', context)

    //window.addEventListener("orientationchange", init, false);
    document.body.addEventListener('touchmove',function(e){
      e.preventDefault();
    }, false);
  },
  _drawStart: function(options) {
    var context = this.get('board');
    context.beginPath();
    context.moveTo(options.pageX, options.pageY);
    this.set('started', true);
  },
  _drawMove: function(options) {
    if (this.get('started')) {
      var context = this.get('board');
      context.lineTo( options.pageX, options.pageY );
      context.stroke();
    }
  },
  click: function(e) {
    var id = e.target.id;
    if(id == "save") {
      canvas = this.$('canvas').get(0);
      img = canvas.toDataURL("image/png");
      this.get('controller').send('save', img)
    }
    if (id=="close") {
      this.get('controller').send('close')
    }
  },
  touchStart: Ember.aliasMethod('mouseDown'),
  mouseDown: function(e) {
    var options = null;
    if(event.type=="mousedown") {
      options = {pageX: e.originalEvent.pageX, pageY: e.originalEvent.pageY};
    } else {
      options = e.originalEvent.targetTouches[0]
    }
    this._drawStart(options)
  },
  touchMove: Ember.aliasMethod('mouseMove'),
  mouseMove: function(e) {
    var options = null;
    if(event.type=="mousemove") {
      options = {pageX: e.originalEvent.pageX, pageY: e.originalEvent.pageY};
    } else {
      options = e.originalEvent.targetTouches[0]
    }
    this._drawMove(options)
  },
  touchEnd: Ember.aliasMethod('mouseUp'),
  mouseUp: function(e) {
    this.set('started', false);
  }
})
