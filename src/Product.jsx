import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductDisplay from "./ProductDisplay";
import RelatedProduct from "./RelatedProduct";
import { Breadcrum } from "./Breadcrum";

export default function Product() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  // const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `https://allureserver.onrender.com/api/products/${productId}`
        ); // Ensure the URL is correct
        if (!response.ok) {
          throw new Error("Failed to fetch product");
        }
        const data = await response.json();
        setProduct(data.product);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  // useEffect(() => {
  //   const fetchRelatedProducts = async () => {
  //     if (product) {
  //       try {
  //         const response = await fetch(`/api/products`); // Fetch all products to find related ones
  //         if (!response.ok) {
  //           throw new Error("Failed to fetch related products");
  //         }
  //         const data = await response.json();
  //         // Filter the related products based on shared categories
  //         const filteredRelatedProducts = data.products.filter(
  //           (p) =>
  //             p._id !== product._id && // Exclude the current product
  //             p.category.some((category) => product.category.includes(category)) // Match categories
  //         );
  //         setRelatedProducts(filteredRelatedProducts);
  //       } catch (error) {
  //         setError(error.message);
  //       }
  //     }
  //   };

  //   fetchRelatedProducts();
  // }, [product]);

  // Handle loading and error states
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // If no product found, handle the error
  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div>
      <Breadcrum product={product} />
      <ProductDisplay product={product} />
      <RelatedProduct />
    </div>
  );
}
