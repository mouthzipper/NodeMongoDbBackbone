define(['TambayanView', 'text!templates/register.html'], function(TambayanView, registerTemplate) {
  var registerView = TambayanView.extend({
    requireLogin: false,

	el: $('#content'),

    events: {
      "submit form": "logout"
    },

    logout: function() {
      $('#profile').hide();
        window.activeSession.clear();
         window.location.hash = 'login';
     
    },

    render: function() {
      this.$el.html(registerTemplate);
       $("#error").hide();
       $("#success").hide();
      $("input[name=firstName]").focus();
    }
  });

  return registerView;
});

