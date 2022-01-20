import Moment from "react-moment";
import React from "react";
import styled from "styled-components";

const ConfirmationRideCard = ({
  name,
  zone,
  return_time,
  access_code = "JN-8080-8080-QQ",
}) => {
  return (
    <Container frameColor={zone.color}>
      <Header>
        <Title>{name}</Title>
        <ZoneName>{zone.name}</ZoneName>
      </Header>
      <Details
        name="Return time"
        value={<Moment format="HH:mm">{return_time}</Moment>}
      />
      <Details name="Confirmation code" value={access_code} />
    </Container>
  );
};

export default ConfirmationRideCard;

const Details = ({ name, value }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      margin: "6px 0",
    }}
  >
    <span style={{ fontWeight: 600, color: "#656565" }}>{name}</span>
    <span
      style={{
        color: "white",
        fontSize: 20,
        fontWeight: 600,
      }}
    >
      {value}
    </span>
  </div>
);

const Container = styled.div`
  width: 100%;
  background: #373737;
  height: 171px;
  position: relative;
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
const Header = styled.div`
  margin-top: 6px;
  display: flex;
  justify-content: space-between;
  padding: 6px;
`;
const ZoneName = styled.span`
  color: #656565;
  font-weight: 600;
`;
const Title = styled.span`
  color: white;
  font-weight: 500;
`;
