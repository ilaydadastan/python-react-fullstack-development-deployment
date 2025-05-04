import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {Campaign} from "../../types/Campaign.ts";
import {getCampaignById} from "../../services/campaignService.ts";

const CampaignDetail = () => {
    const {id} = useParams();
    const [campaignData, setCampaignData] = useState<Campaign | null>(null);

    useEffect(() => {
        console.log("Fetching campaign with id:", id);
        getCampaignById(Number(id))
            .then((data) => {
                console.log("Campaign data received:", data);
                setCampaignData(data);
            })
            .catch((error) => {
                console.error("Failed to fetch campaign:", error);
            });
    }, [id]);

    if (!campaignData) return <div className="container mt-5">Loading...</div>;

    return (
        <div className="container my-5">
  <div className="row justify-content-center">
    <div className="col-xl-10 col-lg-8 col-md-10">
      <div className="card shadow-sm border-0">
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">Campaign Details</h5>
        </div>
        <div className="card-body">
          <div className="mb-3">
            <h6 className="text-muted">Title</h6>
            <p className="fw-bold">{campaignData.title}</p>
          </div>
          <div className="mb-3">
            <h6 className="text-muted">Landing Page URL</h6>
            <a href={campaignData.landingPageUrl} target="_blank" rel="noopener noreferrer">
              {campaignData.landingPageUrl}
            </a>
          </div>
          <div className="mb-3">
            <h6 className="text-muted">Running Status</h6>
            <span className={`badge ${campaignData.isRunning ? 'bg-success' : 'bg-secondary'}`}>
              {campaignData.isRunning ? 'Running' : 'Paused'}
            </span>
          </div>

          <div className="mb-3">
            <h6 className="text-muted">Payouts</h6>
            {campaignData.payouts && campaignData.payouts.length > 0 ? (
              <div className="list-group">
                {campaignData.payouts.map((payout, index) => (
                  <div key={index} className="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                      <div><strong>Country:</strong> {payout.country}</div>
                      <div><strong>Amount:</strong> ${payout.amount}</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted">No payout data available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>


    );
};

export default CampaignDetail;
