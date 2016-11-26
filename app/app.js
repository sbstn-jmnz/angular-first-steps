//Main app module, with a second argument (dependencies) it create the module
angular.module('miapp', ['ui.router'])
  //Router config
  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider.state('TodoList', {
        url: '/',
        controller:'ListController',
        templateUrl:'app/views/list.html',
      }); //route, controller, template
    $urlRouterProvider.otherwise('/');
});

var myapp = angular.module('miapp');
//This just retreive the module. Doesn't create a new one. It's called with no dependencies
myapp.controller('ListController', function ListController($scope, Todos) {
    $scope.Todos = Todos;
    $scope.mostrar = true;
    $scope.alternarDiv = function alternarDiv() {
      $scope.mostrar = !$scope.mostrar;
    };
});

myapp.service('Todos', function Todos() {
    this.data = [{ id: 1, desc: 'Todo 1', done: true }, {id: 2, desc: 'Todo 2'}];
    this.selected = undefined;
    this.new = '';
    this.temporal = '';

    this.addTodo = function addTodo() {
      this.data.push({
        id: (new Date()).getTime(),
        desc: this.new,
        done: false
      });
      this.new = '';
    };

    this.deleteTodo = function deleteTodo(id){
      this.data = this.data.filter(function(elem){
        return id !== elem.id;
      });
    };

    this.doneTodo = function doneTodo(id) {
      this.data = this.data.map(function map(el){
        if(el.id === id){
          el.done = !el.done;
        }
        return el;
      });
    };

    this.selectTodo = function selectTodo(id) {
      var servicio = this;
      this.data.map(function map (el){
        if(el.id === id){
          servicio.temporal = el.desc;
        }
      });
      this.selected = id;
    };

    this.updateTodo = function updateTodo(id){
      var servicio = this;
      this.data.map(function map(el) {
        if(el.id === servicio.selected){
          el.desc = servicio.temporal;
        }
        return el;
      });
      this.selected = undefined;
    };
});
