import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IOrderModel, ProductOrderModel } from '../../../models/orderModels';
import { orderData } from '../../../apis/dataOrder';
import { CarouselModule } from 'primeng/carousel';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-panel',
  standalone: true,
  imports: [CarouselModule, CommonModule],
  templateUrl: './order-panel.component.html',
  styleUrl: './order-panel.component.css'
})
export class OrderPanelComponent implements OnInit {

  @Output() closePanelValue = new EventEmitter<any>();
  @Input() ordenCreate: IOrderModel = orderData;

  ngOnInit(): void {

    this.calculatePriceStock();
    this.calculatePriceTotalOrder();
  }

  public calculatePriceStock() {
    if (this.ordenCreate !== undefined) {
      this.ordenCreate.listProducts.forEach((product) => {
        product.priceStock = product.price * product.stock;
      });
    }
  }

  public calculatePriceTotalOrder() {
    if (this.ordenCreate !== undefined) {
      this.ordenCreate.priceTotal = this.ordenCreate.listProducts.reduce((total, product) => {
        if (product.priceStock != undefined) {
          return total + product.priceStock;
        }
        return total;
      }, 0);
    }
  }

  public closePanel(value: boolean) {
    this.closePanelValue.emit({
      panelValue: value,
      productPanleValue: false
    });
  }

  public deleteProductOfOrder(id: string) {
    if (this.ordenCreate.listProducts.length > 0) {
      if (this.ordenCreate !== undefined) {
        const productIndex = this.ordenCreate.listProducts.findIndex((product) => product.id === id);
        if (productIndex !== -1) {
          const product = this.ordenCreate.listProducts[productIndex];
          if (product.stock > 0) {
            product.stock--;
            if (product.stock === 0) {
              this.ordenCreate.listProducts.splice(productIndex, 1);
            }
          }
        }
        this.calculatePriceStock();
        this.calculatePriceTotalOrder();
      }
    } else {
      this.closePanel(false);
    }
  }

}
