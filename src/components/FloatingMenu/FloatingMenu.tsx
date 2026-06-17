import TextColor from "../TextColor/TextColor";
import TextStyleButtons from "../TextStyleButtons/TextStyleButtons";
import './FloatingMenu.scss';

export default function FloatingMenu() {
    return(
        <div className="floating-menu">
            <TextStyleButtons />
            <TextColor />
        </div>
    );
}