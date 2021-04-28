import { CompletedChallenges } from "../components/CompletedChallenges";
import { Countdown } from "../components/Countdown";
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from "../components/Profile";
import { ChallengeBox } from "../components/ChallengeBox";
import { CountdownProvider } from "../Contexts/CountdownContext";
import { ChallengesProvider } from '../Contexts/ChallengesContext';

import Head from "next/head";
import { GetServerSideProps } from "next";

import styles from "../styles/pages/Home.module.css";

interface HomeProps {
  level: number;
  currentExperience: number;
  challengesCompletedes: number;
}

export default function Home(props: HomeProps) {

  console.log(props)

  return (
    <ChallengesProvider 
      level = {props.level}
      currentExperience = {props.currentExperience}
      challengesCompletedes = {props.challengesCompletedes}>

      <div className={styles.container}>
        <Head>
          <title>Inicio | Moveit</title>
        </Head>

        <ExperienceBar />

        <CountdownProvider>
          <section>
            <div>
              <Profile />
              <CompletedChallenges />
              <Countdown />
            </div>
            <div>
              <ChallengeBox />
            </div>
          </section>
        </CountdownProvider>
      </div>
    </ChallengesProvider>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { level, currentExperience, challengesCompletedes } = ctx.req.cookies;

  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompletedes: Number(challengesCompletedes),
    },
  };
};
