import { sellerFirebase } from "../../features/seller-firebase-interaction";
import { useEffect, useState } from "react";
import TeamList from "../../components/seller/team-list";
import styled from "styled-components";
import { SellerHeader } from "../../components/seller/seller-header";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 100%;
`;

const TeamElement = styled.div`
  width: 100%;
  height: 10%;
  text-align: center;
`;

export default function SellerSelect() {
  const [teamList, setTeamList] = useState([]);
  useEffect(() => {
    const init = async () => {
      await sellerFirebase.init();
      setTeamList(
        sellerFirebase.userDocData.team_list.map((val, index) => (
          <TeamElement key={index}>{val}</TeamElement>
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
