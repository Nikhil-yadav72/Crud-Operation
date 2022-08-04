import { Component, OnInit ,ViewChild } from '@angular/core';

import { ApiService } from './api.service';
import { DialogComponent } from './dialog/dialog.component';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Action } from 'rxjs/internal/scheduler/Action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit{
  title = 'crud';
  displayedColumns: string[] = ['productName','freshness','Price','date','Category', 'Comment',  'action'];
  dataSource !: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog, private api:ApiService){

  }
  ngOnInit(): void {
    this.getAllProduct();
  }

  opendialog(){
    this.dialog.open(DialogComponent, {
     width:'30%'
})
.afterClosed().subscribe(val=>{
  if(val === 'save'){
    this.getAllProduct(); 
  }
})
  }
  getAllProduct(){
    this.api.getProduct().subscribe({
      next:(res)=>{
        this.dataSource =new MatTableDataSource(res);
        this.dataSource.paginator =this.paginator;
        this.dataSource.sort=this.sort;
      },
      error:(err)=>{
        alert("Error fetching the records")
      }
    })
  }
  editProduct(row:any){
    this.dialog.open(DialogComponent,{
      width:'30%',
      data:row
    }).afterClosed().subscribe(val=>{
      if(val === 'update'){
        this.getAllProduct(); 
      }
    })
  }
  deleteProduct(id:number){
    this.api.deleteProduct(id).subscribe({
      next:(res)=>{
        alert("Product delete Successfully")

      },
      error:()=>{
        alert("Error while the delete the record")
      }
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}