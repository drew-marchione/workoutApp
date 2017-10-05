import {inject} from 'aurelia-framework';
import {json} from 'aurelia-fetch-client';
import {DialogController} from 'aurelia-dialog';
import "humane-js/themes/libnotify.css!";

@inject(DialogController)

export class ReadRecordModal {

    constructor(controller){
        this.controller = controller;
        this.exercise = {};
        this.controller.settings.centerHorizontalOnly = true;
    }

    activate(exercise) {
        this.exercise = exercise;
        console.log("activate", this.exercise);
    }

}