import './TollBar.scss';
import NoteTab from '../NoteTab/NoteTab';
import HomeTab from '../HomeTab/HomeTab';

export default function TollBar() {

    return(
        <section className="task-bar">
            <NoteTab />
            <HomeTab />
        </section>
    )
}