import { Lot } from "./lot";
import { ShipMethod } from "./shipMethod";
import { User } from "./user";
import { Vender } from "./vender";

export class Ship{
    id: number;
    shippingNumber: string;
    arrivalDate: string;
    invoiceNumber: string;
    shippingMethod: ShipMethod;
    vender: Vender;
    user: User;
    shippingLot: Lot;
}