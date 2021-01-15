export class User {
    id: number;
    lastName: string;
    firstName: string;
    email: string;
    password: string;
    token: string;
    access: Array<string>;
    active: boolean;
  }