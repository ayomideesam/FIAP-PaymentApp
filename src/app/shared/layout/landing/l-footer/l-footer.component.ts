import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-l-footer',
  templateUrl: './l-footer.component.html',
  styleUrls: ['./l-footer.component.css']
})
export class LFooterComponent implements OnInit {

  public year = new Date().getFullYear();
  constructor() { }

  ngOnInit(): void {
  }

}
