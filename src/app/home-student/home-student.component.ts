import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MediaMatcher} from '@angular/cdk/layout';
import axios from 'axios';
import {AxiosInstance} from 'axios';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home-student',
  templateUrl: './home-student.component.html',
  styleUrls: ['./home-student.component.css']
})
export class HomeStudentComponent implements OnInit {
  checked = false;
  mobileQuery: MediaQueryList;
  fillerNav = Array.from({length: 50}, (_, i) => `Nav Item ${i + 1}`);
  fillerContent = Array.from({length: 50}, () =>
    `no repitas`);
  // tslint:disable-next-line:variable-name
  private _mobileQueryListener: () => void;

  showFiller = false;
  @ViewChild('dashboard-student', {static: false} )
  homeStudentForm: NgForm;
  dataSource = new MatTableDataSource();
  // displayedColumns: string[] = ['id', 'state', 'description', 'publicationDate', 'startingDate', 'finishingDate', 'salary'];

  companiesForStudent = [];

  @ViewChild(MatPaginator, {static: true})
  paginator: MatPaginator;

  isEditMode = false;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  getCompaniesForStudent() {
    axios.get('https://interlab.azurewebsites.net/api/companies')
      .then(response => {
        this.companiesForStudent = response.data.content;
        console.log(response.data.content);
        console.log(response.data.content[0].jobDescription);
        console.log(this.companiesForStudent);
        console.log(response.data.content[0].email);
      });
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.getCompaniesForStudent();
  }
}
