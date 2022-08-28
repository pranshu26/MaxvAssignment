import axios from "axios";
import { BASE_URL, DEFAULT_HEADERS } from "./config";
import UserService from "./UserService";

const productService = {
  create: async (campaignId, name, description) => {
    return axios({
      url: `${BASE_URL}/product`,
      method: "post",
      headers: { ...DEFAULT_HEADERS, ...UserService.getAuthHeaders() },
      data: { name, description },
      params: {
        campaignId,
      },
    }).then((res) => {
      return res.data.data;
    });
  },
  getProductsOfCampaign: async (campaignId) => {
    return axios({
      url: `${BASE_URL}/product/${campaignId}`,
      method: "get",
      headers: { ...DEFAULT_HEADERS, ...UserService.getAuthHeaders() },
    }).then((res) => {
      return res.data.data.products;
    });
  },
};

export default productService;
