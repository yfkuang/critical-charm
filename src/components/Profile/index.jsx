import { useEffect, useState } from 'react'
import { useSession } from '../../context/sessionContext';
import Bio from '../Bio';

const Profile = () => {
    const { matches } = useSession();
    const { generateProfile } = useSession()
    const [bio, setBio] = useState(["Loading...", "Loading...", "Loading..."])

    // console.log(bio)

    useEffect(() => {
        generateProfile()
    }, [])

    // useEffect(() => {
    //     if (matches['0']) {
    //         if(matches['0'].bio) {
    //             matches['0'].bio.forEach(element => {
    //                 setBio(bio => [...bio, element])
    //             });
    //         }
    //     }
    //     // console.log(bio)
    // }, [matches])

    return (
        <>
            {bio.map((bioEntry, key) => {
                return (
                    <Bio bioEntry={bioEntry} key={key} />
                )
            })}
        </>
    )
}

export default Profile