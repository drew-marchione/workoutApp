import {InnerPage} from "app.js";
import {inject} from 'aurelia-framework';
import {HttpClient, json} from 'aurelia-fetch-client';
import {DialogService} from 'aurelia-dialog';
import {CalvesModal} from "./calvesModal";

let baseURL = "http://localhost:5000/api";
let getCalvesURL = baseURL + '/getCalves';

@inject(DialogService, HttpClient)
export class Calves extends InnerPage {
    constructor(dialogService, httpClient) {
        super();
        this.calvesExercises = [];
        this.dialogService = dialogService;
        this.http = httpClient; 
    }

    attached() {
        console.log("calves.js: attached");
        this.getCalvesExercises();
    }

    getCalvesExercises() {
        
        this.http.fetch(getCalvesURL)
            .then(response => response.json())
            .then(response => this.calvesExercises = response)
            .then(response => console.log("Calves Array: ", this.calvesExercises))
 
    }  

    add(selectedExerciseName) {

        console.log("Add: ", selectedExerciseName);
        let exerciseModalData = this.calvesExercises.filter(x => x.name == selectedExerciseName)[0];
        console.log("add exercise", exerciseModalData);
        this.dialogService.open({ viewModel: CalvesModal, model: exerciseModalData , lock: false });

    }
}