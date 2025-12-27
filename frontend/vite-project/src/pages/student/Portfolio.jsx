import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/student/Sidebar";
import Navbar from "../../components/student/Navbar"; // Ensure this path is correct
import { Sparkles, ArrowRight, Layout, Share2, Award } from "lucide-react";

export default function Portfolio() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar - Fixed to the left */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Navbar - Top section matching the dashboard header */}
        <Navbar />

        {/* Scrollable Content Body */}
        <main className="p-8 lg:p-12">
          <div className="max-w-5xl mx-auto">
            
            {/* Main Hero Card */}
            <div className="relative bg-white rounded-3xl p-8 lg:p-16 shadow-sm border border-slate-200 overflow-hidden">
              {/* Decorative Background Blobs */}
              <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-60" />
              <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-50 rounded-full blur-3xl opacity-60" />

              <div className="relative z-10 flex flex-col items-center text-center space-y-8">
                <div className="space-y-4 max-w-2xl">
                  <h1 className="text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight">
                    Generate Your Professional <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                      Academic Portfolio
                    </span>
                  </h1>
                  <p className="text-lg text-slate-500 leading-relaxed">
                    Turn your profile data into a sleek, shareable digital resume. 
                    Showcase your achievements, certifications, and academic journey 
                    to potential recruiters in one click.
                  </p>
                </div>

                <button
                  onClick={() => navigate("/student/portfolio/view")}
                  className="group flex items-center gap-3 bg-slate-900 hover:bg-slate-800 text-white px-10 py-4 rounded-2xl font-bold text-lg transition-all shadow-xl shadow-slate-200 active:scale-95"
                >
                  Generate Portfolio
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Feature Highlights Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <FeatureItem 
                icon={<Layout className="w-6 h-6 text-blue-600" />}
                title="Dynamic Layouts"
                description="Choose from multiple professional templates designed for students."
              />
              <FeatureItem 
                icon={<Share2 className="w-6 h-6 text-purple-600" />}
                title="Instant Sharing"
                description="Get a unique URL to share with recruiters or on your LinkedIn profile."
              />
              <FeatureItem 
                icon={<Award className="w-6 h-6 text-orange-600" />}
                title="Verified Data"
                description="Your portfolio pulls directly from your approved activity submissions."
              />
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}

function FeatureItem({ icon, title, description }) {
  return (
    <div className="bg-white/50 backdrop-blur-sm p-6 rounded-2xl border border-slate-200 hover:border-blue-200 transition-colors">
      <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-4 border border-slate-100">
        {icon}
      </div>
      <h3 className="font-bold text-slate-900 mb-1">{title}</h3>
      <p className="text-sm text-slate-500 leading-relaxed">
        {description}
      </p>
    </div>
  );
}