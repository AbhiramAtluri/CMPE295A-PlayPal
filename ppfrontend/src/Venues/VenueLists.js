import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllVenuesForOwnerId } from "../reduxSlices/VenueSlice";
import VenueNavBar from "./VenueNavBar";
const filterOptions = ["All", "Approved", "Pending", "Rejected"];
export default function VenueLists() {
  const navigate = useNavigate();
  const [filterSelected, setfilterSelected] = useState("All");
  const [filteredVenues, setfilteredVenues] = useState(
    useSelector((state) => state.venues.allVenuesForOwnerId)
  );
  const dispatch = useDispatch();
  const id = useSelector((state) => state.profileDetails.id);
  const venues = useSelector((state) => state.venues.allVenuesForOwnerId);
  useEffect(() => {
    dispatch(getAllVenuesForOwnerId(id));
  }, [id]);
  useEffect(() => {
    setfilterSelected("All");
    setfilteredVenues(venues);
  }, [venues]);

  const handleFilterChange = (event) => {
    setfilterSelected(event.target.value);
    if (event.target.value != "All") {
      setfilteredVenues(
        venues.filter(
          (x) =>
            x.verificationStatus.toUpperCase() ===
            event.target.value.toUpperCase()
        )
      );
    } else {
      setfilteredVenues(venues);
    }
  };
  return (
    <div>
      <div>
        <VenueNavBar />
      </div>
      <div
        style={{
          display: "flex",
          margin: "1%",
          justifyContent: "space-between",
        }}
      >
        <FormControl sx={{ m: 1, width: 300 }}>
          <InputLabel id="demo-multiple-name-label">Filter</InputLabel>
          <Select
            labelId="demo-multiple-name-label"
            id="demo-multiple-name"
            value={filterSelected}
            onChange={handleFilterChange}
            input={<OutlinedInput label="Name" />}
          >
            {filterOptions.map((name) => (
              <MenuItem key={name} value={name}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button onClick={() => navigate("/venueOwner/venue/new")}>
          Add a Venue
        </Button>
      </div>
      <div>
        {filteredVenues.map((venue) => (
          <p>{venue.venuename}</p>
        ))}
      </div>
    </div>
  );
}
