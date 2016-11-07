import { Component } from '@angular/core';
import { SearchService, MovieType } from './search.service';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'home'
  selector: 'search',  // <search></search>

  // Our list of styles in our component. We may add more to compose many styles together
  styleUrls: [ './search.component.scss' ],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  templateUrl: './search.component.html'
})
export class SearchComponent {

  items: Observable<MovieType[]>;

  term = new FormControl();

  // TypeScript public modifiers
  constructor(private searchService: SearchService) {}

  ngOnInit() {
    this.items = this.searchService.search(this.term.valueChanges).share();
  }
}
