import {inject} from 'aurelia-framework';
import {HttpClient, json} from 'aurelia-fetch-client';
import {DialogController} from 'aurelia-dialog';
import {Notification} from 'aurelia-notification';
import "humane-js/themes/libnotify.css!";

let baseURL = "http://localhost:5000/api";
let addUserSelectedTricepsWorkoutURL = baseURL + '/userSelectedTricepsWorkout';

@inject(HttpClient, DialogController, Notification)

export class TricepsModal {

    constructor(httpClient, controller, notification){
        this.controller = controller;
        this.http = httpClient;
        this.notification = notification;
        this.tricepsExercise = {};
        this.sets = 0;
        this.reps = 0;

        this.controller.settings.centerHorizontalOnly = true;
    }

    activate(tricepsExercise) {
        this.tricepsExercise = tricepsExercise;
        console.log("activate", this.tricepsExercise);
    }

    submit() {

        this.tricepsExercise.sets = parseInt(this.sets);
        this.tricepsExercise.reps = parseInt(this.reps);
        this.tricepsExercise.userID = parseInt(sessionStorage.userID);

        this.addUserSelection(this.tricepsExercise);

    }

    addUserSelection(tricepsExercise) {
        console.log("Add user's chest workout: ", tricepsExercise);

        this.http.fetch(addUserSelectedTricepsWorkoutURL, {
            method: 'post',
            body: json(tricepsExercise)
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