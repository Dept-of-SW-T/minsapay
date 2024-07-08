import { sellerFirebase } from "../../features/seller-firebase-interaction";
import { useEffect, useState } from "react";
import TeamList from "../../components/seller/team-list";
import styled from "styled-components";
import { SellerHeader } from "../../components/seller/seller-header";
import {
  MINSAPAY_BLUE,
  MINSAPAY_TITLE,
} from "../../components/theme-definition";
import { useNavigate } from "react-router-dom";
import { onSnapshot } from "firebase/firestore";
import Loading from "../../components/loading";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 100%;
`;

const TeamElement = styled.div`
  border-radius: 40px;
  background-color: ${MINSAPAY_BLUE};
  width: 90%;
  height: 10%;
  font-family: ${MINSAPAY_TITLE};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  color: #fff;
  &:hover {
    background-color: #66a3ffa1;
    cursor: pointer;
  }
`;

export default function SellerSelect() {
  const navigate = useNavigate();
  const [teamList, setTeamList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const onTeamSelect = (e) => {
    navigate("../seller-home/seller-team/" + e.target.id);
  };

  useEffect(() => {
    let unsubscribe = null;
    const init = async () => {
      await sellerFirebase.init();
      setTeamList(
        sellerFirebase.userDocData.team_list.map((val, index) => (
          <TeamElement key={index} onClick={onTeamSelect} id={val}>
            {val}
          </TeamElement>
        )),
      );
      unsubscribe = onSnapshot(sellerFirebase.userDocRef, (doc) => {
        sellerFirebase.userDoc = doc;
        sellerFirebase.userDocData = doc.data();
        setTeamList(
          sellerFirebase.userDocData.team_list.map((val, index) => (
            <TeamElement key={index} onClick={onTeamSelect} id={val}>
              {val}
            </TeamElement>
          )),
        );
      });
      setIsLoading(false);
    };
    init();
    return () => {
      unsubscribe && unsubscribe();
    };
  }, []);
  return (
    <Wrapper>
      <SellerHeader />
      {isLoading ? <Loading /> : <TeamList datalist={teamList} />}
    </Wrapper>
  );
}
