import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  //Declares title as 'To Do List' to display in the header
  title: string = 'To Do List';
  constructor() {}

  ngOnInit(): void {}
}
