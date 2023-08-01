import PropTypes from "prop-types";

// boostrap
import { Table } from "react-bootstrap";

// ==============================|| Sample Bootstrap Table ||============================== //
const SampleTable = ({ header, body, classes }) => {
  const TableRow = ({ item }) => {
    const keys = Object.keys(item);

    return (
      <tr>
        {keys.map((ele) => {
          return <td key={`bs-table-td-${ele.id}`}>{item[ele]}</td>;
        })}
      </tr>
    );
  };

  return (
    <Table
      responsive
      className={classes}
      style={{ alignItems: "center", width: "100%" }}
    >
      <thead className="thead-light">
        <tr>
          {header.map((head) => {
            return (
              <th scope="col" key={`bs-table-th-${head.id}`}>
                {head}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {body.map((item) => (
          <TableRow key={`table-row-${item.id}`} item={item} />
        ))}
      </tbody>
    </Table>
  );
};

SampleTable.prototype = {
  header: PropTypes.array,
  body: PropTypes.array,
  classes: PropTypes.string,
};

export default SampleTable;
