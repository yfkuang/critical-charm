import { useEffect, useState } from 'react'
import { useSession } from '../../context/sessionContext';
import './profile.css'

const Profile = () => {
    const { matches } = useSession();
    const { generateProfile } = useSession()
    const [name, setName] = useState('Loading Name...')
    const [race, setRace] = useState('Loading Race...')
    const [charClass, setClass] = useState('Loading Class...')
    const [bio, setBio] = useState(["Loading Bio...", "Loading Bio...", "Loading Bio..."])
    const [image, setImage] = useState(["Loading Image..."])
    

    useEffect(() => {
        generateProfile()
    }, [])

    useEffect(() => {
        if(matches.length > 0) {
            setName(matches[0].name)
            setRace(matches[0].race)
            setClass(matches[0].charClass)
            setBio(matches[0].bio)
            // setImage(matches[0].image)
            // console.log(matches[0].image)
        }
    }, [matches])

    useEffect(() => {
        if(matches.length > 0) {
            setImage(matches[0].image)
            console.log(matches[0].image)
        }
    }, [matches[0]])

    return (
        <>
            <h1>{name}</h1>
            <h2>{race} {charClass}</h2>
            <img src={image} alt={image} />
            {bio.map((bioEntry, key) => {
                return(
                    <>
                        <div className='bio-entry' key={key}>{bioEntry}</div>
                    </>
                )
            })}
        </>
    )
}

export default Profile