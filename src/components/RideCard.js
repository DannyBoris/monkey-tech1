import React from "react";
import styled from "styled-components";
import Moment from "react-moment";
import { ReactComponent as TicketIcon } from "../assets/ico-g-01.svg";
import { ReactComponent as ClockIcon } from "../assets/ico-g-03.svg";
import { MOBILE_BREAKPOINT } from "../utils";

const RideCard = ({
  name,
  id,
  remaining_tickets,
  return_time,
  zone,
  selectedRide,
  setRideId,
  ridesCount,
}) => {
  const { name: zoneName, color } = zone;
  return (
    <StyledCard
      selectedCard={selectedRide}
      onClick={() => setRideId(id)}
      frameColor={color}
      disabledFlexGrow={ridesCount}
    >
      <ZoneName>{zoneName}</ZoneName>
      <Title>{name}</Title>
      <InfoContainer>
        <Info
          Icon={ClockIcon}
          text={<Moment format="HH:mm">{return_time}</Moment>}
        />
        <Info Icon={TicketIcon} text={remaining_tickets} />
      </InfoContainer>
    </StyledCard>
  );
};

export default RideCard;

const Info = ({ Icon, text }) => (
  <div style={{ display: "flex", alignItems: "center" }}>
    <Icon />
    <span style={{ color: "#656565" }}>{text}</span>
  </div>
);

const StyledCard = styled.div`
  width: calc(25% - 12px);
  margin: 6px;
  flex: 0 1 auto;
  flex-gap: 1px;
  box-sizing: border-box;
  height: 171px;
  background: ${(props) => (props.selectedCard ? props.frameColor : "#373737")};
  transition: background 0.3s ease;
  display: flex;
  padding: 4px;
  flex-direction: column;
  position: relative;
  justify-content: space-around;
  cursor: pointer;
  ${MOBILE_BREAKPOINT} {
    width: calc(50% - 12px);
  }
  &:before {
    content: "";
    width: 100%;
    height: 6px;
    background: ${(props) => props.frameColor};
    top: 0;
    left: 0;
    position: absolute;
  }
`;

const ZoneName = styled.span`
  align-self: flex-end;
  color: #656565;
  font-weight: 600;
`;
const Title = styled.h2`
  text-align: center;
  color: white;
  font-size: 28px;
  font-weight: 500;
  flex: 1;
`;
const InfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
