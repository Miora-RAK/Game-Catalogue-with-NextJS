import type { NextPage } from "next";
import Head from "next/head";
import Layout from "../components/Layout";
import styles from "../styles/Home.module.css";
import { GetServerSideProps } from "next";
import { getDatabase } from "../src/utils/database";
import { Card } from "react-bootstrap";
import Link from "next/link";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const data = await getDatabase();
  const games = await data
    .db("NextJSGameCatalogue")
    .collection("games")
    .find()
    .toArray();
  const gamesStringinfy = JSON.stringify(games);
  const gamesParse = JSON.parse(gamesStringinfy);
  console.log(gamesParse);
  const gamesOfTheMoment = gamesParse.slice(0, 5);
  const bestSellers = gamesParse.slice(15, 26);

  return {
    props: {
      games: gamesParse,
      gamesOfTheMoment: gamesOfTheMoment,
      bestSellers: bestSellers,
    },
  };
};
type GamesProps = {
  games: any;
  gamesOfTheMoment: any;
  bestSellers: any;
};

const Home: React.FC<GamesProps> = ({
  games,
  gamesOfTheMoment,
  bestSellers,
}) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Game CAtalogue</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <main className={styles.main}>
          <h1 className={styles.title}>Welcome to Next Game Catalogue!</h1>
          <div> Jeux du moments</div>
          <div className="row">
            {gamesOfTheMoment.map((game: any, index: any) => {
              return (
                <>
                  <Link href={`/games/${game.slug}`} key={index}>
                    <a className={styles.card}>
                      <Card style={{ width: "12rem" }} key={index}>
                        <Card.Img
                          style={{ width: "12rem", height: "12rem" }}
                          src={game.cover.url}
                        />
                      </Card>
                      <Card.Title className="text-center">
                        {game.name} &rarr;
                      </Card.Title>
                      <Card.Text className="text-center text-secondary">
                        {game.price} €
                      </Card.Text>
                    </a>
                  </Link>
                </>
              );
            })}
          </div>
          <div> Meilleures ventes </div>
          <div className="row">
            {bestSellers.map((game: any, index: any) => {
              return (
                <>
                  <Link href={`/games/${game.slug}`} key={index}>
                    <a className={styles.card}>
                      <Card style={{ width: "12rem" }} key={index}>
                        <Card.Img
                          style={{ width: "12rem", height: "12rem" }}
                          src={game.cover.url}
                        />
                      </Card>
                      <Card.Title className="text-center">
                        {game.name} &rarr;
                      </Card.Title>
                      <Card.Text className="text-center text-secondary">
                        {game.price} €
                      </Card.Text>
                    </a>
                  </Link>
                </>
              );
            })}
          </div>
        </main>
      </Layout>
    </div>
  );
};

export default Home;
