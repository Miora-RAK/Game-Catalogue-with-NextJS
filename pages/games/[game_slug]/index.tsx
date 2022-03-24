import Head from "next/head";
import styles from "../../../styles/Home.module.css";
import { GetServerSideProps } from "next";
import { getDatabase } from "../../../src/utils/database";
import Layout from "../../../components/Layout";
import { Card, Button } from "react-bootstrap";

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
                  <a className={styles.card}>
                    <Card
                      className="text-center"
                      style={{ width: "12rem" }}
                      key={`${index}-12`}
                    >
                      <Card.Img
                        style={{ width: "12rem", height: "12rem" }}
                        src={game.cover.url}
                        key={`${index}-Img`}
                      />
                    </Card>
                    <Card.Title className="text-center" key={index}>
                      {game.name} &rarr;
                    </Card.Title>
                    <Card.Text
                      className=" text-center text-secondary"
                      key={`${index}-text`}
                    >
                      {game.price} €
                    </Card.Text>
                    <Button
                      variant="secondary "
                      className=" text-center "
                      key={`${index}-button`}
                    >
                      Add to cart
                    </Button>
                    <Card.Text
                      className="text-center "
                      key={`${index}-summary`}
                    >
                      {game.summary}
                    </Card.Text>
                  </a>
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
