import Header from "../../components/Header/Header";
import HomeSection from "../../components/HomeSection/HomeSection";

export default function MainView() {
    const cookie = document.cookie;

    return(
        <>
            <Header />
            {cookie ? <HomeSection /> 
            : <h2>Зарегестрируйтесь либо войдите</h2>
            }
        </>
    )
}