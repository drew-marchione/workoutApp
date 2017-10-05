import {inject} from 'aurelia-framework';
import {HttpClient, json} from 'aurelia-fetch-client';
import {DialogController} from 'aurelia-dialog';
import {Notification} from 'aurelia-notification';
import "humane-js/themes/libnotify.css!";

let baseURL = "http://localhost:5000/api";
let addUserSelectedGlutesWorkoutURL = baseURL + '/userSelectedGlutesWorkout';

@inject(HttpClient, DialogController, Notification)

export class GlutesModal {

    constructor(httpClient, controller, notification){
        this.controller = controller;
        this.http = httpClient;
        this.notification = notification;
        this.glutesExercise = {};
        this.sets = 0;
        this.reps = 0;
        this.controller.settings.centerHorizontalOnly = true;
    }

    activate(glutesExercise) {
        this.glutesExercise = glutesExercise;
        console.log("activate", this.glutesExercise);
    }

    submit() {
        this.glutesExercise.sets = parseInt(this.sets);
        this.glutesExercise.reps = parseInt(this.reps);
        this.glutesExercise.userID = parseInt(sessionStorage.userID);

        this.addUserSelection(this.glutesExercise);
    }

    addUserSelection(glutesExercise) {
        console.log("Add user's glutes workout: ", glutesExercise);

        this.http.fetch(addUserSelectedGlutesWorkoutURL, {
            method: 'post',
            body: json(glutesExercise)
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