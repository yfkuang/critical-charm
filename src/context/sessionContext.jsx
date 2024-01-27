import React, { createContext, useState, useContext, useEffect } from 'react'
import { useOpenAI } from './openAIContext'

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

export const Gender = [
    "Male",
    "Female",
    "Non-binary",
    "Undefined Gender"
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

export const Photography = [
    "selfie",
    "portrait",
    "portrait selfie",
    "landscape",
    "landscape selfie",
    "headshot",
    "sports photography",
    "lifestyle photography",
    "still life photography",
    "fashion photography"
]

export class Match {
    constructor(race, charClass, gender, style1, style2) {
        this.race = race 
        this.charClass = charClass
        this.gender = gender
        this.style1 = style1
        this.style2 = style2
        this.attributes = {
            "str" : Math.floor((Math.random() * 20) + 1),
            "dex" : Math.floor((Math.random() * 20) + 1),
            "con" : Math.floor((Math.random() * 20) + 1),
            "int" : Math.floor((Math.random() * 20) + 1),
            "wis" : Math.floor((Math.random() * 20) + 1),
            "cha" : Math.floor((Math.random() * 20) + 1) 
        }
    }

    async getName(openAI) {
        try {
            const completion = await openAI.chat.completions.create({
                messages: [{
                    role: "system",
                    content: `Generate a name for an adventurer with the following characteristics for the purpose of a bio on an app to match with other adventurers:
                    - Race: ` + this.race + `;
                    - Sex: ` + this.gender + `;
                    - Class: ` + this.charClass + `;
                    And the following attributes with values ranging from 1 (useless) to 20 (master):
                    - Strength: ` + this.attributes['str'] + `;
                    - Dexterity: ` + this.attributes['dex'] + `;
                    - Constitution: ` + this.attributes['con'] + `;
                    - Intelligence: ` + this.attributes['int'] + `;
                    - Wisdom: ` + this.attributes['wis'] + `;
                    - Charisma: ` + this.attributes['cha']
                }],
                model: "gpt-3.5-turbo",
                max_tokens: 50
            });

            return JSON.stringify(completion.choices[0]['message']['content']).substring(1,JSON.stringify(completion.choices[0]['message']['content']).length - 1).replace('Name: ', '')
        } catch (error) {
            console.log(error)
            return "Error generating match name"
        }
    }

    async getBio(openAI) {
        try {
            const completion = await openAI.chat.completions.create({
                messages: [{
                    role: "system",
                    content: `In paragraphs of 20 words or less, write 3 paragraphs in first-person and in a style that ` + this.style1 + ` and that ` + this.style2 + ` for an adventurer with the following characteristics for the purpose of a bio on an app to match with other adventurers:
                    - Race: ` + this.race + `;
                    - Sex: ` + this.gender + `;
                    - Class: ` + this.charClass + `;
                    And the following attributes with values ranging from 1 (useless) to 20 (master):
                    - Strength: ` + this.attributes['str'] + `;
                    - Dexterity: ` + this.attributes['dex'] + `;
                    - Constitution: ` + this.attributes['con'] + `;
                    - Intelligence: ` + this.attributes['int'] + `;
                    - Wisdom: ` + this.attributes['wis'] + `;
                    - Charisma: ` + this.attributes['cha'] + `.
                    Neither the attribute or the value can be explicitly stated. Use different attributes for each paragraph.`
                }],
                model: "gpt-3.5-turbo"
            });

            return JSON.stringify(completion.choices[0]['message']['content']).substring(1,JSON.stringify(completion.choices[0]['message']['content']).length - 1).split(/\\n\\n/)
        } catch (error) {
            console.log(error)
            return ["Error generating match bio", "Error generating match bio", "Error generating match bio"]
        }
    }

    async getImages(openAI) {
        //Dall-E

        // try {
        //     const image = await openAI.images.generate({
        //         model: "dall-e-3",
        //         prompt: `Fantasy ` + Photography[Math.floor(Math.random() * Photography.length)] + ` shot of a ` + this.gender + ` ` + this.race + ` ` + this.charClass + ` adventurer`
        //     });
    
        //     console.log(image.data)
        // } catch (error) {
        //     console.log(error)
        //     return ["Error generating image", "Error generating image", "Error generating image"]
        // }
        
        //Midjourney
    }
}

export const sessionContext = createContext({
    matches: {},
    generateProfile: () => {},
})

export function useSession() {
    return useContext(sessionContext)
}

export function SessionProvider(props) {
    const { openAI } = useOpenAI()
    const [matches, setMatches] = useState([])

    const generateProfile = () => {
        const match = new Match(
            Races[Math.floor(Math.random() * Races.length)],
            Classes[Math.floor(Math.random() * Classes.length)],
            Gender[Math.floor(Math.random() * Gender.length)],
            Styles[Math.floor(Math.random() * Styles.length)],
            Styles[Math.floor(Math.random() * Styles.length)]
        )
        
        Promise.all([match.getName(openAI), match.getBio(openAI)]).then((results) => {
            match.name = results[0]
            match.bio = results[1]
            
            match.getImages(openAI).then((result) => {
                match.images = result

                console.log(match);
            }).catch(console.error)

        }).catch(console.error)
        
    }

    return (
        <sessionContext.Provider value={{matches: matches, generateProfile: generateProfile}}>
            {props.children}
        </sessionContext.Provider>
    )
}