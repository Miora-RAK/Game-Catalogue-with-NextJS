import styles from "../../styles/Home.module.css";
import Layout from "../../components/Layout";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import Cart from "../../components/cart";
import { Table } from "react-bootstrap";

const CartList: React.FC = () => {
  return (
    <div className={styles.container}>
      <Layout>
        <main className={styles.main} style={{ padding: "2rem" }}>
          <h1 className={styles.title}>Mon panier</h1>
          <p className={styles.grid}> Listes</p>
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
              <Cart />
            </tbody>
          </Table>
        </main>
      </Layout>
    </div>
  );
};

export default CartList;
