import styled from "styled-components";
import LogoRef from "../../images/NewLogo.png";
import SettingRef from "../../images/Setting.svg";
import GoHomeRef from "../../images/CPUHome.svg";
import { useNavigate } from "react-router-dom";

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
const SettingIcon = styled.img`
  height: 60%;
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
  const onSettingClick = async (e) => {
    // logo 누르면 설정으로 navigate
    e.preventDefault();
    navigate("../login-setting");
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
      <SettingIcon onClick={onSettingClick} src={SettingRef} />
    </HeaderDiv>
  );
}
