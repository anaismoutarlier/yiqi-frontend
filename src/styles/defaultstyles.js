const defaultstyles = {
    nav_page: {
        display: "grid",
        gridTemplateColumns: '50px 1fr',
        height: '100vh',
        width: '100vw',
        position: "relative"
    },
    mobile_nav_page: {
        display: "grid",
        gridTemplateRows: '35px 1fr',
        height: '100vh',
        width: '100vw',
        position: "relative"
    },
    no_nav_page: {
        height: '100vh',
        width: '100vw'
    },
    button: {
        backgroundColor: '#343a40',
        color: '#fff',
        height: '2rem',
        padding: 10,
        boxShadow: '1px 1px 3px 1px rgba(0, 0, 0, 0.3)',
        borderRadius: '3px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        margin: 10,
        border: 'none',
        cursor: 'pointer',
        textTransform: 'uppercase'
    },
    subtitle: {
        margin: 0,
        color: '#343a40',
        fontSize: '0.8rem',
        textTransform: 'uppercase'
    },
    title: {
        margin: 0,
        fontSize: '1.1rem',
        color: '#343a40',
        textTransform: "uppercase"
    },
    menu_header: {
        // width: "100%",
        margin: '20px 10px 5px 10px',
        boxSizing: "border-box",
        display: "grid",
        paddingBottom: "5px",
        paddingLeft: "5px",
        gridTemplateColumns: '20px 150px'
    }
}

export default defaultstyles;