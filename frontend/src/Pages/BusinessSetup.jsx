import { useEffect, useState } from "react";
import { useAuth } from "@clerk/react";
import { useNavigate } from "react-router-dom";

import {
  getBusinesses,
  createBusiness,
} from "../services/business.service";

import BusinessForm from "../Components/Business/BusinessForm";

function BusinessSetup() {
  const { getToken } = useAuth();
  const navigate = useNavigate();

  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    loadBusinesses();
  }, []);

  async function loadBusinesses() {
    try {
      setLoading(true);
      setError("");

      const response = await getBusinesses(getToken);

      setBusinesses(response.data || []);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleCreateBusiness(businessData) {
    try {
      setCreating(true);
      setError("");

      const response = await createBusiness(
        getToken,
        businessData
      );

      const business = response.data;

      localStorage.setItem(
        "selectedBusinessId",
        business.id
      );

      navigate("/");
    } catch (error) {
      setError(error.message);
    } finally {
      setCreating(false);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  if (businesses.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <BusinessForm
          onSubmit={handleCreateBusiness}
          loading={creating}
        />
      </div>
    );
  }

  const selectedBusinessId =
    localStorage.getItem("selectedBusinessId");

  if (!selectedBusinessId) {
    localStorage.setItem(
      "selectedBusinessId",
      businesses[0].id
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-2xl font-semibold">
          Select your business
        </h1>

        <div className="mt-6 space-y-3">
          {businesses.map((business) => (
            <button
              key={business.id}
              onClick={() => {
                localStorage.setItem(
                  "selectedBusinessId",
                  business.id
                );

                navigate("/");
              }}
              className="w-full rounded-xl border bg-white p-5 text-left shadow-sm hover:bg-gray-50"
            >
              <p className="font-medium">
                {business.name}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BusinessSetup;