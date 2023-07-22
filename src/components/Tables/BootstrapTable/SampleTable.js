import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

// bootstrap
import { Col, Row, Table, Card, Form } from "react-bootstrap";

// assets
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

const SampleTable = ({ title, header, body, onRowClick, children }) => {
  const [curBody, setCurBody] = useState(body);

  function handleSelect(event) {
    const selected = event.target.value;

    if (selected === "all") {
      setCurBody(body);
    } else {
      const filtered = body.filter(
        (elem) => elem.role.toLowerCase() === selected
      );
      setCurBody(filtered);
    }
  }
  useEffect(() => {
    setCurBody(body);
  }, [body]);
  return (
    <>
      <Card border="light" className="bg-white shadow-sm mb-4">
        <h5 className="mb-4">
          <b>{title}</b>
        </h5>
        <Table
          hover
          responsive
          borderless
          className="mx-auto mt-2 overflow-hidden text-start align-middle datatable "
        ></Table>
      </Card>
    </>
  );
};

SampleTable.prototype = {
  title: PropTypes.string,
  header: PropTypes.array,
  body: PropTypes.array,
  onRowClick: PropTypes.func,
  children: PropTypes.node,
};

export default SampleTable;
