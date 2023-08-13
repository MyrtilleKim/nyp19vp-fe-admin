import { capitalizeFirstLetter } from "store/requests/user";

const { CheckboxDropdown } = require("components/DropdownWithCheck");

const ColumnVisibility = ({ table }) => {
  const handleAllChecked = (checked) => {
    table.toggleAllColumnsVisible(checked);
  };
  const checkItems = table
    .getAllLeafColumns()
    .filter((column) => {
      if (column.id === "select" || column.id === "actions") return false;
      return true;
    })
    .map((column) => {
      const handleChecked = (checked) => {
        column.toggleVisibility(checked);
      };
      return {
        id: column.id,
        label: column.columnDef.header
          ? column.columnDef.header
          : capitalizeFirstLetter(column.columnDef.accessorKey),
        checked: column.getIsVisible(),
        handleChecked: handleChecked,
      };
    });
  return (
    <CheckboxDropdown items={checkItems} handleAllSelect={handleAllChecked} />
  );
};

export default ColumnVisibility;
