import styled from "styled-components";
import LogoRef from "../../images/NewLogo.png";
import LogOutRef from "../../images/LogOut.svg";
import GoHomeRef from "../../images/CPUHome.svg";
import { useNavigate } from "react-router-dom";
import { loginUtils } from "../../features/login-feature";

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
  height: 90%;
  /* margin-left: 11px; */
  aspect-ratio: 1;
  &:hover {
    cursor: pointer;
  }
`;
const LogOutIcon = styled.img`
  height: 80%;
  /* margin-right: 11px; */
  aspect-ratio: 1;
  /* margin-left: auto; */
  &:hover {
    cursor: pointer;
  }
`;

export function SellerHeader() {
  const navigate = useNavigate();
  const onLogoClick = (e) => {
    // logo 누르면 홈으로 navigate
    e.preventDefault();
    navigate("../seller-home/seller-select");
  };
  const onLogOutIconClick = async () => {
    // logout 누르면 confirm 띄우고 로그아웃 후 home으로 navigate --> 저절로 logout화면으로 protected routes를 통해 연결
    if (!confirm("로그아웃 하시겠습니까?")) return;
    await loginUtils.signOut();
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
      <LogOutIcon onClick={onLogOutIconClick} src={LogOutRef} />
    </HeaderDiv>
  );
}
