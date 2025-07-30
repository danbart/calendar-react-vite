
export const NavBar = () => {
    return (
        <div className="navbar navbar-dark bg-dark mb-4 px-3">
            <span className="navbar-brand mb-0 h1">
                <i className="fas fa-calendar-alt"></i>
                &nbsp;Calendar App
            </span>
            <button className="btn btn-outline-danger">
                <i className="fas fa-sign-out-alt"></i>
                &nbsp;Logout
            </button>
        </div>
    )
}
