import styles from "../../styles/Home.module.css";
import Layout from "../../components/Layout";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { GetServerSideProps } from "next";

const Private = () => {
  return (
    <div className={styles.container}>
      <Layout>
        <main className={styles.main}>
          <h1 className={styles.title}>Welcome to the private page!</h1>
        </main>
      </Layout>
    </div>
  );
};
export default Private;
export const getServerSideProps = withPageAuthRequired();
