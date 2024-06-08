import { sellerFirebase } from "../../features/seller-firebase-interaction";
import { useEffect, useState } from "react";
import TeamList from "../../components/seller/team-list";
import styled from "styled-components";
import { SellerHeader } from "../../components/seller/seller-header";
import { BORDER_GRAY, MINSAPAY_BLUE } from "../../components/theme-definition";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 100%;
`;

// const TeamElement = styled.div`
//   width: 90%;
//   height: 10%;
//   text-align: center;
//   border-radius: 30px;
//   background-color: #66A3FF;
// `;

const TeamElement = styled.div`
  border: 3px solid ${BORDER_GRAY};
  border-radius: 40px;
  background-color: ${MINSAPAY_BLUE};
  width: 90%;
  height: 10%;
  font-family: "Candara";
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  color: #fff;
  &:hover {
    background-color: #ddd;
    cursor: pointer;
  }
`;

export default function SellerSelect() {
  const navigate = useNavigate();
  const [teamList, setTeamList] = useState([]);

  const onTeamSelect = (e) => {
    console.log(e.target.id);
    navigate("../seller-home/" + e.target.id);
  };

  useEffect(() => {
    const init = async () => {
      await sellerFirebase.init();
      setTeamList(
        sellerFirebase.userDocData.team_list.map((val, index) => (
          <TeamElement key={index} onClick={onTeamSelect} id={val}>
            {val}
          </TeamElement>
        )),
      );
    };
    init();
  }, []);
  return (
    <Wrapper>
      <SellerHeader />
      <TeamList datalist={teamList} />
    </Wrapper>
  );
}
