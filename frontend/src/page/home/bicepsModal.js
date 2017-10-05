import {inject} from 'aurelia-framework';
import {HttpClient, json} from 'aurelia-fetch-client';
import {DialogController} from 'aurelia-dialog';
import {Notification} from 'aurelia-notification';
import "humane-js/themes/libnotify.css!";

let baseURL = "http://localhost:5000/api";
let addUserSelectedBicepsWorkoutURL = baseURL + '/userSelectedBicepsWorkout';

@inject(HttpClient, DialogController, Notification)

export class BicepsModal {

    constructor(httpClient, controller, notification){
        this.controller = controller;
        this.http = httpClient;
        this.notification = notification;
        this.bicepExercise = {};
        this.sets = 0;
        this.reps = 0;
        this.controller.settings.centerHorizontalOnly = true;
    }

    activate(bicepExercise) {
        this.bicepExercise = bicepExercise;
        console.log("activate", this.bicepExercise);
    }

    submit() {

        this.bicepExercise.sets = parseInt(this.sets);
        this.bicepExercise.reps = parseInt(this.reps);
        this.bicepExercise.userID = parseInt(sessionStorage.userID);

        this.addUserSelection(this.bicepExercise);

    }

    addUserSelection(bicepExercise) {
        
        console.log("Add user's biceps workout: ", bicepExercise);

        this.http.fetch(addUserSelectedBicepsWorkoutURL, {
            method: 'post',
            body: json(bicepExercise)
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