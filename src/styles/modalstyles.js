const modalstyles = {
    modal_header: {
        display: 'flex',
        alignItems: 'center',
        borderBottom: '1px solid rgba(0, 0, 0, 0.2)',
        margin: '40px 40px 20px 40px'
    },
    body: { 
        maxHeight: '90vh',
        // overflow: 'scroll',
        padding: '0px 2px',
        width: '100%'
    },
    body_mobile: {
        maxHeight: '60vh'
    },
    modal_heading: {
        color: '#343a40',
        fontSize: '0.83rem',
        margin: '0px 0px 15px 0px'
    },
    toggle_container: {
        display: 'flex',
        marginTop: 10,
        justifyContent: 'space-between'
    },
    subheading: {
        fontSize: '0.8rem',
        color: 'rgba(0, 0, 0, 0.9)',
        margin: 0,
        maxWidth: '70%',
        fontWeight: 'normal'
    },
    footer: {
        display: 'flex', 
        justifyContent: 'flex-end',
        alignItems: 'center',
        borderTop: '1px solid rgba(0, 0, 0, 0.2)',
        width: '100%',
        paddingTop: 20,
        margin: '0px 2px'
    },
    row_field: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        maxWidth: '100%'
    },
    field: {
        borderBottom: '1px solid rgba(0, 0, 0, 0.2)',
        paddingBottom: 20,
        paddingTop: 20,
        width: '100%',
        maxWidth: '100%'
    },
    section_row: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: 20,
        paddingTop: 20,
        borderBottom: '1px solid rgba(0, 0, 0, 0.2)',
        width: '100%',
        maxWidth: '100%'
    },
    header_icon: { 
        marginRight: 8, 
        marginTop: 2 
    },
    expand_menu_header: { 
        display: 'flex',
        alignItems: 'flex-start',
        paddingTop: 10,
        cursor: 'pointer', 
        width: '100%' 
    },
    content: {
        padding: '0px 40px 40px 40px',
        boxSizing: "border-box",
        width: '100%'
    }
}

export default modalstyles