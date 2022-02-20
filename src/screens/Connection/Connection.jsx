import { useState } from 'react'

//COMPONENTS____________________
import SignIn from "./SignIn"
import SignUp from "./SignUp"

export default function Connection() {
    //STATE______________________________
    const [display, setDisplay] = useState("signin")

    const { container } = styles
    return (
        <div style={ container }>
            {
                display === "signin" 
                ? <SignIn setDisplay={ setDisplay }/>
                : <SignUp setDisplay={ setDisplay }/>
            }
        </div>
    )
}

const styles = {
    container: {
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: `url('/images/homeR.png')`,
        backgroundSize: 'cover',
    }
}