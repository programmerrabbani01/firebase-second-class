import { useEffect, useState } from "react";
import { createAStaff, getAllStaffsRealTime } from "../../firebase/models.js";
import { serverTimestamp } from "firebase/firestore";

const Staff = () => {
  const [input, setInput] = useState({
    name: "",
    age: "",
    location: "",
    department: "",
  });
  const [staffs, setStaffs] = useState([]);
  //   const [loading, setLoading] = useState(null);

  //   input value changes
  const handleInputChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  //   submit form

  const handleFormCreate = async () => {
    await createAStaff("staff", {
      ...input,
      status: true,
      trash: false,
      createdAt: serverTimestamp(),
      updatedAt: null,
    });

    // reset form
    setInput({
      name: "",
      age: "",
      location: "",
      department: "",
    });
  };

  //   get all staffs data

  const getAllStaffsData = async () => {
    await getAllStaffsRealTime("staff", setStaffs);
  };

  useEffect(() => {
    getAllStaffsData();
  }, []);

  return (
    <>
      <div className="staffForm">
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={input.name}
          onChange={handleInputChange}
        />
        <input
          type="number"
          placeholder="age"
          name="age"
          value={input.age}
          onChange={handleInputChange}
        />
        <input
          type="text"
          placeholder="location"
          name="location"
          value={input.location}
          onChange={handleInputChange}
        />
        <input
          type="text"
          placeholder="Department"
          name="department"
          value={input.department}
          onChange={handleInputChange}
        />
        <button onClick={handleFormCreate}>Submit</button>
      </div>
      <div className="staffsList">
        {staffs?.length > 0 ? (
          staffs?.map((staff) => {
            return (
              <div key={staff.id} className="content">
                <h3>Name: {staff.name}</h3>
                <h4>Age: {staff.age}</h4>
                <h4>Location: {staff.location}</h4>
                <h4>Department: {staff.department}</h4>
              </div>
            );
          })
        ) : (
          <h3>Loading . . . . </h3>
        )}
      </div>
    </>
  );
};

export default Staff;
