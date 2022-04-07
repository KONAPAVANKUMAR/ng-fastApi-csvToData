import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'csv_reader'
  jsonData: any = null;
  keys: any = null;
  constructor(private http: HttpClient) { }


  //  on init
  ngOnInit() {
    this.http.get('http://127.0.0.1:8000/api/getcsvfileasjson').subscribe(
      (res) => {
        // stringify
        this.jsonData = res;
        console.log(this.jsonData)
        // get keys
        this.keys = Object.keys(this.jsonData[0]);
      })
  }

}
