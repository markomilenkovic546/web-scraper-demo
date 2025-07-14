export interface Product {
  id: string;
  title: string;
  category: string;
  imageSrc?: string;
  description?: string;
  information: {
    upc: string;
    productType: string;
    priceExclTax: string;
    priceInclTax: string;
    tax: string;
    availability: string;
    numberOfReviews: string;
  };
}
