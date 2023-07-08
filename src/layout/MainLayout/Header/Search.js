//Bootstrap
import { Form, InputGroup } from "react-bootstrap";

// assets
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

// ==============================|| HEADER CONTENT - SEARCH ||============================== //

const Search = () => (
  <div className="d-flex align-items-center">
    <Form className="navbar-search">
      <Form.Group id="topbarSearch">
        <InputGroup className="input-group-merge search-bar">
          <InputGroup.Text>
            <FontAwesomeIcon icon={faSearch} />
          </InputGroup.Text>
          <Form.Control type="text" placeholder="Search" />
        </InputGroup>
      </Form.Group>
    </Form>
  </div>
);

export default Search;
