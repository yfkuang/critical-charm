import { useEffect, useState } from 'react'
import { useSession } from '../../context/sessionContext';
import { Button } from 'react-bootstrap'
import Header from '../header'
import Footer from '../footer'
import './profile.css'

const Profile = () => {
    const { profiles } = useSession();
    const { setProfiles } = useSession();
    const { matches } = useSession();
    const { setMatches } = useSession();
    const { generateProfile } = useSession()
    const [name, setName] = useState('Loading Name...')
    const [race, setRace] = useState('Loading Race...')
    const [charClass, setClass] = useState('Loading Class...')
    const [bio, setBio] = useState(["Loading Bio...", "Loading Bio...", "Loading Bio..."])
    const [image, setImage] = useState(["Loading Image..."])
    

    useEffect(() => {
        console.log(profiles)
    }, [])

    useEffect(() => {
        if(profiles.length > 0) {
            setName(profiles[0].name)
            setRace(profiles[0].race)
            setClass(profiles[0].charClass)
            setBio(profiles[0].bio)
            // setImage(profiles[0].image)
            // console.log(profiles[0].image)
        }
    }, [profiles])

    useEffect(() => {
        if(profiles.length > 0) {
            setImage(profiles[0].image)
            // console.log(profiles)
            // console.log(profiles[0].image)
        }
    }, [profiles[0]])

    const like = (e) => {
        setMatches(matches => [...matches, profiles[0]])
        setProfiles(profiles.slice(1))
        generateProfile()
        console.log(matches)
    }

    const pass = (e) => {
        setProfiles(profiles.slice(1))
        generateProfile()
        console.log(profiles)
    }

    return (
        <>
            <Header />
            <div className='name-group'>
                <h1>{name}</h1>
                <h2>{race} {charClass}</h2>
            </div>
            <img className='profile-image' src={image} alt={image} />
            {bio.map((bioEntry, key) => {
                return(
                    <>
                        <div className='bio-entry' key={key}>{bioEntry}</div>
                    </>
                )
            })}
            <div className="match-buttons">
                <Button variant="success" onClick={like}><i class="bi bi-arrow-through-heart-fill"></i></Button>
                <Button variant="danger" onClick={pass}><i class="bi bi-heartbreak-fill"></i></Button>
            </div>
            <Footer />
        </>
    )
}

export default Profile