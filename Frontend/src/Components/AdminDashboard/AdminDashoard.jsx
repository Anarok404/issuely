import React,{ useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AssignIssue from "./AssignIssue";
import IssueCard from "../Issue/IssueCard";

export default function AdminDashboard() {
    const [issues, setIssues] = useState([]);
    const [staff, setStaff] = useState([]);
    const [filters, setFilters] = useState({
        status: "",
        location: "",
        urgency: "",
    });

    useEffect(() => {
      const fetchIssues = async()=>{
        const token = localStorage.getItem("token");
        if(!token) return
       try {
         const res = await fetch("http://localhost:5000/issues/lead/getall",
           {
             method:"GET",
             headers:{
               "Authorization":`Bearer ${token}`,
               "Content-Type":"application/json"
             }
           }
         )
         if(!res.ok) throw new Error(`Error${res.status}:${res.statusText}`);
         const issue = await res.json();
         setIssues(issue);
       } catch (error) {
        console.log("Error in fetching staff",error)
       }
      }
      const fetchStaff = async()=>{
        const token = localStorage.getItem("token");
        if(!token) return;
        try {
          const res = await fetch("http://localhost:5000/lead/getstaff",
            {
              method:"GET",
              headers:{
                "Authorization":`Bearer ${token}`,
                "Content-Type":"application/json"
              }
            }
          )
          if(!res.ok) throw new Error(`Error ${res.status}:${res.statusText}`)
          const staff = await res.json();
          setStaff(staff);
        } catch (error) {
          console.log("Error in fetching staff");
        }
      }
      fetchIssues();
      fetchStaff()
    }, []);

    const filteredIssues = issues.filter(issues =>
        (!filters.status || issues.status === filters.status) &&
        (!filters.location || issues.location.name.includes(filters.location)) &&
        (!filters.priority || issues.priority === filters.priority) 
       
    );

    return (
        <div className="min-h-screen bg-linear-to-br from-indigo-600 to-purple-600 p-6">
            <div className="flex mb-6">
            <h1 className="text-3xl font-bold text-white ">
                Admin Dashboard
            </h1>
            <h3 className=" flex text-fuchsia-400 ml-10 mt-2"><Link to="/assign">click here to assign issue to staff</Link></h3>
            </div>
            <IssueFilters filters={filters} setFilters={setFilters} />

           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {filteredIssues.map(issue => (
          <IssueCard key={issue._id} issue={issue} setIssues ={setIssues} staff={staff}/>
        ))}
      </div>

      {filteredIssues.length === 0 && (
        <p className="text-center text-black text-2xl mt-6">
          No  issues found...
        </p>
      )}
        </div>
    );
}


function IssueFilters({ filters, setFilters }) {
  return (
    <div className="bg-indigo-400 p-4 rounded-xl shadow flex gap-4 flex-wrap">
      <select
        className="border p-2 rounded"
        onChange={e =>
          setFilters({ ...filters, priority: e.target.value })
        }
      >
        <option value="">All Priorities</option>
        <option value = "high">High</option>
        <option value="meduim">Medium</option>
        <option value ="low">Low</option>
      </select>

      <select
        className="border p-2 rounded"
        onChange={e =>
          setFilters({ ...filters, status: e.target.value })
        }
      >
        <option value="">All Status</option>
        <option value= "received">Received</option>
        <option value = "assigned">Assigned</option>
        <option value = "in-progress">In Progress</option>
        <option value = "resolved">Resolved</option>
      </select>
      <input
        type="text"
        placeholder="Search by location"
        className="border p-2 rounded"
        value={filters.location}
        onChange={(e) => setFilters({ ...filters, location: e.target.value })}

      />
    </div>
  );
}




