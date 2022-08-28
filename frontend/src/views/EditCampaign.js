import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import { useParams } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import Checkbox from "@mui/material/Checkbox";
import LoadingButton from "@mui/lab/LoadingButton";
import { useNavigate } from "react-router-dom";

import CampaignService from "../services/CampaignService";
import ProductService from "../services/ProductService";
import InfluencerService from "../services/InfluencerService";

export default function EditCampaign() {
  const params = useParams();
  let navigate = useNavigate();

  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [ageMin, setAgeMin] = useState(18);
  const [ageMax, setAgeMax] = useState(24);
  const [channels, setChannels] = useState([]);
  const [campaignScript, setCampaignScript] = useState("");
  const [budget, setBudget] = useState(0);
  const [durationInMonths, setDurationInMonths] = useState(0);
  const [location, setLocation] = useState("Bengaluru");
  const [campaignId, setCampaignId] = useState(null);

  const [products, setProducts] = useState([]);
  const [newProductName, setNewProductName] = useState("");
  const [newProductDescription, setNewProductDescription] = useState("");

  const [influencers, setInfluencers] = useState([]);
  const [newInfluencerId, setNewInfluencerId] = useState();
  const [availableInfluencers, setAvailableInfluencers] = useState([]);

  const [saveLoading, setSaveLoading] = useState(false);

  let isNew = params.campaignId?.toLowerCase() === "new";

  const initializeCampaignValues = (campaign) => {
    setName(campaign.name);
    setGender(campaign.gender);
    setAgeMin(campaign.ageMin);
    setAgeMax(campaign.ageMax);
    setChannels(campaign.channels?.map((c) => c.label) || []);
    setCampaignScript(campaign.campaignScript);
    setBudget(campaign.budget);
    setDurationInMonths(campaign.budget);
    setInfluencers(campaign.influencersArray);
  };

  const getCampaignAndProduct = (campaignId) => {
    CampaignService.getCampaignDetail(campaignId).then(
      initializeCampaignValues
    );
    ProductService.getProductsOfCampaign(campaignId).then(setProducts);
    InfluencerService.getCampaignInflucencer(campaignId).then(
      setAvailableInfluencers
    );
  };

  useEffect(() => {
    let { campaignId } = params;
    setCampaignId(campaignId);
    if (!isNew) {
      getCampaignAndProduct(campaignId);
    }
  }, []);

  // useEffect(() => console.log(newInfluencerId), [newInfluencerId]);

  const switchChannel = (channelName) => {
    let channelsCopy = [...channels];
    if (!channels.includes(channelName)) {
      channelsCopy.push(channelName);
    } else {
      channelsCopy = channelsCopy.filter((c) => c != channelName);
    }
    setChannels(channelsCopy);
  };

  const saveCampaign = () => {
    setSaveLoading(true);
    let promise;
    if (isNew) {
      promise = CampaignService.createCampaign(
        durationInMonths,
        budget,
        name,
        campaignScript,
        channels.join(","),
        ageMin,
        ageMax,
        gender,
        location
      )
        .then((campaignInstance) => {
          return Promise.allSettled(
            products.map((product) => {
              ProductService.create(
                campaignInstance.campaignId,
                product.name,
                product.description
              );
            })
          );
        })
        .then(() => {
          navigate(`/campaigns`);
        });
    } else {
      promise = CampaignService.editCampaign(
        campaignId,
        durationInMonths,
        budget,
        name,
        campaignScript,
        channels.join(","),
        ageMin,
        ageMax,
        gender,
        location
      );
    }
    promise.finally(() => setSaveLoading(false));
  };

  const saveProduct = () => {
    let promise;
    if (isNew) {
      setProducts(
        products.concat({
          name: newProductName,
          description: newProductDescription,
        })
      );
    } else {
      ProductService.create(
        campaignId,
        newProductName,
        newProductDescription
      ).then((res) => {
        getCampaignAndProduct(campaignId);
        setNewProductName("");
        setNewProductDescription("");
      });
    }
  };

  const saveInfluencer = () => {
    let promise;
    if (isNew) {
      setInfluencers(influencers.concat(newInfluencerId));
    } else {
      InfluencerService.create(campaignId, newInfluencerId).then((res) => {
        getCampaignAndProduct(campaignId);
      });
    }
  };

  return (
    <Box display="flex" flexDirection="column" gap={2} maxWidth={1000}>
      <Typography variant="h2">
        {isNew ? "Create a New Campaign" : name}
      </Typography>
      <FormControl>
        <TextField
          labelId="campaign-name"
          fullWidth
          label="Campaign Name"
          id="search-campaign"
          value={name}
          defaultValue={name}
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>
      <FormControl>
        <InputLabel id="age-select-label">Gender</InputLabel>
        <Select
          labelId="age-select-label"
          id="demo-simple-select"
          value={gender}
          label="Gender"
          onChange={(e) => setGender(e.target.value)}
        >
          <MenuItem value={"Male"}>Male</MenuItem>
          <MenuItem value={"Female"}>Female</MenuItem>
        </Select>
      </FormControl>
      <Typography variant="h5">Target Age</Typography>
      <RangeSlider
        min={ageMin}
        max={ageMax}
        setMin={setAgeMin}
        setMax={setAgeMax}
      />
      <Typography variant="h5">Channels</Typography>
      <div>
        <FormControlLabel
          control={
            <Checkbox
              checked={channels.includes("instagram")}
              onChange={() => switchChannel("instagram")}
            />
          }
          label="Instagram"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={channels.includes("youtube")}
              onChange={() => switchChannel("youtube")}
            />
          }
          label="Youtube"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={channels.includes("facebook")}
              onChange={() => switchChannel("facebook")}
            />
          }
          label="Facebook"
        />
      </div>
      <TextField
        id="outlined-multiline-static"
        label="Campaign Script"
        multiline
        minRows={4}
        value={campaignScript}
        onChange={(e) => setCampaignScript(e.target.value)}
      />
      <TextField
        type="number"
        label="Campaign Budget"
        value={budget}
        onChange={(e) => setBudget(e.target.value)}
      />
      <TextField
        type="number"
        label="Campaign Duration In Months"
        value={durationInMonths}
        onChange={(e) => setDurationInMonths(e.target.value)}
      />

      <Typography variant="h5">Products</Typography>
      {products.map(({ productId, name, description }) => (
        <Product {...{ productId, name, description }} />
      ))}
      <Box display="flex" gap={2} alignItems="center">
        <TextField
          label="Name"
          value={newProductName}
          onChange={(e) => setNewProductName(e.target.value)}
        />
        <TextField
          label="Description"
          value={newProductDescription}
          onChange={(e) => setNewProductDescription(e.target.value)}
        />
        <Button variant="contained" multiline onClick={saveProduct}>
          Save Product
        </Button>
      </Box>

      <Typography variant="h5">Influencers</Typography>
      {influencers.map(({ influencerId, name }) => (
        <Influencer {...{ influencerId, name }} />
      ))}
      <Box display="flex" gap={2} alignItems="center">
        <FormControl>
          <InputLabel id="influencer-select-label">Influencer</InputLabel>
          <Select
            labelId="influencer-select-label"
            id="demo-simple-select"
            value={newInfluencerId}
            label="Influencer"
            onChange={(e) => setNewInfluencerId(e.target.value)}
          >
            {availableInfluencers.map((influencer) => {
              return (
                <MenuItem value={influencer.id}>{influencer.name}</MenuItem>
              );
            })}
          </Select>
        </FormControl>

        <Button variant="contained" multiline onClick={saveInfluencer}>
          Choose Influencer
        </Button>
      </Box>

      <LoadingButton
        variant="contained"
        loading={saveLoading}
        onClick={saveCampaign}
      >
        {isNew ? "Create Campaign" : "Save Campaign"}
      </LoadingButton>
    </Box>
  );
}

function Product({ productId, name, description }) {
  return (
    <Box key={productId} display="flex" gap={2} alignItems="center">
      <Typography variant="h6">{name}</Typography>
      <Typography variant="body1">{description}</Typography>
    </Box>
  );
}

function Influencer({ influencerId, name }) {
  return (
    <Box key={influencerId} display="flex" gap={2} alignItems="center">
      <Typography variant="h6">{name}</Typography>
    </Box>
  );
}

function RangeSlider({ min, max, setMin, setMax }) {
  function getValueText(value) {
    return `${value}°C`;
  }

  const minDistance = 1;

  const handleChange1 = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setMin(Math.min(newValue[0], max - minDistance));
    } else {
      setMax(Math.max(newValue[1], min + minDistance));
    }
  };

  return (
    <Box>
      <Slider
        min={14}
        max={30}
        valueLabelDisplay="on"
        getAriaLabel={() => "Minimum distance"}
        value={[min, max]}
        onChange={handleChange1}
        getAriaValueText={getValueText}
        disableSwap
      />
    </Box>
  );
}
