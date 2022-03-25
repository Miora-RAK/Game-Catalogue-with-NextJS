import styles from "../../styles/Home.module.css";
import Layout from "../../components/Layout";
import { useUser } from "@auth0/nextjs-auth0";
import { Card } from "react-bootstrap";

const Profile = () => {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    user && (
      <div className={styles.container}>
        <Layout>
          <main className={styles.main}>
            <div className={styles.description}>
              <Card.Img
                className={styles.profilePhoto}
                src={!isLoading && user && `${user.picture}`}
                alt={!isLoading && user && `${user.name} `}
              />
              <p className="text-center"> Modifier </p>
            </div>
            <p className={styles.grid}>
              <strong>Name :</strong> {user.nickname}
            </p>
            <p className={styles.grid}>
              <strong>E-mail:</strong> {user.email}
            </p>
            {/* <pre>{JSON.stringify(user, null, 2)}</pre> */}
          </main>
        </Layout>
      </div>
    )
  );
};
export default Profile;
