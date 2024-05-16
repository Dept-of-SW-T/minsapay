import styled from "styled-components";
import LogoRef from "../images/TempLogoMinsapay.svg";
import LogOutRef from "../images/LogOut.svg";
import { useNavigate } from "react-router-dom";
import { auth } from "../features/login-feature";

const HeaderDiv = styled.div`
  width: 100%;
  height: 64px;
  background-color: white;
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const Logo = styled.img`
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
  const onLogOutIconClick = (e) => {
    e.preventDefault();
    if (!confirm("로그아웃 하시겠습니까?")) return;
    auth.signOut();
    navigate("../../");
  };

  return (
    <HeaderDiv>
      <Logo onClick={onLogoClick} src={LogoRef} />
      <LogOutIcon onClick={onLogOutIconClick} src={LogOutRef} />
    </HeaderDiv>
  );
};
