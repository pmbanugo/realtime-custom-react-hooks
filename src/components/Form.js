import React from "react";
import useSyncState from "../hooks/use-sync";

const Form = () => {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");

  const syncPrimitive = useSyncState("datagrid");

  const handleChange = (event) => {
    if (event.target.name === "firstName") setFirstName(event.target.value);
    if (event.target.name === "lastName") setLastName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    syncPrimitive.add({
      firstName: firstName,
      lastName: lastName,
    });
    setLastName("");
    setFirstName("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add new record</h3>
      <label>
        FirstName:&nbsp;
        <input
          type="text"
          name="firstName"
          value={firstName}
          onChange={handleChange}
        />
      </label>
      &nbsp;&nbsp;
      <label>
        LastName:&nbsp;
        <input
          type="text"
          name="lastName"
          value={lastName}
          onChange={handleChange}
        />
      </label>
      &nbsp;&nbsp;&nbsp;
      <input type="submit" value="Add" disabled={syncPrimitive === null} />
    </form>
  );
};

export default Form;
