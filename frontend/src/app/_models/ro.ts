import { RoItem } from './roItem'; 

export class Ro{
    id: number;
    poNumber: string;
    shippingNumber: string;
    lotNumber: string;
    venderNo: string;
    userEmail: string;
    arrivalDate: string;
    status: string;
    rOitems: Array<RoItem>;
    orderDate: string;
}