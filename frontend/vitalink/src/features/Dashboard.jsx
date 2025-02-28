import React, { useState, useEffect } from "react";
import Chart from "../ui/Chart";
import { useVitalData } from "../service/apiVital";
import Vitals from "./Vitals";

const Dashboard = () => {
  const [userData, setUserData] = useState({
    name: "",
    age: "",
    gender: "",
  });

  const vitalData = useVitalData();

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  return (
    <div className="w-full h-full section">
      <div className="w-full h-full flex justify-between text-white items-center">
        <div className=" flex items-center gap-x-1 w-1/2">
          <img src="/v_logo.png" alt="logo image" className="w-[6rem] h-[4rem]" />
          <span className="italic text-xl font-bold">vitaLink</span>
        </div>
        <div className="">
          <div className=" text-2xl bg-white flex text-black/85 py-2 px-5 rounded-xl items-center text-center gap-x-1 w-full font-bold">
            <span className="">device:</span>
            <span className={` text-xl font-bold ${vitalData.online ? "text-green-600" : "text-red-600"}`}>
              {vitalData.online ? "Connected" : "disconnected"}
            </span>
          </div>
        </div>
      </div>

      <div className=" mt-10 lg:w-[40%] sm:w-[60%] w-[85%] text-white">
        <div className="grid grid-cols-2 gap-y-5">
          <div className="text-2xl font-semibold">Name: {userData.name}</div>
          <div className="text-2xl font-semibold">Gender: {userData.gender == 1 ? "Male" : "Female"}</div>
          <div className="text-2xl font-semibold">age: {userData.age} years</div>
        </div>
      </div>

      <div className="">
        <Vitals vitalData={vitalData} />
      </div>

      <div className="my-24 grid md:grid-cols-2 grid-cols-1 gap-10">
        <div className="w-full bg-white p-4 rounded-2xl">
          <div className="text-3xl font-bold mb-10">health chart</div>
          <Chart vitalData={vitalData} />
        </div>
        <div className="w-full bg-white p-4 rounded-2xl">
          <div className="text-3xl font-bold pb-5">suggestions</div>
          <div className="text-xl text-gray-700">
            <ul className="flex flex-col gap-y-5">
              <li className="list-disc ml-10 text-2xl text-black/80 normal-case">
                <span className="font-medium text-3xl text-black">recommendation: </span>
                {vitalData.alert}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
