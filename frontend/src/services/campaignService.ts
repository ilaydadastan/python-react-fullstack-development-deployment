import AxiosMockAdapter from 'axios-mock-adapter';
import {Campaign} from "../types/Campaign.ts";
import {axiosInstance} from "./apiService.ts";
import {campaignData} from "../mocks/Campaign.ts";

const USE_MOCK_API = import.meta.env.VITE_USE_MOCK_API === 'true';


if (USE_MOCK_API) {
    const mock = new AxiosMockAdapter(axiosInstance, {delayResponse: 300});

    const mockResponse = {
        data: campaignData,
    };

    mock.onGet('/campaigns').reply(200, mockResponse);
}

export const getCampaigns = async (searchQuery: string, isRunning: string): Promise<Campaign[]> => {
    const res = await axiosInstance.get('/campaigns', {
        params: {
            search: searchQuery,
            isRunning: isRunning,
        },
    });
    return res.data;
};

export const updateCampaignRunning = async (id: number, isRunning: boolean): Promise<Campaign[]> => {
    const res = await axiosInstance.put(`/campaigns/${id}/running`,
        isRunning,
        {headers: {'Content-Type': 'application/json'}});
    return res.data;
};


export const getCampaignById = async (id: number): Promise<Campaign> => {
    const res = await axiosInstance.get(`/campaigns/${id}`);
    return res.data;
};

export const createCampaign = async (newCampaignData: Campaign): Promise<Campaign> => {
    try {
        const response = await axiosInstance.post('/campaigns', newCampaignData);
        return response.data;
    } catch (error) {
        console.error('Error creating campaign:', error);
        throw error;
    }
};
