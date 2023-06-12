import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HospitalService } from '../services/hospital.service';
import { SessionStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-hospitaldata',
  templateUrl: './hospitaldata.component.html',
  styleUrls: ['./hospitaldata.component.scss']
})
export class HospitaldataComponent implements OnInit {
  empForm: FormGroup;

  medicalCode: string[] = [
    '8474',
    '239238',
    '3232',
    '21212',
    '3232323',
  ];
  contractingType: string[] = [
    'Test',
    'Test1'
  ];
  admissionType: string[] = [
    'Test',
    'Test1'
  ];
  billingClass: string[] = [
    'Test',
    'Test1'
  ];
  planName: string[] = [
    'Anthem PPO',
    'UHC PPO'
  ];
  payer: string[] = [
    'Anthem PPO',
    'UHC PPO'
  ];
  medicalCodes!:string;
  billing!:string;
  plan!:string;
  insurance!:string;
  admission!:string;
  contracting!:string;
  insCost!:string;

  constructor(
    private _fb: FormBuilder,
    private hospitalService: HospitalService,
    private _dialogRef: MatDialogRef<HospitaldataComponent>,
    private sessionStorageService:SessionStorageService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.empForm = this._fb.group({
      medicalCode: '',
      billingClass: '',
      planName: '',
      payer: '',
      admissionType: '',
      contractingMethod: '',
      insuranceCost: '',
      noInsuranceCost: '',
      percentage: '',
    });
  }

  ngOnInit(): void {
    this.empForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.empForm.valid) {
      this.hospitalService.openSnackBar('Employee detail updated!');
      this._dialogRef.close(true);

      sessionStorage.setItem('hospitalFormData',this.empForm.value);
      this.medicalCodes = this.empForm.get("medicalCode")?.value;
      sessionStorage.setItem('medicalCode',this.medicalCodes);

      this.billing = this.empForm.get("billingClass")?.value;
      sessionStorage.setItem('billingClass',this.billing);

      this.plan = this.empForm.get("planName")?.value;
      sessionStorage.setItem('planName',this.plan);

      this.insurance = this.empForm.get("payer")?.value;
      sessionStorage.setItem('payer',this.insurance);

      this.contracting = this.empForm.get("contractingType")?.value;
      sessionStorage.setItem('contractingType',this.contracting);

      this.admission = this.empForm.get("admissionType")?.value;
      sessionStorage.setItem('admissionType',this.admission);

      this.insCost = this.empForm.get("insuranceCost")?.value;
      sessionStorage.setItem('insuranceCost',this.insCost);

      this.insCost = this.empForm.get("insuranceCost")?.value;
      sessionStorage.setItem('insuranceCost',this.insCost);

      console.log(this.empForm.value);


    } else {
      this.hospitalService.openSnackBar('Employee detail added!');
      this._dialogRef.close(true);
     
      this.medicalCodes = this.empForm.get("medicalCode")?.value;
      sessionStorage.setItem('medicalCode',this.medicalCodes);

      this.billing = this.empForm.get("billingClass")?.value;
      sessionStorage.setItem('billingClass',this.billing);

      this.plan = this.empForm.get("plan")?.value;
      sessionStorage.setItem('planName',this.plan);
    }


  }
}