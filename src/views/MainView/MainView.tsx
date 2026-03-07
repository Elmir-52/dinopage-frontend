import Header from "../../components/Header/Header";
import HomeSection from "../../components/HomeSection/HomeSection";
import MessageSection from "../../components/MessageSection/MessageSection";
import NavigationBar from "../../components/NavigationBar/NavigationBar";

export default function MainView() {
    const cookie = document.cookie;

    return(
        <>
            <Header />
            {cookie ? <HomeSection /> 
            : <MessageSection>Зарегистрируйтесь либо войдите, чтобы начать писать заметки</MessageSection>
            }
            <NavigationBar />
        </>
    )
}