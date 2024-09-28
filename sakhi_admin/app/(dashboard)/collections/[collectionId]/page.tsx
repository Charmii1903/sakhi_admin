"use client"
import CollectionForm from '@/components/collections/CollectionForm';
import Loader from '@/components/custom ui/Loader';
import React, { useEffect, useState, useCallback } from 'react'

const CollectionDetails = ({ params }: { params: { collectionId: string }}) => {
  const [loading, setLoading] = useState(true);
  const [collectionDetails, setCollectionDetails] = useState<CollectionType | null>(null);  // Corrected lowercase

  const getCollectionDetails = useCallback(async () => {
    try {
      const res = await fetch(`/api/collections/${params.collectionId}`, {
        method: "GET"
      });
      const data = await res.json();
      setCollectionDetails(data);
      setLoading(false);
    } catch (err) {
      console.log("[collectionId_GET]", err);
    }
  }, [params.collectionId]);  // Added as a dependency

  useEffect(() => {
    getCollectionDetails();
  }, [getCollectionDetails]);  // Add getCollectionDetails to the dependency array

  return loading ? <Loader /> : (
    <CollectionForm initialData={collectionDetails} />
  );
}

export default CollectionDetails;
