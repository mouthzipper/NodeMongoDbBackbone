define(['TambayanView', 'text!templates/status.html'], function(TambayanView, statusTemplate) {
  var statusView = TambayanView.extend({
    tagName: 'li',

    render: function() {
      $(this.el).html(_.template(statusTemplate,this.model.toJSON()));
      return this;
    }
  });

  return statusView;
});
