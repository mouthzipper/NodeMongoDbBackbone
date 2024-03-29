define(['TambayanView', 'text!templates/profile.html',
        'text!templates/status.html', 'models/Status',
        'views/status'],
function(TambayanView,  profileTemplate,
         statusTemplate, Status, StatusView)
{
  var profileView = TambayanView.extend({
    el: $('#content2'),

    events: {
      "submit form": "postStatus"
    },

    initialize: function (options) {
      this.socketEvents = options.socketEvents;
      this.model.bind('change', this.render, this);
    },

    postStatus: function() {
      var that = this;
      var statusText = $('input[name=status]').val();
      var statusCollection = this.collection;
      $.post('/accounts/' + this.model.get('_id') + '/status', {
        status: statusText
      });
       
      return false;
    },

    onSocketStatusAdded: function(data) {
      var newStatus = data.data;
      this.prependStatus(new Status({status:newStatus.status,name:newStatus.name}))
    },

    prependStatus: function(statusModel) {
      $('#status').hide();
      var statusHtml = (new StatusView({ model: statusModel })).render().el;
      $(statusHtml).prependTo('.status_list').hide().fadeIn('slow');
    },

    render: function() {

      if ( this.model.get('_id')) {
        this.socketEvents.bind('status:' + this.model.get('_id'), this.onSocketStatusAdded, this );
      }
      var that = this;
      this.$el.html(
        _.template(profileTemplate,this.model.toJSON())
      );

      var statusCollection = this.model.get('status');
      if ( null != statusCollection ) {
        _.each(statusCollection, function (statusJson) {
          var statusModel = new Status(statusJson);
          that.prependStatus(statusModel);
        });
      }
    }
  });

  return profileView;
});
