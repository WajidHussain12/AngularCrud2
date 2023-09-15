import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private request: HttpClient) { }

  studentapi: string = "http://localhost:3000/Students";
  // Employeeapi: string = "http://localhost:3000/Employeee";


  sendStudentapi() {
    return this.request.get(this.studentapi);
  }


  // sendEmployeeapi() {
  //   return this.request.get(this.Employeeapi);
  // }

  saveStudentRecord(data: any) {
    return this.request.post(this.studentapi, data)
  }

  deletestudent(id: any) {
    return this.request.delete(`${this.studentapi}/${id}`)
  }
}
