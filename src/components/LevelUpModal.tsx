import { useContext } from 'react';
import { ChallengesContext } from '../Contexts/ChallengesContext';
import styles from '../styles/components/LevelUpModal.module.css'

export function LevelUpModal() {
    const { level, closeLevelUoModal } = useContext(ChallengesContext)

    return (
        <div className={styles.overlay}>
            <div className={styles.container}>
                <header> { level } </header>

                <strong> Parabéns </strong>
                <p> Você alcançou um novo level!</p>

                <button type="button" onClick={ closeLevelUoModal }>
                    <img src="/icons/close.svg" alt="Fechar"/>
                </button>
            </div>
        </div>
    );
}