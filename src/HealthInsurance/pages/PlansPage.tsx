import { Navbar } from "../components/Navbar"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useMemo, useState } from "react"
import { useStore } from "../../store/store"
import { Plan } from "../../types/types"
import useFetch from "../../hooks/useFetch"
import { getPlans } from "../../services"
import dayjs from 'dayjs';
import { useNavigate } from "react-router-dom";
import { SummaryPlanView } from "../views/SummaryPlanView"
import { SelectPlanView } from "../views/SelectPlanView"

export const PlansPage = () => {
    const [currentView, setcurrentView] = useState(1)
    const [selectedOwnerOption, setselectedOwnerOption] = useState('');
    const [planSelected, setPlanSelected] = useState<Plan | null>(null);
    const navigate = useNavigate();

    const { apiCall } = useFetch<{ list: Plan[] }>();

    const setPlans = useStore((state) => state.setPlans)
    const logout = useStore((state) => state.logout)
    const user = useStore((state) => state.user)
    const plans = useStore((state) => state.plans)

    //* calculate age 
    const currentUserAge = useMemo(() => {
    return user.birthDay ? dayjs().diff(dayjs(user.birthDay, "DD-MM-YYYY"), 'year') : 0;
    }, [user.birthDay]);

    const filterPlansByAge = useMemo(() => {
        return plans.filter((plan) => currentUserAge <= plan.age).map((plan) => {
            if (selectedOwnerOption === "owner_2") {
                return {
                    ...plan,
                    price:plan.price- (plan.price * 0.05),
                };
            }
            return plan;
        });
    },[plans,currentUserAge,selectedOwnerOption]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setselectedOwnerOption(event.target.value);
    };

    const onSelectPlan = (plan: Plan) => {
        setPlanSelected(plan);
        setcurrentView(2)
    }

    const backHistory = () => {
        if (currentView === 2) {
            setPlanSelected(null)
            setcurrentView(1)
        }
        if (currentView === 1) {
            navigate('/', { replace: true });
            logout();
        }
    }

    const fetchPlans = async () => {
        const plans= await apiCall(getPlans);         
        if (plans?.list) setPlans(plans?.list)
    };

    useEffect(() => {
        fetchPlans();
    }, []);

    return (
        <div className="plans-page">
            <Navbar />
            <div className="steps-container">
                <div className="back-button" onClick={() => backHistory()}>
                    <FontAwesomeIcon icon={faAngleLeft} />
                </div>
                <div className="progress-bar">
                    <p className="progress-bar__text">PASO {currentView} DE 2</p>
                    <div className="progress-bar__content">
                        <div className={`progress-bar-fill progress-bar-fill-${currentView}`}></div>
                    </div>
                </div>
            </div>
            <div className="steps-container-desktop">
                <div className={`steps__item ${currentView === 1 ? 'active' : ''}`}>
                    <div className="step"><p>1</p></div>
                    <p>Planes y coberturas</p>
                </div>
                <div className="dots-separator"></div>
                <div className={`steps__item ${currentView === 2 ? 'active' : ''}`}>
                    <div className="step"><p>2</p></div>
                    <p>Resumen</p>
                </div>
            </div>
            <div className="back-button-desktop">
                <div className="back-button-wrapper">
                    <div className="back-button" onClick={() => backHistory()}>
                        <FontAwesomeIcon className="back-button__icon" icon={faAngleLeft} />
                        <p>Volver</p>
                    </div>
                </div>
            </div>
            <main className="grid">
                {/* VIEW SELECT PLAN  */}
                {currentView === 1 && (      
                    <SelectPlanView 
                    user={user} selectedOwnerOption={selectedOwnerOption} handleChange={handleChange} filterPlansByAge={filterPlansByAge} onSelectPlan={onSelectPlan}></SelectPlanView>              
                )}
                {/* VIEW SUMMARY PLAN SELECTED */}
                {currentView === 2 && (           
                    <SummaryPlanView user={user} planSelected={planSelected} />         
                )}
            </main>
        </div>
    )
}
