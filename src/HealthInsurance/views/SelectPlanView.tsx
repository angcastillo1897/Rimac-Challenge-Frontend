import { User,Plan } from '../../types/types'
import IcProtection from "../../assets/img/IcProtectionLight.png"
import IcAddUser from "../../assets/img/IcAddUserLight.png"
import IcHomeLight from "../../assets/img/IcHomeLight.png"
import IcHospitalLight from "../../assets/img/IcHospitalLight.png"
export const SelectPlanView = (
    { user, selectedOwnerOption, handleChange,filterPlansByAge,onSelectPlan }: 
    { user: User, selectedOwnerOption: string, handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void, filterPlansByAge: Plan[],onSelectPlan: (plan: Plan) => void }) => {
    return (
        <div className="container">
            <header className="header">
                <h2>{user.name} ¿Para quién deseas cotizar?</h2>
                <p className="header__description">Selecciona la opción que se ajuste más a tus necesidades.</p>
            </header>
            <div className="select-owner__items">
                <label className="select-owner__item box" htmlFor="owner1">
                    <input
                        className="input-hidden"
                        type="radio"
                        name="owner_1"
                        id="owner1"
                        value="owner_1"
                        checked={selectedOwnerOption === 'owner_1'}
                        onChange={handleChange}
                    />
                    <div className="radio-btn">
                    </div>
                    <div className="select-owner__item__title">
                        <img src={IcProtection} />
                        <h4>Para mí</h4>
                    </div>
                    <p className="select-owner__item__description">Cotiza tu seguro de salud y agrega familiares si así lo deseas.</p>
                    
                </label>
                <label className="select-owner__item box" htmlFor="owner2">
                    <input
                        className="input-hidden"
                        type="radio"
                        name="owner_2"
                        id="owner2"
                        value="owner_2"
                        checked={selectedOwnerOption === 'owner_2'}
                        onChange={handleChange}
                    />
                    <div className="radio-btn">
                    </div>
                    <div className="select-owner__item__title">
                        <img src={IcAddUser} />
                        <h4>Para alguien más</h4>
                    </div>
                    <p className="select-owner__item__description">Realiza una cotización para uno de tus familiares o cualquier persona.</p>
                    
                </label>
            </div>

            {selectedOwnerOption ? (
                <>
                    {filterPlansByAge.length > 0 ? (
                        <div className="plans-available__container">
                            {filterPlansByAge.map((plan, index) => (
                                <article
                                    className="plans-available__item box"
                                    key={plan.name}
                                >   
                                    <div className="plans-available__item__header">
                                        <div className="plans-available__item__header__title">
                                            <h3>
                                                {plan.name}
                                            </h3>
                                            <img src={index % 2 === 0 ? IcHomeLight : IcHospitalLight } />

                                        </div>
                                        <div className="plans-available__item__price">
                                            <p className="plans-available__item__price__title">COSTO DEL PLAN</p>
                                            <h4> ${plan.price} al mes</h4>
                                        </div>
                                    </div>
                                    <div className="separator"></div>
                                    <div className="plans-available__item__body">
                                        {plan.description.map((description) => (
                                            <div key={description} className="plans-available__item__description">
                                                <div className="plans-available__item__description__circle">
                                                    
                                                </div>
                                                <p className="plans-available__item__description__text">
                                                    {description}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="plans-available__item__footer">
                                        <button
                                            className="button button__red full"
                                            onClick={() => onSelectPlan(plan)}
                                        >
                                            Seleccionar plan
                                        </button>
                                    </div>
                                </article>
                            ))}
                        </div>
                    ) : (
                        <p className="plans-available__no-plans">
                            No hay planes disponibles para esa edad
                        </p>
                    )}
                </>
                
            ) : null}
        </div>
    )
}
