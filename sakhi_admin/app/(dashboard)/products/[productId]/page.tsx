"use client"
import Loader from '@/components/custom ui/Loader';
import ProductForm from '@/components/products/ProductForm';
import React, { useEffect, useState, useCallback } from 'react'

const ProductDetails = ({ params }: { params: { productId: string }}) => {  // Fixed spelling to "ProductDetails"
  const [loading, setLoading] = useState(true);
  const [productDetails, setProductDetails] = useState<ProductType | null>(null);

  const getProductDetails = useCallback(async () => {
    try {
      const res = await fetch(`/api/products/${params.productId}`, {
        method: "GET"
      });
      const data = await res.json();
      setProductDetails(data);
      setLoading(false);
    } catch (err) {
      console.log("[productId_GET]", err);
    }
  }, [params.productId]);  // Added as a dependency

  useEffect(() => {
    getProductDetails();
  }, [getProductDetails]);  // Add getProductDetails to the dependency array

  return loading ? <Loader /> : (
    <ProductForm initialData={productDetails} />
  );
}

export default ProductDetails;
