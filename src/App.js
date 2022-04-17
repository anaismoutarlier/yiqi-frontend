import "sanitize.css" 
import './App.css'

//MEDIA____________________________
import { useMediaQuery } from "react-responsive"

import { useState, useEffect } from "react"

//REDUX________________________
import { useDispatch, useSelector } from "react-redux"

//ROUTER________________________
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

//SCREENS____________________
import Home from "./screens/Home"
import Connection from './screens/Connection'
import Board from "./screens/Board"
import Account from "./screens/Account"

//COMPONENTS_________________
import Loader from "./components/Loader"

//CONTEXT________________________
import { ThemeContext, themes } from "./hooks/theme-context"
import { MediaContext } from "./hooks/media-context"

const App = () => {
  //MEDIA_______________________
  const mobile = useMediaQuery({ query: `(max-width: 500px)`})
  const tablet = useMediaQuery({ query: `(max-width: 1000px)`})

  //STORE_______________________
  const { user, mask } = useSelector(({ user, mask }) => ({ user, mask }))
  const dispatch = useDispatch()
  console.log(mask)
  //STATE______________________
  const [theme, setTheme] = useState(themes[user?.preferences?.theme] || themes["light_blue"])
  const [media, setMedia] = useState(mobile ? "mobile" : tablet ? "tablet" : "desktop")

  //EFFECTS____________________
  useEffect(() => {
    setMedia(mobile ? "mobile" : tablet ? "tablet" : "desktop")
  }, [mobile, tablet])

  //FUNCTIONS___________________
  const changeTheme = async theme => {
    const { token, preferences = {} } = user

    const data = await fetch(`${global.BACKEND}/users/account`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({ token, key: "preferences", value: Object.assign({ ...preferences, theme: theme }) })
    })

    const { result, user: newUser } = await data.json()

    if (result) dispatch({ type: "modifyUser", user: newUser })

    setTheme(themes[theme])
  }

  const { mask_background } = styles
  return (
    <MediaContext.Provider value={ media }>
      <ThemeContext.Provider value={ { theme, changeTheme } }>
        <Router>
          { mask && <div style={ mask_background }></div> }
          <Loader />
          <Switch>
            <Route path="/" exact component={ Connection } />
            <Route path="/home" exact component={ Home } />
            <Route path="/board/:id" exact component={ Board }/>
            <Route path="/compte" exact component={ Account } />
          </Switch>
        </Router>
      </ThemeContext.Provider>
    </MediaContext.Provider>
  )
}

export default App

const styles = {
  mask_background: {
    position: "absolute",
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    zIndex: 10000,
    backgroundColor: "rgba(0, 0, 0, 0.8)"
  }
}