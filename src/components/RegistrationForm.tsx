import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

export function RegistrationForm() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    teamName: '',
    collegeName: '',
    email: '',
    phoneNumber: '',
    whatsappNumber: '',
    department: '',
    memberCount: '1',
    teamMembers: [''],
    events: [],
  });

  const eventOptions = [
    { id: 'hackathon', name: 'Hackathon Challenge' },
    { id: 'techtalks', name: 'Tech Talks' },
    { id: 'workshops', name: 'Workshops' },
    { id: 'networking', name: 'Networking Session' }
  ];

  // Update team members array when member count changes
  useEffect(() => {
    const count = parseInt(formData.memberCount);
    setFormData(prev => ({
      ...prev,
      teamMembers: Array(count).fill('').map((_, i) => prev.teamMembers[i] || '')
    }));
  }, [formData.memberCount]);

  const handleTeamMemberChange = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      teamMembers: prev.teamMembers.map((member, i) => i === index ? value : member)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Registration data:', formData);
      toast.success('Registration successful!');
      
      // Reset form
      setFormData({
        teamName: '',
        collegeName: '',
        email: '',
        phoneNumber: '',
        whatsappNumber: '',
        department: '',
        memberCount: '1',
        teamMembers: [''],
        events: [],
      });
    } catch (error) {
      toast.error('Registration failed. Please try again.');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-gray-900/50 rounded-lg p-8">
      <h2 className="text-3xl font-bold mb-8 text-center text-white">Event Registration</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="teamName" className="block text-sm font-medium text-gray-300">
              Team Name
            </label>
            <input
              type="text"
              id="teamName"
              value={formData.teamName}
              onChange={(e) => setFormData(prev => ({ ...prev, teamName: e.target.value }))}
              className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="collegeName" className="block text-sm font-medium text-gray-300">
              College Name
            </label>
            <input
              type="text"
              id="collegeName"
              value={formData.collegeName}
              onChange={(e) => setFormData(prev => ({ ...prev, collegeName: e.target.value }))}
              className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="department" className="block text-sm font-medium text-gray-300">
              Department
            </label>
            <input
              type="text"
              id="department"
              value={formData.department}
              onChange={(e) => setFormData(prev => ({ ...prev, department: e.target.value }))}
              className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-300">
              Phone Number
            </label>
            <input
              type="tel"
              id="phoneNumber"
              value={formData.phoneNumber}
              onChange={(e) => setFormData(prev => ({ ...prev, phoneNumber: e.target.value }))}
              className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="whatsappNumber" className="block text-sm font-medium text-gray-300">
              WhatsApp Number
            </label>
            <input
              type="tel"
              id="whatsappNumber"
              value={formData.whatsappNumber}
              onChange={(e) => setFormData(prev => ({ ...prev, whatsappNumber: e.target.value }))}
              className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="memberCount" className="block text-sm font-medium text-gray-300">
              Number of Team Members
            </label>
            <select
              id="memberCount"
              value={formData.memberCount}
              onChange={(e) => setFormData(prev => ({ ...prev, memberCount: e.target.value }))}
              className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            >
              <option value="1">1 Member</option>
              <option value="2">2 Members</option>
              <option value="3">3 Members</option>
              <option value="4">4 Members</option>
            </select>
          </div>
        </div>

        {/* Team Members Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-200">Team Members</h3>
          {formData.teamMembers.map((member, index) => (
            <div key={index}>
              <label className="block text-sm font-medium text-gray-300">
                Member {index + 1} Name
              </label>
              <input
                type="text"
                value={member}
                onChange={(e) => handleTeamMemberChange(index, e.target.value)}
                className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
          ))}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Select Events
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {eventOptions.map((event) => (
              <label key={event.id} className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  value={event.id}
                  checked={formData.events.includes(event.id)}
                  onChange={(e) => {
                    const value = e.target.value;
                    setFormData(prev => ({
                      ...prev,
                      events: e.target.checked
                        ? [...prev.events, value]
                        : prev.events.filter(v => v !== value)
                    }));
                  }}
                  className="rounded bg-gray-800 border-gray-700 text-blue-500 focus:ring-blue-500"
                />
                <span className="text-gray-300">{event.name}</span>
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 rounded-md text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? 'Registering...' : 'Complete Registration'}
        </button>
      </form>
    </div>
  );
}