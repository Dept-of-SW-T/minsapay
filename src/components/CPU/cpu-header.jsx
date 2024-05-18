import styled from "styled-components";
import LogoRef from "../../images/TempLogoMinsapay.svg";
import LogOutRef from "../../images/LogOut.svg";
import GoHomeRef from "../../images/CPUHome.svg";
import { useNavigate } from "react-router-dom";
import { auth } from "../../features/login-feature";

const HeaderDiv = styled.div`
  width: 100%;
  height: 64px;
  background-color: white;
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const Logo = styled.img`
  // hover 시 도움말이 뜨게 수정
  width: 50px;
  margin-left: 11px;
  &:hover {
    cursor: pointer;
  }
`;
const LogOutIcon = styled.img`
  width: 50px;
  margin-right: 11px;
  margin-left: auto;
  &:hover {
    cursor: pointer;
  }
`;

export const Header = () => {
  const navigate = useNavigate();
  const onLogoClick = (e) => {
    e.preventDefault();
    navigate("../cpu-home");
  };
  const onLogOutIconClick = async (e) => {
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
  };

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
};
