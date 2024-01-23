import React, { createContext, useState, useContext } from 'react'

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

export const AnswerContext = createContext({
    answerState: {},
    questions: {},
    init: () => {},
    setAnswerState: () => {},
})

export function useAnswer() {
    return useContext(AnswerContext)
}

export function AnswerProvider(props) {
    const [answerState, setAnswerState] = useState([])
    const [questions, setQuestions] = useState([])

    const init = () => {
        Questions.forEach((question, key) => {
            setAnswerState(answerState => [...answerState, [key, false]])
            setQuestions(questions => [...questions, question])
        })
    }

    return (
        <AnswerContext.Provider value={{answerState: answerState, questions: questions, setAnswerState: setAnswerState, init: init}}>
            {props.children}
        </AnswerContext.Provider>
    )
}