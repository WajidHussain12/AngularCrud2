import { Component, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import { StudentService } from 'src/app/services/student/student.service';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-student-data',
  templateUrl: './student-data.component.html',
  styleUrls: ['./student-data.component.css']
})

export class StudentDataComponent implements OnInit, AfterViewInit {
  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;

  constructor(private request: StudentService) { }

  ngOnInit(): void {
    console.log("I Am OninIt");
  }

  dtoptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  p: Promise<any>;
  c: boolean = false;
  stdData: any;

  dataStatus() {
    this.p = new Promise((resolve, reject) => {
      if (this.c) {
        resolve("Data Fetch Successfully........");
      } else {
        reject("Error Fetching Data!....");
      }
    });
    this.p.then((status) => {
      console.log(status);
    }).catch((error) => {
      console.log(error);
    });
  }

  showmsg: string = "Please Wait Student's Data Is Being Fetched........";
  showafter: string;
  showerror: string;

  getstudentdata() {
    this.request.sendStudentapi().subscribe({
      next: ((data) => {
        console.log("Please Wait Data Is Being Fetched........");
        setTimeout(() => {
          console.log(data);
          this.stdData = data;
          this.c = true;
          this.dtTrigger.next(null);
          this.dataStatus();
          this.showmsg = "";
          this.showafter = "Student Data Fetched Successfully";
        }, 1000);
      }),
      error: ((error) => {
        this.c = false;
        this.dataStatus();
        this.showmsg = "";
        this.showerror = "Error Fetching Student Data...";
      })
    });
  }

  ngAfterViewInit(): void {
    this.table();
  }
// deletion Method

  deleteid: any = "";

  deleteStudentId(id: any) {
    this.deleteid = id
    console.log(this.deleteid)

  }

  confirmdeleteStudent() {
    this.deleteStudent(this.deleteid);
    // this.deletevalues(this.deleteid)

  }

// this mehtod for record delete

  deleteStudent(deleteid: any) {
    // No need for the window.confirm check anymore
    this.request.deletestudent(deleteid).subscribe((res) => {
      this.refreshDataTable();
      // console.log("hello")

    });
  }

// this method for get deleted record id and name for Confirmation

  deletevalues(id: any) {
    this.request.getUpdateStudentData(id).subscribe(r => {
      // console.log(r)
      const data: any = r
      const viewname = data['name'];
      this.dviewname = viewname
      const id = data['id'];
      this.did = id
      console.log(this.dviewname);
      console.log("this is delete console")

    })
  }
  dviewname: any
  did: any


// this method to control data table


  table() {
    this.dtoptions = {
      pagingType: 'full_numbers',
      searching: true,
      destroy: true,
      language: {
        searchPlaceholder: 'Search Data'
      }
    };

    this.getstudentdata();
  }

  refreshDataTable() {
    // Destroy the DataTable instance
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();

      // Reinitialize the DataTable with updated data
      this.table();
    });
  }



  name: any
  lastname: any
  email: any
  Designation: any
  contact: any
  gender: any



  viewstd(id: any) {
    this.request.getUpdateStudentData(id).subscribe(r => {
      console.log(r);

      const data: any = r
      const viewname = data['name'];
      this.name = viewname
      const lastname = data['lastname'];
      this.lastname = lastname
      const email = data['email'];
      this.email = email
      const Designation = data['Designation'];
      this.Designation = Designation
      const contact = data['contact'];
      this.contact = contact
      const gender = data['gender'];
      this.gender = gender

    })

  }









}
