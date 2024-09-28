"use client"
import { columns } from "@/components/collections/CollectionColumns";
import { DataTable } from "@/components/custom ui/DataTable";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const Collections = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [collectionData, setCollectionData] = useState([]);  // Renamed to avoid conflict

  const getCollections = useCallback(async () => {
    try {
      const res = await fetch("/api/collections", {
        method: "GET",
      });
      const data = await res.json();
      setCollectionData(data);  // Updated variable name
      setLoading(false);
    } catch (err) {
      console.log("[collections_GET]", err);
    }
  }, []);  // No external dependencies

  useEffect(() => {
    getCollections();
  }, [getCollections]);  // Added getCollections as a dependency

  return (
    <div className="px-10 py-5">
      <div className="flex items-center justify-between">
        <p className="text-heading2-bold">Collections</p>
        <Button className="bg-blue-1 text-white" onClick={() => router.push("/collections/new")}>
          <Plus className="h-4 w-4 mr-2" />
          Create Collection
        </Button>
      </div>
      <Separator className="bg-gray-1 my-4" />
      <DataTable columns={columns} data={collectionData} searchKey="title" />  {/* Updated to use renamed state */}
    </div>
  );
};

export default Collections;
