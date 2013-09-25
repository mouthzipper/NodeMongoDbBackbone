require.config({
  paths: {
    jQuery: '/js/libs/jquery',
    Underscore: '/js/libs/underscore',
    Backbone: '/js/libs/backbone',
    Sockets: '/socket.io/socket.io',
    models: 'models',
    text: '/js/libs/text',
    templates: '../templates',

    TambayanView: '/js/TambayanView'
  },

  shim: {
    'Backbone': ['Underscore', 'jQuery'],
    'Tambayan': ['Backbone']
  }
});

require(['Tambayan'], function(Tambayan) {
  Tambayan.initialize();
});
