import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MerchantService } from '../merchant.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-createMerchant',
  templateUrl: './createMerchant.component.html',
  styleUrls: ['./createMerchant.component.scss']
})
export class CreateMerchantComponent implements OnInit {
  merchantForm !: FormGroup;
  exform!: FormGroup;
  merchant:any;
  constructor(
    private formBuilder: FormBuilder,
    private merchantService: MerchantService,
    private dialogRef: MatDialogRef<CreateMerchantComponent>,
  ) { }

  ngOnInit() {

    this.merchantForm = new FormGroup({
      'merchantCode' : new FormControl(null, Validators.required),
      'name' : new FormControl(null, Validators.maxLength(10)),
      'fullName' : new FormControl(null, Validators.required),
      'email' : new FormControl(null, [Validators.required, Validators.email]),
      'phoneNumber' : new FormControl(null, Validators.maxLength(9)),
      'address' : new FormControl(null, [Validators.maxLength(20), Validators.minLength(5)]),
      'website' : new FormControl(null, Validators.maxLength(30)),
      'accountNum' : new FormControl(null, Validators.required),

    });
    // this.merchantForm = this.formBuilder.group({
    //   merchantCode: ['', Validators.required],
    //   name: ['', Validators.maxLength],
    //   fullName: ['', Validators.required],
    //   email: ['', Validators.required,Validators.email],
    //   phoneNumber: ['', Validators.maxLength],
    //   address: ['', Validators.maxLength],
    //   website: ['', Validators.maxLength],
    //   accountNum: ['', Validators.required],
      

    // })
    
  }
  // clicksub() {
  //   console.log(this.exform.value);
  //   this.exform.reset();
  // }
  get merchantCode() {
    return this.merchantForm.get('merchantCode');
  }
  
  get fullName() {
    return this.merchantForm.get('fullName');
  }
  
  get email() {
    return this.merchantForm.get('email');
  }

 
  get accountNum() {
    return this.merchantForm.get('accountNum');
  }

  createMerchant() {

    if (this.merchantForm.valid) {
      console.log(this.merchantForm.value);
      this.merchantService.createMerchant(this.merchantForm.value)
        .subscribe({
          next: (res) => {
            this.merchantForm.reset();
            this.dialogRef.close('save');

          },
          error: () => {
            alert("Error while adding")
          }
        })
    }
  }

}
