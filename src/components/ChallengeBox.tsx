import { useContext } from 'react'
import { ChallengesContext } from '../Contexts/ChallengesContext'
import styles from '../styles/components/ChallengeBox.module.css'

export function ChallengeBox() {
    const { activeChallenge, resetChallenge } = useContext(ChallengesContext)

    const contextData = useContext(ChallengesContext)

    console.log( contextData )

    return (
        <div className={ styles.challengeBoxContainer } >
            { activeChallenge ? (
                <div className={styles.challengeActive}>
                    <header> Ganhe { activeChallenge.amount } XP</header>

                    <main>
                        <img src={ `icons/${ activeChallenge.type }.svg` } alt="Body"/>
                        <strong> Novo desafio!</strong>
                        <p> { activeChallenge.description }</p>
                    </main>

                    <footer>
                        <button 
                            type="button" 
                            className={styles.challengeSucceededButton}> 
                            Completei 
                        </button>

                        <button 
                            type="button" 
                            className={styles.challengeFailedButton}
                            onClick={resetChallenge}> 
                            Falhei 
                        </button>
                    </footer>

                </div>
            ) : (
                <div className={styles.challengeNotActive}>
                    <strong> Finalize um ciclo para subir de nível </strong>
                    <p>
                        <img src="icons/level-up.svg" alt="Level Up"/>
                        Avance seu level completando desafios
                    </p>
                </div>
            )}

        </div>
    )
}