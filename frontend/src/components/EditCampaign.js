import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import { useParams } from "react-router-dom";

export default function EditCampaign() {
  const params = useParams();

  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [ageMin, setAgeMin] = useState(0);
  const [ageMax, setAgeMax] = useState(0);
  const [campaignChannels, setCampaignChannels] = useState([]);
  const [campaignScript, setCampaignScript] = useState("");
  const [budget, setBudget] = useState(0);
  const [durationInMonths, setDurationInMonths] = useState(0);
  const [campaignId, setCampaignId] = useState(null);

  let isNew = !!campaignId;

  useEffect(() => {
    console.log(params);
    setCampaignId(campaignId);
  }, [params]);

  return <Container></Container>;
}
