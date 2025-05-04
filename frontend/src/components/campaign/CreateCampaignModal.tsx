import React, {useState} from 'react';
import {Country} from "../../types/Country";
import {createCampaign} from "../../services/campaignService";
import {Campaign} from "../../types/Campaign.ts";
import {Payout} from "../../types/Payout.ts";

interface CreateCampaignModalProps {
    closeModal: () => void;
    onCreateCampaign: (campaignData: Campaign) => void;
}

const CreateCampaignModal: React.FC<CreateCampaignModalProps> = ({closeModal, onCreateCampaign}) => {
    const [campaignData, setCampaignData] = useState<Campaign>({isRunning: false, payouts: [{country: Country.Estonia} as Payout]} as Campaign);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, index?: number): void => {
        const {name, value} = e.currentTarget;
        if (name === 'landingPageUrl') {
            setCampaignData({
                ...campaignData,
                landingPageUrl: value
            } as Campaign);
        } else if (name === 'title') {
            setCampaignData({
                ...campaignData,
                title: value
            } as Campaign);
        } else if (name === 'isRunning' && e.currentTarget.type === 'checkbox') {
            setCampaignData({
                ...campaignData,
                isRunning: e.currentTarget.checked
            } as Campaign);
        } else if (name === 'country' && index !== undefined) {
            const updatedPayouts = campaignData.payouts;
            updatedPayouts[index].country = value as Country;
            setCampaignData({
                ...campaignData,
                payouts: updatedPayouts
            } as Campaign);
        } else if (name === 'amount' && index !== undefined) {
            const updatedPayouts = campaignData?.payouts;
            updatedPayouts[index].amount = Number(value);
            setCampaignData({
                ...campaignData,
                payouts: updatedPayouts
            } as Campaign);
        }
    };

    const handleAddPayout = () => {
        setCampaignData({
            ...campaignData,
            payouts: [
                ...campaignData.payouts,
                {country: Country.Estonia} as Payout
            ]
        } as Campaign);
    };

    const handleRemovePayout = (index: number) => {
        const updatedPayouts = [...campaignData.payouts];
        updatedPayouts.splice(index, 1);
        setCampaignData({
            ...campaignData,
            payouts: updatedPayouts
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const createdCampaign = await createCampaign(campaignData);
            console.log('Created Campaign:', createdCampaign);
            onCreateCampaign(createdCampaign);
            closeModal();
        } catch (error) {
            console.error('Error creating campaign:', error);
        }
    };

    return (
        <>
            <div className="modal-backdrop fade show"></div>

            <div className="modal fade show" tabIndex={-1} style={{display: 'block'}}
                 aria-labelledby="createCampaignModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <form onSubmit={handleSubmit}>

                            <div className="modal-header">
                                <h5 className="modal-title" id="createCampaignModalLabel">Create New Campaign</h5>
                                <button type="button" className="btn-close" onClick={closeModal}></button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label htmlFor="landingPageUrl" className="form-label">Campaign URL</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="landingPageUrl"
                                        name="landingPageUrl"
                                        required
                                        onChange={(e) => handleInputChange(e)}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Campaign Title</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="title"
                                        name="title"
                                        required
                                        onChange={(e) => handleInputChange(e)}
                                    />
                                </div>

                                <div className="mb-3 form-check">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="isRunning"
                                        name="isRunning"
                                        onChange={(e) => handleInputChange(e)}
                                    />
                                    <label className="form-check-label" htmlFor="isRunning">Campaign Running</label>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Payouts</label>
                                    {campaignData.payouts.map((payout, index) => (
                                        <div key={index} className="d-flex justify-content-between align-items-center">
                                            <div className="w-100">
                                                <input
                                                    type="number"
                                                    className="form-control mb-2"
                                                    name="amount"
                                                    placeholder="Amount"
                                                    value={payout.amount}
                                                    onChange={(e) => handleInputChange(e, index)}
                                                    required
                                                />
                                                <select
                                                    className="form-select mb-2"
                                                    name="country"
                                                    value={payout.country}
                                                    onChange={(e) => handleInputChange(e, index)}
                                                    required
                                                >
                                                    {Object.keys(Country).map((key) => (
                                                        <option key={key} value={key}>
                                                            {key}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            {campaignData.payouts.length > 1 && (
                                                <button
                                                    type="button"
                                                    className="btn btn-danger ms-2"
                                                    onClick={() => handleRemovePayout(index)}
                                                >
                                                    Remove
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                    <button type="button" className="btn btn-secondary mt-2" onClick={handleAddPayout}>
                                        Add Payout
                                    </button>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <div className="mt-3">
                                    <button type="submit" className="btn btn-primary">Save Campaign</button>
                                </div>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </>
    );
};

export default CreateCampaignModal;
