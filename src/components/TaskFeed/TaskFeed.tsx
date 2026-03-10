import { useState } from 'react';
import RibbonOfTabs from '../RibbonOfTabs/RibbonOfTabs';
import './_TaskFeed.scss';
import NoteTab from '../NoteTab/NoteTab';

export default function TaskFeed() {
    const [activeTab, setActiveTab] = useState<string>('note');

    return(
        <section className="task-feed">
            <RibbonOfTabs 
                activeTab={activeTab} 
                onClick={(tabId: string) => setActiveTab(tabId)} 
            />

            {activeTab === 'note' && <NoteTab />}
        </section>
    )
}