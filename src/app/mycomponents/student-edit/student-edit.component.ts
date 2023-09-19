import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from 'src/app/services/student/student.service';

@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.css']
})
export class StudentEditComponent implements OnInit {
  constructor(private stdform: FormBuilder, private data: StudentService, private router: ActivatedRoute) { }
  ngOnInit(): void {
    this.updatestd()
  }



  studentForm = this.stdform.group({
    name: ['', Validators.required],
    lastname: ['', Validators.required],
    email: ['', Validators.required, Validators.email],
    contact: ['', Validators.required],
    Designation: ['', Validators.required],
    gender: ['', Validators.required]
  })

  updatestd() {
    this.router.params.subscribe(p => {
      const id = p['id'];
      this.data.getUpdateStudentData(id).subscribe((res: any) => {
        console.log(res);

        this.studentForm = this.stdform.group({
          name: [res['name']],
          lastname: [res['lastname']],
          email: [res['email']],
          contact: [res['contact']],
          Designation: [res['Designation']],
          gender: [res['gender']]
        });
        this.setgender1(res['gender']);
      });

    });
  }

  setgender1(gender: string) {
    const button = document.querySelector('.dropdown-toggle');
    if (button) {
      button.textContent = gender;
    }
  }

  setgender(gender: string) {
    const button = document.querySelector('.dropdown-toggle');
    if (button) {
      button.textContent = gender;
      this.studentForm.get('gender')?.setValue(gender);
    }
  }

  add_success: boolean = false

  save() {
    this.router.params.subscribe(p => {
      const id: any = p['id']
      this.data.setUpdateStudentData(id, this.studentForm.value).subscribe(e => {
        console.log(e)
        this.add_success = true;
        this.disappear_success_msg();
      })
    });
  };

  disappear_success_msg() {
    setTimeout(() => {
      this.add_success = false
    }, 8000)
  }

}
