import {Campaign} from "../../types/Campaign.ts";
import {useNavigate} from "react-router-dom";
import PayoutList from "../PayoutList.tsx";
import {useState} from "react";
import {updateCampaignRunning} from "../../services/campaignService.ts";
import {getCampaignById} from "../../services/campaignService.ts";

const CampaignListItem = ({campaign}: { campaign: Campaign }) => {
    const [campaignData, setCampaignData] = useState<Campaign>(campaign);
    const navigate = useNavigate();

    const toggleRunning = async () => {
        try {
            if (campaignData.id) {
                await updateCampaignRunning(campaignData.id, !campaignData.isRunning);
                setCampaignData({...campaignData, ...{isRunning: !campaignData.isRunning}});
            }
        } catch (error) {
            console.error("Failed to update campaign running state", error);
        }
    };

    const handleVisitCampaign = async () => {
        try {
            if (campaignData.id) {
                const fetchCampaignById = await getCampaignById(campaignData.id);
                setCampaignData(fetchCampaignById);
                navigate(`/campaign/${fetchCampaignById.id}`);
            }
        } catch (error) {
            console.error("Error occurred when fetching campaign data:", error);
        }
    };

    return (
        <div className="card card-hover border rounded shadow-sm h-100">
            <div className="card-body p-1 d-flex flex-column">
                <div className="d-flex justify-content-between align-items-start mb-2">
                    <h5 className="card-title mb-0">{campaignData.title}</h5>
                    <div className="form-check form-switch">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            checked={campaignData?.isRunning}
                            onChange={toggleRunning}
                        />
                        <span className={`badge ${campaignData.isRunning ? 'bg-success' : 'bg-secondary'}`}>
                            {campaignData.isRunning ? 'Running' : 'Stopped'}
                        </span>
                    </div>
                </div>

                <div className="d-flex align-items-center">
                    <a
                        href={campaignData.landingPageUrl}
                        target="_blank"
                        className="d-inline-block text-truncate"
                        style={{maxWidth: '100%'}}
                    >
                        {campaignData.landingPageUrl}
                    </a>
                </div>

                {Array.isArray(campaignData.payouts) && campaignData.payouts.length > 0 && (
                    <PayoutList payouts={campaignData.payouts}/>
                )}

                <button
                    onClick={handleVisitCampaign}
                    className="btn btn-outline-primary btn-sm w-100 mt-auto text-center">
                    Visit Campaign
                </button>
            </div>
        </div>
    );
};

export default CampaignListItem;
