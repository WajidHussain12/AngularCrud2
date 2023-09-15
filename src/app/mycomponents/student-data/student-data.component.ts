import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/services/student/student.service';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-student-data',
  templateUrl: './student-data.component.html',
  styleUrls: ['./student-data.component.css']
})
export class StudentDataComponent implements OnInit {

  constructor(private request: StudentService) { };


  dtoptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  p: Promise<any>;
  c: boolean = false;
  stdData: any;

  dataStatus() {
    this.p = new Promise((resolve, reject) => {
      if (this.c) {
        resolve("Data Fetch Successfully........");
      }
      else {
        reject("Error Fetching Data!....");
      }
    });
    this.p.then((status) => {
      console.log(status);
    }).catch((error) => {
      console.log(error)
    })

  };




  showmsg: string = "Please Wait Student's Data Is Being Fetching........";
  showafter: string;
  showerror: string
  getstudentdata() {
    this.request.sendStudentapi().subscribe({

      next: ((data) => {
        console.log("Please Wait Data Is Being Fetching........")
        setTimeout(() => {
          console.log(data)
          this.stdData = data;
          this.c = true;
          this.dtTrigger.next(null);
          this.dataStatus();
          this.showmsg = ""
          this.showafter = "Student Data Fetch Successfully"
        }, 5000)
      }),
      error: ((error) => {
        this.c = false;
        this.dataStatus();
        this.showmsg = ""
        this.showerror = "Error Student Data Fetching..."
      })
    })
  }


  ngOnInit(): void {
    this.getstudentdata()
    this.dtoptions = {
      pagingType: 'full_numbers',
      language: {
        searchPlaceholder: 'Search Data'
      }
    };
  }

  deleteStudent(id: any) {
    this.request.deletestudent(id).subscribe((res)=>{
      this.ngOnInit();
    })
  }



}
