import { User } from "./user";
import { Vender } from "./vender";

export class Ship {
  id: number;
  shippingNum: string;
  arrivalDate: Date;
  shippingMethod: string;
  venderNo: string;
  userEmail: string;
  invoiceNumber: string;
}
