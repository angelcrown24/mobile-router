define(['ojs/ojcore', 'knockout', 'jquery', 'appController'],
        function (oj, ko, $, app) {



            function HomeViewModel() {

                var self = this;
                self.goChild1 = function () {
                    console.log('go child1');
                    var routeState = app.router.getState('homechild_1');
                    routeState.value = {key1: 'value1', key2: 'value2'};
                    app.router.go('homechild_1');

                };



                self.goChild2 = function () {
                    console.log('go child2');
                    var color = {color: 'green'};
                    app.router.store(color);
                    app.router.go('homechild_2');

                };


//self.handleActivated = function(info) { };

//self.handleAttached = function(info) { };

//self.handleBindingsApplied = function(info) { };

//self.handleDetached = function(info) { };

            }

            return new HomeViewModel();

        }

);