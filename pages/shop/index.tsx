import Panier from "../../components/Panier";
import styles from "../../styles/Home.module.css";
import { GetServerSideProps } from "next";
import { getDatabase } from "../../src/utils/database";
import { Card } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cart.slice";
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

  return {
    props: {
      games: gamesParse,
    },
  };
};
type GamesProps = {
  games: any;
};
const ShopPage: React.FC<GamesProps> = ({ games }) => {
  const dispatch = useDispatch();
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>ALL RESULTS</h1>
        <div className="row" style={{ paddingLeft: "1.5rem" }}>
          {games.map((game: any, index: any) => {
            return (
              <>
                <div className={styles.container}>
                  <h4 className={styles.title}>{game.name}</h4>
                  <p>$ {game.price}</p>
                  <button
                    onClick={() => dispatch(addToCart(game.name))}
                    className={styles.button}
                  >
                    Add to Cart
                  </button>{" "}
                  <button
                    onClick={() => dispatch(addToCart(games.name))}
                    className={styles.button}
                  >
                    Add to Cart
                  </button>{" "}
                </div>
              </>
            );
          })}
        </div>
      </main>
    </div>
    // <div className={styles.container}>
    //   <h1 className={styles.title}>All Results</h1>

    //   {games.map((game: any, index: any) => {
    // <Panier cartId={game.id} removeCart={game} />;

    // <div className={styles.container}>
    /* <Card.Img src={game.cover.url} height={300} width={220} />
          <h4 className={styles.title}>{game.name}</h4>

          <p>$ {game.price}</p>
          <button
            onClick={() => dispatch(addToCart(games))}
            className={styles.button}
          >
            Add to Cart
          </button> */

    /* <button
            onClick={() => dispatch(addToCart(games))}
            className={styles.button}
          >
            Add to Cart
          </button> */
    //     </div>;
    //   })}
    // </div>
  );
};

export default ShopPage;
