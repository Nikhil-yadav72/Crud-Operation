import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { MatDialogRef ,MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {


freshnesslist  =["Brand New", "Second hand", "Refurbished"]
productForm !:FormGroup; 
actionBtn:string ="save"

constructor( private formBuilder:FormBuilder ,
  private api:ApiService ,
  @Inject(MAT_DIALOG_DATA) public editData :any,
  private dialogRef:MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
  this.productForm = this.formBuilder.group({
    productName :['',Validators.required],
    Category :['',Validators.required],
    freshness:['',Validators.required],
    Price :['',Validators.required],
    Comment :['',Validators.required],
    date: ['',Validators.required],
  })
  

    if(this.editData){
      this.actionBtn='Update';
      this.productForm.controls['productName'].setValue(this.editData.productName);
      this.productForm.controls['Category'].setValue(this.editData.Category)
      this.productForm.controls['freshness'].setValue(this.editData.freshness)
      this.productForm.controls['Price'].setValue(this.editData.Price)
      this.productForm.controls['Comment'].setValue(this.editData.Comment)
      this.productForm.controls['date'].setValue(this.editData.date)

    }
  }
  addProduct(){


    if(!this.editData){
      if(this.productForm.valid){
        this.api.postProduct(this.productForm.value).subscribe({
          next:(res)=>{
            alert("Product added  successfully")
            this.productForm.reset();
            this.dialogRef.close('save')
          },
          error:()=>{
            alert("Error")
          }
        })
      }
    }else{
      this.updateProduct()
    }
  }
  updateProduct(){
    this.api.putProduct(this.productForm.value,this.editData.id)
    .subscribe({
      next:(res)=>{
        alert("Product update Successfully");
        this.productForm.reset()
        this.dialogRef.close('update')
      },
      error:()=>{
        alert("Error While updating the record")
      }
    }) 

  }
}
