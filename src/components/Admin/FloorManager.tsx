import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Building, Edit, Trash2 } from 'lucide-react';
import { useHospitalStore } from '../../store/hospitalStore';

export function FloorManager() {
  const { floors, createFloor, isLoading } = useHospitalStore();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    level: 0,
    departments: ['']
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createFloor({
        ...formData,
        departments: formData.departments.filter(dept => dept.trim())
      });
      setShowCreateForm(false);
      setFormData({ name: '', level: 0, departments: [''] });
    } catch (error) {
      console.error('Failed to create floor:', error);
    }
  };

  const addDepartmentField = () => {
    setFormData({
      ...formData,
      departments: [...formData.departments, '']
    });
  };

  const updateDepartment = (index: number, value: string) => {
    const newDepartments = [...formData.departments];
    newDepartments[index] = value;
    setFormData({ ...formData, departments: newDepartments });
  };

  const removeDepartment = (index: number) => {
    const newDepartments = formData.departments.filter((_, i) => i !== index);
    setFormData({ ...formData, departments: newDepartments });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-[#3D405B]">Floor Management</h3>
        <motion.button
          onClick={() => setShowCreateForm(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-[#D4A373] text-white px-4 py-2 rounded-xl flex items-center space-x-2 shadow-lg"
        >
          <Plus className="w-5 h-5" />
          <span>Add Floor</span>
        </motion.button>
      </div>

      {showCreateForm && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/60 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-lg"
        >
          <h4 className="text-lg font-semibold text-[#3D405B] mb-4">Create New Floor</h4>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#3D405B] mb-2">Floor Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-3 border border-[#D4A373]/20 rounded-xl focus:ring-2 focus:ring-[#D4A373]"
                  placeholder="e.g., Ground Floor"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#3D405B] mb-2">Level</label>
                <input
                  type="number"
                  value={formData.level}
                  onChange={(e) => setFormData({ ...formData, level: parseInt(e.target.value) })}
                  className="w-full p-3 border border-[#D4A373]/20 rounded-xl focus:ring-2 focus:ring-[#D4A373]"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#3D405B] mb-2">Departments</label>
              {formData.departments.map((dept, index) => (
                <div key={index} className="flex space-x-2 mb-2">
                  <input
                    type="text"
                    value={dept}
                    onChange={(e) => updateDepartment(index, e.target.value)}
                    className="flex-1 p-3 border border-[#D4A373]/20 rounded-xl focus:ring-2 focus:ring-[#D4A373]"
                    placeholder="Department name"
                  />
                  {formData.departments.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeDepartment(index)}
                      className="p-3 text-red-500 hover:bg-red-50 rounded-xl"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addDepartmentField}
                className="text-[#D4A373] hover:text-[#B5838D] text-sm flex items-center space-x-1"
              >
                <Plus className="w-4 h-4" />
                <span>Add Department</span>
              </button>
            </div>

            <div className="flex space-x-3">
              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 bg-[#D4A373] text-white py-3 rounded-xl font-medium disabled:opacity-50"
              >
                Create Floor
              </motion.button>
              <motion.button
                type="button"
                onClick={() => setShowCreateForm(false)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 bg-gray-500 text-white py-3 rounded-xl font-medium"
              >
                Cancel
              </motion.button>
            </div>
          </form>
        </motion.div>
      )}

      <div className="grid gap-4">
        {floors.map((floor, index) => (
          <motion.div
            key={floor.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.01 }}
            className="bg-white/60 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-[#D4A373]/20 rounded-xl flex items-center justify-center">
                  <Building className="w-6 h-6 text-[#D4A373]" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-[#3D405B]">{floor.name}</h4>
                  <p className="text-[#6D6875]">Level {floor.level}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 text-[#D4A373] hover:bg-[#D4A373]/10 rounded-lg"
                >
                  <Edit className="w-5 h-5" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                >
                  <Trash2 className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
            
            <div className="mt-4">
              <p className="text-sm font-medium text-[#3D405B] mb-2">Departments:</p>
              <div className="flex flex-wrap gap-2">
                {floor.departments.map((dept, deptIndex) => (
                  <span
                    key={deptIndex}
                    className="px-3 py-1 bg-[#D4A373]/20 text-[#D4A373] text-sm rounded-lg"
                  >
                    {dept}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}