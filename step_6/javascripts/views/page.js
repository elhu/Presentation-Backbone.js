$(document).ready(function() {
  window.PageView = Backbone.View.extend({
    tagname: 'div',
    className: 'container',
    template: _.template($("#page-template").html()),
    statsTemplate: _.template($('#stats-template').html()),
    
    events: {
      'keypress .todo.new': 'select',
      'click .todo.clear': 'clearDoneFromCollection'
   },

    initialize: function() {
      _.bindAll(this, 'render', 'renderTask', 'renderStats', 'renderTasks');
      this.collection.bind('add', this.renderTask);
      this.collection.bind('reset', this.renderTasks);
      this.collection.bind('all', this.renderStats);
    },

    render: function() {
      $(this.el).html(this.template());
      return this;
    },


    clearDoneFromCollection: function() {
      this.collection.clearDone();
      return false;
    },

    renderStats: function() {
      this.$('.todo.stats').html(this.statsTemplate({
        total:      this.collection.length,
        done:       this.collection.done(),
        remaining:  this.collection.remaining()
      }));
    },

    renderTasks: function() {
      var view = this;
      this.collection.each(function(task) {
        view.renderTask(task);
      });
    },

    renderTask: function(task) {
      var view = new TodoView({
        model: task,
        collection: this.collection,
      });
      this.$("ul").append(view.render().el);
    },

    select: function(event) {
      var text = this.$(".todo.new").val();
      if (event.which == 13 && text != "") {
        this.queueTask(text);
        $(".todo.new").val("");
      }
    },

    queueTask: function(task_content) {
      task = new Todo({task: task_content});
      task.save();
      this.collection.add(task);
    }
  });
});
