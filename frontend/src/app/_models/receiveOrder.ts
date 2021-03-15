import { RoItem } from './roItem'; 

export class ReceiveOrder{
    id: number;
    roNumber: string;
    poNumber: string;
    shippingNumber: string;
    lotNumber: string;
    venderNo: string;
    userEmail: string;
    createDate: string;
    status: string;
    orderDate: string;
    getReceivingItemDtos: Array<RoItem>;    
}