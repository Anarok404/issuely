import React,{ useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AssignIssue from "./AssignIssue";

/////////********* testing **********/

const mockStaff = [
  {
    _id: "s1",
    name: "Rahul Sharma",
    role: "Staff",
    department: "Maintenance",
  },
  {
    _id: "s2",
    name: "Anjali Verma",
    role: "Staff",
    department: "IT",
  },
  {
    _id: "s3",
    name: "Amit Kumar",
    role: "Staff",
    department: "Electrical",
  },
];

const mockIssues = [
  {
    _id: "i1",
    description: "Water leakage in Room 204",
    type: "Plumbing",
    location: "Block A - Room 204",
    urgency: "High",
    status: "Open",
    assignedTo: null,
    createdAt: "2025-02-20",
  },
  {
    _id: "i2",
    description: "Projector not working",
    type: "IT",
    location: "Seminar Hall",
    urgency: "Medium",
    status: "Assigned",
    assignedTo: "s2",
    createdAt: "2025-02-19",
  },
  {
    _id: "i3",
    description: "Broken switch board",
    type: "Electrical",
    location: "Lab 3",
    urgency: "Low",
    status: "In Progress",
    assignedTo: "s3",
    createdAt: "2025-02-18",
  },
];
  const testSample = [
    {
      _id: "ISSUE-101",
      type: "Electrical",
      priority: "High",
      location: "Block A - Room 203",
      date: "2025-02-12",
      status: "Closed",
      assignedTo: "s2",
    },
    {
      _id: "ISSUE-102",
      type: "Plumbing",
      priority: "Medium",
      location: "Hostel - Floor 1",
      date: "2025-02-11",
      status: "Assigned",
      assignedTo: null,
    },
  ];



export default function AdminDashboard() {
    const [issues, setIssues] = useState([]);
    const [staff, setStaff] = useState([]);
    const [filters, setFilters] = useState({
        status: "",
        location: "",
        urgency: "",
    });

    useEffect(() => {
        // const fetchIssues = async () => {
        //     await fetch("/issues")
        //     .then(res=>res.json())
        //     .then(setIssues)
        // };
        // const fetchStaff = async()=>{
        //     await fetch("/staff")
        //     .then(res=>res.json())
        //     .then(setStaff)
        // }
        setIssues(testSample);
        setStaff(mockStaff);
    }, []);

    const filteredIssues = issues.filter(issues =>
        (!filters.status || issues.status === filters.status) &&
        (!filters.location || issues.location.includes(filters.location)) &&
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
          <IssueCard key={issue.issueId} issue={issue} setIssues ={setIssues} staff={staff}/>
        ))}
      </div>

      {filteredIssues.length === 0 && (
        <p className="text-center text-gray-500 mt-6">
          No  issues found
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
        <option>High</option>
        <option>Medium</option>
        <option>Low</option>
      </select>

      <select
        className="border p-2 rounded"
        onChange={e =>
          setFilters({ ...filters, status: e.target.value })
        }
      >
        <option value="">All Status</option>
        <option>Received</option>
        <option>Assigned</option>
        <option>In Progress</option>
        <option>Resolved</option>
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



function IssueCard({ issue ,setIssues,staff}) {
  const [isUpdate, setIsUpdate] = useState(false);
  const[staffDetails,setStaffDetail] = useState(staff);
  const s = staff.filter(s=>s._id==issue.assignedTo);
  console.log("s",s);
  const updateIssueStatus = async(issueId, newStatus, setIssues)=>{
//   try {
//     const token = localStorage.getItem("token");

//     const response = await fetch(`/api/issues/${issueId}`, {
//       method: "PATCH",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify({ status: newStatus }),
//     });

//     if (!response.ok) {
//       throw new Error("Failed to update issue");
//     }

//     const updatedIssue = await response.json();

   
//     setIssues(updatedIssue);
//   } catch (error) {
//     console.error("Error updating issue:", error);
//     alert("Unable to update issue status");
//   }

  setIssues(prevIssues=>
    prevIssues.map((issue)=>issue.id===issueId?{...issue,status:newStatus}:issue))

  }
  return (
    <div
      className="bg-blue-200 p-4 rounded-xl shadow hover:shadow-lg transition h-fit"
    >
      <div className="flex justify-between">
        <h3 className="font-semibold text-blue-600">
          {issue.id}
        </h3>
        <StatusBadge status={issue.status} />
      </div>

      <p className="text-gray-700 mt-2">{issue.type}</p>
      <p className="text-sm text-gray-500">{issue.location}</p>
      <p className="text-sm text-gray-500">Assigned to:{s[0]?s[0].name:"Not assigned yet"}</p>
      

      <span
        className={`inline-block mt-3 px-2 py-1 text-xs rounded ${issue.priority === "High"
            ? "bg-red-100 text-red-600"
            : issue.priority === "Medium"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-green-100 text-green-600"
          }`}
      >
        {issue.priority}
      </span>
      <div>
        <button
          className="mt-2 border p-2 w-30 rounded bg-green-300 cursor-pointer hover:bg-green-500"
          onClick={() => setIsUpdate(true)}
        >Update Issue</button>
      </div>
      {
        isUpdate &&
        <div className="p-2 flex-wrap inline-block ">
        <select
          value={issue.status}
          onChange={(e) =>
            updateIssueStatus(issue.id, e.target.value, setIssues)
          }
          className="border p-2 rounded m-2 bg-blue-100"
        >
          <option>Assigned</option>
          <option>In Progress</option>
          <option>Resolved</option>
          <option>Closed</option>
        </select>
        <button
        className="border p-2 w-20 rounded bg-green-300 cursor-pointer hover:bg-green-500"
        onClick={()=>setIsUpdate(false)}
        >Save </button>
        </div>

      }
    </div>
  );
}



function StatusBadge({ status }) {
  const colors = {
    Received: "bg-gray-300 text-gray-800",
    Assigned: "bg-blue-200 text-blue-800",
    'In Progress': "bg-yellow-200 text-yellow-800",
    Resolved: "bg-green-200 text-green-800",
    Closed: "bg-red-300 text-red-800"
  };

  return (
    <span
      className={`px-2 py-1 text-xs rounded ${colors[status]}`}
    >
      {status}
    </span>
  );
}



