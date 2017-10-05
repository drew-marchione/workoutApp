//import {computedFrom} from 'aurelia-framework';
import { InnerPage } from "app.js";
import {inject} from 'aurelia-framework';
import {HttpClient, json} from 'aurelia-fetch-client';

import {DialogService} from 'aurelia-dialog';
import {BicepsModal} from "./bicepsModal";

let baseURL = "http://localhost:5000/api";
let addBicepsURL = baseURL + '/addBiceps';
let getBicepsURL = baseURL + '/getBiceps';
let addUserSelectedBicepsWorkoutURL = baseURL + '/userSelectedBicepsWorkout';

@inject(DialogService, HttpClient)
export class Biceps extends InnerPage {
    constructor(dialogService, httpClient) {
        super();
        this.biceps = [];
        this.dialogService = dialogService;
        this.http = httpClient; 
    }

    attached() {
        console.log("biceps.js: attached");
        this.getBicepExercises();
    }

  getBicepExercises() {

    this.http.fetch(getBicepsURL)
        .then(response => response.json())
        .then(response => this.biceps = response)
        .then(response => console.log("Biceps Array: ", this.biceps))
  }  

    add(selectedExerciseName) {
        
        console.log("Add: ", selectedExerciseName);
        let exerciseModalData = this.biceps.filter(x => x.name == selectedExerciseName)[0];
        console.log("add exercise", exerciseModalData);
        this.dialogService.open({ viewModel: BicepsModal, model: exerciseModalData , lock: false });

    }

}