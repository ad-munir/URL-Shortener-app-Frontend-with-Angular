import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {

  backendUrl = "http://localhost:8080/api/v1/shortener";

  constructor(private http: HttpClient) {

  }

  url: string = "";
  isUrlGenerated: boolean = false;
  isErrorGenerated: boolean = false;
  shortUrl: string = "";
  originUrl: string = "";


  generate() {

    if (!this.url) {
      this.isErrorGenerated = true;
      return ;
    }


    this.http.post<any>(this.backendUrl, this.url).subscribe(data => {

      if( data == null ){
        this.isErrorGenerated = true;
      } else {
        console.log(data);
        this.isUrlGenerated = true;
        this.shortUrl = data.shortUrl;
        this.originUrl = data.originUrl;
      }


    }, (error) => {
      console.error("Error:", error);
      this.isErrorGenerated = true;
    });
  }

}
