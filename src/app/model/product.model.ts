/** PRODUCT CLASS
 * describe the products sold in the store
 * The parameters are optional because they will be populated from HTML forms.
 * */
export class Product {
  constructor(
    public id?: number,
    public name?: string,
    public category?: string,
    public description?: string,
    public price?: number
  ) {}
}
