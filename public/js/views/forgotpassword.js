define(['TambayanView', 'text!templates/forgotpassword.html'], function(TambayanView, forgotpasswordTemplate) {
  var forgotpasswordView = TambayanView.extend({
    requireLogin: false,

    el: $('#content'),

    events: {
      "submit form": "password"
    },

    password: function() {
       window.location.hash = 'login';
      $.post('/forgotpassword', {
        email: $('input[name=email]').val()
      }, function(data) {
        console.log(data);

      });
      return false;
    },

    render: function() {
      this.$el.html(forgotpasswordTemplate);
    }
  });

  return forgotpasswordView;
});
