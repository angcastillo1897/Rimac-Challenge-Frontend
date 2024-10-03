import navBarLogo from "../../assets/img/rimac_logo.svg"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone } from '@fortawesome/free-solid-svg-icons'

export const Navbar = () => {
    return (
        <div className="navbar-container">
            <nav className="navbar">
                <img className="navbar__logo" src={navBarLogo} alt="rimac_logo" />
                <div className="navbar__contact">
                    <p className="navbar__text__desktop">¡Compra por este medio!</p>
                    <FontAwesomeIcon icon={faPhone} />
                    <h5 className="bold">(01) 411 6001</h5>
                </div>
            </nav>
        </div>
    )
}
