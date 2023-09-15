import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { StudentService } from 'src/app/services/student/student.service';
// import { DataTablesStatic} from 'datatables.net-dt'


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
    email: ['', Validators.required, Validators.email],
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


  save() {
    this.data.saveStudentRecord(this.studentForm.value).subscribe((res) => {
      console.log(res)
      console.log(this.studentForm)
      this.studentForm.reset({})
    })
  }

  


}
