export enum GenderType {
  Male = 'M',
  Femal = 'Female',
}

export interface IPersonalDetails {
  firstName: string;
  lastName: string;
  gender: GenderType;
  phone: string;
  email: string;
  streetAddress: string;
  streetAddress2: string;
  suburbId: number;
  dateOfBirth: Date;
}

export interface ISkill {
  id: string;
  name: string;
}

export interface IExperience {
  id: string;
  value?: string;
  name: string;
}
