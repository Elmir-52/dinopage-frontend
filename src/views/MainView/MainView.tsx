import Header from "../../components/Header/Header";
import HomeSection from "../../components/HomeSection/HomeSection";
import MessageSection from "../../components/MessageSection/MessageSection";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import getCookie from "../../utils/getCookie";

export default function MainView() {
    const cookieUserId: string | undefined = getCookie('user_id');

    return(
        <>
            <Header />
            {cookieUserId ? <HomeSection userId={cookieUserId} /> 
            : <MessageSection>Зарегистрируйтесь либо войдите, чтобы начать писать заметки</MessageSection>
            }
            <NavigationBar />
        </>
    )
}