import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
public year;
  constructor() {
    const date = new Date();
    this.year = date.getFullYear();
  }

  ngOnInit() {
  }

}
