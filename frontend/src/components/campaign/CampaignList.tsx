import CampaignListItem from "./CampaignListItem.tsx";
import {useEffect, useState} from "react";
import {getCampaigns} from "../../services/campaignService.ts";
import {Campaign} from "../../types/Campaign.ts";
import Header from "../Header.tsx";

const CampaignList = () => {
    const [campaigns, setCampaigns] = useState<Campaign[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [isRunningFilter, setIsRunningFilter] = useState<string>('');

    const fetchCampaigns = async (searchQuery: string, isRunningFilter: string) => {
        const result = await getCampaigns(searchQuery, isRunningFilter);
        setCampaigns(result);
    };

    useEffect(() => {
        fetchCampaigns(searchQuery, isRunningFilter);
    }, [searchQuery, isRunningFilter]);


    const handleIsRunningFilter = (filter: string) => {
        setIsRunningFilter(filter);
    };

    const onCreateCampaign = (campaignData: Campaign): void => {
        setCampaigns([
            ...campaigns,
            campaignData
        ]);
    }

    return (
        <div className="container mt-4">
            <Header onSearch={(query) => setSearchQuery(query)} onIsRunningFilter={handleIsRunningFilter}
                    onCreateCampaign={onCreateCampaign}/>
            <div className="row">
                {campaigns.length > 0 ? (
                    campaigns.map((campaign) => (
                        <div className="col-lg-4 col-md-6 col-sm-12 mb-4" key={campaign.id}>
                            <CampaignListItem campaign={campaign}/>
                        </div>
                    ))
                ) : (
                    <div className="col-12 d-flex justify-content-center align-items-center" style={{height: '200px'}}>
                        <p className="text-muted">No campaigns available</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CampaignList;
