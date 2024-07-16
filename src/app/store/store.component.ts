import { Component } from '@angular/core'
import { ProductRepositoryService } from '../model/product.repository.service'
import { Product } from '../model/product.model'

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrl: './store.component.scss',
})
export class StoreComponent {
  constructor(private repository: ProductRepositoryService) {}
  get products(): readonly Product[] {
    return this.repository.getProducts()
  }

  getCategories(): readonly string[] {
    return this.repository.getCategories()
  }
}
