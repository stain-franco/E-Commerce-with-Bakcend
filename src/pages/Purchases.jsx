import axios from "axios";
import { useEffect, useState } from "react";
import getConfig from "../helpers/getConfig";
import { useDispatch } from "react-redux";
import { setIsLoading } from "../store/slices/isLoading.slice";
import Table from 'react-bootstrap/Table';

export const Purchases = () => {

  const [purchases, setPurchases] = useState([])
  const dispatch = useDispatch();

  useEffect( () =>{
    dispatch(setIsLoading(true));
    axios
    .get("https://e-commerce-backend-uunu.onrender.com/purchases", getConfig())
    .then(resp => setPurchases(resp.data.data.purchases))
      
    .finally(() => dispatch(setIsLoading(false)));
  },[])

  return (
    <div>
        <h1>Purchases</h1>
        {
          purchases.map (item => {
            return item.cart.products.map( item => 
            <div key={item.title} className="container-purchases">
            <Table striped bordered hover>
            <thead>
              <tr>
                <th>total</th>
                <th>Name</th>
                <th>State</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{item.productsInCart.quantity}</td>
                <td>{item.title}</td>
                <td>{item.productsInCart.status}</td>
              </tr>
            </tbody>
          </Table>
          </div>
            )
          })
        }
    </div>
  )
}

export default Purchases;