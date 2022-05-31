import Head from "next/head";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

import Card from "../components/card/Card";

import data from "./api/data.json";

import styles from "../styles/Home.module.scss";

const Home = ({ messagesData }) => {
  const [messages, setMessages] = useState(messagesData.Entries.Entry);
  const [filterValue, setFilterValue] = useState("");
  const [filteredMessages, setFilteredMessages] = useState(messages);

  const Map = dynamic(() => import("../components/map/Map"), {
    loading: () => <p style={{ textAlign: "center" }}>Loading...</p>,
    ssr: false,
  });

  useEffect(() => {
    const updatedFilteredMessages = messages.filter((message) =>
      message.sentiment.toLowerCase().includes(filterValue)
    );
    setFilteredMessages(updatedFilteredMessages);
  }, [filterValue, messages]);

  const filterHandler = (event) => {
    setFilterValue(event.target.value);
  };

  const resetHandler = () => {
    setFilterValue("");
  };

  return (
    <div>
      <Head>
        <title>Messages</title>
        <meta name="description" content="Map Visual App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <section className={styles.sideContainer}>
          <h1 className={styles.title}>Messages</h1>

          <div className={styles.actions}>
            <div className={styles.filter}>
              <p>Filter Messages:</p>
              <select onChange={filterHandler} defaultValue="">
                <option value="neutral">Neutral</option>
                <option value="positive">Positive</option>
                <option value="negative">Negative</option>
              </select>
            </div>

            <button onClick={resetHandler} className={styles.button}>
              Reset
            </button>
          </div>

          <div className={styles.messageContainer}>
            {filteredMessages.map((filteredMessage) => (
              <Card
                key={filteredMessage.message}
                messageEntry={filteredMessage}
              >
                {filteredMessage.message}
              </Card>
            ))}
          </div>
        </section>
        <section className={styles.mapContainer}>
          <Map messages={filteredMessages} />
        </section>
      </main>
    </div>
  );
};

export const getStaticProps = async () => {
  return {
    props: {
      messagesData: data,
    },
    revalidate: 10,
  };
};

export default Home;
