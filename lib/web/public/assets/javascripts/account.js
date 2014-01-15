//http://blog.sensible.io/2013/05/23/how-to-write-a-login-form.html

App.LoginView = Ember.View.extend({layoutName: 'guest'});
App.LoginController = Ember.Controller.extend({
  isProcessing: false,
  isSlowConnection: false,
  timeout: null,

  success: function() {
    this.reset();
    this.transitionToRoute('overview');
  },
  failure: function(data) {
    this.reset();
    this.set('message', data.responseJSON.message);
  },
  slowConnection: function() {
    this.set("isSlowConnection", true);
  },
  reset: function() {
    clearTimeout(this.get("timeout"));
    this.setProperties({
      isProcessing: false,
      isSlowConnection: false
    });
  },
  actions: {
    login: function() {
      this.setProperties({
        isProcessing: true
      });

      this.set("timeout", setTimeout(this.slowConnection.bind(this), 5000));
      if ( this.get('email') === undefined ) {
        this.reset();
        return;
      }

      var request = $.post("http://localhost:8081/account/login", this.getProperties("email", "password"));
      request.then(this.success.bind(this), this.failure.bind(this));
    }
  }
});


App.SignupView = Ember.View.extend({layoutName: 'guest'});
App.SignupController = Ember.Controller.extend({
  success: function(data) {
    console.log(this.get('loggedIn'))
  },
  failure: function(data) {
    this.set('message', data.responseJSON.message);
  },
  actions: {
    signup: function() {
      //add validation to all fields
      if ( this.get('password') !== this.get('password_confirmation')) {
        return;
      }

      var request = $.post("http://localhost:8081/account/signup", this.getProperties("email", "password"));
      request.then(this.success.bind(this), this.failure.bind(this));
    }
  }
});

App.LogoutRoute = Ember.Route.extend({
  renderTemplate: function(controller, model) {
    controller.logout();
  }
});
App.LogoutController = Ember.Controller.extend({
  logout: function() {
    $.get('http://localhost:8081/account/logout', function() {
      this.transitionToRoute('login');
    });
  }
});
