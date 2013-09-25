define(['TambayanView', 'views/contact', 'text!templates/contacts.html'],
function(TambayanView, ContactView, contactsTemplate) {
  var contactsView = TambayanView.extend({
    el: $('#content'),

    initialize: function() {
      this.collection.on('reset', this.renderCollection, this);
    },

    render: function() {
      this.$el.html(contactsTemplate);
    },

    renderCollection: function(collection) {
      $('.contacts_list').empty();
      collection.each(function(contact) {
        var statusHtml = (new ContactView({ removeButton: true, model: contact })).render().el;
        $(statusHtml).appendTo('.contacts_list');
      });
    }
  });

  return contactsView;
});
