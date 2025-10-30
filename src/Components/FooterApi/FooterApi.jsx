"use client";
import React, { Fragment, useEffect, useState } from 'react';
import Footer from '../Footer';
import ErrorControl from '@/Services/CatchError';
import { FooterApiFn } from '@/Services/Api';

export default function FooterApi() {
  const [footerData, setFooterData] = useState(null);   // Store API data
  const [loading, setLoading] = useState(true);         // For loading state
  const [error, setError] = useState(null);             // For error handling

  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        setLoading(true);
        const data = await FooterApiFn();
        setFooterData(data);
      } catch (err) {
        console.error("Error fetching footer data:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFooterData();
  }, []);

  // Loading state
  if (loading) {
    return <p className="text-center py-5">Loading footer...</p>;
  }

  // Error handling
  if (error) {
    return <ErrorControl />;
  }

  return (
    <Fragment>
      <Footer Footerdatas={footerData} />
    </Fragment>
  );
}

