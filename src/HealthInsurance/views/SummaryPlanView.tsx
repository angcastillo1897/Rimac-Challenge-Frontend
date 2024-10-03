import { User,Plan } from "../../types/types";

export const SummaryPlanView = ({ user, planSelected }: { user: User, planSelected: Plan | null }) => {
    return (
        <div className="container">
            <h1>Resumen del seguro</h1>
            <div className="summary__container box">
                <p className="summary-subtitle">
                    Precios calculados para:
                </p>
                <div>
                    <h4>{user.name} {user.lastName}</h4>
                </div>
                <div className="separator"></div>
                <div className="summary__content">
                    <h5>Responsable de pago</h5>
                    <p>{user.documentType}: {user.documentNumber} </p>
                    <p>Celular: {user.phone}</p>
                </div>
                {
                    planSelected && (
                        <div className="summary__content">
                            <h5>Plan elegido</h5>
                            <p>{planSelected.name}</p>
                            <p>Costo del Plan: ${planSelected.price}</p>
                        </div>
                    )
                }
            </div>
        </div>
    )
}
