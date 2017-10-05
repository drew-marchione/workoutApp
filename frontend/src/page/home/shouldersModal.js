import {inject} from 'aurelia-framework';
import {HttpClient, json} from 'aurelia-fetch-client';
import {DialogController} from 'aurelia-dialog';
import {Notification} from 'aurelia-notification';
import "humane-js/themes/libnotify.css!";

let baseURL = "http://localhost:5000/api";
let addUserSelectedShouldersWorkoutURL = baseURL + '/userSelectedShouldersWorkout';

@inject(HttpClient, DialogController, Notification)

export class ShouldersModal {

    constructor(httpClient, controller, notification){
        this.controller = controller;
        this.http = httpClient;
        this.notification = notification;
        this.shouldersExercise = {};
        this.sets = 0;
        this.reps = 0;
        this.controller.settings.centerHorizontalOnly = true;
    }

    activate(shouldersExercise) {
        this.shouldersExercise = shouldersExercise;
        console.log("activate", this.shouldersExercise);
    }

    submit() {

        this.shouldersExercise.sets = parseInt(this.sets);
        this.shouldersExercise.reps = parseInt(this.reps);
        this.shouldersExercise.userID = parseInt(sessionStorage.userID);

        this.addUserSelection(this.shouldersExercise);

    }

    addUserSelection(shouldersExercise) {
        console.log("Add user's shoulders workout: ", shouldersExercise);

        this.http.fetch(addUserSelectedShouldersWorkoutURL, {
            method: 'post',
            body: json(shouldersExercise)
        })
        .then(response => {
                if (response.status == 200) {
                    this.notification.success('Successfully Added Exercise!');
                    console.log("HTTP Status Code", response.status);
                }
                else {
                    this.notification.error('Add Failed. Please Fill In All Fields.');
                    console.log("HTTP Status Code", response.status)
                }
            })
        .catch(error => {
                this.notification.error('Add Failed.');
                console.log("Server Error");
            })
        }

}