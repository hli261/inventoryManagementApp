import { RoItem } from './roItem'; 

export class ReceiveOrder{
    id: number;
    rOnumber: string;
    poNumber: string;
    shippingNumber: string;
    lotNumber: string;
    venderNo: string;
    userEmail: string;
    arrivalDate: string;
    status: string;
    receivingItems: Array<RoItem>;
    orderDate: string;
}