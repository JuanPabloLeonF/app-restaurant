import { Component } from '@angular/core';
import { SectionMainComponent } from './section-main/section-main.component';
import { OrderPanelComponent } from './order-panel/order-panel.component';
import { ProductPanelComponent } from './product-panel/product-panel.component';
import { ProductsModel } from '../../models/productsModels';
import { IOrderModel, ProductOrderModel } from '../../models/orderModels';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [SectionMainComponent, OrderPanelComponent, ProductPanelComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

  public productGet!: ProductsModel;
  public ordenCreate: IOrderModel = {
    id: '',
    date: new Date(),
    listProducts: [],
    priceTotal: 0
  };

  public panel = {
    panelValue: false,
    productPanelValue: false
  }

  public getListProductOrder(productOrderList: ProductOrderModel[]) {
    this.ordenCreate.id = "1";
    this.ordenCreate.date = new Date();
    this.ordenCreate.priceTotal = 0;
    this.ordenCreate.listProducts = productOrderList;
  }

  public getProduct(product: ProductsModel) {
    this.productGet = product;
  }

  public panelOpen(value: any) {
    if (value.panelValue === true) {
      if (this.ordenCreate.listProducts.length === 0) {
        alert("NO TIENE PRODUCTOS EN LA ORDEN");
      } else {
        this.panel.panelValue = value.panelValue;
      }
    } else if (value.productPanelValue === true) {
      this.panel.productPanelValue = value.productPanelValue;
    } else {
      this.panel = {
        panelValue: false,
        productPanelValue: false
      }
    }
  }
}
