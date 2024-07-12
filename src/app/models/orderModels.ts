import { ProductsModel } from "./productsModels";

export interface IOrderModel {
    id: string,
    date: Date,
    listProducts: ProductOrderModel[],
    priceTotal: number,
}

export interface ProductOrderModel extends ProductsModel {
    stock: number,
    priceStock?: number
}