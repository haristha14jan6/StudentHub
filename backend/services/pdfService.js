import PDFDocument from "pdfkit";

export const generatePortfolioPDF = (student, submissions) => {
  const doc = new PDFDocument({
    size: "A4",
    margin: 50
  });

  /* ================= THEME ================= */
  const primary = "#0f172a";   // dark slate
  const secondary = "#4f46e5"; // indigo
  const muted = "#475569";     // slate
  const line = "#e5e7eb";      // light gray

  const PAGE_WIDTH = doc.page.width;

  /* ================= TOP BAR ================= */
  doc.rect(0, 0, PAGE_WIDTH, 12).fill(secondary);
  doc.moveDown(2.5);

  /* ================= HEADER ================= */
  doc
    .font("Helvetica-Bold")
    .fontSize(24)
    .fillColor(primary)
    .text(student.name || "Student");

  

  /* ================= CONTACT ================= */
  const contact = [
    student.links?.email && `Email: ${student.links.email}`,
    student.links?.linkedin && `LinkedIn: ${student.links.linkedin}`,
    student.links?.github && `GitHub: ${student.links.github}`
  ].filter(Boolean).join("   |   ");

  doc
    .moveDown(0.6)
    .fontSize(8.5)
    .fillColor(muted)
    .text(contact);

  doc
    .moveDown(0.8)
    .moveTo(50, doc.y)
    .lineTo(PAGE_WIDTH - 50, doc.y)
    .stroke(line);

  doc.moveDown(1.2);

  /* ================= ABOUT ================= */
  if (student.about) {
    section(doc, "ABOUT ME");
    doc
      .font("Helvetica")
      .fontSize(10)
      .fillColor(primary)
      .text(student.about, {
        align: "justify",
        lineGap: 3
      });
    doc.moveDown(0.8);
  }


  /* ================= ACADEMIC INFO ================= */
  section(doc, "ACADEMIC INFORMATION");
  value(doc, `Roll Number: ${student.rollNo || "-"}`);
  value(doc, `Year: ${student.year || "-"}`);
  doc.moveDown(0.8);

  /* ================= TECHNICAL SKILLS ================= */
/* ================= TECHNICAL SKILLS ================= */
if (student.skills?.length) {
  section(doc, "TECHNICAL SKILLS");

  const skillMap = {
    Frontend: ["JavaScript", "React", "HTML", "CSS"],
    Backend: ["Node.js", "Express.js", "REST APIs"],
    Database: ["MongoDB"],
    Tools: ["Git", "GitHub", "Postman"],
    Concepts: ["OOPs", "DBMS", "Basic System Design"]
  };

  Object.entries(skillMap).forEach(([category, values]) => {
    const matched = values.filter(v =>
      student.skills.map(s => s.toLowerCase()).includes(v.toLowerCase())
    );

    if (matched.length > 0) {
      doc
        .font("Helvetica-Bold")
        .fontSize(10)
        .fillColor(primary)
        .text(`${category}:`, { continued: true });

      doc
        .font("Helvetica")
        .fontSize(9.5)
        .fillColor(muted)
        .text(` ${matched.join(", ")}`);

      doc.moveDown(0.6); // space between categories
    }
  });

  doc.moveDown(0.8);
}


  
  /* ================= ACTIVITIES ================= */
  section(doc, "ACTIVITIES & ACHIEVEMENTS");

  submissions.forEach((sub, i) => {
    doc
      .font("Helvetica-Bold")
      .fontSize(10)
      .fillColor(primary)
      .text(`${i + 1}. ${sub.title}`);

    doc
      .font("Helvetica")
      .fontSize(9)
      .fillColor(muted)
      .text(capitalize(sub.activityType));

    doc.moveDown(0.5);
  });

  return doc;
};

/* ================= HELPERS ================= */

function section(doc, title) {
  doc
    .font("Helvetica-Bold")
    .fontSize(12)
    .fillColor("#4f46e5")
    .text(title);
  doc.moveDown(0.4);
}

function value(doc, text) {
  doc.font("Helvetica").fontSize(9.5).fillColor("#475569").text(text);
}

function bullet(doc, text) {
  doc.font("Helvetica").fontSize(9.5).fillColor("#475569").text(`• ${text}`);
}

function capitalize(text = "") {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}
