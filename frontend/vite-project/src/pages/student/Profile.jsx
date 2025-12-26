import { useState, useEffect } from "react";
import { User, GraduationCap, Briefcase, Link as LinkIcon, Github, Linkedin, Mail, Save, Loader2 } from "lucide-react";
import Sidebar from "../../components/student/Sidebar";
import { getMyProfile, updateProfile } from "../../api/student";

export default function Profile() {
  const [about, setAbout] = useState("");
  const [skills, setSkills] = useState("");
  const [github, setGithub] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [email, setEmail] = useState("");
  const [saving, setSaving] = useState(false);
  const [college, setCollege] = useState("");
  const [year, setYear] = useState(3);
  const [name, setName] = useState("");
  const [rollNo, setRollNo] = useState("");

  const handleSave = async () => {
    setSaving(true);
    await updateProfile({
      about,
      skills: skills.split(",").map((s) => s.trim()),
      links: { github, linkedin, email },
      college,
      year,
    });
    alert("Profile updated successfully");
    setSaving(false);
  };

  useEffect(() => {
    getMyProfile().then((data) => {
      setName(data.name);
      setRollNo(data.rollNo);
      setAbout(data.about || "");
      setSkills((data.skills || []).join(", "));
      setGithub(data.links?.github || "");
      setLinkedin(data.links?.linkedin || "");
      setEmail(data.links?.email || "");
      setCollege(data.college || "");
      setYear(data.year || 3);
    });
  }, []);

  return (
    <div className="min-h-screen flex bg-slate-50 ">
      <Sidebar />

      <main className="flex-1 p-8 lg:p-12">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900">Profile Settings</h1>
            <p className="text-slate-500 mt-1">Update your personal information and technical showcase.</p>
          </div>

          <div className="space-y-6">
            {/* Student Identity Section */}
            <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center gap-2">
                <User className="w-5 h-5 text-blue-600" />
                <h2 className="font-semibold text-slate-800">Student Identity</h2>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <ReadOnly label="Full Name" value={name} />
                <ReadOnly label="Roll Number" value={rollNo} />
              </div>
            </section>

            {/* Academic Details Section */}
            <section className="bg-white rounded-2xl shadow-sm border border-slate-200">
              <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-purple-600" />
                <h2 className="font-semibold text-slate-800">Academic Details</h2>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-slate-700">College Name</label>
                  <input
                    value={college}
                    onChange={(e) => setCollege(e.target.value)}
                    className="border border-slate-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    placeholder="College Name"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-slate-700">Current Year</label>
                  <select
                    value={year}
                    onChange={(e) => setYear(Number(e.target.value))}
                    className="border border-slate-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none bg-white transition-all"
                  >
                    <option value={1}>1st Year</option>
                    <option value={2}>2nd Year</option>
                    <option value={3}>3rd Year</option>
                    <option value={4}>4th Year</option>
                  </select>
                </div>
              </div>
            </section>

            {/* About & Skills Section */}
            <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 space-y-6">
              <div className="flex items-center gap-2 mb-2">
                <Briefcase className="w-5 h-5 text-orange-500" />
                <h2 className="font-semibold text-slate-800">Professional Bio</h2>
              </div>
              
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-slate-700">About Me</label>
                <textarea
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl p-4 focus:ring-2 focus:ring-blue-500 outline-none transition-all min-h-[120px]"
                  placeholder="Tell something about yourself..."
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-slate-700">Technical Skills (comma separated)</label>
                <input
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  placeholder="React, Node.js, MongoDB"
                />
              </div>
            </section>

            {/* Social Links Section */}
            <section className="bg-white rounded-2xl shadow-sm border border-slate-200">
              <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-2">
                <LinkIcon className="w-5 h-5 text-emerald-600" />
                <h2 className="font-semibold text-slate-800">Social & Contact Links</h2>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                  <Github className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
                  <input
                    value={github}
                    onChange={(e) => setGithub(e.target.value)}
                    className="w-full border border-slate-300 rounded-xl p-3 pl-10 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    placeholder="GitHub URL"
                  />
                </div>
                <div className="relative">
                  <Linkedin className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
                  <input
                    value={linkedin}
                    onChange={(e) => setLinkedin(e.target.value)}
                    className="w-full border border-slate-300 rounded-xl p-3 pl-10 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    placeholder="LinkedIn URL"
                  />
                </div>
                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-slate-300 rounded-xl p-3 pl-10 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    placeholder="Contact Email"
                  />
                </div>
              </div>
            </section>

            {/* Save Button */}
            <div className="flex justify-end pt-4">
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-8 py-3.5 rounded-xl font-bold transition-all shadow-lg active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {saving ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    Save Profile
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function ReadOnly({ label, value }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">{label}</label>
      <div className="p-3 bg-slate-100 rounded-xl text-slate-700 font-medium border border-slate-200">
        {value || "Not Provided"}
      </div>
    </div>
  );
}