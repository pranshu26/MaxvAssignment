import React, { userEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Box from "@mui/material/Box";
import moment from "moment";
import { useNavigate } from "react-router-dom";

export default function Campaign(props) {
  let navigate = useNavigate();

  let channelsAvailable = props.channels && props.channels.length > 0;

  return (
    <Card
      style={{ marginTop: 20 }}
      key={props.key}
      onClick={() => navigate(`/campaign/${props.campaignId}`)}
    >
      <CardActionArea>
        <CardContent>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
          >
            <Box>
              <Typography gutterBottom variant="h4" component="div">
                {props.name}
              </Typography>
              <Typography gutterBottom variant="body1" component="div">
                Running On
              </Typography>
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="flex-start"
              >
                {channelsAvailable &&
                  props.channels.map((channel) => {
                    return (
                      <img
                        style={{ borderRadius: "50%", marginRight: 2 }}
                        height={35}
                        width={35}
                        src={channel.image}
                        alt="Channel Image"
                      />
                    );
                  })}
              </Box>
            </Box>
            <Typography variant="body1">
              {moment(props.addedOn).format("MMMM DD, YYYY")}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
