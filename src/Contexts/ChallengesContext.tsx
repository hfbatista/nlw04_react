import { createContext, ReactNode, useEffect, useState } from "react"
import challenges from "../../challenges.json"
import Cookies from "js-cookie"

import { LevelUpModal } from "../components/LevelUpModal";

export const ChallengesContext = createContext({} as ChallengesContexData);

interface ChallengesProviderProps {
    children: ReactNode;
    level: number;
    currentExperience: number;
    challengesCompletedes: number;
}

interface Challenge {
    type: 'body' | 'eye';
    description: string;
    amount: number;
}

interface ChallengesContexData {
    level: number;
    currentExperience: number; 
    challengesCompletedes: number;
    experienceToNextLevel: number;
    activeChallenge: Challenge;
    levelUp: () => void;
    startNewChallege: () => void;
    resetChallenge: () => void;
    completeChallenge: () => void;
    closeLevelUoModal: () => void;
}

export function ChallengesProvider ({ children, ...rest }: ChallengesProviderProps) {
    const [level, setLevel] = useState(rest.level ?? 1);
    const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
    const [challengesCompletedes, setChallengesCompletedes] = useState(rest.challengesCompletedes ?? 0);
    const [activeChallenge, setActiveChallenge] = useState(null);
    const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

    useEffect(() => {
        Notification.requestPermission()
    }, [])

    useEffect(() => {
        Cookies.set('level', String(level));
        Cookies.set('currentExperience', String(currentExperience));
        Cookies.set('challengesCompletedes', String(challengesCompletedes));
    }, [level, currentExperience, challengesCompletedes])

    function levelUp() {
      setLevel(level + 1)
      setIsLevelUpModalOpen(true)
    }

    function startNewChallege() {
        const randomChallengeIndex = Math.floor( Math.random() * challenges.length )
        const challenge = challenges[randomChallengeIndex];

        setActiveChallenge(challenge)

        new Audio('/notification.mp3').play()

        if(Notification.permission == 'granted') {
            new Notification('Novo desafio', {
                body: `Valendo ${challenge.amount} XP`,
                image: ""
            })
        }
    }

    function resetChallenge() {
        setActiveChallenge(null)
    }

    function completeChallenge() {
        if (!activeChallenge) {
            return
        }

        const { amount } = activeChallenge
        let finalExperience = currentExperience + amount 

        if (finalExperience >= experienceToNextLevel) {
            finalExperience -= experienceToNextLevel
            levelUp()
        }

        setCurrentExperience(finalExperience)
        setActiveChallenge(null)
        setChallengesCompletedes(challengesCompletedes + 1)
    }

    function closeLevelUoModal() {
        setIsLevelUpModalOpen(false)
    }

    return (
        <ChallengesContext.Provider value={{ 
            level, 
            currentExperience, 
            challengesCompletedes,
            experienceToNextLevel,
            activeChallenge,
            levelUp,
            startNewChallege,
            resetChallenge,
            completeChallenge,
            closeLevelUoModal
        }}>
            {children}
            { isLevelUpModalOpen && <LevelUpModal/> }
        </ChallengesContext.Provider>
    )
}