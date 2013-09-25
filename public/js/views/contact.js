define(['TambayanView', 'text!templates/contact.html'], function(TambayanView, contactTemplate) {
  var contactView = TambayanView.extend({
    addButton: false,

    removeButton: false,

    tagName: 'li',

    events: {
      "click .addbutton": "addContact",
      "click .removebutton": "removeContact"
    },

    addContact: function() {
       $('#profile').hide();
      var $responseArea = this.$('.actionArea');
      $.post('/accounts/me/contact',
        {contactId: this.model.get('_id')},
        function onSuccess() {
          $responseArea.text('Contact Added');
        }, function onError() {
          $responseArea.text('Could not add contact');
        }
      );
    },

    removeContact: function() {
       $('#profile').hide();
      var $responseArea = this.$('.actionarea');
      $responseArea.text('Removing contact...');
      $.ajax({
        url: '/accounts/me/contact',
        type: 'DELETE',
        data: {
          contactId: this.model.get('accountId')
        }}).done(function onSuccess() {
          $responseArea.text('Contact Removed');
        }).fail(function onError() {
          $responseArea.text('Could not remove contact');
        });
    },

    initialize: function() {
      $('#profile').hide();
      if ( this.options.addButton ) {
        this.addButton = this.options.addButton;
      }

      if ( this.options.removeButton ) {
        this.removeButton = this.options.removeButton;
      }
    },

    render: function() {
       $('#profile').hide();
      $(this.el).html(_.template(contactTemplate, {
        model: this.model.toJSON(),
        addButton: this.addButton,
        removeButton: this.removeButton
      }));
      return this;
    }
  });

  return contactView;
});
