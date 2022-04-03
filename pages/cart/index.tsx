import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import {
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
} from "../../redux/cart.slice";
import styles from "../../styles/Home.module.css";
import { Card } from "react-bootstrap";

const CartPage = () => {
  const cart = useSelector((state: any) => state.cart);
  const dispatch = useDispatch();

  const getTotalPrice = () => {
    return cart.reduce(
      (accumulator: any, game: any) => accumulator + game.quantity * game.price,
      0
    );
  };

  return (
    <div className={styles.container}>
      {cart.length === 0 ? (
        <h1>Your Cart is Empty!</h1>
      ) : (
        <>
          <div className={styles.header}>
            <div>Image</div>
            <div>Product</div>
            <div>Price</div>
            <div>Quantity</div>
            <div>Actions</div>
            <div>Total Price</div>
          </div>
          {cart.map((game: any, index: any) => (
            <div className={styles.body} key={index}>
              <div className={styles.image}>
                <Card.Img src={game.cover} height="90" width="65" />
              </div>
              <p>{game.name}</p>
              <p>$ {game.price}</p>
              <p>{game.quantity}</p>
              <div className={styles.buttons}>
                <button onClick={() => dispatch(incrementQuantity(game.name))}>
                  +
                </button>
                <button onClick={() => dispatch(decrementQuantity(game.name))}>
                  -
                </button>
                <button onClick={() => dispatch(removeFromCart(game.name))}>
                  x
                </button>
              </div>
              <p>$ {game.quantity * game.price}</p>
            </div>
          ))}
          <h2>Grand Total: $ {getTotalPrice()}</h2>
        </>
      )}
    </div>
  );
};

export default CartPage;
