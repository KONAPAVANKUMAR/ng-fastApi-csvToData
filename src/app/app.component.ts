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

  uploadListener($event: any): void {
    let file: File = $event.target.files[0];
    // formdata
    let formData: FormData = new FormData();
    formData.append('file', file, file.name);
    // post
    this.http.post('http://localhost:8000/api/upload', formData).subscribe(
      (res) => {
        // stringify
        this.jsonData = res;
        console.log(this.jsonData)
        // get keys
        this.keys = Object.keys(this.jsonData[0]);
      }
    );


  }

}
