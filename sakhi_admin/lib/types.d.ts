type CollectionType = {
    _id: string;
    title: string;
    description: string;
    image: string;
    products: ProductType[];
  }
  
  type ProductType = {
    _id: string;
    title: string;
    description: string;
    media: string[];
    category: string;
    collections: Collection[]; // Change this from [CollectionType] to string[]
    tags: string[];
    sizes: string[];
    colors: string[]; // Change this from [ColorType] to string[]
    price: number;
    expense: number;
    createdAt: Date;
    updatedAt: Date;
  }
  type OrderColumnType = {
    _id: string;
    customer: string;
    products: number;
    totalAmount: number;
    createdAt: string;
  }
  
  type OrderItemType = {
    product: ProductType
    color: string;
    size: string;
    quantity: number;
  }
  
  type CustomerType = {
    clerkId: string;
    name: string;
    email: string;
  }
  