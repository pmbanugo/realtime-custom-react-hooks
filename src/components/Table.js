import React from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import useSyncState from "../hooks/use-sync";

const Table = () => {
  const [data, setData] = React.useState([]);
  const syncPrimitive = useSyncState("datagrid");

  React.useEffect(() => {
    if (syncPrimitive) {
      setData([...syncPrimitive.getAll()]);

      syncPrimitive.onSync((data) => {
        setData([...data]);
      });

      syncPrimitive.onItemUpdated((item) => {
        setData((previousData) => [
          ...previousData.slice(0, item.index),
          item.value,
          ...previousData.slice(item.index + 1),
        ]);
      });

      syncPrimitive.onItemAdded((item) => {
        setData((previousData) => [...previousData, item.value]);
      });
    }
  }, [syncPrimitive]);

  const renderEditableCell = (data) => (cellInfo) => {
    return (
      <div
        style={{ backgroundColor: "#fafafa" }}
        contentEditable
        suppressContentEditableWarning
        onBlur={(e) => {
          let row = data[cellInfo.index];
          row[cellInfo.column.id] = e.target.innerHTML;
          syncPrimitive.update(cellInfo.index, row);
        }}
        dangerouslySetInnerHTML={{
          __html: data[cellInfo.index][cellInfo.column.id],
        }}
      />
    );
  };

  return (
    <ReactTable
      data={data}
      columns={[
        {
          Header: "First Name",
          accessor: "firstName",
          Cell: renderEditableCell(data),
        },
        {
          Header: "Last Name",
          accessor: "lastName",
          Cell: renderEditableCell(data),
        },
        {
          Header: "Full Name",
          id: "full",
          accessor: (d) => (
            <div
              dangerouslySetInnerHTML={{
                __html: d.firstName + " " + d.lastName,
              }}
            />
          ),
        },
      ]}
      defaultPageSize={10}
      className="-striped -highlight"
    />
  );
};

export default Table;
