import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  sessionStorage = sessionStorage;
  constructor() { }
  username="";

  ngOnInit(): void {
    this.load();
  }

  load(){
    //this.username = document.cookie.split(";")[1].split("=")[1];
    this.username = this.sessionStorage.getItem("username")||'NO NAME';
  }

}
