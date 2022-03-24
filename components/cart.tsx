import React from "react";
import styles from "../styles/Home.module.css";
import { useUser } from "@auth0/nextjs-auth0";
import Layout from "./Layout";

const Cart: React.FC = ({ children }) => {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  return (
    <>
      <tr>
        <td>Image</td>
        <td>Product name</td>
        <td>Price</td>
        <td>Quantity</td>
        <td>Actions</td>
        <td>Total Price</td>
      </tr>
    </>
  );
};
export default Cart;
