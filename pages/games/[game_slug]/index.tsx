import Head from "next/head";
import styles from "../../../styles/Home.module.css";
import { GetServerSideProps } from "next";
import { getDatabase } from "../../../src/utils/database";
import Layout from "../../../components/Layout";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const data = await getDatabase();
  const games = await data
    .db("NextJSGameCatalogue")
    .collection("games")
    .find()
    .toArray();
  const gamesStringinfy = JSON.stringify(games);
  const gamesParse = JSON.parse(gamesStringinfy);

  return {
    props: {
      games: gamesParse,
    },
  };
};
type GameDetailsProps = {
  games: any;
};
const GameDetails: React.FC<GameDetailsProps> = ({ games }) => {
  return (
    <div className={styles.container}>
      <Layout>
        <main className={styles.main}>
          <h1 className={styles.title}>Game details</h1>
          <div className={styles.grid}>
            {games.map((game: any, index: any) => {
              return (
                <>
                  <h2 key={index} className={styles.card}>
                    {game.summary} &rarr;
                  </h2>
                </>
              );
            })}
          </div>
        </main>
      </Layout>
    </div>
  );
};

export default GameDetails;
