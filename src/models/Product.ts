import mongoose, { Schema, Document } from 'mongoose';
import { Product } from '../types'; 

export interface IProductDocument extends Document {
    id: string;
    title: string;
    category: string;
    imageSrc?: string;
    description?: string;
    information: Product['information'];
}

const InformationSchema = new Schema(
    {
        upc: { type: String, required: true },
        productType: { type: String, required: true },
        priceExclTax: { type: String, required: true },
        priceInclTax: { type: String, required: true },
        tax: { type: String, required: true },
        availability: { type: String, required: true },
        numberOfReviews: { type: String, required: true }
    },
    { _id: false }
);

const ProductSchema = new Schema<IProductDocument>({
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    category: { type: String, required: true },
    imageSrc: { type: String },
    description: { type: String },
    information: { type: InformationSchema, required: true }
});

const ProductModel = mongoose.model<IProductDocument>('Product', ProductSchema);
export default ProductModel;
