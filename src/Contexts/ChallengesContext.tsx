import { createContext, ReactNode, useState } from "react"
import challenges from "../../challenges.json"

export const ChallengesContext = createContext({} as ChallengesContexData);

interface ChallengesProviderProps {
    children: ReactNode
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
}

export function ChallengesProvider ({ children }: ChallengesProviderProps) {
    const [level, setLevel] = useState(1);
    const [currentExperience, setCurrentExperience] = useState(0);
    const [challengesCompletedes, setChallengesCompletedes] = useState(0);
    const [activeChallenge, setActiveChallenge] = useState(null);

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

    function levelUp() {
      setLevel(level + 1)
    }

    function startNewChallege() {
        const randomChallengeIndex = Math.floor( Math.random() * challenges.length )
        const challenge = challenges[randomChallengeIndex];

        setActiveChallenge(challenge)
    }

    function resetChallenge() {
        setActiveChallenge(null)
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
            resetChallenge
        }}>
            {children}
        </ChallengesContext.Provider>
    )
}