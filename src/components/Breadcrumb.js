import { Breadcrumb } from "react-bootstrap";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

// assets
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";

const Breadcrumbs = ({ navigation, title, ...others }) => {
  const location = useLocation();
  const [item, setItem] = useState();

  const getCollapse = (menu) => {
    if (menu.children) {
      menu.children.filter((collapse) => {
        if (collapse.type && collapse.type === "item") {
          if (location.pathname === collapse.url) {
            setItem(collapse);
          }
        }
        return false;
      });
    }
  };

  useEffect(() => {
    navigation?.items?.map((menu) => {
      if (menu.type && menu.type === "group") {
        getCollapse(menu);
      }
      return false;
    });
  });

  let itemContent;
  let breadcrumbContent;
  let itemTitle = "";

  if (item && item.type === "item") {
    itemTitle = item.title;
    itemContent = <Breadcrumb.Item active>{itemTitle}</Breadcrumb.Item>;

    // main
    if (item.breadcrumbs !== false) {
      breadcrumbContent = (
        <Breadcrumb>
          <Breadcrumb.Item as={Link} to="/">
            <FontAwesomeIcon icon={faHouse} />
          </Breadcrumb.Item>
          {itemContent}
        </Breadcrumb>
      );
    }
  }

  return breadcrumbContent;
};

Breadcrumbs.propTypes = {
  navigation: PropTypes.object,
  title: PropTypes.bool,
};

export default Breadcrumbs;
