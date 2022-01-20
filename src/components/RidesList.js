import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import RideCard from "./RideCard";

const RidesList = ({ rideId, setRideId, _ref }) => {
  const rides = useSelector((state) => state.rides);
  return (
    <List ref={_ref}>
      {rides.map((r) => (
        <RideCard
          key={r.id}
          selectedRide={rideId === r.id}
          setRideId={setRideId}
          {...r}
        />
      ))}
    </List>
  );
};

export default RidesList;

const List = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
