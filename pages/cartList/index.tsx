import styles from "../../styles/Home.module.css";
import Layout from "../../components/Layout";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import Panier from "../../components/Panier";
import { Table } from "react-bootstrap";
import React from "react";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@auth0/nextjs-auth0";

const CartList: React.FC = () => {
  const panier: string[] = [];
  const [addCart, setAddCart] = React.useState<string[]>(panier);
  const reset = (createdAt: string): void => {
    return setAddCart(addCart.filter((element) => element !== createdAt));
  };
  const goCart = (): void => {
    const idCart = uuidv4();
    setAddCart(() => {
      return [...addCart, idCart];
    });
  };
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
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
            {!isLoading &&
              (user ? (
                <tbody>
                  {addCart.map((cartList) => {
                    return (
                      <>
                        <Panier
                          key={cartList}
                          cartId={cartList}
                          removeCart={reset}
                        />
                        <h2 className={styles.grid}>{user.name}</h2>
                      </>
                    );
                  })}
                </tbody>
              ) : (
                <p>hello</p>
              ))}
          </Table>
        </main>
      </Layout>
    </div>
  );
};

export default CartList;
export const getServerSideProps = withPageAuthRequired();
