import PDFDocument from "pdfkit";

export const generatePortfolioPDF = (student, submissions) => {
  const doc = new PDFDocument({ margin: 50 });

  doc.fontSize(20).text("Student Portfolio", { align: "center" });
  doc.moveDown();

  doc.fontSize(12);
  doc.text(`Name: ${student.name}`);
  doc.text(`Roll No: ${student.rollNo || "-"}`);
  doc.text(`Department: ${student.dept || "-"}`);
  doc.text(`Total Credits: ${student.credits}`);
  doc.moveDown();

  doc.fontSize(16).text("Approved Activities");
  doc.moveDown(0.5);

  submissions.forEach((sub, index) => {
    doc
      .fontSize(12)
      .text(`${index + 1}. ${sub.title} (${sub.activityType})`);
  });

  return doc;
};
