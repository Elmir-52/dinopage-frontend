import './TabBar.scss';
import { TABS } from '../../shared/data/tabs.data';

interface RibbonOfTabsProps {
    activeTab: string;
    onClick: (tabId: string) => void;
}

export default function TabBar({ activeTab, onClick }: RibbonOfTabsProps) {
    return(
        <div className='tab-bar'>
            {TABS.map(tab => (
                <button
                    key={tab.id}
                    onClick={() => onClick(tab.id)}
                    className={activeTab === tab.id ? 'tab-bar__button tab-bar__active' :'tab-bar__button'}
                >{tab.name}</button>
            ))}
        </div>
    )
}
