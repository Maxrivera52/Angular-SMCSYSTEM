import { Component, ElementRef, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation:ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  constructor(private elementRef:ElementRef) { }

  ngAfterViewInit(){
  //  this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = "#000000";
  }

  ngOnInit(): void {
  }

}
