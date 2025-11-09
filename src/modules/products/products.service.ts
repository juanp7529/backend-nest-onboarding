import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './entities/product.entity';
import { IProductService } from './interfaces/product.interface';
import { readFile } from 'fs/promises';
import { join } from 'path';

@Injectable()
export class ProductsService implements IProductService {
  private products: Product[] | null = null;

  /**
   * Get products from products.json file
   * @returns Product[]
   */
  private async loadProducts(): Promise<Product[]> {
    if (this.products) {
      return this.products;
    }
    try {
      const filePath = join(process.cwd(), 'products.json');
      const fileContent = await readFile(filePath, 'utf8');
      const productsData = JSON.parse(fileContent) as Product[];
      this.products = productsData.map((p: any) => new Product(p));
      return this.products;
    } catch (err) {
      console.error('Error cargando products.json:', err);
      throw new Error('No se pudo cargar la lista de productos bancarios');
    }
  }

  /**
   * get all products
   * @returns Product[]
   */
  async findAll(): Promise<Product[]> {
    return await this.loadProducts();
  }

  /**
   * get product by id
   * @param id id of the product
   * @returns Product
   */
  async findOne(id: string): Promise<Product> {
    const products = await this.loadProducts();
    const product = products.find((p) => p.id === id);

    if (!product) {
      throw new NotFoundException(`Producto bancario con ID ${id} no encontrado`);
    }

    return product;
  }
}
