import styles from "../../../styles/Home.module.css";
import { GetServerSideProps } from "next";
import { getDatabase } from "../../../src/utils/database";
import Layout from "../../../components/Layout";
import { Card, Button, Offcanvas } from "react-bootstrap";
import React from "react";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const data = await getDatabase();
  const games = await data
    .db("NextJSGameCatalogue")
    .collection("games")
    .find()
    .toArray();
  const gamesStringinfy = JSON.stringify(games);
  const gamesParse = JSON.parse(gamesStringinfy);
  const slug = await context.params?.game_slug;
  const gameDetails = gamesParse.filter((game: any) => slug === game.slug);

  return {
    props: {
      games: gamesParse,
      slug: slug,
      gameDetails: gameDetails[0],
    },
  };
};
type GameDetailsProps = {
  games: any;
  slug: string;
  gameDetails: any;
};
const GameDetails: React.FC<GameDetailsProps> = ({
  games,
  slug,
  gameDetails,
  ...props
}) => {
  const [show, setShow] = React.useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div className={styles.container}>
      <Layout>
        <main className={styles.main}>
          <Card.Title className="text-center"> {gameDetails.name} </Card.Title>
          <div className={styles.grid}>
            <>
              <a className={styles.card}>
                <Card className="text-center" style={{ width: "rem" }}>
                  <Card.Img
                    style={{ width: "12rem", height: "12rem" }}
                    src={gameDetails.cover.url}
                  />
                </Card>
                <Card.Title className="text-center">
                  {gameDetails.name} &rarr;
                </Card.Title>
                <Card.Text className=" text-center text-secondary">
                  {gameDetails.price} €
                </Card.Text>

                <>
                  <Button
                    variant="secondary"
                    onClick={handleShow}
                    className="me-2"
                  >
                    Add to cart
                  </Button>
                  <Offcanvas show={show} onHide={handleClose} {...props}>
                    <Offcanvas.Header closeButton>
                      <Offcanvas.Title>Cart</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                      {gameDetails.name} is added! <br /> Price:{" "}
                      {gameDetails.price} €
                    </Offcanvas.Body>
                  </Offcanvas>
                </>
                <Card.Text className="text-center ">
                  {gameDetails.summary}
                </Card.Text>
              </a>
            </>
          </div>
        </main>
      </Layout>
    </div>
  );
};

export default GameDetails;
