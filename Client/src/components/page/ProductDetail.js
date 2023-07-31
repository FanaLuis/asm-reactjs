import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const [product, setProduct] = useState({});
  const { productId } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/books/${productId}`);
        setProduct(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchProduct();
  }, [productId]);

  return (
    <div className="product-detail">
      <div className="box-detail">
        <div className="product-dt-img">
          {product.image && <img src={product.image} alt="" />}
        </div>
        <div className="des-infor">
          <h2>{product.title}</h2>
          <h3 className="price">{product.price}</h3>
        </div>
      </div>
      <p className="decs-product">{product.decs}</p>
    </div>
  );
};

export default ProductDetail;
