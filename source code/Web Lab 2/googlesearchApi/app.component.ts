import {Component, ElementRef, ViewChild} from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  pages: any;
  isLoading = true;
  @ViewChild('searchText') searchTerm: ElementRef;

  constructor(private http: HttpClient) {}

  submit() {
    this.http.jsonp(`https://kgsearch.googleapis.com/v1/entities:search?query=` + this.searchTerm.nativeElement.value + `&key=AIzaSyAA1u_C85rW566b558Cl1TtcOthQa-dwWE&limit=1&indent=True` , 'callback')
      .subscribe((data: any) => {
        this.isLoading = false;
        this.pages = Object.keys(data.itemListElement).map(function(k) {
          return {body: data.itemListElement[0].result.description };
        });
        console.log(this.pages);
      });
  }
}
