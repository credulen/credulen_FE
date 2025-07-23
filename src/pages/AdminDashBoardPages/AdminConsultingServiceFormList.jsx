import React, { useEffect, useState, useCallback, memo } from "react";
import { Loader2, ArrowLeft, Filter, ChevronDown } from "lucide-react";
import * as Select from "@radix-ui/react-select";
import moment from "moment";

const backendURL =
  import.meta.env.MODE === "production"
    ? import.meta.env.VITE_BACKEND_URL
    : "http://localhost:3001";

const LoadingSpinner = memo(() => (
  <div className="fixed inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm z-50">
    <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
  </div>
));

const AdminConsultingServiceFormList = () => {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [selectedSolution, setSelectedSolution] = useState("");
  const [availableSolutions, setAvailableSolutions] = useState([]);
  const [totalForms, setTotalForms] = useState(0);
  const [lastWeekForms, setLastWeekForms] = useState(0);

  const fetchForms = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`${backendURL}/api/getConsultingServiceForms`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to fetch forms");
      }

      setForms(data.solutions || []);
      setTotalForms(data.totalSolutions || 0);
      setLastWeekForms(data.lastWeekSolutions || 0);

      const uniqueSolutions = [
        ...new Set(data.solutions.map((f) => f.selectedSolution)),
      ].filter(Boolean);
      setAvailableSolutions(uniqueSolutions);
    } catch (error) {
      console.error("Error fetching forms:", error);
    } finally {
      setLoading(false);
      setInitialLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchForms();
  }, [fetchForms]);

  const handleFilter = useCallback(
    (solution) => {
      setSelectedSolution(solution === "all" ? "" : solution);
      fetchForms();
    },
    [fetchForms]
  );

  const filteredForms = selectedSolution
    ? forms.filter((form) => form.selectedSolution === selectedSolution)
    : forms;

  if (initialLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Registered Consulting Forms
        </h1>
        <p className="text-gray-600 mt-2">
          View all registered consulting service forms
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="text-slate-700 font-semibold">
              Total: {totalForms}
            </span>
            <span className="text-slate-700 font-semibold">
              Last Week: {lastWeekForms}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <Select.Root
              value={selectedSolution || "all"}
              onValueChange={handleFilter}>
              <Select.Trigger className="inline-flex items-center justify-between rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-40">
                <Select.Value placeholder="Filter by Solution" />
                <Select.Icon>
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                </Select.Icon>
              </Select.Trigger>
              <Select.Portal>
                <Select.Content className="z-50 overflow-hidden bg-white rounded-lg shadow-lg border border-gray-200">
                  <Select.Viewport className="p-1">
                    <Select.Item
                      value="all"
                      className="relative flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer rounded-md focus:outline-none focus:bg-gray-100">
                      <Select.ItemText>All Solutions</Select.ItemText>
                    </Select.Item>
                    {availableSolutions.map((solution) => (
                      <Select.Item
                        key={solution}
                        value={solution}
                        className="relative flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer rounded-md focus:outline-none focus:bg-gray-100">
                        <Select.ItemText>{solution}</Select.ItemText>
                      </Select.Item>
                    ))}
                  </Select.Viewport>
                </Select.Content>
              </Select.Portal>
            </Select.Root>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center p-12">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Full Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Phone Number
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Employment Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Job Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Solution
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Preferred Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Preferred Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Message
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Submitted At
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredForms.length > 0 ? (
                  filteredForms.map((form) => (
                    <tr
                      key={form._id}
                      className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        {form.fullName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {form.phoneNumber}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {form.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {form.employmentStatus}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {form.jobTitle}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {form.selectedSolution}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {form.preferredDate
                          ? moment(form.preferredDate).format("MMM D, YYYY")
                          : "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {form.preferredTime || "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {form.message || "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {moment(form.submittedAt).format("MMM D, YYYY, HH:mm")}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="10"
                      className="px-6 py-4 text-center text-gray-500">
                      No registered forms found!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminConsultingServiceFormList;
