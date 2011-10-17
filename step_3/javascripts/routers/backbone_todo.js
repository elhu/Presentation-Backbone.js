window.BackboneTodo = Backbone.Router.extend({
  routes: {
    '': 'home'
  },

  initialize: function() {
    this.pageView = new PageView({

    });
  },

  home: function() {
    var $container = $("#container");
    $container.empty();
    $container.append(this.pageView.render().el);
  }
});
