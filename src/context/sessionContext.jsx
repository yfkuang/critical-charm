import React, { createContext, useState, useContext, useEffect } from 'react'
import { useOpenAI } from './openAIContext'

const enableOpenAI = true
const enableMidjourney = true
const startGenerationCount = 4 //default is 10

export const QuestLines = [
    "Embark on a perilous journey to defeat a fearsome dragon terrorizing a nearby kingdom.",
    "Locate and recover a valuable or powerful artifact stolen from a sacred temple or royal treasury.",
    "Save a kidnapped noble, ally, or loved one from the clutches of a notorious bandit or villain.",
    "Navigate through a mysterious and dangerous forest to uncover hidden secrets, treasures, or ancient ruins.",
    "Suppress a goblin rebellion that threatens a peaceful village or town.",
    "Safeguard a caravan carrying precious cargo through treacherous lands infested with bandits and monsters.",
    "Seek out and answer the riddles posed by a mythical creature to gain access to its lair and treasures.",
    "Investigate and rid a haunted mansion of malevolent spirits and supernatural entities.",
    "Discover a rare herb or magical remedy to cure a deadly plague affecting a population.",
    "Protect the borderlands from invading orc hordes, ensuring the safety of nearby settlements.",
    "Track down a missing heir to the throne who holds the key to preventing a kingdom from falling into chaos.",
    "Lift a curse afflicting a village, transforming its inhabitants or causing other calamities.",
    "Mediate between warring factions or tribes to establish peace and prevent further bloodshed.",
    "Recover stolen cattle or livestock that are crucial to the livelihood of a farming community.",
    "Carry an urgent message or important information across dangerous territories to a distant ally or faction.",
    "Infiltrate and investigate a mysterious cult that poses a threat to the stability of the region.",
    "Provide security for a royal procession traveling through dangerous territories.",
    "Track and eliminate a dangerous werewolf terrorizing a village during the full moon.",
    "Identify and expose a traitor within the ranks who threatens the security of a kingdom or organization.",
    "Conquer a tower filled with challenging puzzles, traps, and guardians to prove one's worth and gain rewards."
]

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
    "is like a reddit troll"
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

export const Activities = [
    "hiking the countryside",
    "fighting a monster",
    "fighting the undead",
    "drinking in a tavern",
    "exploring a dungeon",
    "exploring ruins",
    "in a medieval town market",
    "by a river",
    "practicing magic",
    "packing equipment",
    "in a medieval weapons shop",
    "finding treasure",
    "finding a tomb",
    "practicing potion-making"
]

export const Attributes = [
    "str",
    "dex",
    "con",
    "int",
    "wis",
    "cha"
]

export class Quest {
    constructor() {
        //Set Attributes
        let attribute1 = Attributes[Math.floor(Math.random() * Attributes.length)]
        let attribute2
        let attribute3
        do {
            attribute2 = Attributes[Math.floor(Math.random() * Attributes.length)]
        } while (attribute2 == attribute1)
        do {
            attribute3 = Attributes[Math.floor(Math.random() * Attributes.length)]
        } while (attribute3 == attribute1 || attribute3 == attribute2)

        this.requirements = {
            "attribute1": attribute1,
            "value1": Math.floor((Math.random() * 14) + 1),
            "attribute2": attribute2,
            "value2": Math.floor((Math.random() * 14) + 1),
            "attribute3": attribute3,
            "value3": Math.floor((Math.random() * 14) + 1),
        }

        this.description = []
    }

    async getQuest(openAI) {
        if(enableOpenAI == true) {
            try {
                const completion = await openAI.chat.completions.create({
                    messages: [{
                        role: "system",
                        content: `You are the head of the adventuring guild. In paragraphs of 20 words or less, write an introductory paragraph addressing the reader, an adventurer, regarding their quest to ` + QuestLines[Math.floor(Math.random() * QuestLines.length)] + ` and 3 additional paragraphs describing the tasks to complete the task with the following requirements with values ranging from 1 (useless) to 20 (master):
                        - ` + this.requirements['attribute1'] + `: ` + this.requirements['value1'] + `;
                        - ` + this.requirements['attribute2'] + `: ` + this.requirements['value2'] + `;
                        - ` + this.requirements['attribute3'] + `: ` + this.requirements['value3'] + `.
                        Describe different attributes for each paragraph without explicitly stating the name of the attribute nor the value of the attribute and without any meta descriptions. Do not write a conclusion.`
                    }],
                    model: "gpt-3.5-turbo",
                    // temperature: 0.5
                })
    
                this.description = JSON.stringify(completion.choices[0]['message']['content']).substring(1,JSON.stringify(completion.choices[0]['message']['content']).length - 1).split(/\\n\\n/)
            } catch (error) {
                console.log(error)
                this.description = ["Error generating match bio", "Error generating match bio", "Error generating match bio"]
            }
        } else {
            this.description = ["Text Generation is disabled", "Text Generation is disabled", "Text Generation is disabled"]
        } 
    }
}

export class Profile {
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
        if(enableOpenAI == true) {
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
                })
    
                this.name = JSON.stringify(completion.choices[0]['message']['content']).substring(1,JSON.stringify(completion.choices[0]['message']['content']).length - 1).replace('Name: ', '')
                return
            } catch (error) {
                console.log(error)
                this.name = "Error generating match name"
            }
        } else {
            this.name = "Text Generation is disabled"
        }
    }

    async getBio(openAI) {
        if(enableOpenAI == true) {
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
                        Describe different attributes for each paragraph without explicitly stating the name of the attribute nor the value of the attribute and without any meta descriptions.`
                    }],
                    model: "gpt-3.5-turbo",
                    // temperature: 0.5
                })
    
                this.bio = JSON.stringify(completion.choices[0]['message']['content']).substring(1,JSON.stringify(completion.choices[0]['message']['content']).length - 1).split(/\\n\\n/)
                return
            } catch (error) {
                console.log(error)
                this.bio = ["Error generating match bio", "Error generating match bio", "Error generating match bio"]
            }
        } else {
            this.bio = ["Text Generation is disabled", "Text Generation is disabled", "Text Generation is disabled"]
        }
        
    }

    async getImages(openAI) {
        // this.bio.forEach(() => {
            this.imagePrompt(openAI).then((result) => {
                // console.log(result)
                this.imageGeneration(result).then().catch(console.error)
            }).catch(console.error)
        // })
    }

    async imagePrompt(openAI) {
        //Generate image prompts
        if(enableOpenAI == true) {
            try {
                const appearancePrompt = await openAI.chat.completions.create({
                    messages: [{
                        role: "system",
                        content: `In a single paragraph of 100 words, describe the physical appearance, hair, facial appearance, and clothing of an adventurer with the following characteristics:
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
                })

                const imagePrompt = await openAI.chat.completions.create({
                    messages: [{
                        role: "system",
                        content: `You are a text prompt generator for Midjourney. Midjourney is an AI tool that generates images using a text prompts of only keywords. User will provide you the description with ‘Description’ and you will provide them with a ‘Prompt’ for it in a 100 keywords or less.
                        
                        Description: ` + this.gender + ` ` + this.race + ` ` + this.charClass + ` adventurer who is ` + Activities[Math.floor(Math.random() * Activities.length)] + ` and is described as follows: ` + JSON.stringify(appearancePrompt.choices[0]['message']['content']).substring(1,JSON.stringify(appearancePrompt.choices[0]['message']['content']).length - 1)
                    }],
                    model: "gpt-3.5-turbo",
                })

                return JSON.stringify(imagePrompt.choices[0]['message']['content']).substring(9,JSON.stringify(imagePrompt.choices[0]['message']['content']).length - 1)
            } catch (error) {
                console.log(error)
                this.image = "Error generating match image"
            }
        } else {
            console.log("Text Generation is disabled")
        }
    }

    async imageGeneration(prompt) {
        if(enableMidjourney == true) {
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
            
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Authorization': process.env.REACT_APP_USEAPI_MIDJOURNEY_TOKEN,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "prompt": Photography[Math.floor(Math.random() * Photography.length)] + ` shot of a ` + (this.gender == 'Non-binary' || this.gender == 'Undefined Gender'  ? 'androgynous' : this.gender ) + ` ` + prompt + `, fantasy `,
                    "discord": process.env.REACT_APP_DISCORD_AUTH,
                    "server": process.env.REACT_APP_DISCORD_SERVER,
                    "channel": process.env.REACT_APP_DISCORD_CHANNEL,
                    "maxJobs": 13,
                })
            }


            const checkJobStatus = setInterval(() => {
                fetch('https://api.useapi.net/v2/jobs', {
                    headers: {
                        'Authorization': process.env.REACT_APP_USEAPI_MIDJOURNEY_TOKEN,
                        'Content-Type': 'application/json'
                    }}).then((result) => result.json().then((data) => {
                        console.log(data)
                        console.log(data.length < 3)

                        if(data.length < 2) {
                            clearInterval(checkJobStatus)

                            fetch('https://api.useapi.net/v2/jobs/imagine', requestOptions)
                                .then((result) => result.json().then((data) => {

                                    const checkImagineStatus = setInterval(() => {
                                        fetch('https://api.useapi.net/v2/jobs/?jobid=' + data.jobid, {
                                            headers: {
                                                'Authorization': process.env.REACT_APP_USEAPI_MIDJOURNEY_TOKEN,
                                                'Content-Type': 'application/json'
                                            }}).then((result) => result.json().then((data) => {

                                                if(data.status == 'completed'){
                                                    clearInterval(checkImagineStatus)    
                                                    const requestOptions = {
                                                        method: 'POST',
                                                        headers: {
                                                            'Authorization': process.env.REACT_APP_USEAPI_MIDJOURNEY_TOKEN,
                                                            'Content-Type': 'application/json'
                                                        },
                                                        body: JSON.stringify({
                                                            "jobid": data.jobid,
                                                            "button": "U1"
                                                        })
                                                    }
                                                    fetch('https://api.useapi.net/v2/jobs/button', requestOptions)
                                                        .then((result) => result.json().then((data) => {
                                                            const checkButtonStatus = setInterval(() => {
                                                                fetch('https://api.useapi.net/v2/jobs/?jobid=' + data.jobid, {
                                                                    headers: {
                                                                        'Authorization': process.env.REACT_APP_USEAPI_MIDJOURNEY_TOKEN,
                                                                        'Content-Type': 'application/json'
                                                                    }}).then((result) => result.json().then((data) => {
                                                                        if(data.status == 'completed'){
                                                                            clearInterval(checkButtonStatus)
                                                                            this.image = data.attachments[0].url
                                                                            // return data.attachments[0].url
                                                                            // console.log(this.image)
                                                                            // this.images.push(data.attachments[0].url)
                                                                            // return 
                                                                        }
                                                                    }).catch(console.error)).catch(console.error)
                                                            }, 500)
                                                        }).catch(console.error)).catch(console.error)
                                                }
                                            }).catch(console.error)).catch(console.error)
                                    }, 5000)                
                                }).catch(console.error)).catch(console.error)
                        }


                    }).catch(console.error)).catch(console.error)
            }, 4000 + Math.random() * 3000)

            
                
        } else {
            // try {
                this.image = "Image generation is disabled"
            // } catch (error) {
            //     console.log(error)
            //     this.image = "Image generation is disabled"
            // }
        }
    }
}

export const sessionContext = createContext({
    quests: {},
    profiles: {},
    setProfiles: () => {},
    matches: {},
    setMatches: () => {},
    generateQuest: () => {},
    generateProfile: () => {},
    startGenerationCount: startGenerationCount
})

export function useSession() {
    return useContext(sessionContext)
}

export function SessionProvider(props) {
    const { openAI } = useOpenAI()
    const [quests, setQuests] = useState([])
    const [profiles, setProfiles] = useState([])
    const [matches, setMatches] = useState([])
    // const [matchImages, setMatchImages] = useState([])

    const generateQuest = () => {
        const quest = new Quest()
        quest.getQuest(openAI).then(() => {
            setQuests(quests => [...quests, quest])
        }).catch(console.error)
    }

    const generateProfile = () => {
        const profile = new Profile(
            Races[Math.floor(Math.random() * Races.length)],
            Classes[Math.floor(Math.random() * Classes.length)],
            Gender[Math.floor(Math.random() * Gender.length)],
            Styles[Math.floor(Math.random() * Styles.length)],
            Styles[Math.floor(Math.random() * Styles.length)]
        )
        
        Promise.all([profile.getName(openAI), profile.getBio(openAI)]).then(() => {
            profile.getImages(openAI).then(() => {
                setProfiles(profiles => [...profiles, profile])
                // console.log(result)
            }).catch(console.error)
        }).catch(console.error)
    }

    // useEffect(() => {
    //     if(matches.length > 0) {
    //         console.log(matches[0].image)
    //     }
    // }, [matches])

    return (
        <sessionContext.Provider value={{quests: quests, profiles: profiles, setProfiles: setProfiles, matches: matches, setMatches: setMatches, generateQuest: generateQuest, generateProfile: generateProfile, startGenerationCount: startGenerationCount}}>
            {props.children}
        </sessionContext.Provider>
    )
}