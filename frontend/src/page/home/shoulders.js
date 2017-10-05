import { InnerPage } from "app.js";
import {inject} from 'aurelia-framework';
import {HttpClient, json} from 'aurelia-fetch-client';
import {DialogService} from 'aurelia-dialog';
import {ShouldersModal} from "./shouldersModal";

let baseURL = "http://localhost:5000/api";
let getShouldersURL = baseURL + '/getShoulders';

@inject(DialogService, HttpClient)
export class Shoulders extends InnerPage {
    constructor(dialogService, httpClient) {
        super();
        this.shouldersExercises = [];
        this.dialogService = dialogService;
        this.http = httpClient; 
    }

    attached() {
        console.log("shoulders.js: attached");
        this.getShouldersExercises();
    }

    getShouldersExercises() {

        this.http.fetch(getShouldersURL)
            .then(response => response.json())
            .then(response => this.shouldersExercises = response)
            .then(response => console.log("Shoulders Array: ", this.shouldersExercises))
        
    }  

    add(selectedExerciseName) {

        console.log("Add: ", selectedExerciseName);
        let exerciseModalData = this.shouldersExercises.filter(x => x.name == selectedExerciseName)[0];
        console.log("add exercise", exerciseModalData);
        this.dialogService.open({ viewModel: ShouldersModal, model: exerciseModalData , lock: false });

    }

}