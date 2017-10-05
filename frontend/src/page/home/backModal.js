import {inject} from 'aurelia-framework';
import {HttpClient, json} from 'aurelia-fetch-client';
import {DialogController} from 'aurelia-dialog';
import {Notification} from 'aurelia-notification';
import "humane-js/themes/libnotify.css!";

let baseURL = "http://localhost:5000/api";
let addUserSelectedBackWorkoutURL = baseURL + '/userSelectedBackWorkout';

@inject(HttpClient, DialogController, Notification)

export class BackModal {

    constructor(httpClient, controller, notification){
        this.controller = controller;
        this.http = httpClient;
        this.notification = notification;
        this.backExercise = {};
        this.sets = 0;
        this.reps = 0;
        this.controller.settings.centerHorizontalOnly = true;
    }

    activate(backExercise) {
        this.backExercise = backExercise;
        console.log("activate", this.chestExercise);
    }

    submit() {

        this.backExercise.sets = parseInt(this.sets);
        this.backExercise.reps = parseInt(this.reps);
        this.backExercise.userID = parseInt(sessionStorage.userID);

        this.addUserSelection(this.backExercise);

    }

    addUserSelection(backExercise) {
        
        console.log("Add user's back workout: ", backExercise);

        this.http.fetch(addUserSelectedBackWorkoutURL, {
            method: 'post',
            body: json(backExercise)
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