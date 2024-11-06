"use client";
import React, { useState, useEffect, use } from "react";
import "./styles.css";

import { data } from "../../../../../Databases/careers";

const localCareersData = data.data;

const Page = ({ params }) => {
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(false); // Add loading state

  const id = use(params);
  const career_id = id.career_id;
  console.log(career_id);

  const fetchCareers = async () => {
    try {
      setLoading(true); // Start loading
      const response = await fetch("https://www.techspance.com/api/careers");
      const data = await response.json();

      if (data.success) {
        setCareers(data.data);
      } else {
        console.error("Failed to fetch projects:", data.message);
        setCareers(localCareersData); // Fallback to local data
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
      setCareers(localCareersData); // Fallback to local data on error
    } finally {
      setLoading(false); // Loading finished
    }
  };

  // Fetch featuredProjects on component mount
  useEffect(() => {
    fetchCareers();
  }, []);

  return <div>Careers</div>;
};

export default Page;