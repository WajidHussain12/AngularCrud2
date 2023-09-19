import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentDataComponent } from './mycomponents/student-data/student-data.component';
import { EmployeeDataComponent } from './mycomponents/employee-data/employee-data.component';
import { UserDataComponent } from './mycomponents/user-data/user-data.component';
import { StudentAddComponent } from './mycomponents/student-add/student-add.component';
import { EmployeeAddComponent } from './mycomponents/employee-add/employee-add.component';
import { UserAddComponent } from './mycomponents/user-add/user-add.component';
import { CoverPageComponent } from './mycomponents/cover-page/cover-page.component';
import { StudentEditComponent } from './mycomponents/student-edit/student-edit.component';
import { StudentViewComponent } from './mycomponents/student-view/student-view.component';

const routes: Routes = [
  { path: "", component: CoverPageComponent },
  { path: "studentData", component: StudentDataComponent },
  { path: "employeeData", component: EmployeeDataComponent },
  { path: "userData", component: UserDataComponent },
  { path: "addstudent", component: StudentAddComponent },
  { path: "addemployee", component: EmployeeAddComponent },
  { path: "adduser", component: UserAddComponent },
  { path: "stdedit/:id", component: StudentEditComponent },
  { path: "stdview/:id", component: StudentViewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
