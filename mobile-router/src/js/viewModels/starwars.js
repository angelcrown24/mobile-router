define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojselectcombobox', 'ojs/ojtabs', 'ojs/ojconveyorbelt', 'ojs/ojinputtext', 'ojs/ojlistview', 'ojs/ojarraytabledatasource'],
        function (oj, ko, $) {



            function StartWarsViewModel() {

                var self = this;

                self.selectedVal = ko.observableArray();
                self.name = ko.observable();
                self.height = ko.observable();
                self.mass = ko.observable();
                self.birth_year = ko.observable();
                self.gender = ko.observable();
                self.speciesName = ko.observable();
                self.classification = ko.observable();
                self.designation = ko.observable();
                self.average_height = ko.observable();
                self.films = ko.observableArray();
                self.filmDataSource =
                        new oj.ArrayTableDataSource(self.films, {idAttribute: "episode_id"});

                self.characters = ko.observableArray([
                    {"value": "1", "label": "Luke Skywalker"},
                    {"value": "4", "label": "Darth Vader"},
                    {"value": "10", "label": "Obi-Wan Kenobi"},
                    {"value": "11", "label": "Anakin Skywalker"},
                    {"value": "13", "label": "Chewbacca"},
                    {"value": "14", "label": "Han Solo"}

                ]);
                self.characterSelected = function (event, data) {

                    if (self.selectedVal() === undefined) {

                        return;

                    }

                    var characterId = self.selectedVal()[0];

                    if (characterId !== "") {

                        $.get("https://swapi.co/api/people/" + characterId, function (json, status) {

                            console.log(json);
                            self.name(json.name);
                            self.height(json.height);
                            self.mass(json.mass);
                            self.birth_year(json.birth_year);
                            self.gender(json.gender);
                            var speciesUrl = json.species[0];
                            console.log("speciesUrl: " + speciesUrl);
                            $.get(speciesUrl, null, function (species, status) {
                                self.speciesName(species.name);
                                self.classification(species.classification);
                                self.designation(species.designation);
                                self.average_height(species.average_height);
                            });
                            self.films([]);
                            for (var idx in json.films) {
                                var filmUrl = json.films[idx];
                                $.get(filmUrl, null, function (film, status) {
                                    self.films.push({title: film.title,
                                        episode_id: film.episode_id,
                                        director: film.director,
                                        release_date: film.release_date});
                                });
                            }
                            self.films([]);
                            for (var idx in json.films) {
                                var filmUrl = json.films[idx];
                                console.log(filmUrl);
                                $.get(filmUrl, null, function (film, status) {
                                    self.films.push({title: film.title,
                                        episode_id: film.episode_id,
                                        director: film.director,
                                        release_date: film.release_date});
// release_date 순으로 정렬
                                    self.films.sort(function (film1, film2) {
                                        return new Date(film1.release_date).getTime() -
                                                new Date(film2.release_date).getTime();
                                    });

                                });
                            }
                            self.fimlSelected = function (event, ui) {
                                console.log("fimeSelected: ");
                                console.log(event);
                                console.log(ui);
                                if (ui.option === "currentItem" && ui.value != null) {
                                    console.log("selected file id: " + ui.value);
                                }
                            }
                        });

                    }

                }

            }

            return new StartWarsViewModel();

        }

);