import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export const generatePdfFromElement = async (elementId, fileName = 'resume') => {
  try {
    // Get the resume element
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error('Resume element not found');
    }

    // Use html2canvas to capture the element as an image
    const canvas = await html2canvas(element, {
      scale: 2, // Higher scale for better quality
      useCORS: true,
      logging: false,
      backgroundColor: null,
      allowTaint: true,
    });

    // Calculate dimensions for A4 size (in mm)
    const pdfWidth = 210; // A4 width in mm
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    // Create PDF with proper dimensions
    const pdf = new jsPDF({
      orientation: pdfHeight > pdfWidth ? 'portrait' : 'landscape',
      unit: 'mm',
      format: [pdfWidth, pdfHeight],
    });

    // Convert canvas to image and add to PDF
    const imgData = canvas.toDataURL('image/png', 1.0);
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight, undefined, 'FAST');

    // Save the PDF
    pdf.save(`${fileName}.pdf`);
    return true;
  } catch (error) {
    console.error('Error generating PDF:', error);
    return false;
  }
};
