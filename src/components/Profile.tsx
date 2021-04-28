import { useContext } from "react";
import { ChallengesContext } from "../Contexts/ChallengesContext";
import styles from "../styles/components/Profile.module.css";

export function Profile() {
  const { level } = useContext(ChallengesContext)

  return (
    <div className={styles.profileContainer}>
      <img src="https://github.com/hfbatista.png" alt="Henrique Batista" />
      <div>
        <strong> Henrique Batista </strong>
        <p>
          <img src="icons/level.svg" alt="level"/>
          Level { level }
        </p>
      </div>
    </div>
  );
}
