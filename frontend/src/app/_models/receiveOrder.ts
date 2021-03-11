import { RoItem } from './RoItem'; 

export class ReceiveOrder{
    id: number;
    poNumber: string;
    shippingNumber: string;
    lotNumber: string;
    venderNo: string;
    userEmail: string;
    arrivalDate: string;
    status: string;
    orderDate: string;
    rOitems: Array<RoItem>;
}