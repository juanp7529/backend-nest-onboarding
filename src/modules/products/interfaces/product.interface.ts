import { Product } from '../entities/product.entity';

export interface IProductService {
  findAll(): Promise<Product[]>;
  findOne(id: string): Promise<Product>;
}
