// export interface Cart{
//     id: number,
//     name: string,
//     price: number,
//     url: string | Blob,
//     description: string,
//     quantity:number

import { Item } from "./Item";

// } 
export interface Cart {item: Item; quantity: number}