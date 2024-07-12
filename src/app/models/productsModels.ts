type Categories = "drink" | "burguer" | "specials" | "pizza";

export interface ProductsModel {
    id: string,
    name: string,
    price: number,
    category: Categories,
    description: string,
    img: string,
    calification: number
}

export enum categoriesModels {
    all = "all",
    drink = "drink",
    burguer = "burguer",
    specials = "specials",
    pizza = "pizza"
}