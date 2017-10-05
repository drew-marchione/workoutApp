import {inject} from 'aurelia-framework';
import {HttpClient, json} from 'aurelia-fetch-client';
import {DialogController} from 'aurelia-dialog';
import {EventAggregator} from 'aurelia-event-aggregator';
import {Notification} from 'aurelia-notification';
import "humane-js/themes/libnotify.css!";

let baseURL = "http://localhost:5000/api";
let deleteRecordURL = baseURL + '/deleteRecord';

@inject(HttpClient, DialogController, Notification, EventAggregator)

export class DeleteRecordModal {

    constructor(httpClient, controller, notification, eventAggregator){
        this.controller = controller;
        this.http = httpClient;
        this.notification = notification;
        this.eventAggregator = eventAggregator;
        this.exercise = {};
        this.controller.settings.centerHorizontalOnly = true;
        //this.controller.settings.centerVertical = true;
    }

    activate(exercise) {
        this.exercise = exercise;
        console.log("activate", this.exercise);
    }

    publish() {
        var payload = {exerciseType: this.exercise.exerciseType};
        this.eventAggregator.publish('refresh', payload);
        console.log("publish hit");
    }
   
    confirmDelete() {

        console.log ("delete: ", this.exercise);

        this.http.fetch(deleteRecordURL, {
            method: 'post',
            body: json(this.exercise)
        })
            .then(response => {
                if (response.status == 200) {
                    this.notification.success('Successfully Deleted Exercise');
                    console.log("HTTP Status Code", response.status);
                    this.publish();
                }
                else
                    this.notification.error('Delete Failed');
                    console.log("HTTP Status Code", response.status);
            })
            .catch(error => {
                this.notification.error('Delete Failed.');
                console.log("HTTP Status Code", response.status);
        })

    }

}