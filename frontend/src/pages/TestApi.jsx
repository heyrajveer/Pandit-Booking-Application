import React, { useEffect, useState } from "react";
import API from "../api/axios";

function TestApi() {
  const [data, setData] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await API.get("/test");
        // console.log("FULL RESPONSE 👉", res);
        console.log("DATA 👉", res.data);

        setData(res.data.message);
      } catch (error) {
        console.log("ERROR 👉", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Axios Test</h1>
      <p>{data}</p>
    </div>
  );
}

export default TestApi;