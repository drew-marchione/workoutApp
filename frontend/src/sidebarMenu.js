import { inject, bindable, observable } from 'aurelia-framework';

export class SidebarMenu  {

  constructor() {
  }

    attached() {
    }

    get adminAccess() {

      if (sessionStorage.username == 'Admin') return true;
      else return false;
      
  }

}