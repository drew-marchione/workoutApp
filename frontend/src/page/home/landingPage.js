import { InnerPage } from "app.js";
import {inject} from 'aurelia-framework';
import {HttpClient, json} from 'aurelia-fetch-client';
import {DialogService} from 'aurelia-dialog';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(DialogService, HttpClient, EventAggregator)
export class LandingPage extends InnerPage {
    constructor(dialogService, httpClient, eventAggregator) {
        super();
        this.dialogService = dialogService;
        this.http = httpClient;
        this.eventAggregator = eventAggregator;
        this.firstname = sessionStorage.firstname;
        this.lastname = sessionStorage.lastname;
    }

    attached() {  
        this.publish();
    }

    publish() {
        var payload = {firstName: this.firstname, lastName: this.lastname };
        this.eventAggregator.publish('user', payload);
    }
}