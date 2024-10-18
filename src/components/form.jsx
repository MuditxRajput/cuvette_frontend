// JobForm.js
import React, { useState } from 'react';
import { toast } from 'react-toastify';
const JobForm = () => {
  const [formData, setFormData] = useState({
    jobTitle: '',
    jobDescription: '',
    experienceLevel: '',
    endDate: '',
  });

  const [candidateEmails, setCandidateEmails] = useState([]); // State for storing candidate emails
  const [newEmail, setNewEmail] = useState(''); // State for the new email input
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNewEmailChange = (e) => {
    setNewEmail(e.target.value);
  };

  const handleAddEmail = () => {
    if (newEmail && !candidateEmails.includes(newEmail)) {
      setCandidateEmails([...candidateEmails, newEmail]);
      setNewEmail(''); // Clear input after adding
    }
  };
  console.log(candidateEmails);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const fetchData=async()=>{
        const response =await fetch('https://cuvette-backend-sv0l.onrender.com/api/mail',{
            method:"POST",
            headers:{
                "Content-type":"application/json",
                
            },
            body: JSON.stringify({ emails: candidateEmails }),
        })
        const val = await response.json();
        if(val.success)
        {
            toast.success("email sent")
        }
        else{
            toast.error("Something went wrong..")
        }
        
    }
        fetchData()
     
    // Simulate form submission
    setSubmitStatus('Submitting...');
    setTimeout(() => {
      setSubmitStatus('Form submitted successfully!');
      setFormData({
        jobTitle: '',
        jobDescription: '',
        experienceLevel: '',
        endDate: '',
      });
      setCandidateEmails([]); // Clear candidate emails after submission
    }, 2000);
  };

  const handleRemoveEmail = (email) => {
    setCandidateEmails(candidateEmails.filter((item) => item !== email));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-700">Create Job Listing</h2>
      <form onSubmit={handleSubmit}>
        {/* Job Title */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Job Title</label>
          <input
            type="text"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleChange}
            placeholder="Enter Job Title"
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        {/* Job Description */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Job Description</label>
          <textarea
            name="jobDescription"
            value={formData.jobDescription}
            onChange={handleChange}
            placeholder="Enter Job Description"
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            rows="4"
          ></textarea>
        </div>

        {/* Experience Level */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Experience Level</label>
          <select
            name="experienceLevel"
            value={formData.experienceLevel}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          >
            <option value="">Select Experience Level</option>
            <option value="junior">1 year</option>
            <option value="mid">1-2 years</option>
            <option value="senior">2+ years</option>
          </select>
        </div>

        {/* Add Candidate Emails */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Add Candidate Emails</label>
          <div className="flex items-center">
            <input
              type="email"
              value={newEmail}
              onChange={handleNewEmailChange}
              placeholder="xyz@gmail.com"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
            <button
              type="button"
              onClick={handleAddEmail}
              className="ml-2 bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600 transition duration-200"
            >
              Add
            </button>
          </div>
        </div>

        {/* Display Candidate Emails */}
        <div className="mb-4">
          <h3 className="text-gray-700 font-semibold mb-2">Candidate Emails</h3>
          <div className="flex flex-wrap gap-2">
            {candidateEmails.map((email, index) => (
              <div key={index} className="bg-gray-200 text-gray-700 p-2 rounded-md flex justify-between items-center">
                <span>{email}</span>
                <button
                  onClick={() => handleRemoveEmail(email)}
                  className="text-red-500 ml-2 hover:underline"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* End Date */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">End Date</label>
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
        >
          Send
        </button>

        {/* Submission Status */}
        {submitStatus && (
          <p className="mt-4 text-center text-gray-700">{submitStatus}</p>
        )}
      </form>
    </div>
  );
};

export default JobForm;
