import React, { useRef } from 'react'

//STYLES____________________
import './scrollcarousel.css'

//UI___________________________
import { Icon } from "@mdi/react"
import { mdiChevronLeft, mdiChevronRight } from '@mdi/js';

const ScrollCarousel = ({ children, scroll = true, arrowColor, arrowSize, style, arrowStyle }) => {
   // children = les élément enfants à l'intérieur du composant dans le render
   // scroll est juste props forcé à false
    //REFERENCE HOOKS___________________________
    const listRef = useRef(null);

    //FUNCTIONS________________________________
    const scrollLeft = () => {
        //  si mon bloc d'avatar en référence a une valeur ?
        if(listRef.current){
            listRef.current.scrollBy({ 
                top: 0,    
                left: -100,
                behavior: "smooth",
            });
        }
    };
    
    const scrollRight = () => {
        //  si mon bloc d'avatar en référence a une valeur ?
        if(listRef.current){
            listRef.current.scrollBy({ 
                top: 0,    
                left: 100,
                behavior: "smooth",
            });
        }
    };

    return (
        <div 
        style={ style ? Object.assign({ ...styles.container }, { ...style }) : styles.container }
        className="hide-scrollbar">
            { scroll &&
                <div
                onClick={ scrollLeft }
                style={ arrowStyle ? Object.assign({ ...styles.icon_wrapper, ...arrowStyle }) : styles.icon_wrapper }
                >
                    <Icon
                    onClick={ scrollLeft }
                    color={ arrowColor ? arrowColor : 'grey' }
                    path={ mdiChevronLeft }
                    size={ arrowSize ? arrowSize : 1 }
                    />
                </div>
            }
            <div
            className="hide-scrollbar"
            ref={ listRef }
            style={ styles.scroll_wrapper }>
                { children }
            </div>
            { scroll &&
                <div
                onClick={ scrollRight }
                style={ arrowStyle ? Object.assign({ ...styles.icon_wrapper, ...arrowStyle }) : styles.icon_wrapper }
                >
                    <Icon
                    color={ arrowColor ? arrowColor : 'grey' }
                    path={ mdiChevronRight }
                    size={ arrowSize ? arrowSize : 1 }
                    />
                </div>
            }
        </div>
    )
}

export default ScrollCarousel;

const styles = {
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        overflowY: 'auto',
        width: '100%'
    },
    scroll_wrapper: {
        display: 'flex',
        overflowY: 'hidden',
        justifyContent: 'flex-start',
        marginLeft: '2%',
        marginRight: '2%'
    },
    icon_wrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%'
    }
}