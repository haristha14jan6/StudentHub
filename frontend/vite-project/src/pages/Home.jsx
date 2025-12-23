import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import {
  GraduationCap, ArrowRight, Sparkles, Users, Trophy, FileCheck, Award,
  BarChart3, Calendar, FileText, Briefcase, Bell, Shield, UserPlus,
  Upload, CheckCircle, Download, Phone, MapPin, Mail
} from "lucide-react";

/* ---------------- HERO (Updated to be Transparent) ---------------- */
const Hero = () => (
  <section className="relative min-h-screen flex items-center justify-center text-center px-6 pt-20 overflow-hidden">
    {/* Background Decoration specifically for Hero area */}
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-200/20 via-transparent to-transparent -z-10" />
    
    <div className="max-w-4xl animate-in fade-in slide-in-from-bottom-8 duration-1000 relative z-10">
      <div className="inline-flex gap-2 items-center bg-white/60 backdrop-blur-md text-blue-700 px-4 py-2 rounded-full mb-8 font-medium border border-white/50 shadow-sm">
        <Sparkles size={16} className="animate-pulse" /> 
        R.M.K College Student Portal
      </div>

      <h1 className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tight text-slate-900 leading-[1.1]">
        Transform Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Academic Journey</span>
      </h1>

      <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
        Track achievements, manage certifications, and build professional portfolios with the college's official career-readiness platform.
      </p>

      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-20">
        <Link to="/register" className="w-full sm:w-auto px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 hover:scale-105 transition-all shadow-xl shadow-slate-200">
          Start Free <ArrowRight size={20} />
        </Link>
        <a href="#how-it-works" className="w-full sm:w-auto px-8 py-4 bg-white/60 backdrop-blur-md border border-white/50 rounded-2xl font-bold text-slate-900 hover:bg-white/80 transition-all">
          See How It Works
        </a>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <Stat icon={Users} value="5000+" label="Students" color="text-blue-600" />
        <Stat icon={Trophy} value="12K+" label="Achievements" color="text-amber-500" />
        <Stat icon={FileCheck} value="98%" label="Approval Rate" color="text-green-600" />
        <Stat icon={Sparkles} value="150+" label="Events" color="text-purple-600" />
      </div>
    </div>
  </section>
);

const Stat = ({ icon: Icon, value, label, color }) => (
  <div className="bg-white/60 backdrop-blur-md border border-white/50 rounded-2xl p-6 shadow-xl shadow-blue-900/5 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
    <Icon className={`${color} mx-auto mb-3`} size={28} />
    <h3 className="text-2xl font-bold text-slate-900">{value}</h3>
    <p className="text-slate-500 text-sm font-bold uppercase tracking-wide">{label}</p>
  </div>
);

/* ---------------- FEATURES (Transparent Over Global Gradient) ---------------- */
const Features = () => (
  <section id="features" className="relative py-24 overflow-hidden">
    <div className="max-w-7xl mx-auto px-6 relative z-10">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">Powerful Features</h2>
        <p className="text-slate-600 font-medium max-w-2xl mx-auto">Everything you need to manage your professional identity in one unified platform.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { icon: Award, title: "Certificates", desc: "Verified skill badges" },
          { icon: BarChart3, title: "Leaderboard", desc: "Compete with peers" },
          { icon: FileText, title: "Portfolio", desc: "Automated CV builder" },
          { icon: Calendar, title: "Events", desc: "Campus activities" },
          { icon: Users, title: "Roles", desc: "Admin & Student views" },
          { icon: Briefcase, title: "Placements", desc: "Job opportunities" },
          { icon: Bell, title: "Notifications", desc: "Real-time updates" },
          { icon: Shield, title: "Secure", desc: "SSO Encryption" }
        ].map((feat, i) => (
          <div key={i} className="group relative bg-white/60 backdrop-blur-md p-8 rounded-[2.5rem] border border-white/50 shadow-xl shadow-blue-900/5 hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-2 transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent opacity-0 group-hover:opacity-100 rounded-[2.5rem] transition-opacity duration-500" />
            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 border border-slate-100">
              <feat.icon className="text-blue-600" size={26} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2 relative z-10 tracking-tight">{feat.title}</h3>
            <p className="text-slate-500 text-sm leading-relaxed relative z-10 font-medium">{feat.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ---------------- HOW IT WORKS (Updated to Transparent) ---------------- */
const HowItWorks = () => (
  <section id="how-it-works" className="py-32 relative overflow-hidden">
    <div className="max-w-7xl mx-auto px-6 relative z-10">
      <h2 className="text-center text-4xl font-extrabold text-slate-900 mb-20 tracking-tight">Simple Four-Step Process</h2>
      <div className="grid md:grid-cols-4 gap-12 relative">
        <Step number="01" icon={UserPlus} title="Sign Up" desc="Register with your roll number" />
        <Step number="02" icon={Upload} title="Upload" desc="Submit your latest certificates" />
        <Step number="03" icon={CheckCircle} title="Verify" desc="Automatic staff validation" />
        <Step number="04" icon={Download} title="Portfolio" desc="Generate and share your CV" />
      </div>
    </div>
  </section>
);

const Step = ({ number, icon: Icon, title, desc }) => (
  <div className="relative text-center group">
    <div className="w-20 h-20 bg-slate-900 text-white rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:rotate-6 transition-transform">
      <Icon size={32} />
    </div>
    <span className="absolute -top-4 right-1/2 translate-x-12 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-lg border-2 border-white shadow-sm">
      {number}
    </span>
    <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
    <p className="text-slate-600 text-sm font-medium">{desc}</p>
  </div>
);

/* ---------------- CTA ---------------- */
const CTA = () => (
  <section className="py-24 px-6 relative z-10">
    <div className="max-w-5xl mx-auto bg-gradient-to-br from-blue-600 to-purple-700 rounded-[3rem] p-12 text-center text-white shadow-2xl shadow-blue-500/20">
      <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
      <p className="text-blue-100 mb-10 text-lg max-w-xl mx-auto font-medium">Join 5,000+ students already building their future on the EduTrack platform.</p>
      <Link to="/register" className="inline-flex items-center gap-2 bg-white text-blue-600 px-10 py-4 rounded-2xl font-bold text-lg hover:bg-blue-50 transition-all shadow-lg active:scale-95">
        Get Started Free <ArrowRight size={20} />
      </Link>
    </div>
  </section>
);

/* ---------------- FOOTER (Glassmorphism Dark) ---------------- */
const Footer = () => (
  <footer id="contact" className="bg-slate-950/90 backdrop-blur-xl text-white py-24 px-6 border-t border-white/10 mt-20">
    <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-16">
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center">
             <GraduationCap size={28} className="text-white" />
          </div>
          <span className="text-3xl font-black tracking-tighter">EduTrack</span>
        </div>
        <p className="text-slate-400 font-medium leading-relaxed">
          Pioneering the next generation of academic achievement tracking at R.M.K Engineering College.
        </p>
      </div>

      <div className="space-y-6">
        <h4 className="text-lg font-bold uppercase tracking-widest text-blue-400">Resources</h4>
        <ul className="space-y-4 text-slate-300 font-medium">
          <li><a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a></li>
          <li><a href="#" className="hover:text-blue-400 transition-colors">User Manual</a></li>
          <li><a href="#" className="hover:text-blue-400 transition-colors">API Docs</a></li>
        </ul>
      </div>

      <div className="space-y-6">
        <h4 className="text-lg font-bold uppercase tracking-widest text-indigo-400">Contact Us</h4>
        <div className="space-y-4 font-medium text-slate-300">
          <div className="flex items-center gap-3"><Mail size={20} className="text-indigo-400" /> support@edutrack.edu</div>
          <div className="flex items-center gap-3"><Phone size={20} className="text-indigo-400" /> +91 44 2635 0000</div>
        </div>
      </div>

      <div className="space-y-6">
        <h4 className="text-lg font-bold uppercase tracking-widest text-purple-400">Headquarters</h4>
        <div className="flex items-start gap-3 text-slate-300 font-medium leading-relaxed">
          <MapPin size={24} className="text-purple-400 shrink-0" /> 
          <span>RSM Nagar, Kavaraipettai,<br />Gummidipoondi Taluk, <br />Chennai, TN - 601206</span>
        </div>
      </div>
    </div>
    <div className="max-w-7xl mx-auto border-t border-white/10 mt-20 pt-10 text-center">
      <p className="text-slate-500 font-bold text-sm tracking-widest uppercase">
        &copy; {new Date().getFullYear()} R.M.K Engineering College | Designed for Excellence
      </p>
    </div>
  </footer>
);


export default function Home() {
  return (
    /* Apply Global Gradient Here */
    <div className="min-h-screen bg-gradient-to-br from-[#E0F2FE] via-[#F5F3FF] to-[#FAE8FF] selection:bg-blue-600 selection:text-blue-900">
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <CTA />
      <Footer />
    </div>
  );
}