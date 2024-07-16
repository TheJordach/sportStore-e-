import { Injectable } from '@angular/core'
import { Product } from './product.model'
import { StaticDataSource } from './static.datasource'

/** ProductRepository Class
 *
 * When Angular needs to create a new instance of the repository, it will inspect the class and see that it
 * needs a StaticDataSource object to invoke the ProductRepository constructor and create a new object.
 * The repository constructor calls the data source’s getProducts method and then uses the subscribe method
 * on the Observable object that is returned to receive the product data.
 *
 * **/
@Injectable({
  providedIn: 'root',
})
export class ProductRepositoryService {
  private products: Product[] = []
  private categories: string[] = []

  constructor(private dataSource: StaticDataSource) {
    dataSource.getProducts().subscribe(data => {
      this.products = data
      this.categories = data
        .map(p => p.category ?? '(None)')
        .filter((c, index, array) => array.indexOf(c) == index)
        .sort((a, b) => a.localeCompare(b))
    })
  }

  /** getProducts Methods
   * This method takes an optional category parameter and filters and returns a list of products based on the provided category.
   * If no category is specified, it returns all products.
   *
   * Example Usage
   * const productRepository = new ProductRepository(new StaticDataSource());
   * const allProducts = productRepository.getProducts();
   * const electronicsProducts = productRepository.getProducts('Electronics');
   * console.log(allProducts); // Outputs all products
   * console.log(electronicsProducts); // Outputs products in the 'Electronics' category
   *
   * @Inputs category (optional): The category (optional): A string representing the category of products to filter by.
   * **/

  getProducts(category?: string): readonly Product[] {
    return this.products.filter(
      product => category == undefined || category == product.category
    )
  }

  getProduct(id: number): readonly Product[] {
    return this.products.filter(product => product.id == id)
  }

  getCategories(): readonly string[] {
    return this.categories
  }
}
