import axios from "axios";
import { BASE_URL, DEFAULT_HEADERS } from "./config";
import UserService from "./UserService";

const InfluencerService = {
  create: async (campaignId, influencerId) => {
    return axios({
      url: `${BASE_URL}/campaign/${campaignId}/influencer/`,
      method: "post",
      headers: { ...DEFAULT_HEADERS, ...UserService.getAuthHeaders() },
      data: { influencerId },
    }).then((res) => {
      return res.data.data.influencer;
    });
  },
  getCampaignInflucencer: async (campaignId) => {
    return axios({
      url: `${BASE_URL}/campaign/${campaignId}/influencer`,
      method: "get",
      headers: { ...DEFAULT_HEADERS, ...UserService.getAuthHeaders() },
    }).then((res) => {
      return res.data.data.influencer;
    });
  },
};

export default InfluencerService;
