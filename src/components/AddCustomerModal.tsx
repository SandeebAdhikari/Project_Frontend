// src/components/AddCustomerModal.tsx
import { X } from "lucide-react";
import { useState } from "react";

interface AddCustomerModalProps {
  onClose: () => void;
  onAdd: (customer: {
    firstName: string;
    lastName: string;
    email: string;
    city: string;
    country: string;
  }) => void;
}

const AddCustomerModal: React.FC<AddCustomerModalProps> = ({
  onClose,
  onAdd,
}) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    city: "",
    country: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="relative backdrop-blur-sm rounded-xl p-6 w-[95%] max-w-lg border border-gray-700">
        <button
          className="absolute top-4 right-4 text-gray-400 "
          onClick={onClose}
          title="Close"
          aria-label="Close"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-xl font-bold text-gray-400 mb-4">
          Add New Customer
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3 text-gray-300">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-600 focus:outline-none"
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-600 focus:outline-none"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-600 focus:outline-none"
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-600 focus:outline-none"
          />
          <input
            type="text"
            name="country"
            placeholder="Country"
            value={formData.country}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-600 focus:outline-none"
          />

          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-md border border-gray-600 text-gray-400 hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-md bg-gradient-to-br from-gray-700 via-gray-800 to-gray-950 text-gray-200 hover:from-gray-600 hover:via-gray-700 hover:to-gray-800"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCustomerModal;
