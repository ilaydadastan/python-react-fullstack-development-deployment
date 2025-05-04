import CreateCampaignButton from "./campaign/CreateCampaign.tsx";
import {Campaign} from "../types/Campaign.ts";
import Filter from "./Filter.tsx";

interface HeaderProps {
    onSearch: (searchQuery: string) => void;
    onIsRunningFilter: (filter: string) => void;
    onCreateCampaign: (campaignData: Campaign) => void;
}


const Header = ({onSearch, onIsRunningFilter, onCreateCampaign}: HeaderProps) => {
    return (
        <div className="row mb-4 align-items-center">
            <Filter onSearch={onSearch} onIsRunningFilter={onIsRunningFilter}/>
            <div className="col-lg-4">
                <div className="d-inline-block" style={{height: '100%'}}>
                    <CreateCampaignButton onCreateCampaign={onCreateCampaign}/>
                </div>
            </div>
        </div>
    )

};

export default Header;
