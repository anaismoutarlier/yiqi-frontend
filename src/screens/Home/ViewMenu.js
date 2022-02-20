import React from 'react'

//UI_____________________
import Icon from '@mdi/react'
import {
    mdiViewDashboardOutline,
    mdiNewspaper
} from '@mdi/js'

export default function ViewMenu({ setView }) {
    const { menu } = styles

  return (
    <div style={ menu }>
        <Icon
            path={mdiNewspaper}
            size={0.8}
            color="white"
            onClick={ () => setView("myBoard") }
            style={ { backgroundColor: "rgba(0,0,0, 0.2)", borderRadius: '3px', margin: 4, padding: 4, cursor: 'pointer' } }
        />
        <Icon
            path={mdiViewDashboardOutline}
            size={0.8}
            color="white"
            onClick={ () => setView('allBoards') }
            style={ { backgroundColor: "rgba(0,0,0, 0.2)", borderRadius: '3px', margin: 4, padding: 4, cursor: 'pointer' } }
        />
    </div>
  )
}

const styles = {
    menu: {
        position: 'absolute',
        right: 10,
        top: 10
    },
}
