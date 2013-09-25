define(['TambayanView', 'text!templates/register.html'], function(TambayanView, registerTemplate) {
  var registerView = TambayanView.extend({
    requireLogin: false,

	el: $('#content'),

    events: {
      "submit form": "register"
    },

    register: function() {
      $.post('/register', {
        firstName: $('input[name=firstName]').val(),
        lastName: $('input[name=lastName]').val(),
        email: $('input[name=email]').val(),
        password: $('input[name=password]').val(),
      }, function(data) {
         $("#success").text('Successfully Registered.');
        $("#success").slideDown();
         window.location.hash = 'login';
      }).error(function(){
        $("#error").text('Please enter the correct credentials.');
        $("#error").slideDown();
        $("input[name=firstName]").focus();
      });;
      return false;
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
