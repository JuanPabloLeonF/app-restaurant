import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductsModel } from '../../../models/productsModels';
import { ProductOrderModel } from '../../../models/orderModels';

@Component({
  selector: 'app-product-panel',
  standalone: true,
  imports: [],
  templateUrl: './product-panel.component.html',
  styleUrl: './product-panel.component.css'
})
export class ProductPanelComponent {
  @Output() closePanelProductValue = new EventEmitter<any>();
  @Output() listProductOrder = new EventEmitter<ProductOrderModel[]>();
  @Input() product!: ProductsModel;

  public productForOrder: ProductOrderModel = {
    stock: 0,
    id: '',
    name: '',
    price: 0,
    category: 'drink',
    description: '',
    img: '',
    calification: 0
  };
  
  public listProductForOrder: ProductOrderModel[] = [];
  public counterStock: number = 0;

  public counterStockFunction(value: string) {
    if (value === "increment") {
      this.counterStock++;
    } else if (value === "decrement" && this.counterStock > 0) {
      this.counterStock--;
    } else {
      this.counterStock = 0;
    }
  }

  public closePanelProduct(value: boolean) {
    this.closePanelProductValue.emit({
      panelValue: false,
      productPanleValue: value
    });
  }

  public addProduct() {
    if (this.counterStock != 0) {
      this.convertProductModelToProductOrderModel();
      this.closePanelProduct(false);
    } else {
      alert("NO TIENE CANTIDAD EL PRODUCTO");
    }
  }

  private convertProductModelToProductOrderModel() {
    this.productForOrder.id = this.product.id;
    this.productForOrder.name = this.product.name;
    this.productForOrder.img = this.product.img;
    this.productForOrder.price = this.product.price;
    this.productForOrder.description = this.product.description;
    this.productForOrder.category = this.product.category;
    this.productForOrder.calification = this.product.calification;
    this.productForOrder.priceStock = 0;
    this.productForOrder.stock = this.counterStock;
    this.listProductForOrder.push(this.productForOrder);
    console.log(this.listProductForOrder);
    this.listProductOrder.emit(this.listProductForOrder);
    alert("SE AGREGO CORRECTAMENTE EL PRODUCTO: " + this.product.name.toUpperCase() + " A LA ORDEN");
  }
}
