/**
 * Created by adam on 18/12/2016.
 */
import { Component, Input, OnInit } from '@angular/core';
import { DocResultEntry } from '../_model/SearchResults';
let _ = require('lodash');
import { Highlighter } from '../highlighter/search.highlighter';

// Changes Component
@Component({
  selector: 'search-result-changes',
  providers: [Highlighter],
  template: require('./search_result_changes.component.html'),
})
export class SearchResultChangesComponent implements OnInit {
  @Input() item: DocResultEntry;
  details: string;
  date: Date;

  constructor() { }
  ngOnInit() {
    this.details = 'לורם איפסום ' || this.item.source.title;
    // let parts = (this.item.source.date ? this.item.source.date.split('/') : '--');
    // this.date = new Date(parts[2], parts[1] - 1, parts[0]);
  }

}

// exemption Component
@Component({
  selector: 'search-result-exemption',
  template: require('./search_result_exemption.component.html'),
})
export class SearchResultExemptionComponent implements OnInit {
  @Input() item: DocResultEntry;
  details: string;
  entity_link: string;
  valid_link: boolean;

  constructor() { }
  ngOnInit() {
    this.details = 'לורם איפסום ' || this.item.source.title;
    this.entity_link = 'http://www.obudget.org/#entity/' + this.item.source.entity_id + '/2017/main';
    this.valid_link = this.item.source.entity_id !== null;
  }
}

function isHighlightValid(highlightArray: number[]) {
  return (_.size(highlightArray) === 2);
}

function attrToParams(item: object, attr: string) {
  let highlightIndexes = _.get(item, ['highlight', attr, 0]),
    areIndexesValid = isHighlightValid(highlightIndexes);
  return {
    titleText: _.get(item, ['source', attr]),
    isTitleTextMatched: areIndexesValid,
    indexesToHighlight: areIndexesValid ? highlightIndexes : null
  };
}

function searchResultsTemplateParams(item: object) {
  let titleAttrs = ['entity_name', 'supplier_name'];
  return _.merge({
    details: 'לורם איפסום ' || _.get(item, ['source', 'title'])
  },
    titleAttrs.
      map(_.partial(attrToParams, item)).
      filter(_.property('isTitleTextMatched'))[0]
  );
}

// procurement Component
@Component({
  selector: 'search-result-procurement',
  template: require('./search_result_procurement.component.html'),
})
export class SearchResultProcurementComponent implements OnInit {
  @Input() item: DocResultEntry;
  details: string;

  // Vars for Highlight component
  titleText: string;
  indexesToHighlight: number[];
  isTitleTextMatched: boolean;

  constructor() { }

  ngOnInit() {
    _.assign(this, searchResultsTemplateParams(this.item));
  }

}

// supports Component
@Component({
  selector: 'search-result-supports',
  template: require('./search_result_supports.component.html'),
})
export class SearchResultSupportsComponent implements OnInit {
  @Input() item: DocResultEntry;
  details: string;
  link: string;
  entity_link: string;

  constructor() { }
  ngOnInit() {
    this.details = 'לורם איפסום ' || this.item.source.title;
    this.link = 'http://www.obudget.org/#budget/' + this.item.source.budget_code.slice(2, 10) + '/' +
        this.item.source.year_requested + '/main';
    this.entity_link = 'http://www.obudget.org/#entity/' + this.item.source.entity_id + '/2017/main';
  }

}

// people Component
@Component({
  selector: 'search-result-people',
  template: require('./search_result_people.component.html'),
})
export class SearchResultPeopleComponent implements OnInit {
  @Input() item: DocResultEntry;
  details: string;
  link: string;
  entity_link: string;

  constructor() { }
  ngOnInit() {
    // this.details = 'לורם איפסום ' || this.item.source.title;
    // this.link = 'http://www.obudget.org/#budget/' + this.item.source.budget_code.slice(2, 10) + '/' +
        // this.item.source.year_requested + '/main';
    // this.entity_link = 'http://www.obudget.org/#entity/' + this.item.source.entity_id + '/2017/main';
  }
}
