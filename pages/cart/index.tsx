import styles from "../../styles/Home.module.css";
import Layout from "../../components/Layout";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

const Cart: React.FC = () => {
  return (
    <div className={styles.container}>
      <Layout>
        <main className={styles.main}>
          <h1 className={styles.title}>Mon panier</h1>
          <p className={styles.grid}> Listes</p>
        </main>
      </Layout>
    </div>
  );
};

export default Cart;
