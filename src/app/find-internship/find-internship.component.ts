import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MediaMatcher} from "@angular/cdk/layout";

@Component({
  selector: 'app-find-internship',
  templateUrl: './find-internship.component.html',
  styleUrls: ['./find-internship.component.css']
})
export class FindInternshipComponent implements OnInit {

  checked = false;
  mobileQuery: MediaQueryList;
  fillerNav = Array.from({length: 50}, (_, i) => `Nav Item ${i + 1}`);
  fillerContent = Array.from({length: 50}, () =>
    `no repitas`);
  private _mobileQueryListener: () => void;

  showFiller = false;
  @ViewChild('dashboard-student', {static: false} )
  dashboardStudentForm: NgForm;
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['id', 'state', 'description', 'publicationDate', 'startingDate', 'finishingDate', 'salary'];

  @ViewChild(MatPaginator, {static: true})
  paginator: MatPaginator;

  isEditMode = false;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
  }
}