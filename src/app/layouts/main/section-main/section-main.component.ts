import { Component, EventEmitter, Output } from '@angular/core';
import { ProductsModel, categoriesModels } from '../../../models/productsModels';
import { CommonModule } from '@angular/common';
import { listProductsBackend } from '../../../apis/dataProducts';

@Component({
  selector: 'app-section-main',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './section-main.component.html',
  styleUrl: './section-main.component.css'
})
export class SectionMainComponent {
  public listProducts: ProductsModel[] = listProductsBackend;
  @Output() openPanelValue = new EventEmitter<any>();
  @Output() productGet = new EventEmitter<ProductsModel>();

  public filterByCategory(category: string) {
    if (category == categoriesModels.all) {
      this.listProducts = listProductsBackend
    } else if (category == categoriesModels.burguer) {
      this.listProducts = listProductsBackend.filter((product) => product.category === category);
    } else if (category == categoriesModels.drink) {
      this.listProducts = listProductsBackend.filter((product) => product.category === category);
    } else if (category == categoriesModels.pizza) {
      this.listProducts = listProductsBackend.filter((product) => product.category === category);
    } else if (category == categoriesModels.specials) {
      this.listProducts = listProductsBackend.filter((product) => product.category === category);
    } else {
      this.listProducts = listProductsBackend
    }
  }

  public getProduct(product: ProductsModel) {
    this.productGet.emit(product);
  }

  public openPanel(value: string) {
    if (value === "orderPanel") {
      this.openPanelValue.emit({
        panelValue: true,
        productPanelValue: false
      });
    } else if (value === "productPanel") {
      this.openPanelValue.emit({
        panelValue: false,
        productPanelValue: true
      });
    } else {
      this.openPanelValue.emit({
        panelValue: false,
        productPanelValue: false
      });
    }
  }
}
