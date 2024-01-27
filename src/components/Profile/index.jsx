import { useEffect, useState } from 'react'
import { useSession } from '../../context/sessionContext';
import Bio from '../Bio';

const Profile = () => {
    const { matches } = useSession();
    const { generateProfile } = useSession()
    const [name, setName] = useState('Loading Name...')
    const [race, setRace] = useState('Loading Race...')
    const [charClass, setClass] = useState('Loading Class...')
    const [bio, setBio] = useState(["Loading Bio...", "Loading Bio...", "Loading Bio..."])
    const [images, setImages] = useState(["Loading Image...", "Loading Image...", "Loading Image..."])
    

    useEffect(() => {
        generateProfile()
    }, [])

    useEffect(() => {
        if(matches.length > 0) {
            setName(matches[0].name)
            setRace(matches[0].race)
            setClass(matches[0].charClass)
            setBio(matches[0].bio)
            console.log(bio)
        }
    }, [matches])

    return (
        <>
            <h1>{name}</h1>
            <h2>{race} {charClass}</h2>
            {bio.map((bioEntry, key) => {
                return (
                    <Bio bioEntry={bioEntry} key={key} />
                )
            })}
        </>
    )
}

export default Profile