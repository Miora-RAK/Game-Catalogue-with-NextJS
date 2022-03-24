import styles from "../../styles/Home.module.css";
import Layout from "../../components/Layout";
import { useUser } from "@auth0/nextjs-auth0";

const Profile = () => {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    user && (
      <div className={styles.container}>
        <Layout>
          <main className={styles.main}>
            {/* <img src={user.picture} alt={user.name} /> */}
            <h2 className={styles.grid}>{user.name}</h2>
            <p className={styles.grid}>{user.email}</p>
          </main>
        </Layout>
      </div>
    )
  );
};
export default Profile;
