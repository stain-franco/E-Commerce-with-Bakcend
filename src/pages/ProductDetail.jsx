import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsLoading } from "../store/slices/isLoading.slice";
import { Button, Col, Row } from "react-bootstrap";
import { getProductsThunk } from "../store/slices/products.slice";
import Carousel from 'react-bootstrap/Carousel';
import { createCartThunk } from "../store/slices/cart.slice";
import { BsCart4 } from 'react-icons/bs';

const ProductsDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [count, setCount] = useState(1)
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(setIsLoading(true))
    dispatch(getProductsThunk())
    dispatch(setIsLoading(false))
  
  }, [id]);

  const allProducts = useSelector((state) => state.products);
  const detail = allProducts.find((products) => products.id === Number(id));
  const productsRelated = allProducts.filter(
    (products) => products.category.name === detail.category.name
  );

  const addToPurchases = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const cart = {
        id: detail.id,
        quantity: count
      };
      console.log(cart)
      dispatch(createCartThunk(cart))
    } else {
      navigate("/login");
    }
  };
  return (
    <div>
      <Row className="sliceLabel">
        <Col lg={9}>
        <h1>{detail?.title}</h1>
      <p>{detail?.description}</p>
      <p>Price ${detail?.price}</p>
      
      <Button className="mb-3" onClick={addToPurchases}>
      Add to cart <BsCart4 size={20} style={{margin: 8}}/>
      </Button>
      <div>
        <Button className="mb-1" style={{margin: 5}} onClick={() => setCount(count -1)}>-</Button>
         {count}
        <Button className="mb-1" style={{margin: 5}} onClick={() => setCount(count +1)}>+</Button>
      </div>
        </Col>
        <Col lg={9}>
        <Carousel variant="dark">
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={detail?.productImgs?.[0]}
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={detail?.productImgs?.[1]}
          alt="Second slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={detail?.productImgs?.[2]}
          alt="Third slide"
        />
      </Carousel.Item>
    </Carousel>
        </Col>
      </Row>
    </div>
  );
};

export default ProductsDetail;
