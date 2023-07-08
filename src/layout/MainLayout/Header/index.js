import PropTypes from "prop-types";

// material-ui
import { useTheme } from "@mui/material/styles";
import { AppBar, useMediaQuery } from "@mui/material";

// bootstrap
import { Navbar, Container, Button } from "react-bootstrap";

// project import
import AppBarStyled from "./AppBarStyled";
import HeaderContent from "./Header";
import Search from "./Search";

// assets
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

// ==============================|| MAIN LAYOUT - HEADER ||============================== //

const Header = ({ open, handleDrawerToggle }) => {
  const theme = useTheme();
  const matchDownMD = useMediaQuery(theme.breakpoints.down("lg"));

  const iconBackColor = "#f8f9fa";
  const iconBackColorOpen = "#e9ecef";

  const menuButtonStyle = {
    color: "#495057",
    backgroundColor: open ? iconBackColorOpen : iconBackColor,
  };

  // common header
  const mainHeader = (
    <Navbar sticky="top" variant="dark" expanded className="ps-0 pe-2 pb-0">
      <Container fluid className="px-0">
        <div className="d-flex justify-content-between w-100">
          <div className="d-flex align-items-center">
            <Button
              aria-label="open drawer"
              onClick={handleDrawerToggle}
              variant="outline-secondary"
              style={menuButtonStyle}
            >
              <FontAwesomeIcon icon={faBars} />
            </Button>
          </div>
          <Search />
          <HeaderContent />
        </div>
      </Container>
    </Navbar>
  );

  // app-bar params
  const appBar = {
    position: "fixed",
    color: "inherit",
    elevation: 0,
    sx: {
      borderBottom: `1px solid ${theme.palette.divider}`,
      // boxShadow: theme.customShadows.z1
    },
  };

  return (
    <>
      {!matchDownMD ? (
        <AppBarStyled open={open} {...appBar}>
          {mainHeader}
        </AppBarStyled>
      ) : (
        <AppBar {...appBar}>{mainHeader}</AppBar>
      )}
    </>
  );
};

Header.propTypes = {
  open: PropTypes.bool,
  handleDrawerToggle: PropTypes.func,
};

export default Header;
