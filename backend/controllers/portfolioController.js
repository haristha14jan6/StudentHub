import User from "../models/User.js";
import ActivitySubmission from "../models/ActivitySubmission.js";
import { generatePortfolioPDF } from "../services/pdfService.js";

export const generatePortfolio = async (req, res) => {
  try {
    const studentId = req.user.id;

    const student = await User.findById(studentId).select(
      "name rollNo dept credits"
    );

    const submissions = await ActivitySubmission.find({
      student: studentId,
      status: "approved"
    });

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
