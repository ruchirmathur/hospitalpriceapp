import { Component, OnInit, Input, OnDestroy, ViewChild } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { AuthOIDC } from '../../api/auth';
import { FormControl } from "@angular/forms";
import { FormGroup } from "@angular/forms";
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder } from "@angular/forms";
import { Validators } from "@angular/forms";
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HospitaldataComponent } from '../hospitaldata/hospitaldata.component';
import { HospitalService } from '../services/hospital.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  authClient: AuthOIDC;
  userDetails!: string;
  tokenDetails!: string;
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  thirdFormGroup!: FormGroup;
  dataSource!: MatTableDataSource<any>;
  test!: string;
  data:any;
  hospitalName!: string;
  licenseNumber!:string;
  lastUpdate!:string
  streetAddress!:string;
  city!:string;
  zipCode!:string;
  state!:string;
  res:any;


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private breakpointObserver: BreakpointObserver, private _formBuilder: FormBuilder,
    private _dialog: MatDialog, private hospitalService: HospitalService) {
    this.authClient = new AuthOIDC(
      {
        environment_id: '1ca92fb8-86bf-492d-b55f-c45545517059',
        client_id: '6772740f-31e8-4717-a89a-ad974a29ace7',
        redirect_uri: 'http://localhost:4200/dashboard',
        post_logout_redirect_uri: 'http://localhost:4200',
        api_uri: 'https://api.pingone.com',
        auth_uri: 'https://auth.pingone.com'
      }
    );
  }
  openAddEditEmpForm() {
    const dialogRef = this._dialog.open(HospitaldataComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getEmployeeList();
        }
      },
    });
  }
  saveData() {
    
    console.log("test:::"+sessionStorage.getItem('medicalCode'));
     
    this.hospitalService.getEmployeeList()
    .subscribe((res) => {

      this.dataSource = new MatTableDataSource(res.value);
      this.dataSource.sort = this.sort;
      this.data = res;
      this.hospitalService.addEmployee(this.data).subscribe((res) => {
       
      });
    })
   
   
  }
  getEmployeeList() {
    this.hospitalService.getEmployeeList()
      .subscribe((res) => {
        console.log(res.value[0].Modifiers);
        this.dataSource = new MatTableDataSource(res.value);
        this.dataSource.sort = this.sort;

      })
  }

  displayedColumns: string[] = [
    'Description',
    'MedicalCode',
    'BillingClass',
    'PlanName',
    'Payer',
    'AdmissionType',
    'StandardChargeContractingMethod',
    'StandardChargeWithoutInsuranceWithDiscounts',
    'StandardChargeWithInsurancePercentage',
    'StandardChargeWithInsurance',
    'action',
  ];

  ngOnInit() {
    this.getEmployeeList();
    console.log("auth:jgjgjgg:" + this.authClient.isAuthenticated());
    console.log(" this.authClient.init()" + this.authClient.showTokenClaimsInfo);
    this.firstFormGroup = this._formBuilder.group({
      hospitalCtrl: ['', Validators.required],
      licenseNumberCtrl: ['', Validators.required],
      lastUpdatedCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      streetAddressCtrl: ['', Validators.required],
      cityCtrl: ['', Validators.required],
      postalCtrl: ['', Validators.required],
      stateCtrl: ['', Validators.required],
    });
    this.authClient.init()
      .then(data => {
        this.userDetails = this.authClient.formatIntoTable(data);
        this.tokenDetails = this.authClient.showTokenClaimsInfo();

        console.log("auth::655555" + this.authClient.formatIntoTable(data));
      })
      .catch(error => console.log(error));
  }
  signIn() {
    console.log("auth::2" + this.authClient.isAuthenticated());
    this.authClient.signIn({
      scope: 'openid profile email address',
      response_type: 'token id_token'
    });
  }
  signOff() {
    this.authClient.signOff();
  }
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Enter Hospital Details', cols: 1, rows: 1 }
        ];
      }

      return [
        { title: 'Enter Hospital Details', cols: 2, rows: 1 }
      ];
    })
  );
  deleteEmployee(id: number) {
    this.hospitalService.deleteEmployee(id).subscribe({
      next: (res) => {
        this.hospitalService.openSnackBar('Employee deleted!', 'done');
        this.getEmployeeList();
      },
      error: console.log,
    });
  }
  openEditForm(data: any) {
    const dialogRef = this._dialog.open(HospitaldataComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getEmployeeList();
        }
      },
    });
  }
  saveHospitalData(data:any) {
    console.log("test:::"+this.firstFormGroup.get("hospitalCtrl")?.value);
    this.firstFormGroup.valueChanges.subscribe(x => {
      console.log(x);
    })
    this.hospitalName = this.firstFormGroup.get("hospitalCtrl")?.value;
    this.licenseNumber = this.firstFormGroup.get("licenseNumberCtrl")?.value;
    this.lastUpdate = this.firstFormGroup.get("lastUpdatedCtrl")?.value;

    //sessionStorage.setItem('HospitalName',this.hospitalName);
    //sessionStorage.setItem('LicensenNumber',this.licenseNumber);
    //sessionStorage.setItem('LastUpdate',this.lastUpdate);
  }
  saveHospitalLocationData(data:any) {
    this.streetAddress = this.secondFormGroup.get("streetAddressCtrl")?.value;
    this.city = this.secondFormGroup.get("cityCtrl")?.value;
    this.zipCode = this.secondFormGroup.get("postalCtrl")?.value;
    this.state = this.secondFormGroup.get("stateCtrl")?.value;

    //sessionStorage.setItem('StreetAddress',this.streetAddress);
    //sessionStorage.setItem('City',this.city);
    //sessionStorage.setItem('PostalCode',this.zipCode);
    //sessionStorage.setItem('StateProvince', this.state);
  }
}
