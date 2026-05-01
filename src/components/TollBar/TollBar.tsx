import { useState } from 'react';
import TabBar from '../TabBar/TabBar';
import './TollBar.scss';
import NoteTab from '../NoteTab/NoteTab';
import HomeTab from '../HomeTab/HomeTab';

export default function TollBar() {
    const [activeTab, setActiveTab] = useState<string>('home');

    return(
        <section className="task-bar">
            <TabBar 
                activeTab={activeTab} 
                onClick={(tabId: string) => setActiveTab(tabId)} 
            />

            {activeTab === 'note' && <NoteTab />}
            {activeTab === 'home' && <HomeTab /> }
        </section>
    )
}