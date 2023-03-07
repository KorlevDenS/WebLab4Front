import {AfterViewInit,EventEmitter, ChangeDetectorRef, Component, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Point} from "../type";
import {MatTableDataSource} from "@angular/material/table";
import {HttpService} from "../http-service.service";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, AfterViewInit {
  @Input() items: Point[] = [];
  @Output() public pointsRedraw = new EventEmitter<Point[]>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  public displayedColumns: string[] = [
    "x",
    "y",
    "r",
    "res",
    "exec",
    "date",
  ];
  public dataSource: MatTableDataSource<Point> = new MatTableDataSource();

  constructor(
    private httpService: HttpService,
    private _cdr: ChangeDetectorRef
  ) {
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator
  }

  ngOnInit(): void {
    this.getPoints()
  }

  public getPoints() {
    this.httpService.getData<Point[]>("/backend/api/points", undefined, true)
      .subscribe((res) => {
        this.dataSource.data = res;
        this.pointsRedraw.emit(res);
        this._cdr.markForCheck();
      })
  }

  toFixed(number: number) {
    return Math.trunc(number * 1000) / 1000;
  }

}
