
import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
@Component({
  selector: 'app-root',
  templateUrl: './translate.component.html',
  styleUrls: ['./translate.component.css']
})
export class TranslateComponent  {
  title = 'Text Translator';
  langs = [ {disp: 'English', val: 'en'}, {disp: 'German', val: 'de'}, {disp: 'French', val: 'fr'}, { disp: 'Spanish', val: 'es'} ];
  result = '';
  api_key = '';
  from_lang_val = '';
  to_lang_val = '';
  from_text_val = '';
  res_lang = '';
  @ViewChild('from_lang') from_lang: ElementRef;
  @ViewChild('to_lang') to_lang: ElementRef;
  @ViewChild('from_text') from_text: ElementRef;
  constructor(private _http: HttpClient) {
  }
  getText() {
    this.from_lang_val = this.from_lang.nativeElement.value;
    this.to_lang_val = this.to_lang.nativeElement.value;
    this.from_text_val = this.from_text.nativeElement.value;
    this.res_lang = this.from_lang_val + '-' + this.to_lang_val ;
    console.log(this.from_text_val);
    this.api_key = 'trnsl.1.1.20190223T082841Z.2cfe03cba78006f0.5884b63f3d8d38621493e878143b4c515badeb2c';
    console.log('https://translate.yandex.net/api/v1.5/tr.json/translate?key=' + this.api_key + ' & text=' + this.from_text_val + '& lang=' + this.res_lang)
    this._http.get('https://translate.yandex.net/api/v1.5/tr.json/translate?key=' + this.api_key + ' &text=' + this.from_text_val + '&lang=' + this.res_lang )
      .subscribe((data: any) => {
          console.log(data.text.toString());
          this.result = data.text.toString() ;

        }
      );
  }
}
