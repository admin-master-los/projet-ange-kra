import jsPDF from 'jspdf';

const FOOTER_INFO = {
  email: "contact@leonceouattarastudiogroup.site",
  whatsapp: "(+225) 05 45 13 07 39",
  website: "leonceouattarastudiogroup.site",
  linkedin: "linkedin.com/company/leonceouattarastudio"
};

function addFooter(doc: jsPDF, pageNumber: number) {
  const pageHeight = doc.internal.pageSize.height;
  const footerY = pageHeight - 20;
  
  doc.setFontSize(8);
  doc.setTextColor(100, 100, 100);
  
  // Footer content
  const footerLines = [
    `📧 ${FOOTER_INFO.email}`,
    `💬 WhatsApp : ${FOOTER_INFO.whatsapp}`,
    `🌐 ${FOOTER_INFO.website}`,
    `💼 ${FOOTER_INFO.linkedin}`
  ];
  
  footerLines.forEach((line, index) => {
    doc.text(line, 20, footerY + (index * 3));
  });
  
  // Page number
  doc.text(`Page ${pageNumber}`, doc.internal.pageSize.width - 30, footerY);
}

function addHeader(doc: jsPDF, title: string) {
  doc.setFontSize(16);
  doc.setTextColor(40, 40, 40);
  doc.text("Document de Cadrage - Plateforme CIFOP", 20, 30);
  
  doc.setFontSize(14);
  doc.setTextColor(60, 60, 60);
  doc.text(title, 20, 45);
  
  // Add line
  doc.setLineWidth(0.5);
  doc.setDrawColor(200, 200, 200);
  doc.line(20, 50, doc.internal.pageSize.width - 20, 50);
}

export async function generateSectionPDF(section: any, sectionData: any) {
  const doc = new jsPDF();
  let yPos = 60;
  
  addHeader(doc, `SECTION ${section.id} : ${section.title}`);
  
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  
  // Add section data
  if (Object.keys(sectionData).length === 0) {
    doc.text("Aucune donnée saisie pour cette section.", 20, yPos);
  } else {
    Object.entries(sectionData).forEach(([key, value]) => {
      if (yPos > 250) {
        doc.addPage();
        yPos = 30;
        addHeader(doc, `SECTION ${section.id} : ${section.title} (suite)`);
        yPos = 60;
      }
      
      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      doc.text(`${key}:`, 20, yPos);
      yPos += 5;
      
      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0);
      
      if (typeof value === 'string') {
        const lines = doc.splitTextToSize(value || 'Non renseigné', 170);
        doc.text(lines, 20, yPos);
        yPos += lines.length * 4 + 5;
      } else if (Array.isArray(value)) {
        value.forEach((item, index) => {
          doc.text(`${index + 1}. ${typeof item === 'object' ? JSON.stringify(item) : item}`, 25, yPos);
          yPos += 4;
        });
        yPos += 5;
      } else if (typeof value === 'object') {
        Object.entries(value).forEach(([subKey, subValue]) => {
          doc.text(`${subKey}: ${subValue}`, 25, yPos);
          yPos += 4;
        });
        yPos += 5;
      }
    });
  }
  
  addFooter(doc, 1);
  
  const fileName = `CIFOP_Section_${section.id}_${section.title.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`;
  doc.save(fileName);
}

export async function generateFullPDF(sections: any[], formData: any) {
  const doc = new jsPDF();
  let pageNumber = 1;
  
  // Cover page
  doc.setFontSize(20);
  doc.setTextColor(40, 40, 40);
  doc.text("Document de Cadrage Complet", 20, 50);
  
  doc.setFontSize(16);
  doc.setTextColor(60, 60, 60);
  doc.text("Plateforme de Formation et Orientation Professionnelle", 20, 70);
  
  doc.setFontSize(12);
  doc.text("Client : M. Ange KRA", 20, 100);
  doc.text("Fonction : Manager Général CIFOP", 20, 110);
  doc.text("Date : 14 Décembre 2024", 20, 120);
  doc.text("Version : 1.0 - Document de Clarification", 20, 130);
  
  addFooter(doc, pageNumber);
  
  // Add each section
  sections.forEach((section, sectionIndex) => {
    doc.addPage();
    pageNumber++;
    
    let yPos = 60;
    addHeader(doc, `SECTION ${section.id} : ${section.title}`);
    
    const sectionData = formData[section.id] || {};
    
    if (Object.keys(sectionData).length === 0) {
      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      doc.text("Aucune donnée saisie pour cette section.", 20, yPos);
    } else {
      Object.entries(sectionData).forEach(([key, value]) => {
        if (yPos > 250) {
          doc.addPage();
          pageNumber++;
          yPos = 30;
          addHeader(doc, `SECTION ${section.id} : ${section.title} (suite)`);
          yPos = 60;
        }
        
        doc.setFontSize(9);
        doc.setTextColor(100, 100, 100);
        doc.text(`${key}:`, 20, yPos);
        yPos += 4;
        
        doc.setFontSize(9);
        doc.setTextColor(0, 0, 0);
        
        if (typeof value === 'string') {
          const lines = doc.splitTextToSize(value || 'Non renseigné', 170);
          doc.text(lines, 20, yPos);
          yPos += lines.length * 3.5 + 3;
        } else if (Array.isArray(value)) {
          value.forEach((item, index) => {
            const text = typeof item === 'object' ? JSON.stringify(item) : item;
            doc.text(`${index + 1}. ${text}`, 25, yPos);
            yPos += 3.5;
          });
          yPos += 3;
        } else if (typeof value === 'object') {
          Object.entries(value).forEach(([subKey, subValue]) => {
            doc.text(`${subKey}: ${subValue}`, 25, yPos);
            yPos += 3.5;
          });
          yPos += 3;
        }
      });
    }
    
    addFooter(doc, pageNumber);
  });
  
  const fileName = `CIFOP_Document_Cadrage_Complet_${new Date().toISOString().split('T')[0]}.pdf`;
  doc.save(fileName);
}