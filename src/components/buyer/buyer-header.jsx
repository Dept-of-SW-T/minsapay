import styled from "styled-components";
import LogoRef from "../../images/LogoMinsapay.svg";
import LogOutRef from "../../images/LogOut.svg";
import GoHomeRef from "../../images/CPUHome.svg";
import { useNavigate } from "react-router-dom";
import { auth } from "../../features/login-feature";

// CPU의 모든 화면에 공통으로 들어가는 header으로, home으로 가는, logout하는 버튼을 가지고 있다.

const HeaderDiv = styled.div`
  width: 95%;
  margin: 0 auto;
  height: 10vh;
  padding: 0 2.5%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const Logo = styled.img`
  height: 80%;
  /* margin-left: 11px; */
  aspect-ratio: 1;
  &:hover {
    cursor: pointer;
  }
`;
const Balance = styled.div``;
const LogOutIcon = styled.img`
  height: 80%;
  /* margin-right: 11px; */
  aspect-ratio: 1;
  /* margin-left: auto; */
  &:hover {
    cursor: pointer;
  }
`;

export function BuyerHeader({ balance }) {
  const navigate = useNavigate();
  const onLogoClick = (e) => {
    // logo 누르면 홈으로 navigate
    e.preventDefault();
    navigate("../buyer-home");
  };
  const onLogOutIconClick = async (e) => {
    // logout 누르면 confirm 띄우고 로그아웃 후 home으로 navigate --> 저절로 logout화면으로 protected routes를 통해 연결
    e.preventDefault();
    if (!confirm("로그아웃 하시겠습니까?")) return;
    await auth.signOut();
    navigate("../../");
  };
  const onLogoHover = (e) => {
    const logoImage = e.target;
    logoImage.src = GoHomeRef;
  };
  const onLogoLeave = (e) => {
    const logoImage = e.target;
    logoImage.src = LogoRef;
  }; // logo에 hover하면 이미지가 바뀌도록

  return (
    <HeaderDiv>
      <Logo
        onClick={onLogoClick}
        onMouseOver={onLogoHover}
        onMouseLeave={onLogoLeave}
        src={LogoRef}
      />
      <Balance>{balance}원</Balance>
      <LogOutIcon onClick={onLogOutIconClick} src={LogOutRef} />
    </HeaderDiv>
  );
}
