import { createContext } from "react"

export const themes = {
    pink: {
        name: 'pink',
        foreground: {
            color: 'rgba(206, 18, 81, 1)',
            borderColor: 'rgba(206, 18, 81, 1)',
        },
        background: {
            backgroundColor: 'rgba(206, 18, 81, 1)',
            color: '#fff'
        },
        background_transparent: {
            backgroundColor: 'rgba(206, 18, 81, 0.6)',
            color: '#fff'
        }
    },
    orange_red: {
        name: 'orange_red',
        foreground: {
            color: "rgba(193, 63, 51, 1)",
            borderColor: "rgba(193, 63, 51, 1)",
        },
        background: {
            backgroundColor: "rgba(193, 63, 51, 1)",
            color: '#fff'
        },
        background_transparent: {
            backgroundColor: "rgba(193, 63, 51, 0.6)",
            color: '#fff'
        }
    },
    yellow: {
        name: 'yellow',
        foreground: {
            color: 'rgba(224, 161, 0, 1)',
            borderColor: 'rgba(224, 161, 0, 1)',
        },
        background: {
            backgroundColor: 'rgba(224, 161, 0, 1)',
            color: '#fff'
        },
        background_transparent: {
            backgroundColor: 'rgba(224, 161, 0, 0.6)',
            color: '#fff'
        }
    },
    light_green: {
        name: 'light_green',
        foreground: {   
            color: 'rgba(126, 182, 62, 1)',
            borderColor: 'rgba(126, 182, 62, 1)',
        },
        background: {
            backgroundColor: 'rgba(126, 182, 62, 1)',
            color: '#fff'
        },
        background_transparent: {
            backgroundColor: 'rgba(126, 182, 62, 0.6)',
            color: '#fff'
        }
    },
    green: {
        name: 'green',
        foreground: {   
            color: 'rgba(61, 143, 64, 1)',
            borderColor: 'rgba(61, 143, 64, 1)',
        },
        background: {
            backgroundColor: 'rgba(61, 143, 64, 1)',
            color: '#fff'
        },
        background_transparent: {
            backgroundColor: 'rgba(61, 143, 64, 0.6)',
            color: '#fff'
        }
    },
    pine_green: {
        name: 'pine_green',
        foreground: {
            color: 'rgba(1, 122, 112, 1)',
            borderColor: 'rgba(1, 122, 112, 1)',
        },
        background: {
            backgroundColor: 'rgba(1, 122, 112, 1)',
            color: '#fff'
        },
        background_transparent: {
            backgroundColor: 'rgba(1, 122, 112, 0.6)',
            color: '#fff'
        }
    },
    teal: {
        name: 'teal',
        foreground: {
            color: '#5389A2',
            borderColor: '#5389A2',
        },
        background: {
            backgroundColor: '#5389A2',
            color: '#fff'
        },
        background_transparent: {
            backgroundColor: 'rgba(83, 137, 162, 0.6)',
            color: '#fff'
        }
    },
    blue: {
        name: 'blue',
        foreground: {
            color: '#008F8C',
            borderColor: '#008F8C',
        },
        background: {
            backgroundColor: '#008F8C',
            color: '#fff'
        },
        background_transparent: {
            backgroundColor: 'rgba(0, 143, 140, 0.6)',
            color: '#fff'
        }
    },
    light_blue: {
        name: 'light_blue',
        foreground: {
            color: 'rgba(3, 169, 245, 1)',
            borderColor: '#008F8C',
        },
        background: {
            backgroundColor: 'rgba(3, 169, 245, 1)',
            color: '#fff'
        },
        background_transparent: {
            backgroundColor: 'rgb(3, 169, 245, 0.6)',
            color: '#fff'
        }
    },
    purple: {
        name: 'purple',
        foreground: {
            color: 'rgba(94, 53, 172, 1)',
            borderColor: 'rgba(94, 53, 172, 1)',
        },
        background: {
            backgroundColor: 'rgba(94, 53, 172, 1)',
            color: '#fff'
        },
        background_transparent: {
            backgroundColor: 'rgba(94, 53, 172, 0.6)',
            color: '#fff'
        }
    },
    light_purple: {
        name: 'light_purple',
        foreground: {
            color: 'rgba(149, 38, 166, 1)',
            borderColor: 'rgba(149, 38, 166, 1)',
        },
        background: {
            backgroundColor: 'rgba(149, 38, 166, 1)',
            color: '#fff'
        },
        background_transparent: {
            backgroundColor: 'rgba(149, 38, 166, 0.6)',
            color: '#fff'
        }
    },
    grey: {
        name: 'grey',
        foreground: {
            color: 'rgba(92, 119, 132, 1)',
            borderColor: 'rgba(92, 119, 132, 1)',
        },
        background: {
            backgroundColor: 'rgba(92, 119, 132, 1)',
            color: '#fff'
        },
        background_transparent: {
            backgroundColor: 'rgba(92, 119, 132, 0.6)',
            color: '#fff'
        }
    }
}

export const ThemeContext = createContext({
    theme: themes.orange_red,
    changeTheme: () => {}
})