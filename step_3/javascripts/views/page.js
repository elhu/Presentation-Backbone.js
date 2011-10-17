$(document).ready(function() {
  window.PageView = Backbone.View.extend({
    tagname: 'div',
    className: 'container',
    template: _.template($("#page-template").html()),

    initialize: function() {
      _.bindAll(this, 'render');
    },

    render: function() {
      $(this.el).html(this.template());
      return this;
    }
  });
});
