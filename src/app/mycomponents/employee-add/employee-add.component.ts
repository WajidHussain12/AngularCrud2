import { Component } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms'

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.css']
})
export class EmployeeAddComponent {
  constructor(private stdform: FormBuilder) { }


  studentForm = this.stdform.group({
    fname: ['', Validators.required],
    lname: ['', Validators.required],
    gender: ['', Validators.required],
    contact: ['', Validators.required],
    dsg: ['', Validators.required],
  })


  save() {
    console.log(this.studentForm.value)
  }


}
