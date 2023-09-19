import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { StudentService } from 'src/app/services/student/student.service';


@Component({
  selector: 'app-student-add',
  templateUrl: './student-add.component.html',
  styleUrls: ['./student-add.component.css']
})
export class StudentAddComponent {

  constructor(private stdform: FormBuilder, private data: StudentService) { }



  studentForm = this.stdform.group({
    name: ['', Validators.required],
    lastname: ['', Validators.required],
    email: ['', Validators.required],
    contact: ['', Validators.required],
    Designation: ['', Validators.required],
    gender: ['', Validators.required]
  })



  setgender(gender: string) {
    const button = document.querySelector('.dropdown-toggle');
    if (button) {
      button.textContent = gender;
      this.studentForm.get('gender')?.setValue(gender);
    }
  }

  add_success: boolean = false

  save() {
    this.data.saveStudentRecord(this.studentForm.value).subscribe((res) => {
      console.log(res)
      console.log(this.studentForm)
      this.studentForm.reset({})
      this.add_success = true;
      this.disappear_success_msg();
    })
  }

  disappear_success_msg() {
    setTimeout(() => {
      this.add_success = false
    }, 8000)
  }





}
