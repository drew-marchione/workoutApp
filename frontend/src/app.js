import * as nprogress from 'nprogress';
import {customJS} from '../src/custom.js';
import { inject, bindable, observable } from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {Notification} from 'aurelia-notification';
import "humane-js/themes/libnotify.css!";

@inject(Notification,EventAggregator)
export class App {

  constructor(notification,eventAggregator) {
    //this.isLoggedIn = sessionStorage.isAuthenticated;
    this.notification = notification;
    this.eventAggregator = eventAggregator;
    this.firstname = sessionStorage.firstname;
    this.lastname = sessionStorage.lastname;
    this.username = sessionStorage.username;
  }
    
  configureRouter(config, router) {
    config.title = 'Aurelia';
    config.map([
      { route: ['', 'signin'],    name: 'signin',         moduleId: 'pages/home/signin',          nav: true, title: 'SignIn'},
      { route: ['admin'],         name: 'admin',          moduleId: 'pages/home/admin',           nav: true, title: 'Admin'},
      { route: ['userHome'],      name: 'userHome',       moduleId: 'pages/home/userHome',        nav: true, title: 'UserHome'},
      { route: ['createRecord'],  name: 'createRecord',   moduleId: 'pages/home/createRecord',    nav: true, title: 'CreateRecord'},
      { route: ['readRecord'],    name: 'readRecord',     moduleId: 'pages/home/readRecord',      nav: true, title: 'ReadRecord'},
      { route: ['updateRecord'],  name: 'updateRecord',   moduleId: 'pages/home/updateRecord',    nav: true, title: 'UpdateRecord'},
      { route: ['deleteRecord'],  name: 'deleteRecord',   moduleId: 'pages/home/deleteRecord',    nav: true, title: 'DeleteRecord'},
      { route: ['chest'],         name: 'chest',          moduleId: 'pages/home/chest',           nav: true, title: 'Chest'},
      { route: ['shoulders'],     name: 'shoulders',      moduleId: 'pages/home/shoulders',       nav: true, title: 'Shoulders'},
      { route: ['back'],          name: 'back',           moduleId: 'pages/home/back',            nav: true, title: 'Back'},
      { route: ['triceps'],       name: 'triceps',        moduleId: 'pages/home/triceps',         nav: true, title: 'Triceps'},
      { route: ['biceps'],        name: 'biceps',         moduleId: 'pages/home/biceps',          nav: true, title: 'Biceps'},
      { route: ['quads'],         name: 'quads',          moduleId: 'pages/home/quads',           nav: true, title: 'Quads'},
      { route: ['hamstrings'],    name: 'hamstrings',     moduleId: 'pages/home/hamstrings',      nav: true, title: 'Hamstrings'},
      { route: ['glutes'],        name: 'glutes',         moduleId: 'pages/home/glutes',          nav: true, title: 'Glutes'},
      { route: ['calves'],        name: 'calves',         moduleId: 'pages/home/calves',          nav: true, title: 'Calves'},
      { route: ['instructions'],  name: 'instructions',   moduleId: 'pages/home/instructions',    nav: true, title: 'Instructions'},
      { route: ['landingPage'],   name: 'landingPage',    moduleId: 'pages/home/landingPage',     nav: true, title: 'LandingPage'},
      { route: ['twitter'],       name: 'twitter',        moduleId: 'pages/home/twitter',         nav: true, title: 'Twitter'},
      { route: ['facebook'],      name: 'facebook',       moduleId: 'pages/home/facebook',        nav: true, title: 'Facebook'},
      { route: ['instagram'],     name: 'instagram',      moduleId: 'pages/home/instagram',       nav: true, title: 'Instagram'},
      { route: ['pinterest'],     name: 'pinterest',      moduleId: 'pages/home/pinterest',       nav: true, title: 'pinterest'},
      { route: ['linkedIn'],      name: 'linkedIn',       moduleId: 'pages/home/linkedIn',        nav: true, title: 'linkedIn'}
    ]);  
    this.router = router;    
  }

  attached() {

    this.subscriber = this.eventAggregator.subscribe('user', response => {
      this.firstname = response.firstName;
      this.lastname = response.lastName;
    })

  }

  detached() {

    this.subscriber.dispose();

  }

  activate() {

  }

  get loggedIn() {
    if (sessionStorage.isLoggedIn == 'true') return true;
    else return false;
  }

  logout() {

    sessionStorage.isLoggedIn = 'false';
    sessionStorage.userID = 0;
    sessionStorage.firstname = "";
    sessionStorage.lastname = "";
    sessionStorage.username = "";
    this.router.navigateToRoute('signin')
    this.notification.success('Successfully Logged Out');

  }

}

export class InnerPage {

constructor(){

}  

  activate() {
    reloadSidebar();

  }


}







