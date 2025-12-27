import { Briefcase, Users, Building2 } from "lucide-react";

export default function StatCard({ title, value }) {
  const getTheme = () => {
    const t = title.toLowerCase();
    
    // Total Drives Posted - Blue
    if (t.includes("total drives") || t.includes("posted")) {
      return { 
        icon: <Briefcase className="w-6 h-6" />, 
        iconBg: "bg-[#0EA5E9]", 
      };
    }
    // Eligible Students / Applicants - Green
    if (t.includes("student") || t.includes("applicant")) {
      return { 
        icon: <Users className="w-6 h-6" />, 
        iconBg: "bg-[#22C55E]", 
      };
    }
    // Active Companies - Purple (Matches your target image)
    if (t.includes("company")) {
      return { 
        icon: <Building2 className="w-6 h-6" />, 
        iconBg: "bg-[#8B5CF6]", 
      };
    }
    return { icon: <Briefcase className="w-6 h-6" />, iconBg: "bg-slate-500" };
  };

  const theme = getTheme();

  return (
    <div className="bg-white rounded-2xl p-6 shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-slate-50 flex items-center gap-5 transition-all hover:shadow-lg hover:translate-y-[-2px]">
      
      {/* Icon Container with the specific branding colors */}
      <div className={`${theme.iconBg} text-white p-4 rounded-2xl shadow-md flex items-center justify-center`}>
        {theme.icon}
      </div>

      {/* Content Stack */}
      <div className="flex flex-col justify-center">
        <span className="text-3xl font-bold text-slate-900 leading-none">
          {value}
        </span>
        <span className="text-slate-500 text-sm font-medium mt-1.5 whitespace-nowrap">
          {title}
        </span>
      </div>
    </div>
  );
}