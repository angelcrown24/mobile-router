define(['ojs/ojcore', 'knockout', 'jquery', 'appController'],
        function (oj, ko, $, app) {

            function HomeChild1ViewModel() {

                var self = this;

                self.goBack = function () {

                    window.history.back();

                };

                self.goHome = function () {

                    app.router.go('home');

                }

                self.goHomeChild2 = function () {

                    app.router.go('homechild_2');

                }
                self.handleActivated = function (info) {

                    var currentValue = app.router.currentValue();

                    console.log("currentValue: " + JSON.stringify(currentValue));

//var routeState = app.router.getState('homechild_1');

                    var routeState = app.router.currentState();

                    var value = routeState.value;

                    console.log("value: " + JSON.stringify(value));

                    value.newKey = 'new value'; // call by reference...
                };

            }

            return new HomeChild1ViewModel();

        }

);