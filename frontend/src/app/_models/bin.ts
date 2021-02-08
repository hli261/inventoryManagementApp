import {BinType} from './binType';
import { WarehouseLocation } from './warehouseLocation';

export class Bin{
   id: number;
   binType: BinType;
   binCode: string;
   warehouseLocation: WarehouseLocation;
}
