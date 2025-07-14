import { Product } from '../types';
import ProductModel from '../models/Product';

export default class ProductService {
    async upsertProducts(products: Product[]): Promise<void> {
        for (const product of products) {
            await ProductModel.findOneAndUpdate({ id: product.id }, product, { upsert: true, new: true });
        }
    }
}
