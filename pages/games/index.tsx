import styles from "../../styles/Home.module.css";
import { GetServerSideProps } from "next";
import { getDatabase } from "../../src/utils/database";
import Link from "next/link";
import Layout from "../../components/Layout";
import { Card } from "react-bootstrap";

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
type GamesProps = {
  games: any;
};
const Games: React.FC<GamesProps> = ({ games }) => {
  return (
    <div className={styles.container}>
      <Layout>
        <main className={styles.main}>
          <h1 className={styles.title}>ALL GAMES</h1>
          <div className="row" style={{ paddingLeft: "1.5rem" }}>
            {games.map((game: any, index: any) => {
              return (
                <Link href={`/games/${[game.slug]}`} key={index}>
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
              );
            })}
          </div>
        </main>
      </Layout>
    </div>
  );
};

export default Games;
