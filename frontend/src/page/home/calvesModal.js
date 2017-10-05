import {inject} from 'aurelia-framework';
import {HttpClient, json} from 'aurelia-fetch-client';
import {DialogController} from 'aurelia-dialog';
import {Notification} from 'aurelia-notification';
import "humane-js/themes/libnotify.css!";

let baseURL = "http://localhost:5000/api";
let addUserSelectedCalvesWorkoutURL = baseURL + '/userSelectedCalvesWorkout';

@inject(HttpClient, DialogController, Notification)

export class CalvesModal {

    constructor(httpClient, controller, notification){
        this.controller = controller;
        this.http = httpClient;
        this.notification = notification;
        this.calvesExercise = {};
        this.sets = 0;
        this.reps = 0;
        this.controller.settings.centerHorizontalOnly = true;
    }

    activate(calvesExercise) {
        this.calvesExercise = calvesExercise;
        console.log("activate", this.calvesExercise);
    }

    submit() {
        this.calvesExercise.sets = parseInt(this.sets);
        this.calvesExercise.reps = parseInt(this.reps);
        this.calvesExercise.userID = parseInt(sessionStorage.userID);

        this.addUserSelection(this.calvesExercise);
    }
   
   
    addUserSelection(calvesExercise) {
        console.log("Add user's calves workout: ", calvesExercise);
        this.http.fetch(addUserSelectedCalvesWorkoutURL, {
            method: 'post',
            body: json(calvesExercise)
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