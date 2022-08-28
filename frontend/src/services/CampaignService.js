import axios from "axios";
import { BASE_URL, DEFAULT_HEADERS } from "./config";
import UserService from "./UserService";

const CampaignService = {
  getCampaigns: async () => {
    return axios({
      url: `${BASE_URL}/campaign/`,
      method: "get",
      headers: { ...DEFAULT_HEADERS, ...UserService.getAuthHeaders() },
    }).then((res) => {
      return res.data.data.campaigns;
    });
  },
  getCampaignDetail: async (campaignId) => {
    return axios({
      url: `${BASE_URL}/campaign/${campaignId}`,
      method: "get",
      headers: { ...DEFAULT_HEADERS, ...UserService.getAuthHeaders() },
    }).then((res) => {
      return res.data.data.campaign;
    });
  },
  createCampaign: async (
    durationInMonths,
    budget,
    name,
    campaignScript,
    campaignChannels,
    ageMin,
    ageMax,
    gender,
    location
  ) => {
    return axios({
      url: `${BASE_URL}/campaign/`,
      method: "POST",
      headers: { ...DEFAULT_HEADERS, ...UserService.getAuthHeaders() },
      data: {
        durationInMonths,
        budget,
        name,
        campaignScript,
        campaignChannels,
        ageMin,
        ageMax,
        gender,
        location,
      },
    }).then((res) => res.data.data.campaign);
  },
  editCampaign: async (
    campaignId,
    durationInMonths,
    budget,
    name,
    campaignScript,
    campaignChannels,
    ageMin,
    ageMax,
    gender,
    location
  ) => {
    return axios({
      url: `${BASE_URL}/campaign/${campaignId}`,
      method: "put",
      headers: { ...DEFAULT_HEADERS, ...UserService.getAuthHeaders() },
      data: {
        durationInMonths,
        budget,
        name,
        campaignScript,
        campaignChannels,
        ageMin,
        ageMax,
        gender,
        location,
      },
    });
  },
  deleteCampaign: async (campaignId) => {
    return axios({
      url: `${BASE_URL}/campaign/delete/${campaignId}`,
      method: "put",
      headers: { ...DEFAULT_HEADERS, ...UserService.getAuthHeaders() },
    });
  },
  assignInfluencer: async (campaignId, influencerId) => {
    return axios({
      url: `${BASE_URL}/campaign/${campaignId}`,
      method: "post",
      data: { influencerId },
      headers: { ...DEFAULT_HEADERS, ...UserService.getAuthHeaders() },
    });
  },
  fetchInfluencer: async () => {
    return axios({
      url: `${BASE_URL}/campaign/influencer`,
      headers: { ...DEFAULT_HEADERS, ...UserService.getAuthHeaders() },
    });
  },
};

export default CampaignService;
