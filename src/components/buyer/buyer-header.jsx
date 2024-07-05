import styled from "styled-components";
import LogoRef from "../../images/LogoMinsapay.svg";
import SettingRef from "../../images/Setting.svg";
import { useNavigate } from "react-router-dom";
import { MINSAPAY_TITLE } from "../../components/theme-definition";

// CPU의 모든 화면에 공통으로 들어가는 header으로, home으로 가는, logout하는 버튼을 가지고 있다.

const HeaderDiv = styled.div`
  width: 95%;
  margin: 0 auto;
  height: 10vh;
  padding: 0 2.5%;
  font-size: 4vh;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  font-family: ${MINSAPAY_TITLE};
`;
const Logo = styled.img`
  height: 60%;
  /* margin-left: 11px; */
  aspect-ratio: 1;
  /*   &:hover {
    cursor: pointer;
  } */
`;
const Balance = styled.div``;
const SettingIcon = styled.img`
  height: 60%;
  /* margin-right: 11px; */
  aspect-ratio: 1;
  /* margin-left: auto; */
  &:hover {
    cursor: pointer;
  }
`;

export function BuyerHeader({ balance }) {
  const navigate = useNavigate();
  /*   const onLogoClick = (e) => {
    // logo 누르면 홈으로 navigate
    e.preventDefault();
    navigate("../buyer-home");
  }; */
  const onSettingClick = async (e) => {
    // logo 누르면 설정으로 navigate
    e.preventDefault();
    navigate("../buyer-home/buyer-setting");
  };
  /*   const onLogoHover = (e) => {
    const logoImage = e.target;
    logoImage.src = GoHomeRef;
  };
  const onLogoLeave = (e) => {
    const logoImage = e.target;
    logoImage.src = LogoRef;
  }; // logo에 hover하면 이미지가 바뀌도록
 */
  return (
    <HeaderDiv>
      <Logo src={LogoRef} />
      <Balance>{balance} 원</Balance>
      <SettingIcon onClick={onSettingClick} src={SettingRef} />
    </HeaderDiv>
  );
}
