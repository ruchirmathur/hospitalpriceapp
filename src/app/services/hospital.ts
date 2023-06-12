import { Address } from "src/app/services/address";
export class HospitalRequest {
    
    Modifiers?: string;
    StandardChargeContractingMethod?:string;
    StandardChargeWithoutInsuranceWithDiscounts?:string;
    StandardChargeWithInsurancePercentage?:string;
    StandardChargeWithInsurance?:string;
    MedicalCodeTypeCode?:string;
    StandardChargeWithoutInsurance?:string;
    DrugUnitOfMeasurement?:string;
    DrugTypeOfMeasurement?:string;
    LastUpdatedDate?:string;
    MedicalCode?:string;
    BillingClass?:string;
    PlanName?:string;
    HospitalName?:string;
    Payer?:string;
    AdmissionType?:string;
    Address?:Address;
    
 } 