import styles from "../../styles/Home.module.css";
import Layout from "../../components/Layout";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import Cart from "../../components/cart";
import { Table } from "react-bootstrap";
import React from "react";
import { v4 as uuidv4 } from "uuid";

const CartList: React.FC = () => {
  const cart: string[] = [];
  const [addCart, setAddCart] = React.useState<string[]>(cart);
  const reset = (createdAt: string): void => {
    return setAddCart(addCart.filter((element) => element !== createdAt));
  };
  const goCart = (): void => {
    const idTimer = uuidv4();
    setAddCart(() => {
      return [...addCart, idTimer];
    });
  };
  return (
    <div className={styles.container}>
      <Layout>
        <main className={styles.main} style={{ padding: "2rem" }}>
          <h1 className={styles.title}>Mon panier</h1>
          <p className={styles.grid}> Listes</p>
          <button className="btn btn-secondary" onClick={goCart}>
            Add a game
          </button>
          <Table striped bordered hover size="sm" style={{ padding: "3rem" }}>
            <thead>
              <tr>
                <th>IMAGE</th>
                <th>PRODUITS</th>
                <th>PRIX</th>
                <th>QUANTITÉ</th>
                <th>ACTIONS</th>
                <th>PRIX TOTAL</th>
              </tr>
            </thead>
            <tbody>
              {addCart.map((cartList) => {
                return (
                  <Cart key={cartList} cartId={cartList} removeCart={reset} />
                );
              })}
            </tbody>
          </Table>
        </main>
      </Layout>
    </div>
  );
};

export default CartList;
