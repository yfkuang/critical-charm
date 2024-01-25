import React, { createContext, useState, useContext } from 'react'

export const Classes = [
    "Barbarian",
    "Bard",
    "Cleric",
    "Druid",
    "Fighter",
    "Monk",
    "Paladin",
    "Ranger",
    "Rogue",
    "Sorcerer",
    "Warlock",
    "Wizard",
    "Artificer"
]

export const Races = [
    "Dragonborn",
    "Dwarf",
    "Wood Elf",
    "High Elf",
    "Gnome",
    "Half-Elf",
    "Halfling",
    "Orc",
    "Half-Orc",
    "Human",
    "Tiefling",
    "Goblin",
    "Aarakocra",
    "Aasimar",
    "Centaur",
    "Drow",
    "Goliath",
    "Firbolg",
    "Hobgoblin",
    "Kobold",
    "Minotaur",
    "Satyr",
    "Tabaxi",
]

export const Styles = [
    "is sarcastic",
    "is laconic",
    "is flirty",
    "is immature",
    "is formatted in 2016 memes",
    "is witty",
    "is dry",
    "is boring",
    "is patronizing",
    "is condescending",
    "is dismissive",
    "is anxious",
    "is archaic",
    "is verbose",
    "is flowery",
    "is self-indulgent",
    "is narcissistic",
    "is arrogant",
    "is prideful",
    "does not use punctuation or capitalization",
    "is formatted in 1337-speak",
    "is like a fuccboi",
    "is desperate",
    "is random",
    "is amnesiac",
    "is spiritual",
    "is philosophical",
    "is existential",
    "is suffering from existential dread",
    "is flamboyant",
    "is obnoxious",
    "is like a youtuber",
    "is like an instagram vlogger",
    "is formatted in rhymes",
    "is like an Irish drunk",
    "is like a tiktoker",
    "is lovecraftian",
    "is paranoid",
    "is distrustful",
    "is cryptic",
    "is nebulous",
    "is like an incel",
    "is like an edgelord",
    "is formatted as a 4chan greentext (with >)",
    "is like a 4chan user",
    "is desperately horny",
    "is like a redditor"
]

export const sessionContext = createContext({
    sessionState: {},
    questions: {},
    init: () => {},
    setsessionState: () => {},
})

export function usesession() {
    return useContext(sessionContext)
}

export function sessionProvider(props) {
    const [sessionState, setsessionState] = useState([])
    const [questions, setQuestions] = useState([])

    const init = () => {
        Questions.forEach((question, key) => {
            setsessionState(sessionState => [...sessionState, [key, false]])
            setQuestions(questions => [...questions, question])
        })
    }

    return (
        <sessionContext.Provider value={{sessionState: sessionState, questions: questions, setsessionState: setsessionState, init: init}}>
            {props.children}
        </sessionContext.Provider>
    )
}