import React, { useState } from 'react';
import CreateCampaignModal from "./CreateCampaignModal.tsx";
import {Campaign} from "../../types/Campaign.ts";

interface CreateCampaignProps {
    onCreateCampaign: (campaignData: Campaign) => void;
}

const CreateCampaign: React.FC<CreateCampaignProps> = ({onCreateCampaign}) => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const openModal = (): void => {
    setShowModal(true);
  };

  const closeModal = (): void => {
    setShowModal(false);
  };

  return (
    <div>
      <button
        className="btn btn-primary ms-2"
        onClick={openModal}
      >
        Create Campaign
      </button>

      {showModal && <CreateCampaignModal closeModal={closeModal} onCreateCampaign={onCreateCampaign}/>}
    </div>
  );
};

export default CreateCampaign;
