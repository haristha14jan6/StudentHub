import { useEffect, useState } from "react";
import { 
  Download, 
  RefreshCw, 
  ExternalLink, 
  Trophy, 
  Briefcase, 
  Award, 
  BookOpen, 
  Github, 
  Linkedin, 
  Mail,
  Loader2
} from "lucide-react";
import Sidebar from "../../components/student/Sidebar";
import { getPortfolioView, downloadPortfolio } from "../../api/student";

export default function PortfolioView() {
  const [data, setData] = useState(null);

  useEffect(() => {
    getPortfolioView().then(res => setData(res));
  }, []);

  const handleDownloadPDF = async () => {
    try {
      const blob = await downloadPortfolio();
      const url = window.URL.createObjectURL(new Blob([blob], { type: "application/pdf" }));
      const link = document.createElement("a");
      link.href = url;
      link.download = "portfolio.pdf";
      link.click();
      window.URL.revokeObjectURL(url);
    } catch {
      alert("Failed to download PDF");
    }
  };

  if (!data) return (
    <div className="flex h-screen items-center justify-center bg-slate-50">
      <div className="flex flex-col items-center gap-3">
        <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
        <p className="text-slate-500 font-medium tracking-wide">Assembling your portfolio...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex bg-slate-50">
      <Sidebar />

      <main className="flex-1 p-8 lg:p-12">
        <div className="max-w-5xl mx-auto">
          
          {/* Action Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-extrabold text-slate-900">Your Portfolio</h1>
              <p className="text-slate-500">Preview how your profile appears to others.</p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => window.location.reload()}
                className="flex items-center gap-2 bg-white border border-slate-200 px-5 py-2.5 rounded-xl font-semibold text-slate-700 hover:bg-slate-50 transition-all shadow-sm"
              >
                <RefreshCw className="w-4 h-4" />
                Regenerate
              </button>

              <button
                onClick={handleDownloadPDF}
                className="flex items-center gap-2 bg-slate-900 text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-slate-800 transition-all shadow-lg active:scale-95"
              >
                <Download className="w-4 h-4" />
                Download PDF
              </button>
            </div>
          </div>

          {/* Profile Hero Card */}
          <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 rounded-3xl p-8 mb-8 text-white shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
               <Award className="w-40 h-40" />
            </div>
            
            <div className="relative z-10">
              <h2 className="text-4xl font-bold mb-2">{data.user.name}</h2>
              <p className="text-xl font-medium opacity-90 mb-4">
                {data.user.dept} Student @ {data.user.college}
              </p>
              
              <div className="flex flex-wrap gap-4 text-sm font-medium">
                <span className="bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full">
                  Roll No: {data.user.rollNo}
                </span>
                <span className="bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full">
                  Year {data.user.year}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column (Main Info) */}
            <div className="lg:col-span-2 space-y-8">
              
              <Section title="About Me" icon={<BookOpen className="w-5 h-5" />}>
                <p className="text-slate-600 leading-relaxed italic">
                  "{data.user.about || "No bio provided yet. Add one in settings to stand out!"}"
                </p>
              </Section>

              <Section title="Key Achievements" icon={<Trophy className="w-5 h-5 text-amber-500" />}>
                <Grid>
                  {data.activities.hackathons.map(h => (
                    <PortfolioCard key={h._id} title={h.title} subtitle="Hackathon" icon={<Trophy className="text-amber-500" />} color="bg-amber-50" />
                  ))}
                  {data.activities.internships.map(i => (
                    <PortfolioCard key={i._id} title={i.title} subtitle="Internship" icon={<Briefcase className="text-blue-500" />} color="bg-blue-50" />
                  ))}
                  {data.activities.certifications.map(c => (
                    <PortfolioCard key={c._id} title={c.title} subtitle="Certification" icon={<Award className="text-purple-500" />} color="bg-purple-50" />
                  ))}
                  {data.activities.papers.map(p => (
                    <PortfolioCard key={p._id} title={p.title} subtitle="Research" icon={<ExternalLink className="text-emerald-500" />} color="bg-emerald-50" />
                  ))}
                </Grid>
              </Section>
            </div>

            {/* Right Column (Skills & Socials) */}
            <div className="space-y-8">
              <Section title="Technical Stack">
                <div className="flex flex-wrap gap-2">
                  {data.user.skills.map(skill => (
                    <span key={skill} className="bg-slate-100 text-slate-700 border border-slate-200 px-3 py-1 rounded-lg text-sm font-semibold hover:bg-white hover:border-blue-400 transition-all cursor-default">
                      {skill}
                    </span>
                  ))}
                </div>
              </Section>

              <Section title="Connect">
                <ul className="space-y-4">
                  {data.user.links.github && (
                    <SocialLink icon={<Github className="w-5 h-5" />} label="GitHub" value={data.user.links.github} />
                  )}
                  {data.user.links.linkedin && (
                    <SocialLink icon={<Linkedin className="w-5 h-5 text-blue-600" />} label="LinkedIn" value={data.user.links.linkedin} />
                  )}
                  {data.user.links.email && (
                    <SocialLink icon={<Mail className="w-5 h-5 text-red-500" />} label="Email" value={data.user.links.email} />
                  )}
                </ul>
              </Section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

/* ---------- Optimized Reusable Components ---------- */

function Section({ title, icon, children }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
      <div className="flex items-center gap-2 mb-4">
        {icon}
        <h3 className="font-bold text-slate-800 text-lg uppercase tracking-tight">{title}</h3>
      </div>
      {children}
    </div>
  );
}

function Grid({ children }) {
  return <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>;
}

function PortfolioCard({ title, subtitle, icon, color }) {
  return (
    <div className="group border border-slate-100 rounded-xl p-4 hover:border-blue-200 hover:shadow-md transition-all flex items-start gap-4">
      <div className={`p-2 rounded-lg ${color}`}>
        {icon}
      </div>
      <div>
        <p className="font-bold text-slate-800 line-clamp-1">{title}</p>
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">{subtitle}</p>
      </div>
    </div>
  );
}

function SocialLink({ icon, label, value }) {
  return (
    <li className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100 group hover:bg-white hover:border-blue-200 transition-all">
      <div className="text-slate-400 group-hover:text-slate-600">{icon}</div>
      <div className="overflow-hidden">
        <p className="text-xs text-slate-400 font-bold uppercase">{label}</p>
        <p className="text-sm font-semibold text-blue-600 truncate">{value}</p>
      </div>
    </li>
  );
}