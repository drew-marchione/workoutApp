import {inject} from 'aurelia-framework';
import {HttpClient, json} from 'aurelia-fetch-client';
import {DialogController} from 'aurelia-dialog';
import {EventAggregator} from 'aurelia-event-aggregator';
import {Notification} from 'aurelia-notification';
import "humane-js/themes/libnotify.css!";

let baseURL = "http://localhost:5000/api";
let updateRecordURL = baseURL + '/updateRecord';

@inject(HttpClient, DialogController, Notification, EventAggregator)

export class UpdateRecordModal {

    constructor(httpClient, controller, notification, eventAggregator){
        this.controller = controller;
        this.http = httpClient;
        this.notification = notification;
        this.eventAggregator = eventAggregator;
        this.exercise = {};
        //this.savedExercise = {};
        this.controller.settings.centerHorizontalOnly = true;
    }

    activate(exercise) {
        this.exercise = exercise;
        //this.savedExercise = exercise;
        console.log("activate", this.exercise);
        //console.log(this.savedExercise.name);
   }

    myCancel() {
        this.publish();
        this.controller.cancel()

   }

    publish() {
        var payload = {exerciseType: this.exercise.exerciseType};
        this.eventAggregator.publish('refresh', payload);
        console.log("publish hit");
    }

   /*restoreExercise() {
        console.log(this.exercise.name);
        console.log(this.savedExercise.name);
        this.exercise.name = this.savedExercise.name;
        console.log(this.exercise.name);
    }*/

    update() {
        console.log("Update Exercise: ", this.exercise);

        this.http.fetch(updateRecordURL, {
            method: 'post',
            body: json(this.exercise)
        })
        .then(response => {
            if (response.status == 200) {
                this.notification.success('Successfully Updated Exercise!');
                console.log("HTTP Status Code", response.status);
                //this.publish();
            }
            else if (response.status == 400) {
                this.notification.error('Please Fill In All Fields!');
                console.log("HTTP Status Code", response.status);
                this.publish();
            }
            else if (response.status == 409) {
                this.notification.error('Exercise Name Already Exists!');
                console.log("HTTP Status Code", response.status);
                this.publish();
                //this.restoreExercise();
            }
            else if (response.status == 500) {
                this.notification.error('Update Failed.');
                console.log("HTTP Status Code", response.status);
                this.publish();
            }
        })
        .catch(error => {
            this.notification.error('Update Failed.');
            console.log("Update Error");
            this.publish();
        })
    }

}