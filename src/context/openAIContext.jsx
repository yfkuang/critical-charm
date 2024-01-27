import React, { createContext, useContext, useEffect } from 'react'
import OpenAI from 'openai'
import Midjourney from "midjourney-discord-api";

export const openAIContext = createContext({
    openAI: {}
})

export function useOpenAI() {
    return useContext(openAIContext)
}

export function OpenAIProvider(props) {
    const openAI = new OpenAI({apiKey: process.env.REACT_APP_OPENAI_API_KEY, dangerouslyAllowBrowser: true})

    return (
        <openAIContext.Provider value={{openAI: openAI}}>
            {props.children}
        </openAIContext.Provider>
    )
}