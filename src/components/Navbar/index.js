import React, { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { IconContext } from "react-icons/lib";
import { Button } from "../../styles/globalStyles";
// import logo from "../../images/logo.jpeg";
import {
  Nav,
  NavbarContainer,
  NavLogo,
  MobileIcon,
  NavMenu,
  NavItem,
  NavItemBtn,
  NavLinks,
  NavBtnLink,
} from "./NavbarElements";
import { useEthers } from "@usedapp/core";
import { notifyWarning } from "../../helper";

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const { account, activateBrowserWallet, deactivate } = useEthers();

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  const onError = () => {
    notifyWarning("Wrong Network !", "Please connect to Polygon Mainnet");
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener("resize", showButton);

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <Nav>
          <NavbarContainer>
            <NavLogo to="/" onClick={closeMobileMenu}>
              PNM
              {/* <img alt="logo" width={80} src={logo} /> */}
            </NavLogo>
            <MobileIcon style={{ color: "black" }} onClick={handleClick}>
              {click ? (
                <FaTimes style={{ color: "black" }} />
              ) : (
                <FaBars style={{ color: "black" }} />
              )}
            </MobileIcon>
            <NavMenu onClick={handleClick} click={click}>
              <NavItem>
                <NavLinks to="/" onClick={closeMobileMenu}>
                  Home
                </NavLinks>
              </NavItem>
              <NavItem>
                <NavLinks to="/create-items" onClick={closeMobileMenu}>
                  List
                </NavLinks>
              </NavItem>
              <NavItem>
                <NavLinks to="/buy-items" onClick={closeMobileMenu}>
                  Buy Items
                </NavLinks>
              </NavItem>

              <NavItem>
                <NavLinks to="/profile" onClick={closeMobileMenu}>
                  Profile
                </NavLinks>
              </NavItem>

              {account ? (
                <NavItemBtn>
                  {button ? (
                    <NavBtnLink>
                      <Button onClick={deactivate} primary>
                        Disconnect
                      </Button>
                    </NavBtnLink>
                  ) : (
                    <NavBtnLink>
                      <Button onClick={deactivate} fontBig primary>
                        Disconnect
                      </Button>
                    </NavBtnLink>
                  )}
                </NavItemBtn>
              ) : (
                <NavItemBtn>
                  {button ? (
                    <NavBtnLink>
                      <Button
                        onClick={() => activateBrowserWallet(onError)}
                        primary
                      >
                        Connect
                      </Button>
                    </NavBtnLink>
                  ) : (
                    <NavBtnLink>
                      <Button
                        onClick={() => activateBrowserWallet(onError)}
                        fontBig
                        primary
                      >
                        Connect
                      </Button>
                    </NavBtnLink>
                  )}
                </NavItemBtn>
              )}
            </NavMenu>
          </NavbarContainer>
        </Nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;
