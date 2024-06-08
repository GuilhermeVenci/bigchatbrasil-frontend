'use client';
import apiRequest from '@/utils/api';
import React, { useEffect, useState } from 'react';

const DashboardPage = () => {
  const [userData, setUserData] = useState();
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await apiRequest('/auth/me');
        setUserData(data);
      } catch (error: any) {
        setError(error.message);
      }
    };

    fetchUserData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!userData) {
    return <div>Loading...</div>;
  }

  if (userData) console.log(userData);

  return (
    <div className="flex flex-col">
      <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
        Dashboard
      </h2>
      <span className="text-4xl">FOOOOOIIIIII</span>
    </div>
  );
};

export default DashboardPage;
