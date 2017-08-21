import { Component, Input, OnInit } from '@angular/core';
import { Highlighter } from '../highlighter/search.highlighter';
import { DocResultEntry } from '../_model/SearchResults';
let _ = require('lodash');

// budget Component
@Component({
  selector: 'search-result-budget',
  providers: [Highlighter],
  template: require('./search_result_budget.component.html'),
})
export class SearchResultBudgetComponent implements OnInit {
  static readonly categoriesByNumberOfDigits = {
    0: 'משרדים',
    2: 'שתי ספרות',
    4: 'ארבע ספרות',
    6: 'שש ספרות',
    8: 'שמונה ספרות',
    10: 'עשר ספרות'
  };

  @Input() item: DocResultEntry;
  details: string;
  changePerc: number;
  link: string;
  yearRange: string;
  category: string;

  // Vars for Highlight component
  titleText: string;
  indexesToHighlight: number[];
  isTitleTextMatched: boolean;

  constructor() { }
  ngOnInit() {
    let source = this.item.source;
    this.details = 'לורם איפסום ' || source.title;
    this.changePerc = source.net_revised * 100 / source.net_allocated;
    this.link = ['http://www.obudget.org/#budget/',
      source.code.slice(2, 10),
      '/',
      source.year,
      '/main'].join();
    this.yearRange = [_.get(_.keys(source.history), 0), source.year].join('-');
    this.category = SearchResultBudgetComponent.categoriesByNumberOfDigits[this.item.source.code.length - 2];
    this.isTitleTextMatched = this.verifyTitleMatch();
    this.titleText = this.item.source.title;
    if (this.isTitleTextMatched) {
      this.indexesToHighlight = this.item.highlight.title[0];
    }
  }

  verifyTitleMatch() {
    return (
      (this.item.highlight !== undefined) &&
      (this.item.highlight.title !== undefined) &&
      (this.item.highlight.title[0].length === 2)
    );
  }
}
