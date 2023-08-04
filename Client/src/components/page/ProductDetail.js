import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./css/productdetail.css";

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
    <>
      <div className="container">
        <div className="card">
          <div className="container-fliud">
            <div className="wrapper ">
              <div className="preview col-md-6">
                <div className="preview-pic tab-content">
                  <div className="tab-pane active" id="pic-1">
                    <img src={product.image} alt={product.title} />
                  </div>
                </div>
              </div>
              <div className="details col-md-6">
                <h3 className="product-title">{product.title}</h3>

                <div
                  className="product-description"
                  dangerouslySetInnerHTML={{ __html: product.decs }}
                />

                <h4 className="price">
                  current price: <span>{product.price} $</span>
                </h4>

                <div className="action">
                  <button className="add-to-cart btn btn-default" type="button">
                    add to cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
