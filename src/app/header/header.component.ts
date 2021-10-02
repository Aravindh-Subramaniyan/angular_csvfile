import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { ViewChild } from '@angular/core';
import { NgxCsvParser } from 'ngx-csv-parser';
import { NgxCSVParserError } from 'ngx-csv-parser';
import { HttpClient } from '@angular/common/http';
import { CSVModel } from '../machines/csv.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  public userIsAuthenticated = false;
  private authListenerSubs: Subscription;

  constructor(
    private authService: AuthService,
    private ngxCsvParser: NgxCsvParser,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }

  csvRecords: any = [];
  newResult: CSVModel;
  menu: any = {
    employee: {
      name: 'sonoo',
      salary: '56000',
      married: true,
    },
    employee2: {
      name: 'yonoo',
      salary: 56000,
      married: true,
    },
  };
  menufinal: any;
  header: boolean = true;
  obj = {};
  resultJson: JSON;
  data: any[] = [];
  config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  reducer(acc, cur) {
    return { ...acc, [cur.id]: cur };
  }

  @ViewChild('fileImportInput') fileImportInput: any;

  fileChangeListener($event: any): void {
    const files = $event.srcElement.files;
    this.header =
      (this.header as unknown as string) === 'true' || this.header === true;
    this.readData(files);
  }

  readData(files) {
    this.ngxCsvParser
      .parse(files[0], { header: this.header, delimiter: ',' })
      .pipe()
      .subscribe(
        (result: Array<any>) => {
          this.csvRecords.push(...result);
          this.newResult = result.reduce(this.reducer, {});
          console.log('Result', this.newResult);
          console.log('CSV RECORDS FETCHED');
        },
        (error: NgxCSVParserError) => {
          console.log('Error', error);
        }
      );
    this.menufinal = JSON.stringify(this.newResult);
    console.log(this.isJson(this.menufinal));
    this.passtoNode(this.menufinal);
  }

  passtoNode(menu) {
    this.http
      .post<{ message: string }>(
        'http://localhost:3000/api/csvdata',
        JSON.stringify(this.newResult),
        this.config
      )
      .subscribe((responseData) => {
        console.log(responseData.message);
        console.log('CSV Records after converting to Json', this.newResult);
        var jsonconverted = JSON.stringify(this.newResult);
        console.log('JSON FILE', this.isJson(jsonconverted));
      });
  }
  isJson(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }
}
function newRes<T>(
  arg0: string,
  newRes: any,
  config: { headers: { 'Content-Type': string } }
) {
  throw new Error('Function not implemented.');
}
