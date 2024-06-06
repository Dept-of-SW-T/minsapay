import { sellerFirebase } from "../../features/seller-firebase-interaction";
import { useEffect, useState } from "react";
import TeamList from "../../components/seller/team-list";
import styled from "styled-components";

const Wrapper = styled.div``;

export default function SellerSelect() {
  const [teamList, setTeamList] = useState([]);
  useEffect(() => {
    const init = async () => {
      await sellerFirebase.init();
      setTeamList(sellerFirebase.userDocData.team_list);
    };
    init();
  }, []);
  return (
    <Wrapper>
      <TeamList datalist={teamList} />
    </Wrapper>
  );
}
