export interface Patient {
  id: string;
  name: string;
  address: string;
  age: number;
  familyCount: number;
  phone:number;
  status:string;
}

export enum StatusEnum{
   MILD ='mild',
   MODERATE ='moderate',
   CRITICAL ='critical',
   RECOVERED ='recovered',
   DECEASED='deceased'
}

export enum AddressEnum{
 PANJIM ='panjim',
 PONDA='ponda',
 VASCO='vasco',
 MARGAO='margao',
 MAPUSA='mapusa',
 VALPOI='valpoi',
 QUEPEM ='QUEPEM'
}
