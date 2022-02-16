import React, { useState, useEffect } from 'react'
import './App.css'
import "simplebar/dist/simplebar.min.css";

//REDUX__________________________
import { connect } from 'react-redux'

//CONTEXT_______________________
import { ThemeContext, themes } from './hooks/theme-context'
import { MediaContext } from './hooks/media-context'

//NAVIGATION________________________
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

//SCREENS_______________________________
import MyBoards from './screens/MyBoards'
import Board from './screens/Board'
import Connection from './screens/Connection'
import Dashboard from './screens/Dashboard'
import HomeDashboard from './screens/HomeDashboard'

//COMPONENTS____________________________
import Nav from './components/Nav'
import MobileNav from './components/MobileNav'
import Loader from './components/Loader'

function App({ user, modifyUser, isLogged }) {
  //STATE HOOKS________________________
  const [theme, setTheme] = useState(user ? themes[user.preferences.theme] : themes.light_blue)
  const [showNav, setShowNav] = useState(true)
  const [media, setMedia] = useState(window.innerWidth <= 500 ? "mobile" : window.innerWidth < 930 ? 'tablet' : 'desktop')
  const [currentPage, setCurrentPage] = useState('default')
  const [background, setBackground] = useState("url('/images/flatlay.png')")

  //EFFECT HOOKS___________________________
  useEffect(()=> {
    window.addEventListener("resize", toggleMedia)

    return () => window.removeEventListener("resize", toggleMedia)
  })

  //FUNCTIONS______________________________
  const toggleNav = bool => {
    setShowNav(bool)
  }

  const toggleMedia = () => {
    window.innerWidth <= 500 ? setMedia('mobile')
    : window.innerWidth < 930 ? setMedia('tablet')
    : setMedia('desktop') ;
  }

  const changeTheme = async (theme, mode = 'set') => {
    if (user && mode === 'update') {
      const data = await fetch(`${global.BACKEND}/users/account`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ token: user.token, key: "preferences", value: Object.assign({ ...user.preferences, theme: theme }) })
      })

      const json = await data.json()

      if (json.result) {
        modifyUser(json.user)
      }
    }
    setTheme(themes[theme])
  }

  return (
      <MediaContext.Provider value={ { media, changeMedia: setMedia } }>
          <ThemeContext.Provider value={ { theme, changeTheme } }>
            <Router>
              <div style={ !showNav ? styles.no_nav_page : (media === 'desktop' ? styles.page_container : styles.page_container_mobile) }>
                <Loader changeTheme={ changeTheme } />
                { showNav && 
                  <>
                    {
                      media === 'desktop' ?
                      <Nav page={ currentPage } setBackground={ setBackground }/>
                      : <MobileNav /> 
                    }
                  </>
                }
                <Switch>
                  <Route path="/" exact component={ HomeDashboard } />
                  <Route path="/myboards" exact component={ MyBoards } />
                  <Route path="/board/:type/:id" exact render={ props => <Board  setCurrentPage={ setCurrentPage } background={ background } /> }/>
                  <Route path="/connexion" exact render={ props => <Connection toggleNav={ toggleNav }/> } />
                  <Route path='/compte' exact component={ Dashboard } />
                </Switch>
              </div>
            </Router>
          </ThemeContext.Provider>
      </MediaContext.Provider>
  );
}

function mapStateToProps(state) {
  return {
    user: state.user,
    isLogged: state.isLogged
  }
}

function mapDispatchToProps(dispatch) {
  return {
    modifyUser: user => {
      dispatch({ type: 'modifyUser', user })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

const styles = {
  page_container: {
    display: 'grid',
    gridTemplateColumns: '80px 1fr',
  },
  no_nav_page: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    height: '100vh'
  },
  page_container_mobile: {
    display: 'grid',
    gridTemplateRows: '50px 1fr',
    height: '100vh'
  }
}