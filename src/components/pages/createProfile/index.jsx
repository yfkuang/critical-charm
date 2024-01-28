import { useState } from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Form } from 'react-bootstrap'
import { useSession } from '../../../context/sessionContext'
import { useOpenAI } from '../../../context/openAIContext'

export class Player {
    constructor(name, race, charClass, bio, str, dex, con, int, wis, cha) {
        this.race = race 
        this.charClass = charClass
        this.bio = bio
        this.attributes = {
            "str" : str,
            "dex" : dex,
            "con" : con,
            "int" : int,
            "wis" : wis,
            "cha" : cha 
        }
    }
}

const CreateProfile = () => {
    const { enableOpenAI } = useSession()
    const { Races } = useSession()
    const { Classes } = useSession()
    const { playerProfile } = useSession()
    const { setPlayerProfile } = useSession()
    const { openAI } = useOpenAI()
    const [str, setStr] = useState()
    const [dex, setDex] = useState()
    const [con, setCon] = useState()
    const [int, setInt] = useState()
    const [wis, setWis] = useState()
    const [cha, setCha] = useState()
    const [errors, setErrors] = useState([])

    const generate = async () => {
        console.log('Generating attributes')
        console.log(errors)
        if(document.getElementById('name').value == "") {
            setErrors(errors => [...errors, "Name is empty."])
        } else {
            const index = errors.indexOf("Name is empty.");
            setErrors(errors.splice(index, 1))
        }

        if(document.getElementById('description').value == "") {
            setErrors(errors => [...errors, "Description is empty."])
        } else {
            const index = errors.indexOf("Description is empty.");
            setErrors(errors.splice(index, 1))
        }

        if(document.getElementById('name').value != "" && document.getElementById('description').value != "") {
            if(enableOpenAI == true) {
                try {
                    const strCompletion = await openAI.chat.completions.create({
                        messages: [{
                            role: "system",
                            content: `You are a program that interprets the information of an adventurer and only outputs a number value of their strength on a scale between 1 (useless) to 20 (master).

                            ` + document.getElementById('name').value + ` is a ` + document.getElementById('race').value + ` ` + document.getElementById('charclass').value + ` with the following description: ` + document.getElementById('description').value +  `

                            Based on this information, output the a number value of this adventurer's interpreted strength. If you are unable to output value based on the adventurer's information, output any a number value between 1 and 20. Do not output text.`
                        }],
                        model: "gpt-3.5-turbo",
                        max_tokens: 100
                    })
        
                    setStr(parseInt(JSON.stringify(strCompletion.choices[0]['message']['content']).substring(1,JSON.stringify(strCompletion.choices[0]['message']['content']).length - 1)))

                    const dexCompletion = await openAI.chat.completions.create({
                        messages: [{
                            role: "system",
                            content: `You are a program that interprets the information of an adventurer and only outputs an a number value of their dexterity on a scale between 1 (useless) to 20 (master).

                            ` + document.getElementById('name').value + ` is a ` + document.getElementById('race').value + ` ` + document.getElementById('charclass').value + ` with the following description: ` + document.getElementById('description').value +  `

                            Based on this information, output the a number value of this adventurer's interpreted dexterity. If you are unable to output value based on the adventurer's information, output any a number value between 1 and 20. Do not output text.`
                        }],
                        model: "gpt-3.5-turbo",
                        max_tokens: 100
                    })
        
                    setDex(parseInt(JSON.stringify(dexCompletion.choices[0]['message']['content']).substring(1,JSON.stringify(dexCompletion.choices[0]['message']['content']).length - 1)))

                    const conCompletion = await openAI.chat.completions.create({
                        messages: [{
                            role: "system",
                            content: `You are a program that interprets the information of an adventurer and only outputs an a number value of their constitution on a scale between 1 (useless) to 20 (master).

                            ` + document.getElementById('name').value + ` is a ` + document.getElementById('race').value + ` ` + document.getElementById('charclass').value + ` with the following description: ` + document.getElementById('description').value +  `

                            Based on this information, output the a number value of this adventurer's interpreted constitution. If you are unable to output value based on the adventurer's information, output any a number value between 1 and 20. Do not output text.`
                        }],
                        model: "gpt-3.5-turbo",
                        max_tokens: 100
                    })
        
                    setCon(parseInt(JSON.stringify(conCompletion.choices[0]['message']['content']).substring(1,JSON.stringify(conCompletion.choices[0]['message']['content']).length - 1)))

                    const intCompletion = await openAI.chat.completions.create({
                        messages: [{
                            role: "system",
                            content: `You are a program that interprets the information of an adventurer and only outputs a number value of their intelligence on a scale between 1 (useless) to 20 (master).

                            ` + document.getElementById('name').value + ` is a ` + document.getElementById('race').value + ` ` + document.getElementById('charclass').value + ` with the following description: ` + document.getElementById('description').value +  `

                            Based on this information, output the a number value of this adventurer's interpreted intelligence. If you are unable to output value based on the adventurer's information, output any a number value between 1 and 20. Do not output text.`
                        }],
                        model: "gpt-3.5-turbo",
                        max_tokens: 100
                    })
        
                    setInt(parseInt(JSON.stringify(intCompletion.choices[0]['message']['content']).substring(1,JSON.stringify(intCompletion.choices[0]['message']['content']).length - 1)))

                    const wisCompletion = await openAI.chat.completions.create({
                        messages: [{
                            role: "system",
                            content: `You are a program that interprets the information of an adventurer and only outputs a number value of their wisdom on a scale between 1 (useless) to 20 (master).

                            ` + document.getElementById('name').value + ` is a ` + document.getElementById('race').value + ` ` + document.getElementById('charclass').value + ` with the following description: ` + document.getElementById('description').value +  `

                            Based on this information, output the a number value of this adventurer's interpreted wisdom. If you are unable to output value based on the adventurer's information, output any a number value between 1 and 20. Do not output text.`
                        }],
                        model: "gpt-3.5-turbo",
                        max_tokens: 100
                    })
        
                    setWis(parseInt(JSON.stringify(wisCompletion.choices[0]['message']['content']).substring(1,JSON.stringify(wisCompletion.choices[0]['message']['content']).length - 1)))

                    const chaCompletion = await openAI.chat.completions.create({
                        messages: [{
                            role: "system",
                            content: `You are a program that interprets the information of an adventurer and only outputs a number value of their charisma on a scale between 1 (useless) to 20 (master).

                            ` + document.getElementById('name').value + ` is a ` + document.getElementById('race').value + ` ` + document.getElementById('charclass').value + ` with the following description: ` + document.getElementById('description').value +  `

                            Based on this information, output the a number value of this adventurer's interpreted charisma. If you are unable to output value based on the adventurer's information, output any a number value between 1 and 20. Do not output text.`
                        }],
                        model: "gpt-3.5-turbo",
                        max_tokens: 100
                    })
        
                    setCha(parseInt(JSON.stringify(chaCompletion.choices[0]['message']['content']).substring(1,JSON.stringify(chaCompletion.choices[0]['message']['content']).length - 1)))

                } catch (error) {
                    console.log(error)
                }
            }
        }
    }

    const submit = () => {
        const player = new Player(
            document.getElementById('name').value,
            document.getElementById('race').value,
            document.getElementById('charclass').value,
            document.getElementById('description').value,
            str,
            dex,
            con,
            int,
            wis,
            cha
        )

        setPlayerProfile(player)
        console.log(playerProfile)
    }

    return (
        <>
            <h3>Adventurer Name</h3>
            <Form.Control size="lg" type="text" id="name" placeholder="Adventurer Name"/>
            <h3>Race</h3>
            <Form.Select id="race" size="lg">
                {Races.map((race, key) => {
                    return (
                        <option key={key} >{race}</option>
                    )
                })}
            </Form.Select>
            <h3>Class</h3>
            <Form.Select id="charclass" size="lg">
                {Classes.map((charClass, key) => {
                    return (
                        <option key={key}>{charClass}</option>
                    )
                })}
            </Form.Select>
            <h3>Bio</h3>
            <Form.Control as="textarea" id="description" rows={3} placeholder="Describe yourself" />

            {errors.map((error, key) => {
                return (
                    <p key={key}>{error}</p>
                )
            })}

            <Button variant="warning" onClick={generate}>Generate</Button>

            {str &&
                <p>Strength: {isNaN(str) ? "Re-generate" : str}</p>
            }
            {dex &&
                <p>Dexterity: {isNaN(dex) ? "Re-generate" : dex}</p>
            }
            {con &&
                <p>Constitution: {isNaN(con) ? "Re-generate" : con}</p>
            }
            {int &&
                <p>Intelligence: {isNaN(int) ? "Re-generate" : int}</p>
            }
            {wis &&
                <p>Wisdom: {isNaN(wis) ? "Re-generate" : wis}</p>
            }
            {cha &&
                <p>Charisma: {isNaN(cha) ? "Re-generate" : cha}</p>
            }

            {/* <Link to="/match"> */}
                <Button variant="primary" onClick={submit}>Start Matching</Button>
            {/* </Link> */}
        </>
    )
}

export default CreateProfile