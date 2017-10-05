import {inject} from 'aurelia-framework';
import {HttpClient, json} from 'aurelia-fetch-client';
import {DialogController} from 'aurelia-dialog';
import {Notification} from 'aurelia-notification';
import "humane-js/themes/libnotify.css!";

let baseURL = "http://localhost:5000/api";
let addUserSelectedHamstringsWorkoutURL = baseURL + '/userSelectedHamstringsWorkout';

@inject(HttpClient, DialogController, Notification)

export class HamstringsModal {

    constructor(httpClient, controller, notification){
        this.controller = controller;
        this.http = httpClient;
        this.notification = notification;
        this.hamstringsExercise = {};
        this.sets = 0;
        this.reps = 0;
        this.controller.settings.centerHorizontalOnly = true;
    }

    activate(hamstringsExercise) {

        this.hamstringsExercise = hamstringsExercise;
        console.log("activate", this.hamstringsExercise);
    
    }

    submit() {

        this.hamstringsExercise.sets = parseInt(this.sets);
        this.hamstringsExercise.reps = parseInt(this.reps);
        this.hamstringsExercise.userID = parseInt(sessionStorage.userID);

        this.addUserSelection(this.hamstringsExercise);

    }

    addUserSelection(hamstringsExercise) {

        console.log("Add user's hamstrings workout: ", hamstringsExercise);

        this.http.fetch(addUserSelectedHamstringsWorkoutURL, {
            method: 'post',
            body: json(hamstringsExercise)
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