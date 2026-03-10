import './_RibbonOfTabs.scss';
import { TABS } from '../../shared/data/tabs.data';

interface RibbonOfTabsProps {
    activeTab: string;
    onClick: (tabId: string) => void;
}

export default function RibbonOfTabs({ activeTab, onClick }: RibbonOfTabsProps) {
    return(
        <div className='tool-bar'>
            {TABS.map(tab => (
                <button
                    key={tab.id}
                    onClick={() => onClick(tab.id)}
                    className={activeTab === tab.id ? 'tool-bar__button tool-bar__active' :'tool-bar__button'}
                >{tab.name}</button>
            ))}
        </div>
    )
}
