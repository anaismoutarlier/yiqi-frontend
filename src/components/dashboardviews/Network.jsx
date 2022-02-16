import React, {useState, useEffect} from 'react'
import TransferList from '../TransferList';


const Network = ({user}) => {

    const [architectures, setArchitectures] = useState([])
    const [users, setUsers] = useState([])

    useEffect(() => {
        const fetchUsers = async () => {
            // si user appartient à admin d'un ou plusieurs clients, donc possédant des architectures
            //const isAdmin = await fetch(`/users/isadmin/${user.user._id}`)
            //puis route avec id client data = await fetch(`/users/clients/${ClientAdmin._id}`)
            // mais en attendant :
            const data = await fetch(`${global.BACKEND}/users`)
            const json = await data.json()

            if (json.result) {
                setUsers(json.users)
            }
        }
        
        if (user) fetchUsers()

        const fetchArchitecture = async () => {
            // si user appartient à admin d'un ou plusieurs clients, donc possédant des architectures
            //const isAdmin = await fetch(`/users/isadmin/${user.user._id}`)
            const data = await fetch(`${global.BACKEND}/users/architectures`)
            const json = await data.json()

            if (json.result) {
                setArchitectures(json.architectures)
            }
        }

        if (user) fetchArchitecture()

    }, [user])

    useEffect(()=>{console.log('Users : ', users)}, [users])
    useEffect(()=>{console.log('Architectures : ', architectures)}, [architectures])

    return (
        <>
        <TransferList users={users} architectures={architectures}/>

        </>
    )
}
export default Network;