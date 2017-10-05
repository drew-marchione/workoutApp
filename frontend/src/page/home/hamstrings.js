import {InnerPage} from "app.js";
import {inject} from 'aurelia-framework';
import {HttpClient, json} from 'aurelia-fetch-client';
import {DialogService} from 'aurelia-dialog';
import {HamstringsModal} from "./hamstringsModal";

let baseURL = "http://localhost:5000/api";
let getHamstringsURL = baseURL + '/getHamstrings';

@inject(DialogService, HttpClient)
export class Hamstrings extends InnerPage {
    constructor(dialogService, httpClient) {
        super();
        this.hamstringsExercises = [];
        this.dialogService = dialogService;
        this.http = httpClient; 
    }

    attached() {
        console.log("hamstrings.js: attached");
        this.getHamstringsExercises();
    }

    getHamstringsExercises() {

        this.http.fetch(getHamstringsURL)
            .then(response => response.json())
            .then(response => this.hamstringsExercises = response)
            .then(response => console.log("Quads Array: ", this.hamstringsExercises))
        
    }  

    add(selectedExerciseName) {

        console.log("Add: ", selectedExerciseName);
        let exerciseModalData = this.hamstringsExercises.filter(x => x.name == selectedExerciseName)[0];
        console.log("add exercise", exerciseModalData);
        this.dialogService.open({ viewModel: HamstringsModal, model: exerciseModalData , lock: false });

    }

}