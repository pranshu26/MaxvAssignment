const { CHANNELS } = require("../../constants");

exports.attachChannels = (campaign) => {
  if (!campaign.campaignChannels) return [];
  let channels = campaign.campaignChannels.split(",");
  let channelArray = [];
  channels.forEach((obj) => {
    channelArray.push(CHANNELS[obj]);
  });
  return channelArray;
};
