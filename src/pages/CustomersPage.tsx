import { useEffect, useState, useCallback } from "react";
import { Search, Plus, Edit, Trash2, Eye, UserCheck } from "lucide-react";

type Customer = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  city: string;
  country: string;
  active: boolean;
  activeRentals: number;
  totalRentals: number;
};

const Customers = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [meta, setMeta] = useState({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("name");

  const fetchCustomers = useCallback(
    (page = 1) => {
      fetch(
        `http://localhost:4000/api/customers/all-customers?page=${page}&limit=${meta.limit}`
      )
        .then((res) => res.json())
        .then((data) => {
          setCustomers(data.data || []);
          setMeta(data.meta || { total: 0, page: 1, limit: 10, totalPages: 0 });
        })
        .catch((err) => console.error("Error fetching customers:", err));
    },
    [meta.limit]
  );

  useEffect(() => {
    fetchCustomers(1);
  }, [fetchCustomers]);

  const filteredCustomers = customers.filter((customer) => {
    const searchLower = searchTerm.toLowerCase();
    if (searchType === "name") {
      return (
        customer.firstName.toLowerCase().includes(searchLower) ||
        customer.lastName.toLowerCase().includes(searchLower)
      );
    } else if (searchType === "id") {
      return customer.id.toString().includes(searchTerm);
    }
    return true;
  });

  return (
    <div className="sm:mx-11 p-6">
      <div className="mb-6 flex justify-end">
        <button className="flex items-center gap-2 px-4 py-2 rounded-md bg-gradient-to-br from-gray-700 via-gray-800 to-gray-950 hover:bg-gradient-to-br hover:from-gray-600 hover:via-gray-700 hover:to-gray-800 text-gray-400 font-medium hover:cursor-pointer border-r-1 border-b-1 border-gray-500">
          <Plus size={16} />
          Add New Customer
        </button>
      </div>

      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 "
            size={20}
          />
          <input
            type="text"
            placeholder="Search customers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-3 py-2 rounded-md  bg-gradient-to-br from-gray-700 via-gray-800 to-gray-950 text-gray-400 placeholder-gray-400 focus:outline-none border-r-1 border-b-1 border-gray-500"
          />
        </div>
        <select
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
          className="w-full sm:w-[180px] px-4 py-2 rounded-md bg-gradient-to-br from-gray-700 via-gray-800 to-gray-950 text-gray-400 focus:outline-none border-r-1 border-b-1 border-gray-500"
        >
          <option value="name">By Name</option>
          <option value="id">By Customer ID</option>
        </select>
      </div>

      <div className="border-r-1 border-b-1 border-gray-500 rounded-lg overflow-hidden bg-gradient-to-bl from-gray-700 via-gray-800 to-gray-950">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-gray-300">
            <thead className="bg-gradient-to-tr from-gray-700 via-gray-800 to-gray-950">
              <tr className="text-gray-400">
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">City, Country</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Active Rentals</th>
                <th className="px-4 py-2">Total Rentals</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((customer) => (
                <tr
                  key={customer.id}
                  className="border-t border-gray-700 text-gray-400"
                >
                  <td className="px-4 py-2">{customer.id}</td>
                  <td className="px-4 py-2">
                    {customer.firstName} {customer.lastName}
                  </td>
                  <td className="px-4 py-2 text-gray-500">{customer.email}</td>
                  <td className="px-4 py-2">
                    {customer.city}, {customer.country}
                  </td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        customer.active
                          ? "bg-gradient-to-br from-gray-700 via-gray-800 to-gray-950 text-gray-400 border-r-1 border-b-1 border-gray-500"
                          : "bg-gradient-to-br from-gray-600 via-gray-700 to-gray-800 text-gray-400 border-r-1 border-b-1 border-gray-500"
                      }`}
                    >
                      {customer.active ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    <span className="px-2 py-1 rounded border border-gray-500 text-xs">
                      {customer.activeRentals}
                    </span>
                  </td>
                  <td className="px-4 py-2">{customer.totalRentals}</td>
                  <td className="px-4 py-2">
                    <div className="flex items-center gap-2">
                      <button className="p-2 rounded-md  border-r-1 border-b-1 border-gray-500 hover:bg-gray-700">
                        <Eye size={14} />
                      </button>
                      <button className="p-2 rounded-md  border-r-1 border-b-1 border-gray-500 hover:bg-gray-700">
                        <Edit size={14} />
                      </button>
                      {customer.activeRentals > 0 && (
                        <button className="p-2 rounded-md  border-r-1 border-b-1 border-gray-500 hover:bg-gray-700">
                          <UserCheck size={14} />
                        </button>
                      )}
                      <button className="p-2 rounded-md  border-r-1 border-b-1 border-gray-500 text-gray-400 hover:bg-gray-900">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredCustomers.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              No customers found matching your search criteria.
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-between items-center mt-4">
        <button
          disabled={meta.page <= 1}
          onClick={() => fetchCustomers(meta.page - 1)}
          className="px-3 py-1 font-semibold rounded disabled:opacity-50 border-r-1 border-b-1 border-gray-500  text-gray-200 hover:text-gray-100 hover:cursor-pointer hover:border"
        >
          Prev
        </button>
        <span className="text-gray-400">
          Page {meta.page} of {meta.totalPages}
        </span>
        <button
          disabled={meta.page >= meta.totalPages}
          onClick={() => fetchCustomers(meta.page + 1)}
          className="px-3 py-1 font-semibold rounded disabled:opacity-50 border-r-1 border-b-1 border-gray-500  text-gray-400 hover:text-gray-300 hover:cursor-pointer hover:border"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Customers;
