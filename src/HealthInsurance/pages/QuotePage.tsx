import { Navbar } from "../components/Navbar"
import {Footer} from "../components/Footer"
import familyMobileImg from "../../assets/img/family_mobile.png"
import familyDesktopImg from "../../assets/img/family.png"
import blurAssetMobile1 from "../../assets/img/blur-asset 1.png"
import blurAssetMobile2 from "../../assets/img/blur-asset2.png"
import blurAssetDesktop1 from "../../assets/img/blur-asset-desktop.png"
import blurAssetDesktop2 from "../../assets/img/blur-asset2-desktop.png"
import { useStore } from "../../store/store"
import { SubmitHandler, useForm } from "react-hook-form"
import { UserInputs } from "../../types/types"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import {getUser} from "../../services"
import useFetch  from "../../hooks/useFetch"
import { UserApi } from "../../types/types"
import { useNavigate } from "react-router-dom";

export const QuotePage = () => {
    const setUser = useStore((state) => state.setUser)
    const login = useStore((state) => state.login)

    const navigate = useNavigate();

    const { apiCall, loading } = useFetch<UserApi>();
    // const [loading, setLoading] = useState(false)

    const { register, handleSubmit, watch, formState: { errors },resetField  } = useForm<UserInputs>({
        defaultValues: {
            phone: '',
            documentType: 'DNI',
            documentNumber: '',
            acceptPrivacyPolicy: false,
            acceptCommunicationPolicy: false
        }
    });

    const documentType = watch('documentType')

    const fetchUser = async () => {
        return await apiCall(getUser);  // Llama a la función API que devuelve User
    };

    const onSubmit: SubmitHandler<UserInputs> = async (data) =>{
        const user = await fetchUser()
        if (!user) {
            setUser({...data})
        }else{
            setUser({...data, ...user})
        }
        login()
        navigate('plans');
    }

    return (
        <div className="quote-page">
            <main>
                <Navbar />

                <div className="grid">
                    <div className="container">
                        <div className="quote-page__img-desktop">
                            <img src={familyDesktopImg} alt="family" />
                        </div>
                        <div className="quote-page__content">
                            <section className="banner">
                                <div className="banner__text">
                                    <div className="badge">
                                        <p className="bold">Seguro Salud Flexible</p>
                                    </div>
                                    <h2>Creado para ti y tu familia</h2>
                                </div>
                                
                                <img  className="banner__img" src={familyMobileImg} alt="family" />
                            </section>
                            <div className="separator">
                            </div>

                            <section className="form-section">
                                <p className="semi-bold form-section__description">
                                    Tú eliges cuánto pagar. Ingresa tus datos, cotiza y recibe nuestra asesoría, 100% online. 
                                </p>
                                <form className="form" onSubmit={handleSubmit(onSubmit)}>
                                    <div className="form__field">
                                        <div className="input-document">
                                            <select className="select" {...register("documentType", { 
                                                required: true,
                                                onChange: () => resetField('documentNumber') })}>
                                                <option value="DNI">DNI</option>
                                                <option value="RUC">RUC</option>
                                            </select>
                                            <div className={`input-container ${errors.documentNumber ? 'input-container--error' : ''}`}>
                                                <input className="input" id="document_number" type="text" placeholder="Nro. de documento"
                                                maxLength={documentType === "DNI" ? 8 : 11} 
                                                {...register("documentNumber", {
                                                required: "*El número de documento es obligatorio",
                                                pattern: {
                                                value: /^[0-9]*$/,  // Expresión regular para validar 9 dígitos
                                                message: '*El número de documento no es válido'
                                                },
                                                validate: (value) => {
                                                    if (value) {
                                                        if (documentType === "DNI" && value.length !== 8) {
                                                        return "*El DNI debe tener 8 dígitos";
                                                        } else if (documentType === "RUC" && value.length !== 11) {
                                                        return "*El RUC debe tener 11 dígitos";
                                                        }
                                                    }
                                                    return true;
                                                }})}
                                                />
                                                <label htmlFor="document_number" className="input__label">Nro. de documento</label>
                                            </div>
                                        </div>
                                        {errors.documentNumber && <span className="error-message">{errors.documentNumber.message}</span> }
                                    </div>
                                    
                                    <div className="form__field">
                                        <div className={`input-container ${errors.phone ? 'input-container--error' : ''}`}>
                                            <input className="input" id="phone" type="tel" placeholder="Celular" maxLength={9}
                                            {...register("phone",{
                                                required: '*El número de teléfono es obligatorio',
                                                pattern: {
                                                value: /^[0-9]{9}$/,  // Expresión regular para validar 9 dígitos
                                                message: '*El número de teléfono no es válido'
                                                }})} />
                                            <label htmlFor="phone" className="input__label">Celular</label>
                                        </div>
                                        {errors.phone && <span className="error-message">{errors.phone.message}</span> }
                                    </div>

                                    <div className={`checkbox ${errors.acceptPrivacyPolicy ? 'checkbox--error' : ''}`}>
                                        <input type="checkbox" className="checkbox__input" id="acceptPrivacyPolicy" 
                                        {...register("acceptPrivacyPolicy", { required: true })} />
                                        <label className="checkbox__label" htmlFor="acceptPrivacyPolicy">
                                            <span>
                                                <svg width="12px" height="10px" viewBox="0 0 12 10">
                                                    <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                                                </svg>
                                            </span>
                                            <span>Acepto la Política de Privacidad
                                            </span>
                                        </label>
                                    </div>
                                    
                                    <div className={`checkbox ${errors.acceptCommunicationPolicy ? 'checkbox--error' : ''}`}>
                                        <input type="checkbox" className="checkbox__input" id="acceptCommunicationPolicy" 
                                        {...register("acceptCommunicationPolicy",{ required: true })} />
                                        <label className="checkbox__label" htmlFor="acceptCommunicationPolicy">
                                            <span>
                                                <svg width="12px" height="10px" viewBox="0 0 12 10">
                                                    <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                                                </svg>
                                            </span>
                                            <span>Acepto la Política Comunicaciones Comerciales
                                            </span>
                                        </label>
                                    </div>
                                    <a className="link" rel="stylesheet" href="https://www.rimac.com/terminos-y-condiciones" target="_blank">
                                        Aplican Términos y Condiciones. 
                                    </a>

                                    <button className="button full" type="submit">
                                        {loading ? <FontAwesomeIcon icon={faSpinner} spin /> : <p>Cotizar aquí</p>}
                                    </button>
                                </form>
                            </section>
                        </div>
                    </div>
                </div>
                <img className="blur-asset-mobile-bottom" src={blurAssetMobile2} />
                <img className="blur-asset-mobile-top" src={blurAssetMobile1} />

                <img className="blur-asset-desktop-left" src={blurAssetDesktop1} />
                <img className="blur-asset-desktop-right" src={blurAssetDesktop2} />
            </main>
            <Footer />
        </div>
    )
}
