import React,{ useState, useEffect } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";

interface User {
  _id: string;
  name: string;
  height: string;
  work: string;
  gender: string;
}

const fakeUsers: User[] = [
  { _id: "1", name: "23", height: "5'8\"", work: "Engineer", gender: "male" },
  { _id: "2", name: "32", height: "5'6\"", work: "Doctor", gender: "male" },
  { _id: "3", name: "18", height: "5'4\"", work: "Teacher", gender: "female" },
  { _id: "5", name: "22", height: "5'3\"", work: "Software Developer", gender: "female" },
  { _id: "6", name: "22", height: "5'3\"", work: "Software Developer", gender: "female" },
  { _id: "7", name: "22", height: "5'3\"", work: "Software Developer", gender: "female" },
  { _id: "8", name: "22", height: "5'3\"", work: "Software Developer", gender: "female" },
  { _id: "9", name: "22", height: "5'3\"", work: "Software Developer", gender: "female" },
  { _id: "10", name: "22", height: "5'3\"", work: "Software Developer", gender: "female" },
];

const BiodataList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  //const [totalPages,setTotalPages] = useState<number>(1);
  const navigate = useNavigate();

  useEffect(() => {
    setUsers(fakeUsers);
  }, []);

  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  const showDetails = (id: string) => {
    navigate(`/user/${id}`);
  };

  return (
    <div className="mx-2 md:mx-10">
      <h4 className="text-center text-2xl sm:text-3xl rounded-full p-4 m-4 sm:m-5 font-bold bg-violet-950 text-white sm:w-1/2 sm:mx-auto">Biodata List</h4>
      <ul className="flex flex-col md:flex-row flex-wrap md:items-center md:justify-center py-12">
        {users.map((user) => (
          <li key={user._id} className="md:basis-1/3">
            <div className="flex flex-row md:flex-col items-center gap-2 bg-violet-950 p-2 rounded-lg m-2 shadow-lg">
              <img
                src={user.gender === "male" ? "src/assets/man.png" : "src/assets/woman.png"}
                alt={user.gender === "male" ? "Man" : "Woman"}
                className="h-24 w-24 bg-white rounded-lg"
              />
              <div className="w-full md:text-center p-4 bg-violet-900 rounded-md">
                <p className="text-violet-100 bg-violet-950 font-bold text-xl rounded-lg border text-center p-2">
                  Biodata - {user._id}
                </p>
                <div className=" p-2 text-lg md:text-xl">

                <p className="text-white py-1 font-bold rounded-md">বয়স : {user.name}</p>
                <p className="text-white py-1 font-bold rounded-md">উচ্চতা : {user.height}</p>
                <p className="text-white py-1 font-bold rounded-md">পেশা : {user.work}</p>
                </div>
                <button className="bg-white py-2 px-4 rounded-full text-lg text-purple-800 hover:text-pink-900 hover:px-6 font-bold mt-2" onClick={() => showDetails(user._id)}>
                  View Profile
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="flex flex-col items-center my-4 p-2">
        <Stack spacing={2}>
          <Pagination
            count={2}
            page={currentPage}
            onChange={handlePageChange}
            variant="outlined"
            shape="rounded"
          />
        </Stack>
      </div>
    </div>
  );
};

export default BiodataList;
