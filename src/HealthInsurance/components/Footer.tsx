import logoFooter from '../../assets/img/rimac_logo_footer.svg'
export const Footer = () => {
    return (
        <footer className='footer'>
            <div className='footer__content'>
                <img className='footer__logo' src={logoFooter} alt='rimac_logo' />
                <div className='separator blue'>
                </div>
                <p className='footer__description'>© 2023 RIMAC Seguros y Reaseguros.</p>
            </div>
        </footer>
    )
}
