// services/agreement.service.js
const PDFDocument = require("pdfkit");
const COMPANY = require("../config/company");
const path = require("path");

function formatDate(date) {
  const d = new Date(date);
  return d.toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

async function generateUserAgreementBuffer(submission, ipAddress ) {
  return new Promise((resolve) => {
    const doc = new PDFDocument({ size: "A4", margin: 55 });
    const chunks = [];
    doc.on("data", (chunk) => chunks.push(chunk));
    doc.on("end", () => resolve(Buffer.concat(chunks)));

    const blue = "#fb1b5f  node preview-agreement.js";
    const gray = "#333";
    const lightGray = "#555";
    const bold = "Helvetica-Bold";
    const regular = "Helvetica";
    const normal = 11;
    const leftMargin = 60;
    const width = 480;
    const agreementDate = formatDate(new Date());
    const { fullName, email, mobile ,location } = submission;



    const headerHeight = 100;
    const logoPath = path.join(__dirname, "../assets/logo.png");




    // Create linear gradient
const gradient = doc.linearGradient(0, 0, doc.page.width, 0);
gradient.stop(0, "#000000"); // Purple
gradient.stop(1, "#7deffc"); // Blue

// Background
doc.rect(0, 0, doc.page.width, headerHeight).fill(gradient);



// LEFT — LOGO
doc.image(logoPath, leftMargin, 20, {
  width: 90,
  align: "left",
});

// LEFT — COMPANY NAME (VERTICALLY CENTERED)
doc
  .fill("#fff")
  .font(bold)
  .fontSize(15)
  .text("", leftMargin, headerHeight / 2 - 10);

// RIGHT — REGISTRATION BLOCK
const rightBoxWidth = 300;
const rightX = doc.page.width - rightBoxWidth - leftMargin;
const rightStartY = headerHeight / 2 - 26;

doc
  .font(regular)
  .fontSize(10)
  .text("SEBI Registered Research Analyst", rightX, rightStartY, {
    width: rightBoxWidth,
    align: "right",
  })

  
  
  .moveDown(0.3)
  .text(`Registration No. ${COMPANY.SEBI.REG_NO}`, {
    width: rightBoxWidth,
    align: "right",
  })
  .moveDown(0.3)
  .text(
    "Compliance with SEBI (Research Analyst) Regulations, 2014",
    {
      width: rightBoxWidth,
      align: "right",
    }
  );

doc.moveDown(3);


    // ================= TITLE =================
const titleY = 115;

doc
  .fillColor(blue)
  .font(bold)
  .fontSize(20)
  .text("USER AGREEMENT", leftMargin, titleY);

doc
  .font(regular)
  .fontSize(12)
  .fillColor(gray)
  .text("Terms and Conditions of Research Services", leftMargin, doc.y + 4);

// Decorative divider
doc
  .moveTo(leftMargin, doc.y + 8)
  .lineTo(leftMargin + width, doc.y + 8)
  .strokeColor(blue)
  .lineWidth(1.5)
  .stroke();


// ================= CLIENT INFO =================
doc.moveDown(1.8);

// Section heading
doc
  .fillColor(blue)
  .font(bold)
  .fontSize(14)
  .text("CLIENT INFORMATION", leftMargin);

// Info card
const boxTop = doc.y + 10;
const boxHeight = 85;

// Card border
doc
  .roundedRect(leftMargin, boxTop, width, boxHeight, 6)
  .strokeColor(blue)
  .lineWidth(1)
  .stroke();

// Left column
doc
  .font(regular)
  .fontSize(normal)
  .fillColor(gray)
  .text(`Full Name`, leftMargin + 14, boxTop + 16)
  .font(bold)
  .text(`${fullName}`, leftMargin + 120, boxTop + 16);

// Right column
doc
  .font(regular)
  .fontSize(normal)
  .fillColor(gray)
  .text(`Email`, leftMargin + 14, boxTop + 40)
  .font(bold)
  .text(`${email}`, leftMargin + 120, boxTop + 40);

doc
  .font(regular)
  .fontSize(normal)
  .fillColor(gray)
  .text(`Mobile`, leftMargin + 14, boxTop + 64)
  .font(bold)
  .text(`${mobile}`, leftMargin + 120, boxTop + 64);

// Agreement date (subtle, below card)
doc.moveDown(5.2);
doc
  .fontSize(10)
  .fillColor("#555")
  .text(`Agreement Date: ${agreementDate}`, leftMargin);

doc.moveDown(1);


    // ================= HELPERS =================
    function heading(title) {
      doc.moveDown(1);
      doc.fillColor(blue).font(bold).fontSize(13).text(title, leftMargin);
      doc.moveTo(leftMargin, doc.y + 2).lineTo(leftMargin + width, doc.y + 2).strokeColor(blue).lineWidth(1).stroke();
      doc.moveDown(0.6);
    }

  



    function section(title, content) {
  const topMargin = 10;     // space before section
  const bottomMargin = 12;  // space after section

  // Top spacing
  doc.moveDown(topMargin / normal);

  if (title) {
    doc
      .fillColor(blue)
      .font(bold)
      .fontSize(11)
      .text(title, leftMargin);
    doc.moveDown(0.4); // small gap after title
  }

  doc
    .font(regular)
    .fillColor(gray)
    .fontSize(normal)
    .text(content, leftMargin, doc.y, {
      align: "justify",
      width,
      lineGap: 2,
    });

  // Bottom spacing
  doc.moveDown(bottomMargin / normal);
}


    function addFooter() {
      const footerY = 780;

     
      
      doc.fontSize(9).fillColor(lightGray)
        .text(`${COMPANY.NAME}• ${COMPANY.CONTACT.SUPPORT_EMAIL} • ${COMPANY.CONTACT.REPORT_MOBILE}`,
          leftMargin, footerY - 25, { width, align: "center" });
      doc.text(`Website: ${COMPANY.WEBSITE}`, leftMargin, footerY - 12, { width, align: "center" });
    }

    // ================= PAGE 1 =================
 heading("TERMS AND CONDITIONS:");
doc
  .font(regular)
  .fillColor(gray)
  .fontSize(normal)
  .text(
    "Parties to these Terms and Conditions:\n\n" +
    "i. Research Analyst: Trading Brain 4U, a SEBI Registered Research Analyst, holding Registration No. INH000009418, hereinafter referred to as the \"Research Analyst\" or \"RA\"; located at Nariman Point, Mumbai, near Mantralaya Bhavan.\n\n" +
    "ii. Client: The individual or entity subscribing to or availing research services provided by the Research Analyst, hereinafter referred to as the \"Client.\"",
    leftMargin,
    doc.y,
    { width, align: "justify", lineGap: 2 }
  );






section(
  "1. Availing The Services:",
  "The Client hereby accepts the research services and confirms that it is availing the research services at its own discretion provided by the Research Analyst (\"RA\"), and the Research Analyst agrees to provide such services in accordance with the terms and conditions set forth hereunder."
);


section(
  "2. Obligations on RA and Client:",
  "The client and the Research Analyst shall be bound by all applicable regulations, rules, circulars, and amendments issued by SEBI, including the SEBI (Research Analysts) Regulations, 2014, and all other notifications of the Government, if any, from time to time."
);

addFooter();

section(
  "3. Client Information and KYC:",
  "The client is bound, upon acceptance of services, to submit all requisite documents as requested by the Research Analyst and assist the RA in completing the KYC process.\n\n" +
  "The client hereby gives consent to the Research Analyst to fetch his KYC documents from the KYC Registration Agency (KRA)."
);

section(
  "4. Standard Terms of Service:",
  "The Client acknowledges and gives his consent to be bound by the terms set forth herewith, as well as any applicable amendments or updates provided by the Research Analyst.\n\n" +

  "The client hereby agrees:\n\n" +

  "1. I have read and understood the terms and conditions applicable to a research analyst as defined under regulation 2(1)(u) of the SEBI (Research Analyst) Regulations, 2014, including the fee structure.\n\n" +

  "2. I am subscribing to the research services for my own benefit and consumption, and any reliance placed on the research report provided by the Research Analyst shall be based on my own judgment and assessment of the conclusions contained in the research report.\n\n" +

  "3. All communication shall be conducted via WhatsApp. It shall be the sole responsibility of the client to review and verify all information provided.\n\n" +

  "I understand that:\n\n" +
  "i. Any investment made based on the recommendations in the research report is subject to market risk.\n" +
  "ii. Recommendations in the research report do not provide any assurance of returns.\n" +
  "iii. There is no recourse to claim any losses incurred on investments or trading made based on the recommendations in the research report.\n\n" +

  "Declaration by Research Analyst:\n" +
  "The Research Analyst further declares that:\n\n" +

  "1. It is duly registered with SEBI as a Research Analyst having Registration No.: INH000009418.\n" +
  "2. It has the registration and qualifications required to render the services contemplated under the RA Regulations, and the same are valid and subsisting.\n" +
  "3. The services provided by the RA do not conflict with or violate any provision of law, rule, regulation, contract, or other instrument to which it is a party or to which any of its property is or may be subject.\n" +
  "4. The maximum fee that may be charged by the RA is ₹1.51 lakhs plus applicable GST per annum per family of clients.\n" +
  "5. The recommendations provided by the RA do not provide any assurance of returns.\n" +
  "6. The RA is not engaged in any additional professional or business activities on a full-time or executive capacity that may interfere with or influence the independence of the research report and/or recommendations."
);

section(
  "5. Consideration and Mode of Payment:",
  "1. The client shall duly pay the fees to the RA against the invoice raised or for any agreed amount, whether written or oral, within 2 days.\n\n" +
  "2. The Client agrees to make all payments via UPI, Net Banking, Payment Gateway, or any other verified banking channel. The client shall not pay any fees in cash.\n\n" +
  "3. The Client hereby agrees to pay the fees only into the bank account of the Research Analyst. The RA shall not be liable for any payment made to a third-party account."
);


section(
  "6. Risk Factors:",
  "The Client understands that the services provided by the Research Analyst involve inherent risks, and the Client agrees to bear full responsibility for any financial or other consequences arising from the use of these services.\n\n" +
  "Investment in the market is subject to market risk, and is also subject to the following:\n\n" +
  "1. Trading in equities, derivatives, and other securities are subject to market risks and there is no assurance or guarantee of returns.\n" +
  "2. Past performance does not indicate future performance.\n" +
  "3. Research recommendations may not always be profitable, as actual market movements may differ from anticipated trends.\n" +
  "4. The Research Analyst is not responsible or liable for any losses resulting from research recommendations.\n" +
  "5. Investment in the securities market is subject to market risks. Read all related documents carefully before investing.\n" +
  "6. Registration granted by SEBI, membership of BASL, and certification from NISM do not guarantee the performance of the intermediary or provide any assurance of returns to investors."
);

section(
  "7. Conflict of Interest:",
  "The RA shall adhere to the applicable regulations, circulars, and directions specified by SEBI from time to time in relation to disclosure and mitigation of any actual or potential conflict of interest. Some of the disclosures are as follows:\n\n" +
  "1. The Research Analyst or any of its officers or employees does not trade in securities which are the subject matter of recommendation.\n" +
  "2. There are no actual or potential conflicts of interest arising from any connection to or association with any issuer of products or securities, including any material information or facts that might compromise objectivity or independence in carrying on Research Analyst services. Such conflict of interest shall be disclosed to the client as and when they arise.\n" +
  "3. The Research Analyst, its employees, or associates have not received any compensation from the company which is the subject matter of recommendation.\n\n" +
  "Client is advised to refer to the detailed disclosures provided on the website."
);

addFooter();

section(
  "8. Termination of Service and Refund of Fees:",
  "The Agreement may be terminated by the client if the Research Analyst fails to provide the research recommendations. However, the client cannot terminate the agreement solely on the grounds of not achieving desired returns, incurring losses from trading based on the recommendations, discontinuing services without a valid reason, or in case of force majeure.\n\n" +
  "The RA may suspend or terminate the rendering of research services to the client on account of suspension or cancellation of registration of the RA by SEBI and shall refund the residual amount to the client.\n\n" +
  "In case of suspension of the certificate of registration of the RA for more than sixty (60) days or cancellation of the RA registration, the RA shall refund the fees on a pro rata basis for the period from the effective date of suspension or cancellation till the end of the subscription period."
);

section(
  "9. Grievance Redressal:",
  "In the event of grievances related to non-receipt of the research report, missing content, or deficiencies in services, the Client may raise a grievance. The Research Analyst shall ensure redressal within 7 days of such complaint.\n\n" +
  "The client is required to follow the procedure below for any grievance:\n\n" +
  "Step 1: The client should first contact the RA at the details mentioned below:\n\n" +
  "Mail ID: connect@tradingbrain4u.com\n\n" +
  "Step 2: In case the client is unsatisfied, a complaint may be lodged with SEBI through SEBI’s SCORES platform at www.scores.sebi.gov.in.\n\n" +
  "Step 3: The client may also seek resolution through the Online Dispute Resolution (ODR) mechanism via the SMART ODR Portal at https://smartodr.in.\n\n" +
  "DISCLAIMER: The client is strictly required to follow the procedure mentioned above, failing which the RA shall not be liable for any delay in resolution of the grievance.\n\n" +
  "NOTE: Clients are advised to read the Do's and Don’ts for dealing with the Research Analyst as mentioned in SEBI Master Circular No. SEBI/HO/MIRSD-POD-1/P/CIR/2024/49 dated May 21, 2024, or any updates issued by SEBI from time to time.\n\n" +
  "Clients are requested to go through all disclaimers, disclosures, refund policy, and other information as mentioned on the website."
);

addFooter();

// ================= SECTION 10 =================

section(
  "10. Most Important Terms and Conditions:",
  "1. These terms and conditions, and consent thereon, are for the research services provided by the Research Analyst (RA), and the RA cannot execute or carry out any trade (purchase or sell transaction) on behalf of the client. Thus, clients are advised not to permit the RA to execute any trade on their behalf.\n\n" +

  "2. The fee charged by the RA to the client shall be subject to the maximum amount prescribed by SEBI / Research Analyst Administration and Supervisory Body (RAASB) from time to time (applicable only for Individual and HUF clients).\n\n" +

  "Note:\n" +
  "2.1. The current fee limit is Rs. 1,51,000/- per annum per family of clients for all research services of the RA.\n" +
  "2.2. The fee limit does not include statutory charges.\n" +
  "2.3. The fee limits do not apply to non-individual clients or accredited investors.\n\n" +

  "3. The RA may charge fees in advance if agreed by the client. Such advance shall not exceed the period stipulated by SEBI; presently, it is one year. In case of premature termination of the RA services by either the client or the RA, the client shall be entitled to seek a refund of proportionate fees only for the unexpired period.\n\n" +

  "4. Fees to the RA may be paid by the client through specified modes such as cheque, online bank transfer, UPI, etc. Cash payment is not allowed. Optionally, the client may make payments through the Centralized Fee Collection Mechanism (CeFCoM) managed by BSE Limited (currently recognized RAASB).\n\n" +

  "5. The RA is required to abide by applicable regulations, circulars, and directions specified by SEBI and RAASB from time to time in relation to disclosure and mitigation of any actual or potential conflict of interest. The RA shall endeavor to promptly inform the client of any conflict of interest that may affect the services being rendered.\n\n" +

  "6. Any assured, guaranteed, or fixed return schemes or schemes of a similar nature are prohibited by law. No such scheme shall be offered by the RA.\n\n" +

  "7. The RA cannot guarantee returns, profits, accuracy, or risk-free investments from the use of research services. All opinions, projections, and estimates are based on analysis of available data under certain assumptions as of the date of preparation or publication of the research report.\n\n" +

  "8. Any investment made based on recommendations in research reports is subject to market risks, and recommendations do not provide any assurance of returns. There is no recourse to claim losses incurred based on such recommendations. Any reliance placed on the research report shall be based on the client’s own judgment and assessment.\n\n" +

  "9. SEBI registration, enlistment with RAASB, and NISM certification do not guarantee the performance of the RA or assure any returns to the client.\n\n" +

  "10. For any grievances, the client should follow the procedure mentioned below."
);



// PAGE 5
doc.addPage();



// ================= GRIEVANCE TABLE =================

doc.moveDown(1);

const tableTop = doc.y;
const rowHeight = 30;

// Column widths (total = width)
const colWidths = {
  designation: 120,
  name: 160,
  contact: 90,
  email: 110,
};

const colX = {
  designation: leftMargin,
  name: leftMargin + colWidths.designation,
  contact: leftMargin + colWidths.designation + colWidths.name,
  email:
    leftMargin +
    colWidths.designation +
    colWidths.name +
    colWidths.contact,
};

// -------- Header Row --------
doc.font(bold).fontSize(10);

// Header background
doc
  .rect(leftMargin, tableTop - 6, width, rowHeight)
  .fill("#f3f4f6")
  .stroke("#ccc");

doc.fillColor(gray);

doc.text("Designation", colX.designation + 4, tableTop, {
  width: colWidths.designation - 8,
});
doc.text("Contact Person Name", colX.name + 4, tableTop, {
  width: colWidths.name - 8,
});
doc.text("Contact No.", colX.contact + 4, tableTop, {
  width: colWidths.contact - 8,
});
doc.text("Email ID", colX.email + 4, tableTop, {
  width: colWidths.email - 8,
});

// -------- Table Rows --------
const grievanceRows = [
  ["Customer Care", "Naved Ahmed Ansari", "9930113835", "connect@tradingbrain4u.com"],
  ["Head of Customer Care", "Naved Ahmed Ansari", "9930113835", "connect@tradingbrain4u.com"],
  ["Compliance Officer", "Naved Ahmed Ansari", "9930113835", "connect@tradingbrain4u.com"],
  ["CEO", "Naved Ahmed Ansari", "9930113835", "connect@tradingbrain4u.com"],
  ["Principal Officer", "Naved Ahmed Ansari", "9930113835", "connect@tradingbrain4u.com"],
];


doc.font(regular).fontSize(10);

grievanceRows.forEach((row, i) => {
  const y = tableTop + rowHeight * (i + 1);

  // Page break safety
  if (y + rowHeight > 740) {
    doc.addPage();
  }

  // Row border
  doc
    .rect(leftMargin, y - 2, width, rowHeight)
    .strokeColor("#ddd")
    .stroke();

  doc.text(row[0], colX.designation + 4, y, {
    width: colWidths.designation - 8,
  });
  doc.text(row[1], colX.name + 4, y, {
    width: colWidths.name - 8,
  });
  doc.text(row[2], colX.contact + 4, y, {
    width: colWidths.contact - 8,
  });
  doc.text(row[3], colX.email + 4, y, {
    width: colWidths.email - 8,
  });
});

doc.moveDown(2);

// ================= STEP 2 & 3 =================

doc.font(regular).fontSize(normal).fillColor(gray).text(
  "Working Hours: Monday to Friday, 09:00 AM to 6:00 PM\n\n" +

  "Step 2: If the resolution is unsatisfactory, the client may lodge a grievance through SEBI’s SCORES platform at www.scores.sebi.gov.in.\n\n" +

  "Step 3: The client may also consider resolution through the Online Dispute Resolution (ODR) mechanism via the SMART ODR Portal at https://smartodr.in.\n\n" +

  "11. Clients are required to keep their contact details, including email ID and mobile number(s), updated with the RA at all times.\n\n" +

  "12. The RA shall never ask for the client’s login credentials or OTPs for the client’s Trading Account, Demat Account, or Bank Account. Clients are advised never to share such information with anyone, including the RA.",
  leftMargin,
  doc.y,
  { width, align: "justify" }
);






section(
  "11. Optional Centralised Fee Collection Mechanism:",
  "There is an optional 'Centralized Fee Collection Mechanism for Investment Advisors and Research Analysts' (CeFCoM) for fee payments. The Research Analyst has presently not opted for the same, and once the Research Analyst gets registered for it, the said mechanism shall thereafter be available for the client."
);

section(
  "12. Confidentiality:",
  "The client shall not share any confidential information with any third party, which has come to its knowledge, without prior consent from the Research Analyst."
);




section(
  "13. Dispute:",
  "No suit, prosecution, or other legal proceeding shall lie against the Research Analyst for any damage caused or likely to be caused by anything done in good faith or intended to be done under the provisions of the Securities and Exchange Board of India (Research Analyst) Regulations, 2014.\n\n" +
  "Any disputes between the parties shall be resolved through arbitration or any other method mutually agreed upon, in accordance with applicable legal and regulatory guidelines."
);






addFooter();










section(
  "14. Severability:",
  "If any provision of these Terms and Conditions is found to be invalid, illegal, or unenforceable, the remaining provisions shall remain in full force and effect, provided that the essential purpose of these Terms and Conditions is not undermined."
);

section(
  "15. Force Majeure:",
  "Neither party shall be held liable for any failure or delay in performance under these Terms and Conditions due to circumstances beyond their reasonable control, including but not limited to natural disasters, government actions, or other unforeseen events.\n\n" +
  "The client agrees to abide by the terms and conditions of the research services."
);





    // ================= CONSENT & ACCEPTANCE =================
heading("CONSENT & ACCEPTANCE:");

const consentTop = doc.y + 18;
const consentHeight = 250;

// Outer card
doc
  .roundedRect(leftMargin, consentTop, width, consentHeight, 8)
  .strokeColor(blue)
  .lineWidth(1.2)
  .stroke();

// Accent strip (left)
doc
  .rect(leftMargin, consentTop, 6, consentHeight)
  .fillColor(blue)
  .fill();

// Consent text
doc
  .font(regular)
  .fontSize(normal)
  .fillColor(gray)
  .text(
    `I, ${fullName}, acknowledge that I have read and agree to the complete Terms & Conditions set forth by ${COMPANY.NAME} as of ${agreementDate}.`,
    leftMargin + 18,
    consentTop + 8,
    {
      width: width - 36,
      align: "justify",
      lineGap: 3,
    }
  );

// Divider line
const dividerY = consentTop + 50;
doc
  .moveTo(leftMargin + 18, dividerY)
  .lineTo(leftMargin + width - 18, dividerY)
  .strokeColor("#ddd")
  .lineWidth(1)
  .stroke();

// Signature title
doc
  .font(bold)
  .fontSize(12)
  .fillColor(blue)
  .text("SIGNATURE DETAILS", leftMargin + 18, dividerY + 14);

// Signature info block
const sigTop = dividerY + 36;

doc
  .font(regular)
  .fontSize(normal)
  .fillColor(gray)
  .text("Name:", leftMargin + 18, sigTop)
  .text("Email:", leftMargin + 18, sigTop + 22)
  .text("Signed at:", leftMargin + 18, sigTop + 44)
  .text("IP Address:", leftMargin + 18, sigTop + 66)
   .text("Address:", leftMargin + 18, sigTop + 88)
    .text("signature:", leftMargin + 18, sigTop + 128)



// ================= SIGNATURE IMAGE (BASE64) =================
if (submission.signature) {
  try {
    if (
      typeof submission.signature !== "string" ||
      !submission.signature.startsWith("data:image")
    ) {
      throw new Error("Invalid signature format");
    }

    // Remove data:image/...;base64,
    const base64Data = submission.signature
      .replace(/^data:image\/\w+;base64,/, "")
      .trim();

    if (!base64Data) {
      throw new Error("Empty signature base64");
    }

    const signatureBuffer = Buffer.from(base64Data, "base64");

    doc.image(signatureBuffer, leftMargin + 120, sigTop + 120, {
      width: 120,
      align: "left",
    });

  } catch (err) {
    console.error("❌ Failed to render signature:", err.message);
  }
}







doc
  .font(bold)
  .fillColor(gray)
  .text(fullName, leftMargin + 120, sigTop)
  .text(email, leftMargin + 120, sigTop + 22)
  .text(agreementDate, leftMargin + 120, sigTop + 44)
  .text(ipAddress || "Not Captured", leftMargin + 120, sigTop + 66)
  .text(location || "Not Captured", leftMargin + 120, sigTop + 88, {
    width: width - 140,
    align: "left",
  });

// Note (subtle)
doc.moveDown(9);
doc
  .fontSize(9)
  .fillColor(lightGray)
  .text(
    `Note: This document contains the full Terms & Conditions. Visit ${ COMPANY.WEBSITE} for more info.`,
    leftMargin,
    consentTop + consentHeight + 10,
    {
      width,
      align: "center",
    }
  );

doc.moveDown(3);



     // === FINAL CLOSING SECTION ===
const footerTop = doc.y -20 ;
const footerPadding = 12;
const footerBoxHeight = 95;
const footerLeft = leftMargin;
const footerWidth = width;

// Draw border box


// Inside padding text
doc.font("Helvetica-Bold")
  .fillColor("#43a9a8")
  .fontSize(12)
  .text(`${COMPANY.NAME}`, footerLeft + footerPadding, footerTop + footerPadding);

doc.font("Helvetica")
  .fillColor("#333")
  .fontSize(10)
  .text(`SEBI Registration No. ${COMPANY.SEBI.REG_NO}`, footerLeft + footerPadding, doc.y + 3)
  .text(`Email: ${COMPANY.CONTACT.SUPPORT_EMAIL}`, footerLeft + footerPadding, doc.y + 3)
  .text(`Phone: ${COMPANY.CONTACT.REPORT_MOBILE}`, footerLeft + footerPadding, doc.y + 3)
  .text(`Website: ${ COMPANY.WEBSITE}`, footerLeft + footerPadding, doc.y + 3);

doc.moveDown(2);
doc.font("Helvetica-Bold")
  .fillColor("#43a9a8")
  .fontSize(11)
  .text(`Thank you for choosing ${COMPANY.NAME} `, footerLeft + footerPadding, doc.y + 5);

doc.font("Helvetica")
  .fillColor("#555")
  .fontSize(9)
  .text("This agreement is legally binding and enforceable.", footerLeft + footerPadding, doc.y + 2);
    addFooter();
    doc.end();
  });
}

module.exports = { generateUserAgreementBuffer };
