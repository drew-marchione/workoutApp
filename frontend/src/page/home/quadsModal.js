import {inject} from 'aurelia-framework';
import {HttpClient, json} from 'aurelia-fetch-client';
import {DialogController} from 'aurelia-dialog';
import {Notification} from 'aurelia-notification';
import "humane-js/themes/libnotify.css!";

let baseURL = "http://localhost:5000/api";
let addUserSelectedQuadsWorkoutURL = baseURL + '/userSelectedQuadsWorkout';

@inject(HttpClient, DialogController, Notification)

export class QuadsModal {

    constructor(httpClient, controller, notification){
        this.controller = controller;
        this.http = httpClient;
        this.notification = notification;
        this.quadsExercise = {};
        this.sets = 0;
        this.reps = 0;

        this.controller.settings.centerHorizontalOnly = true;
    }

    activate(quadsExercise) {
        this.quadsExercise = quadsExercise;
        console.log("activate", this.quadsExercise);
    }

    submit() {

        this.quadsExercise.sets = parseInt(this.sets);
        this.quadsExercise.reps = parseInt(this.reps);
        this.quadsExercise.userID = parseInt(sessionStorage.userID);

        this.addUserSelection(this.quadsExercise);

    }

    addUserSelection(quadsExercise) {
        console.log("Add user's quads workout: ", quadsExercise);

        this.http.fetch(addUserSelectedQuadsWorkoutURL, {
            method: 'post',
            body: json(quadsExercise)
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