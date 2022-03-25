import React from "react";
import styles from "../styles/Home.module.css";
import { useUser } from "@auth0/nextjs-auth0";
import { Button, Card } from "react-bootstrap";

type CartProps = {
  cartId: string;
  removeCart: (createdAt: string) => void;
};

const Cart: React.FC<CartProps> = ({ cartId, removeCart }) => {
  //usestate quantity
  const prix = 10;
  const [quantity, setQuantity] = React.useState(0);
  //usestate price
  const [price, setPrice] = React.useState(prix);
  const addQuantity = (): void => {
    setQuantity((number) => number + 1);
    setPrice((number) => number + number);
  };
  const removeQuantity = (): void => {
    setQuantity((number) => (number !== 0 ? number - 1 : 0));
    setPrice((number) => number - prix);
  };

  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <>
      <tr>
        <td className="text-center">
          <Card.Img src="/favicon.ico" style={{ width: "8rem" }}></Card.Img>
        </td>
        <td className="text-center">Product name</td>
        <td className="text-center">Prix</td>
        <td className="text-center">{quantity}</td>
        <td className="text-center">
          <Button variant="outline-dark" value="-" onClick={removeQuantity}>
            -
          </Button>
          <span>{quantity}</span>
          <Button variant="outline-dark" value="+" onClick={addQuantity}>
            +
          </Button>
        </td>

        <td className="text-center">Total Price: {price}</td>
        <td className="text-center">
          <Button
            variant="outline-dark"
            onClick={(): void => removeCart(cartId)}
          >
            Delete
          </Button>
        </td>
      </tr>
    </>
  );
};
export default Cart;
