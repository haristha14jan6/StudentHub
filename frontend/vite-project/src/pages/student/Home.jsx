import { useEffect, useState } from "react";
import ActivityCard from "../../components/student/ActivityCard";
import RecentSubmissions from "../../components/student/RecentSubmissions";
import { getMySubmissions } from "../../api/student";
import { Award, Briefcase, BookOpen, Monitor } from "lucide-react";
export default function Home() {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    getMySubmissions().then(res => setSubmissions(res.data));
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-xl font-bold">Upload Your Activities</h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
  <ActivityCard 
    title="Hackathons" 
    type="hackathon" 
    icon={<Award className="text-blue-500" size={24} />} 
    
    bgColor="bg-blue-50"
  />
  <ActivityCard 
    title="Internships" 
    type="internship" 
    icon={<Briefcase className="text-purple-500" size={24} />} 
    
    bgColor="bg-purple-50"
  />
  <ActivityCard 
    title="Certifications" 
    type="certification" 
    icon={<BookOpen className="text-green-500" size={24} />} 
   
    bgColor="bg-green-50"
  />
  <ActivityCard 
    title="Paper Presentations" 
    type="paper" 
    icon={<Monitor className="text-orange-500" size={24} />} 
   
    bgColor="bg-orange-50"
  />
</div>

      <RecentSubmissions submissions={submissions} />
    </div>
  );
}
