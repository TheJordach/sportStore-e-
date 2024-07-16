import { NgModule } from '@angular/core'
import { StaticDataSource } from './static.datasource'
import { ProductRepositoryService } from './product.repository.service'

@NgModule({
  providers: [ProductRepositoryService, StaticDataSource],
})
export class ModelModule {}
