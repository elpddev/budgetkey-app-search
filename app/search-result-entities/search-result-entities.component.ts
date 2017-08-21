import { Component, Input, OnInit } from '@angular/core';
import { DocResultEntry } from '../_model/SearchResults';

// entities Component
@Component({
  selector: 'search-result-entities',
  template: require('./search-result-entities.component.html'),
  //styleUrls: ['/app/search-result-entities/search-result-entities.component.css']
  styles: [require('./search-result-entities.component.scss')]
})
export class SearchResultEntitiesComponent implements OnInit {
  @Input() item: DocResultEntry;
  details: string;
  link: string;

  // Vars for Highlight component
  titleText: string;
  indexesToHighlight: number[];
  isTitleTextMatched: boolean;

  constructor() { }
  ngOnInit() {

    this.details = 'לורם איפסום ' || this.item.source.title;
    this.link = 'http://www.obudget.org/#entity/' + this.item.source.id + '/2017/main';

    this.isTitleTextMatched = this.verifyTitleMatch();
    this.titleText = this.item.source.name;
    if (this.isTitleTextMatched) {
      this.indexesToHighlight = this.item.highlight.name[0];
    }
  }

  verifyTitleMatch() {
    return (
      (this.item.highlight !== undefined) &&
      (this.item.highlight.name !== undefined) &&
      (this.item.highlight.name[0].length === 2)
    );
  }
}
