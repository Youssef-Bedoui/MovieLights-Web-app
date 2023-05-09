import React from "react";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import "./rateStars.css";

export default function RateStars({ rate }) {
  const value = (rate % 5);


  return (
    <Stack spacing={0}>
        <Rating
          name="half-rating"
          value={value}
          precision={0.1}
          readOnly
        />
      </Stack>
  );
}
