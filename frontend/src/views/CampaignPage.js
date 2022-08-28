import React, { useEffect, useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import { InputBase, Box, TextField, Container } from "@mui/material";
import Button from "@mui/material/Button";
import Campaign from "../components/Campaign";
import CampaignService from "../services/CampaignService";
import { useNavigate } from "react-router-dom";

export default function CampaignPage() {
  let navigate = useNavigate();
  const [search, setSearch] = useState();
  const [campaigns, setCampaigns] = useState([]);

  //   useEffect(() => console.log(campaigns), [campaigns]);

  useEffect(() => {
    CampaignService.getCampaigns().then(setCampaigns);
  }, []);

  return (
    <div>
      <Box display={"flex"} flexDirection="row" justifyContent="center">
        <Box
          display={{ xs: "none", sm: "inherit" }}
          flexDirection="row"
          justifyContent="center"
          alignItems="center"
          marginRight="20px"
          width={50}
        >
          <SearchIcon />
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          width={{ sm: 500, xs: "80%" }}
        >
          <TextField fullWidth label="Search Campaign" id="search-campaign" />
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          width={{ sm: 500, xs: "80%" }}
        >
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => {
              navigate("/campaign/new");
            }}
          >
            Create New Campaign
          </Button>
        </Box>
      </Box>
      <Container>
        {campaigns.map((campaign) => (
          <Campaign {...campaign} />
        ))}
      </Container>
    </div>
  );
}
