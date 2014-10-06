var Todo = Backbone.Model.extend({
  defaults: {
    title:''
  },

  firebase: new Backbone.Firebase("https://blistering-torch-3318.firebaseio.com/")
});



var TodosView = Backbone.View.extend({
  tagName:'form',
  className:'library-list',
  initialize: function () {
    $('.jumbotron').append(this.el);
    this.listenTo(this.collection, 'add', function(book){
      this.$el.append('<input class="checkbox" type="checkbox"><span class="text">' + book.get('title') + '</span><br>');
    });
  },

  events: {"click .checkbox" : "strikethrough"},

  strikethrough: function() {
    $('.checkbox').next().css("text-decoration","none");
    $('input:checked').next().css("text-decoration","line-through");
  }

});

var TodoCollection = Backbone.Firebase.Collection.extend({
  model: Todo,
  firebase: "https://popping-heat-1936.firebaseio.com/"
});

var CreateTodoView = Backbone.View.extend({
  tagName: "input",
  className: "create-toDo",
  attributes: {
    type: "text"
  },

  //Events are for physical things that happen in the DOM (Click, keyup, etc)
  //listenTo is for the changes/events in models and collections.
  events: {
    'keyup': 'addToList'
  },

  addToList: function(event){

    if(event.keyCode === 13){
      var book = this.collection.add({title: this.$el.val()});
      book.save();
      this.el.value='';
    }
  },

  render: function(){
    $('.jumbotron').prepend(this.el);
  }
});

//Glue Code
$(document).ready(function(){
  var toDos = new TodoCollection();

  var createTodoView = new CreateTodoView({collection: toDos});
  createTodoView.render();

  var todosView = new TodosView({collection: toDos});
});
//Glue Code
