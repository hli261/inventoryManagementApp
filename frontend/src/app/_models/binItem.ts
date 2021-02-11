import { Bin } from "./bin";
import { Item } from "./item";

export class BinItem{
    id: number;   
    bin: Bin;
    item: Array<Item>;
    quantity: number;
}