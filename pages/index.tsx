import type { NextPage } from "next";
import Head from "next/head";
import Layout from "../components/Layout";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <main className={styles.main}>
          <h1 className={styles.title}>Welcome to Next Game Catalogue!</h1>

          <div className={styles.grid}>
            <a href="#" className={styles.card}>
              <h2>Game &rarr;</h2>
              <p>Game</p>
            </a>
          </div>
        </main>
      </Layout>
    </div>
  );
};

export default Home;