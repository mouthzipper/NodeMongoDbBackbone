define(['TambayanView', 'text!templates/login.html'], function(TambayanView, loginTemplate) {
  var loginView = TambayanView.extend({
    requireLogin: false,

    el: $('#content'),

    events: {
      "submit form": "login"
    },

    initialize: function(options) {
      this.socketEvents = options.socketEvents;
    },

    login: function() {
      var socketEvents = this.socketEvents;
      $.post('/login',
        this.$('form').serialize(), function(data) {
          socketEvents.trigger('app:loggedin', data);
          window.location.hash = 'index';
      }).error(function(){
        $("#error").text('Please enter the correct username and password.');
        $("#error").slideDown();
      });
      return false;
    },

    render: function() {
      this.$el.html(loginTemplate);
      $("#error").hide();
      $("input[name=email]").focus();
    }
  });

  return loginView;
});
