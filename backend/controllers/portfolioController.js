import User from "../models/User.js";
import ActivitySubmission from "../models/ActivitySubmission.js";
import { generatePortfolioPDF } from "../services/pdfService.js";

/* =========================
   1️⃣ Generate Portfolio PDF
   ========================= */
export const generatePortfolio = async (req, res) => {
  try {
    const studentId = req.user.id;

    const student = await User.findById(studentId).select(
      "name rollNo dept college year about skills links"
    );

    const submissions = await ActivitySubmission.find({
      student: studentId,
      status: "approved"
    }).sort({ createdAt: -1 });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="portfolio.pdf"'
    );

    const pdfDoc = generatePortfolioPDF(student, submissions);
    pdfDoc.pipe(res);
    pdfDoc.end();

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


/* =========================
   2️⃣ Portfolio View (JSON)
   ========================= */
export const getPortfolioView = async (req, res) => {
  try {
    const studentId = req.user.id;

    // Fetch user profile info
    const user = await User.findById(studentId).select(
      "name rollNo dept college year about skills links"
    );

    // Fetch approved submissions
    const submissions = await ActivitySubmission.find({
      student: studentId,
      status: "approved"
    });

    // Group by activity type
    const activities = {
      hackathons: [],
      internships: [],
      certifications: [],
      papers: []
    };

    submissions.forEach(sub => {
      if (sub.activityType === "hackathon")
        activities.hackathons.push(sub);
      else if (sub.activityType === "internship")
        activities.internships.push(sub);
      else if (sub.activityType === "certification")
        activities.certifications.push(sub);
      else if (sub.activityType === "paper")
        activities.papers.push(sub);
    });

    res.json({ user, activities });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
