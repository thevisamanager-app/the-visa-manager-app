// src/utils/countryFaqs.js

const COUNTRY_FAQS = {
  "Sri-lanka": [
    {
      question: "What is Sri Lanka ETA?",
      answer:
        "Sri Lanka ETA (Electronic Travel Authorization) is an online travel approval linked to your passport for short visits such as tourism, business, or transit.",
    },
    {
      question: "Can I get Sri Lanka ETA on arrival?",
      answer:
        "In most cases, travelers should obtain ETA before departure. On-arrival approvals may be allowed in limited cases, subject to immigration decision.",
    },
    {
      question: "How long does ETA take?",
      answer:
        "Sri Lanka ETA is usually processed quickly, often within a few hours to 1-2 days depending on verification.",
    },
    {
      question: "Is ETA extendable?",
      answer:
        "Yes, ETA can usually be extended after arrival by applying with Sri Lanka immigration authorities, subject to approval.",
    },
    {
      question: "Do I need a hotel booking?",
      answer:
        "Yes, accommodation details such as hotel booking are generally recommended and may be requested during checks.",
    },
    {
      question: "How do I receive the ETA?",
      answer:
        "ETA is issued electronically, usually by email. Keep a digital or printed copy with your passport when you travel.",
    },
  ],
  Maldives: [
    { question: "Do I need a visa for Maldives?", answer: "Indian passport holders receive a free visa on arrival in the Maldives." },
    { question: "How long does Maldives visa processing take?", answer: "Visa on arrival is granted immediately upon entry." },
    { question: "What documents are required for Maldives?", answer: "Passport, return ticket, accommodation proof, and sufficient funds are required." },
    { question: "Can I extend my visa after arrival?", answer: "Yes, visa extensions are possible by applying to Maldives Immigration." },
  ],

  Malaysia: [
    { question: "Do I need a visa for Malaysia?", answer: "Indian citizens can enter Malaysia visa-free for a limited period depending on current rules." },
    { question: "How long does Malaysia visa processing take?", answer: "If required, visa processing usually takes 3–7 working days." },
    { question: "What documents are required for Malaysia?", answer: "Passport, travel itinerary, accommodation details, and proof of funds are required." },
    { question: "Can I extend my visa after arrival?", answer: "Visa extensions are subject to approval by Malaysian immigration authorities." },
  ],

  Thailand: [
    { question: "What is a TDAC?", answer: "TDAC (Thailand Digital Arrival Card) is an online arrival registration for travellers entering Thailand." },
    { question: "Who must submit a TDAC?", answer: "All eligible travellers, including children, must submit a TDAC before arrival." },
    { question: "Do Indians need a visa to visit Thailand?", answer: "Indians currently enjoy visa-free entry for short stays, subject to government policy." },
    { question: "Can I extend my visa-free stay?", answer: "Visa-free stays can sometimes be extended through Thai immigration offices." },
    { question: "Do children need to apply for TDAC?", answer: "Yes, each traveller including minors must have a separate TDAC." },
    { question: "Do I need travel insurance for TDAC?", answer: "Travel insurance is recommended though not always mandatory." },
    { question: "How will I know if my TDAC is approved?", answer: "Approval is usually sent via email after successful submission." },
    { question: "If I visit multiple countries before Thailand, am I eligible?", answer: "Yes, as long as you meet entry requirements at the time of arrival." },
  ],

  Vietnam: [
    { question: "Do Indian citizens need a visa for Vietnam?", answer: "Yes, Indian passport holders require a visa to enter Vietnam." },
    { question: "What is a Vietnam e-visa?", answer: "A Vietnam e-visa is an electronic travel authorization issued online." },
    { question: "What is the Vietnam visa fee for Indians?", answer: "Fees vary based on entry type and duration." },
    { question: "Can Indians apply for multiple-entry Vietnam visa?", answer: "Yes, multiple-entry e-visas are available." },
    { question: "Is Vietnam visa-free for Indians?", answer: "No, Indians must obtain a visa before travel." },
    { question: "Do I need a visa if I hold a US visa?", answer: "Yes, a Vietnam visa is still required." },
    { question: "Who is eligible for Vietnam e-visa?", answer: "Indian passport holders meeting eligibility criteria can apply online." },
    { question: "What documents are required?", answer: "Passport, photograph, and travel details are mandatory." },
    { question: "Can I apply if my passport is near expiry?", answer: "Your passport must have at least 6 months validity." },
  ],

  Singapore: [
    {
      question: "Do Indians need a visa to enter Singapore?",
      answer:
        "Yes. Indian passport holders must obtain a valid Singapore visa before travel unless they are eligible under specific transit or exemption schemes.",
    },
    {
      question: "I am a New Zealand permanent resident. Do I need a Singapore visa?",
      answer:
        "Yes. New Zealand permanent residency does not exempt Indian passport holders from obtaining a Singapore visa.",
    },
    {
      question: "Who needs a visa to travel to Singapore?",
      answer:
        "Most foreign nationals, including Indian citizens, require a visa to enter Singapore unless they qualify under visa-free transit or exemption arrangements.",
    },
    {
      question: "Do Schengen visa holders need a Singapore visa?",
      answer:
        "Yes. Holding a valid Schengen visa does not exempt Indian passport holders from applying for a Singapore visa.",
    },
    {
      question: "Is visa-on-arrival available for Singapore?",
      answer:
        "No. Singapore does not offer visa-on-arrival facilities for Indian passport holders.",
    },
    {
      question: "Do I need a visa if I am transiting through Singapore?",
      answer:
        "A transit visa may not be required if you remain within the transit area and meet Singapore’s transit eligibility rules.",
    },
    {
      question: "When is a transit visa required for Singapore?",
      answer:
        "A transit visa is required if you leave the airport transit area or do not meet the conditions of Singapore’s visa-free transit facility.",
    },
    {
      question: "What should I know when transiting through Singapore on a low-cost carrier?",
      answer:
        "Low-cost carriers often require passengers to clear immigration and re-check baggage, which may require a valid Singapore visa.",
    },
    {
      question: "When should I apply for a Singapore visa?",
      answer:
        "It is recommended to apply at least 7–10 working days before your intended travel date to account for processing time and document verification.",
    },
    {
      question: "Who decides whether my Singapore visa will be approved?",
      answer:
        "All Singapore visa applications are assessed and approved solely by the Immigration & Checkpoints Authority (ICA) of Singapore.",
    },
    {
      question: "How can I apply for a Singapore tourist visa?",
      answer:
        "You can apply for a Singapore tourist visa through an authorised visa agent who submits the application online to Singapore authorities.",
    },
    {
      question: "Do I need an appointment to submit my Singapore visa application?",
      answer:
        "No. Singapore visa applications are submitted online and do not require a physical appointment at the embassy.",
    },
    {
      question: "Do I need to submit my original passport for a Singapore visa?",
      answer:
        "No. Only a scanned copy of your passport is required. The original passport is not submitted to the embassy.",
    },
    {
      question: "Do I need confirmed flight tickets to apply for a Singapore visa?",
      answer:
        "Confirmed or tentative flight bookings are usually required to support your visa application.",
    },
    {
      question: "Is there a specific format for uploading Singapore visa documents?",
      answer:
        "Yes. Documents must be clear, legible, and uploaded in the prescribed size and format as per Singapore immigration guidelines.",
    },
    {
      question: "What passport validity is required to enter Singapore?",
      answer:
        "Your passport must be valid for at least six months beyond your intended date of entry into Singapore.",
    },
    {
      question: "Can I travel to Singapore with less than six months passport validity?",
      answer:
        "No. Singapore immigration strictly requires a minimum of six months passport validity.",
    },
    {
      question: "What are the photo requirements for a Singapore visa?",
      answer:
        "A recent passport-size photograph with a white background, clear facial visibility, and no accessories is required.",
    },
    {
      question: "How long can I stay in Singapore?",
      answer:
        "The length of stay is determined by immigration officers at entry and is typically up to 30 days for tourists.",
    },
    {
      question: "Can I extend my stay in Singapore?",
      answer:
        "Extensions are not guaranteed and must be applied for with Singapore immigration authorities before your permitted stay expires.",
    },
    {
      question: "How long does it take to get a Singapore visa?",
      answer:
        "Processing typically takes 3–5 working days, though it may vary depending on application volume and verification.",
    },
    {
      question: "Can I pay extra to expedite my Singapore visa application?",
      answer:
        "No. Singapore does not officially offer expedited visa processing services.",
    },
    {
      question: "How can I find out about work visas for Singapore?",
      answer:
        "Work visas such as Employment Pass or S Pass must be sponsored by a Singapore employer and follow separate application procedures.",
    },
    {
      question: "Will I be informed of the reason if my Singapore visa is rejected?",
      answer:
        "Singapore authorities generally do not disclose specific reasons for visa rejection.",
    },
    {
      question: "I have lost my Singapore e-visa. What should I do?",
      answer:
        "You can re-download your e-visa from your email or request a copy from your visa service provider.",
    },
    {
      question: "I am currently a visitor in another country. Can I apply for a Singapore visa?",
      answer:
        "Yes. You can apply from another country as long as you submit valid documents and meet eligibility requirements.",
    },
  ],

  Indonesia: [
    {
      question: "Can Indians apply for an Indonesia visa online?",
      answer:
        "Yes. Indian passport holders can apply for an Indonesia e-visa or visa on arrival, depending on the purpose and duration of travel.",
    },
    {
      question: "Is a return ticket required for Indonesia visa?",
      answer:
        "Yes. A confirmed return or onward ticket is required when applying for or entering Indonesia.",
    },
    {
      question: "How long does an Indonesia visa stay valid?",
      answer:
        "Indonesia visas are typically valid for 30 to 60 days, depending on the visa type issued.",
    },
    {
      question: "When should I apply before travel?",
      answer:
        "It is recommended to apply at least 7–10 days before your planned travel date to avoid delays.",
    },
    {
      question: "Do I need a hotel booking for Indonesia?",
      answer:
        "Yes. Proof of accommodation such as a hotel booking or host details is generally required.",
    },
    {
      question: "Can I pay the fees in INR?",
      answer:
        "Visa fees are usually charged in foreign currency. Payment in INR depends on the platform or agent used for application.",
    },
  ],

  "Hong Kong": [
    {
      question: "Do Indians need a visa for Hong Kong?",
      answer:
        "Indian passport holders generally do not need a full visa for short visits, but they must complete Hong Kong Pre-Arrival Registration (PAR) before travel.",
    },
    {
      question: "What is the processing time for Hong Kong visas?",
      answer:
        "Hong Kong PAR is usually processed quickly, often instantly or within a few minutes after successful submission.",
    },
    {
      question: "Can I submit the Hong Kong visa application online?",
      answer:
        "Yes. The Hong Kong PAR process for Indian travellers is completed online.",
    },
    {
      question: "What documents are mandatory?",
      answer:
        "A valid Indian passport, basic personal details, travel details, and supporting documents (if requested) are generally mandatory.",
    },
    {
      question: "Can I extend my stay in Hong Kong?",
      answer:
        "Stay extensions are not automatic. You must apply with Hong Kong Immigration before your permitted stay expires, and approval is subject to their decision.",
    },
    {
      question: "What should I do after approval?",
      answer:
        "Download and keep a copy of your approved PAR, carry it with your passport, and present both at airline check-in and immigration when required.",
    },
  ],

  "Mauritius": [
    {
      question: "What is the Mauritius Travel Digital Form (TDA)?",
      answer:
        "The Mauritius Travel Digital Form is an online travel declaration required to be completed before arrival.",
    },
  ],

  "North Korea": [
    {
      question: "Do Indian citizens need a visa?",
      answer:
        "No. Indian passport holders can enter this country without obtaining a visa in advance, subject to immigration approval on arrival.",
    },
    {
      question: "How long can I stay?",
      answer:
        "The permitted length of stay is decided by immigration authorities at the port of entry and may vary based on travel purpose.",
    },
    {
      question: "What documents are required?",
      answer:
        "A valid passport (minimum 6 months validity), return or onward ticket, and proof of accommodation are generally required.",
    },
    {
      question: "Is prior approval needed?",
      answer:
        "No prior visa approval is required. Entry is granted at immigration upon arrival.",
    },
    {
      question: "Can I extend my stay?",
      answer:
        "Extensions, if allowed, must be applied for directly with local immigration authorities after arrival.",
    },
  ],

  "Nepal": [
    {
      question: "Do Indian citizens need a visa?",
      answer:
        "No. Indian passport holders can enter this country without obtaining a visa in advance, subject to immigration approval on arrival.",
    },
    {
      question: "How long can I stay?",
      answer:
        "The permitted length of stay is decided by immigration authorities at the port of entry and may vary based on travel purpose.",
    },
    {
      question: "What documents are required?",
      answer:
        "A valid passport (minimum 6 months validity), return or onward ticket, and proof of accommodation are generally required.",
    },
    {
      question: "Is prior approval needed?",
      answer:
        "No prior visa approval is required. Entry is granted at immigration upon arrival.",
    },
    {
      question: "Can I extend my stay?",
      answer:
        "Extensions, if allowed, must be applied for directly with local immigration authorities after arrival.",
    },
  ],

  "Fiji": [
    {
      question: "Do Indian citizens need a visa?",
      answer:
        "No. Indian passport holders can enter this country without obtaining a visa in advance, subject to immigration approval on arrival.",
    },
    {
      question: "How long can I stay?",
      answer:
        "The permitted length of stay is decided by immigration authorities at the port of entry and may vary based on travel purpose.",
    },
    {
      question: "What documents are required?",
      answer:
        "A valid passport (minimum 6 months validity), return or onward ticket, and proof of accommodation are generally required.",
    },
    {
      question: "Is prior approval needed?",
      answer:
        "No prior visa approval is required. Entry is granted at immigration upon arrival.",
    },
    {
      question: "Can I extend my stay?",
      answer:
        "Extensions, if allowed, must be applied for directly with local immigration authorities after arrival.",
    },
  ],

  "Barbados": [
    {
      question: "Do Indian citizens need a visa?",
      answer:
        "No. Indian passport holders can enter this country without obtaining a visa in advance, subject to immigration approval on arrival.",
    },
    {
      question: "How long can I stay?",
      answer:
        "The permitted length of stay is decided by immigration authorities at the port of entry and may vary based on travel purpose.",
    },
    {
      question: "What documents are required?",
      answer:
        "A valid passport (minimum 6 months validity), return or onward ticket, and proof of accommodation are generally required.",
    },
    {
      question: "Is prior approval needed?",
      answer:
        "No prior visa approval is required. Entry is granted at immigration upon arrival.",
    },
    {
      question: "Can I extend my stay?",
      answer:
        "Extensions, if allowed, must be applied for directly with local immigration authorities after arrival.",
    },
  ],

  "Cook Islands": [
    {
      question: "Do Indian citizens need a visa?",
      answer:
        "No. Indian passport holders can enter this country without obtaining a visa in advance, subject to immigration approval on arrival.",
    },
    {
      question: "How long can I stay?",
      answer:
        "The permitted length of stay is decided by immigration authorities at the port of entry and may vary based on travel purpose.",
    },
    {
      question: "What documents are required?",
      answer:
        "A valid passport (minimum 6 months validity), return or onward ticket, and proof of accommodation are generally required.",
    },
    {
      question: "Is prior approval needed?",
      answer:
        "No prior visa approval is required. Entry is granted at immigration upon arrival.",
    },
    {
      question: "Can I extend my stay?",
      answer:
        "Extensions, if allowed, must be applied for directly with local immigration authorities after arrival.",
    },
  ],

  "El Salvador": [
    {
      question: "Do Indian citizens need a visa?",
      answer:
        "No. Indian passport holders can enter this country without obtaining a visa in advance, subject to immigration approval on arrival.",
    },
    {
      question: "How long can I stay?",
      answer:
        "The permitted length of stay is decided by immigration authorities at the port of entry and may vary based on travel purpose.",
    },
    {
      question: "What documents are required?",
      answer:
        "A valid passport (minimum 6 months validity), return or onward ticket, and proof of accommodation are generally required.",
    },
    {
      question: "Is prior approval needed?",
      answer:
        "No prior visa approval is required. Entry is granted at immigration upon arrival.",
    },
    
    {
      question: "Can I extend my stay?",
      answer:
        "Extensions, if allowed, must be applied for directly with local immigration authorities after arrival.",
    },
  ],

  "Montserrat": [
    {
      question: "Do Indian citizens need a visa?",
      answer:
        "No. Indian passport holders can enter this country without obtaining a visa in advance, subject to immigration approval on arrival.",
    },
    {
      question: "How long can I stay?",
      answer:
        "The permitted length of stay is decided by immigration authorities at the port of entry and may vary based on travel purpose.",
    },
    {
      question: "What documents are required?",
      answer:
        "A valid passport (minimum 6 months validity), return or onward ticket, and proof of accommodation are generally required.",
    },
    {
      question: "Is prior approval needed?",
      answer:
        "No prior visa approval is required. Entry is granted at immigration upon arrival.",
    },
    {
      question: "Can I extend my stay?",
      answer:
        "Extensions, if allowed, must be applied for directly with local immigration authorities after arrival.",
    },
  ],

  "Trinidad & Tobago": [
    {
      question: "Do Indian citizens need a visa?",
      answer:
        "No. Indian passport holders can enter this country without obtaining a visa in advance, subject to immigration approval on arrival.",
    },
    {
      question: "How long can I stay?",
      answer:
        "The permitted length of stay is decided by immigration authorities at the port of entry and may vary based on travel purpose.",
    },
    {
      question: "What documents are required?",
      answer:
        "A valid passport (minimum 6 months validity), return or onward ticket, and proof of accommodation are generally required.",
    },
    {
      question: "Is prior approval needed?",
      answer:
        "No prior visa approval is required. Entry is granted at immigration upon arrival.",
    },
    {
      question: "Can I extend my stay?",
      answer:
        "Extensions, if allowed, must be applied for directly with local immigration authorities after arrival.",
    },
  ],
  "Dominica": [
    {
      question: "Do Indian citizens need a visa?",
      answer:
        "No. Indian passport holders can enter this country without obtaining a visa in advance, subject to immigration approval on arrival.",
    },
    {
      question: "How long can I stay?",
      answer:
        "The permitted length of stay is decided by immigration authorities at the port of entry and may vary based on travel purpose.",
    },
    {
      question: "What documents are required?",
      answer:
        "A valid passport (minimum 6 months validity), return or onward ticket, and proof of accommodation are generally required.",
    },
    {
      question: "Is prior approval needed?",
      answer:
        "No prior visa approval is required. Entry is granted at immigration upon arrival.",
    },
    {
      question: "Can I extend my stay?",
      answer:
        "Extensions, if allowed, must be applied for directly with local immigration authorities after arrival.",
    },
  ],

  "Senegal": [
    {
      question: "Do Indian citizens need a visa?",
      answer:
        "No. Indian passport holders can enter this country without obtaining a visa in advance, subject to immigration approval on arrival.",
    },
    {
      question: "How long can I stay?",
      answer:
        "The permitted length of stay is decided by immigration authorities at the port of entry and may vary based on travel purpose.",
    },
    {
      question: "What documents are required?",
      answer:
        "A valid passport (minimum 6 months validity), return or onward ticket, and proof of accommodation are generally required.",
    },
    {
      question: "Is prior approval needed?",
      answer:
        "No prior visa approval is required. Entry is granted at immigration upon arrival.",
    },
    {
      question: "Can I extend my stay?",
      answer:
        "Extensions, if allowed, must be applied for directly with local immigration authorities after arrival.",
    },
  ],

  "Réunion": [
    {
      question: "Do Indian citizens need a visa?",
      answer:
        "No. Indian passport holders can enter this country without obtaining a visa in advance, subject to immigration approval on arrival.",
    },
    {
      question: "How long can I stay?",
      answer:
        "The permitted length of stay is decided by immigration authorities at the port of entry and may vary based on travel purpose.",
    },
    {
      question: "What documents are required?",
      answer:
        "A valid passport (minimum 6 months validity), return or onward ticket, and proof of accommodation are generally required.",
    },
    {
      question: "Is prior approval needed?",
      answer:
        "No prior visa approval is required. Entry is granted at immigration upon arrival.",
    },
    {
      question: "Can I extend my stay?",
      answer:
        "Extensions, if allowed, must be applied for directly with local immigration authorities after arrival.",
    },
  ],

  "St. Kitts & Nevis": [
    {
      question: "Do Indian citizens need a visa?",
      answer:
        "No. Indian passport holders can enter this country without obtaining a visa in advance, subject to immigration approval on arrival.",
    },
    {
      question: "How long can I stay?",
      answer:
        "The permitted length of stay is decided by immigration authorities at the port of entry and may vary based on travel purpose.",
    },
    {
      question: "What documents are required?",
      answer:
        "A valid passport (minimum 6 months validity), return or onward ticket, and proof of accommodation are generally required.",
    },
    {
      question: "Is prior approval needed?",
      answer:
        "No prior visa approval is required. Entry is granted at immigration upon arrival.",
    },
    {
      question: "Can I extend my stay?",
      answer:
        "Extensions, if allowed, must be applied for directly with local immigration authorities after arrival.",
    },
  ],

  "St. Vincent & Grenadines": [
    {
      question: "Do Indian citizens need a visa?",
      answer:
        "No. Indian passport holders can enter this country without obtaining a visa in advance, subject to immigration approval on arrival.",
    },
    {
      question: "How long can I stay?",
      answer:
        "The permitted length of stay is decided by immigration authorities at the port of entry and may vary based on travel purpose.",
    },
    {
      question: "What documents are required?",
      answer:
        "A valid passport (minimum 6 months validity), return or onward ticket, and proof of accommodation are generally required.",
    },
    {
      question: "Is prior approval needed?",
      answer:
        "No prior visa approval is required. Entry is granted at immigration upon arrival.",
    },
    {
      question: "Can I extend my stay?",
      answer:
        "Extensions, if allowed, must be applied for directly with local immigration authorities after arrival.",
    },
  ],

  "Niue": [
    {
      question: "Do Indian citizens need a visa?",
      answer:
        "No. Indian passport holders can enter this country without obtaining a visa in advance, subject to immigration approval on arrival.",
    },
    {
      question: "How long can I stay?",
      answer:
        "The permitted length of stay is decided by immigration authorities at the port of entry and may vary based on travel purpose.",
    },
    {
      question: "What documents are required?",
      answer:
        "A valid passport (minimum 6 months validity), return or onward ticket, and proof of accommodation are generally required.",
    },
    {
      question: "Is prior approval needed?",
      answer:
        "No prior visa approval is required. Entry is granted at immigration upon arrival.",
    },
    {
      question: "Can I extend my stay?",
      answer:
        "Extensions, if allowed, must be applied for directly with local immigration authorities after arrival.",
    },
  ],

  "Haiti": [
    {
      question: "Do Indian citizens need a visa?",
      answer:
        "No. Indian passport holders can enter this country without obtaining a visa in advance, subject to immigration approval on arrival.",
    },
    {
      question: "How long can I stay?",
      answer:
        "The permitted length of stay is decided by immigration authorities at the port of entry and may vary based on travel purpose.",
    },
    {
      question: "What documents are required?",
      answer:
        "A valid passport (minimum 6 months validity), return or onward ticket, and proof of accommodation are generally required.",
    },
    {
      question: "Is prior approval needed?",
      answer:
        "No prior visa approval is required. Entry is granted at immigration upon arrival.",
    },
    {
      question: "Can I extend my stay?",
      answer:
        "Extensions, if allowed, must be applied for directly with local immigration authorities after arrival.",
    },
  ],

  "Gambia": [
    {
      question: "Do Indian citizens need a visa?",
      answer:
        "No. Indian passport holders can enter this country without obtaining a visa in advance, subject to immigration approval on arrival.",
    },
    {
      question: "How long can I stay?",
      answer:
        "The permitted length of stay is decided by immigration authorities at the port of entry and may vary based on travel purpose.",
    },
    {
      question: "What documents are required?",
      answer:
        "A valid passport (minimum 6 months validity), return or onward ticket, and proof of accommodation are generally required.",
    },
    {
      question: "Is prior approval needed?",
      answer:
        "No prior visa approval is required. Entry is granted at immigration upon arrival.",
    },
    {
      question: "Can I extend my stay?",
      answer:
        "Extensions, if allowed, must be applied for directly with local immigration authorities after arrival.",
    },
  ],

  Philippines: [
    {
      category: "Visa Basics",
      question: "Do Indians need a visa to travel to the Philippines?",
      answer:
        "Yes. Indian passport holders generally require a valid Philippines visa before travelling for tourism, business, or short-term visits unless they qualify for specific visa-free entry schemes.",
    },
    {
      category: "Visa-Free Entry",
      question: "Can Indians travel visa-free to the Philippines?",
      answer:
        "Indian citizens holding a valid and current multiple-entry visa or residence permit from countries such as the US, UK, Schengen States, Japan, Australia, or Canada may be eligible for short-term visa-free entry, subject to meeting immigration conditions and having confirmed return tickets.",
    },
    {
      category: "Visa Types",
      question: "What types of Philippines visas are available for Indians?",
      answer:
        "Common visa types include Tourist Visa (9A), Business Visa, Transit Visa, Student Visa, and Work Visa. The appropriate visa depends on the purpose and duration of stay.",
    },
    {
      category: "Visa Validity",
      question: "What is the validity of a Philippines tourist visa?",
      answer:
        "A Philippines tourist visa typically allows an initial stay of up to 30 days. Extensions may be granted by the Bureau of Immigration subject to approval.",
    },
    {
      category: "Processing Time",
      question: "How long does it take to process a Philippines visa?",
      answer:
        "Philippines visa processing generally takes 5 to 10 working days after submission of a complete application, depending on the consulate and verification requirements.",
    },
    {
      category: "Required Documents",
      question: "What documents are required for a Philippines tourist visa?",
      answer:
        "Applicants typically need a valid passport, completed visa application form, passport-size photographs, confirmed return flight tickets, proof of accommodation, financial documents, and supporting travel details.",
    },
    {
      category: "Passport Requirements",
      question: "What is the passport validity requirement for the Philippines?",
      answer:
        "Your passport must be valid for at least six months beyond your intended date of arrival and should have sufficient blank pages for entry stamps.",
    },
    {
      category: "Financial Requirements",
      question: "Is there a minimum bank balance required for a Philippines visa?",
      answer:
        "The Philippines does not publish a fixed minimum bank balance requirement, but applicants must demonstrate sufficient funds to cover their stay and return travel.",
    },
    {
      category: "Visa Extension",
      question: "Can I extend my stay in the Philippines?",
      answer:
        "Yes. Visitors can apply for a visa extension through the Bureau of Immigration in the Philippines before their authorised stay expires.",
    },
    {
      category: "Transit",
      question: "Do Indians need a transit visa for the Philippines?",
      answer:
        "If remaining within the international transit area and not clearing immigration, a transit visa may not be required. If exiting the airport, an appropriate visa is required.",
    },
    {
      category: "Work Restrictions",
      question: "Can I work in the Philippines on a tourist visa?",
      answer:
        "No. Employment in the Philippines requires a valid work visa and appropriate permits issued by Philippine authorities.",
    },
    {
      category: "Overstay",
      question: "What happens if I overstay my Philippines visa?",
      answer:
        "Overstaying may result in fines, penalties, deportation, or future entry restrictions. Visitors must depart before the permitted stay ends or apply for an extension.",
    },
    {
      category: "Family Applications",
      question: "Can I apply for a Philippines visa for my family members?",
      answer:
        "Yes. Each traveller, including minors, must submit an individual visa application with the required supporting documents.",
    },
    {
      category: "Rejection",
      question: "Can I reapply if my Philippines visa is rejected?",
      answer:
        "Yes. Applicants may reapply after addressing the reason for refusal and ensuring that all documentation is accurate and complete.",
    },
    {
      category: "Refunds",
      question: "Are Philippines visa fees refundable if rejected?",
      answer:
        "Visa application fees are generally non-refundable regardless of the outcome of the application.",
    },
  ],

  Kazakhstan: [
    {
      category: "Visa Basics",
      question: "Do Indians need a visa to travel to Kazakhstan?",
      answer:
        "Yes. Indian passport holders generally require a valid visa to travel to Kazakhstan for tourism, business, or other short-term visits unless they qualify under specific visa-free or special entry schemes announced by the Kazakh authorities.",
    },
    {
      category: "eVisa",
      question: "Can Indians apply for a Kazakhstan e-Visa?",
      answer:
        "Yes. Eligible Indian citizens can apply for a Kazakhstan e-Visa online after obtaining an official invitation number from a host in Kazakhstan. The approved e-Visa is issued electronically and must be printed and carried while travelling.",
    },
    {
      category: "Visa on Arrival",
      question: "Is visa on arrival available for Indians in Kazakhstan?",
      answer:
        "No. Kazakhstan does not generally provide visa on arrival for Indian passport holders. Travellers must obtain the appropriate visa before departure.",
    },
    {
      category: "Visa Validity",
      question: "What is the validity of a Kazakhstan tourist visa?",
      answer:
        "A Kazakhstan tourist visa is typically issued for single or multiple entry and usually allows a stay of up to 30 days per visit, depending on the visa type granted.",
    },
    {
      category: "Processing Time",
      question: "How long does it take to process a Kazakhstan visa?",
      answer:
        "Kazakhstan visa processing usually takes 5 to 10 working days after submission of a complete application. Processing time may vary depending on the visa category and verification requirements.",
    },
    {
      category: "Required Documents",
      question: "What documents are required for a Kazakhstan tourist visa?",
      answer:
        "Applicants generally need a valid passport, recent passport-size photograph, completed visa application form, official invitation number (for e-Visa), confirmed return flight tickets, accommodation proof, and financial documents.",
    },
    {
      category: "Passport Requirements",
      question: "What is the passport validity requirement for Kazakhstan?",
      answer:
        "Your passport must be valid for at least six months beyond your intended date of departure from Kazakhstan and should have sufficient blank pages.",
    },
    {
      category: "Financial Requirements",
      question: "Is there a minimum bank balance requirement for a Kazakhstan visa?",
      answer:
        "Kazakhstan does not specify a fixed minimum bank balance. However, travellers must demonstrate sufficient financial means to cover their stay, accommodation, and return travel.",
    },
    {
      category: "Business Visa",
      question: "Can Indians apply for a Kazakhstan business visa?",
      answer:
        "Yes. Indian nationals travelling for meetings, conferences, or commercial activities must apply for a business visa supported by an official invitation from a registered Kazakh entity.",
    },
    {
      category: "Transit",
      question: "Do Indians need a transit visa for Kazakhstan?",
      answer:
        "A transit visa may be required if you exit the international transit area. If remaining within the airport transit zone and not passing through immigration, a transit visa may not be necessary.",
    },
    {
      category: "Visa Extension",
      question: "Can I extend my stay in Kazakhstan?",
      answer:
        "Short-term tourist visas are generally not extendable except under exceptional circumstances. Extension requests must be submitted to local migration authorities before visa expiry.",
    },
    {
      category: "Overstay",
      question: "What happens if I overstay my Kazakhstan visa?",
      answer:
        "Overstaying may result in fines, administrative penalties, deportation, or future entry restrictions. Travellers must leave Kazakhstan before their authorised stay ends.",
    },
    {
      category: "Family Applications",
      question: "Can I apply for a Kazakhstan visa for my family members?",
      answer:
        "Yes. Each traveller, including children, must submit an individual visa application with the required supporting documents.",
    },
    {
      category: "Rejection",
      question: "Can I reapply if my Kazakhstan visa is rejected?",
      answer:
        "Yes. Applicants may reapply after addressing the reason for refusal and ensuring that all required documentation is complete and accurate.",
    },
    {
      category: "Refunds",
      question: "Are Kazakhstan visa fees refundable if rejected?",
      answer:
        "No. Kazakhstan visa fees are generally non-refundable regardless of the outcome of the application.",
    },
  ],

  Bhutan: [
    {
      category: "Visa Basics",
      question: "Do Indians need a visa to travel to Bhutan?",
      answer:
        "No. Indian passport holders do not require a visa to enter Bhutan for tourism. However, they must obtain an Entry Permit upon arrival or apply in advance through the official Bhutan travel portal.",
    },
    {
      category: "Entry Permit",
      question: "What documents are required for Indians to enter Bhutan?",
      answer:
        "Indian citizens must carry a valid passport (minimum 6 months validity) or a Voter ID card. Children below 18 years must carry a birth certificate along with school ID. An Entry Permit is issued at designated entry points.",
    },
    {
      category: "Sustainable Development Fee",
      question: "What is the Sustainable Development Fee (SDF) for Indians travelling to Bhutan?",
      answer:
        "Indian tourists are required to pay a Sustainable Development Fee (SDF) per night of stay in Bhutan. The SDF amount is determined by the Royal Government of Bhutan and is subject to change.",
    },
    {
      category: "Stay Duration",
      question: "How long can Indians stay in Bhutan?",
      answer:
        "Indian travellers are generally granted a stay of up to 14 days initially. Extensions can be requested through the Department of Immigration in Bhutan.",
    },
    {
      category: "Extension",
      question: "Can Indians extend their stay in Bhutan?",
      answer:
        "Yes. Visitors may apply for an extension at the Immigration Office in Bhutan before the expiry of their permitted stay.",
    },
    {
      category: "Entry Points",
      question: "Where can Indians enter Bhutan from?",
      answer:
        "Indian travellers can enter Bhutan via Paro International Airport or through designated land border crossings such as Phuentsholing, Gelephu, and Samdrup Jongkhar.",
    },
    {
      category: "Permit Areas",
      question: "Do Indians need special permits to visit other regions in Bhutan?",
      answer:
        "Yes. While Thimphu and Paro are accessible with the standard Entry Permit, special route permits are required to visit other districts. These permits can be arranged in Bhutan.",
    },
    {
      category: "Travel Insurance",
      question: "Is travel insurance mandatory for Bhutan?",
      answer:
        "Travel insurance is not mandatory for Indian travellers but is strongly recommended to cover medical emergencies and unforeseen travel disruptions.",
    },
    {
      category: "Accommodation",
      question: "Do Indians need confirmed hotel bookings for Bhutan travel?",
      answer:
        "Yes. Proof of accommodation is generally required when applying for an Entry Permit or registering through the official Bhutan travel portal.",
    },
    {
      category: "COVID & Health",
      question: "Are there any health requirements for travelling to Bhutan?",
      answer:
        "Health requirements are subject to current regulations. Travellers should check the latest health advisories before departure.",
    },
    {
      category: "Overstay",
      question: "What happens if I overstay in Bhutan?",
      answer:
        "Overstaying may result in fines and immigration penalties. Visitors must ensure they depart Bhutan before their authorised stay expires.",
    },
    {
      category: "Work Restrictions",
      question: "Can Indians work in Bhutan on a tourist entry permit?",
      answer:
        "No. Employment in Bhutan requires a valid work permit issued by Bhutanese authorities.",
    },
    {
      category: "Currency",
      question: "Can Indian currency be used in Bhutan?",
      answer:
        "Yes. Indian Rupees are widely accepted in Bhutan. However, high-denomination notes may not always be accepted in certain areas.",
    },
    {
      category: "Group Travel",
      question: "Can Indian families travel together to Bhutan?",
      answer:
        "Yes. Each traveller must obtain an individual Entry Permit, including children, but families can apply and enter together.",
    },
    {
      category: "Processing",
      question: "How long does it take to obtain a Bhutan Entry Permit?",
      answer:
        "Entry Permits are typically issued on arrival at designated entry points or processed within a short time if applied online through official channels.",
    },
  ],

  Qatar: [
    {
      category: "Visa Basics",
      question: "Do Indians need a visa to travel to Qatar?",
      answer:
        "Yes. Indian passport holders require a valid visa or entry authorization to travel to Qatar. However, eligible Indian travellers may obtain a visa on arrival if they meet specific conditions set by Qatar immigration authorities.",
    },
    {
      category: "Visa on Arrival",
      question: "Can Indians get a visa on arrival in Qatar?",
      answer:
        "Yes. Indian citizens may be eligible for a visa on arrival in Qatar for up to 30 days, provided they hold a valid passport (minimum 6 months validity), confirmed return ticket, hotel booking through Discover Qatar or confirmed accommodation, and a valid credit/debit card. Conditions are subject to change.",
    },
    {
      category: "Visa Validity",
      question: "What is the validity of a Qatar tourist visa for Indians?",
      answer:
        "A Qatar tourist visa or visa on arrival typically allows a stay of up to 30 days. In some cases, it may be extended for an additional 30 days, subject to approval by the Ministry of Interior.",
    },
    {
      category: "Visa Types",
      question: "What types of Qatar visas are available for Indians?",
      answer:
        "Common Qatar visa types include Tourist Visa, Business Visa, Transit Visa, Family Visit Visa, and Work Visa. The visa category depends on the purpose and duration of stay.",
    },
    {
      category: "Hayya Entry Permit",
      question: "What is the Hayya entry permit for Qatar?",
      answer:
        "The Hayya platform is Qatar’s official digital entry system used during major events and for certain visitor categories. Eligible travellers may need to apply through the Hayya portal depending on entry regulations in effect at the time of travel.",
    },
    {
      category: "Passport Requirements",
      question: "What are the passport requirements for a Qatar visa?",
      answer:
        "Your passport must be valid for at least six months from the date of arrival in Qatar and must have sufficient blank pages for entry stamps.",
    },
    {
      category: "Required Documents",
      question: "What documents are required for a Qatar tourist visa?",
      answer:
        "Applicants typically require a valid passport, passport-size photograph, confirmed return flight ticket, proof of accommodation, financial proof, and a valid debit or credit card. Additional documents may be requested depending on the visa category.",
    },
    {
      category: "Financial Requirements",
      question: "Is there a minimum bank balance requirement for Qatar visa?",
      answer:
        "While Qatar does not publish a fixed minimum amount, travellers must demonstrate sufficient financial means to support their stay, especially when applying for certain visa categories.",
    },
    {
      category: "Transit",
      question: "Do Indians need a transit visa for Qatar?",
      answer:
        "Indian travellers transiting through Hamad International Airport without exiting the transit area do not require a transit visa. If leaving the airport during transit, a transit or short-term entry visa may be required.",
    },
    {
      category: "Visa Extension",
      question: "Can I extend my stay in Qatar?",
      answer:
        "Yes. Eligible visitors may apply for a visa extension through the Ministry of Interior before their current stay expires. Approval is discretionary.",
    },
    {
      category: "Work Visa",
      question: "Can I work in Qatar on a tourist visa?",
      answer:
        "No. Working in Qatar on a tourist visa is illegal. Employment requires a valid work visa sponsored by a Qatari employer.",
    },
    {
      category: "Family Applications",
      question: "Can I apply for a Qatar visa for my family?",
      answer:
        "Yes. Each family member must have a separate visa or entry approval. Family Visit Visas are available for residents sponsoring relatives.",
    },
    {
      category: "Processing Time",
      question: "How long does it take to process a Qatar visa?",
      answer:
        "Qatar visa processing times vary by category but typically range from 3 to 7 working days once a complete application is submitted.",
    },
    {
      category: "Rejection",
      question: "Can I reapply if my Qatar visa is rejected?",
      answer:
        "Yes. Applicants may reapply after addressing the reasons for refusal and ensuring all documentation is accurate and complete.",
    },
    {
      category: "Overstay",
      question: "What happens if I overstay my Qatar visa?",
      answer:
        "Overstaying may result in daily fines, exit penalties, and potential travel restrictions. Visitors must leave Qatar before the authorised stay expires.",
    },
    {
      category: "Refunds",
      question: "Are Qatar visa fees refundable if rejected?",
      answer:
        "Visa fees are generally non-refundable, even if the application is refused.",
    },
  ],

  Morocco: [
    {
      category: "Visa Basics",
      question: "Do Indians need a visa to travel to Morocco?",
      answer:
        "Yes. Indian passport holders require a valid Morocco visa before travelling for tourism, business, or family visits. Morocco does not offer visa-on-arrival for Indian citizens.",
    },
    {
      category: "Visa Types",
      question: "What types of Morocco visas are available for Indians?",
      answer:
        "Common Morocco visa types include Tourist Visa, Business Visa, and Transit Visa. The appropriate category depends on the purpose and duration of your stay.",
    },
    {
      category: "eVisa",
      question: "Can Indians apply for a Morocco e-Visa?",
      answer:
        "Morocco has introduced an online visa system for eligible nationalities. Indian applicants must check eligibility requirements before applying through the official Morocco visa portal.",
    },
    {
      category: "Visa Validity",
      question: "What is the validity of a Morocco tourist visa?",
      answer:
        "A Morocco tourist visa is generally issued for short stays of up to 90 days. The exact validity and permitted stay duration depend on the visa granted by the consulate.",
    },
    {
      category: "Processing Time",
      question: "How long does it take to process a Morocco visa?",
      answer:
        "Morocco visa processing typically takes 5 to 15 working days after submission of a complete application. Processing times may vary depending on consular workload.",
    },
    {
      category: "Visa Fees",
      question: "How much is the Morocco visa fee for Indians?",
      answer:
        "Morocco visa fees vary depending on the visa category and entry type (single or multiple entry). Fees are generally non-refundable, even if the visa is refused.",
    },
    {
      category: "Passport Requirements",
      question: "What are the passport requirements for a Morocco visa?",
      answer:
        "Your passport must be valid for at least six months beyond your intended stay and should have sufficient blank pages for visa stamps.",
    },
    {
      category: "Required Documents",
      question: "What documents are required for a Morocco tourist visa?",
      answer:
        "Applicants typically need a completed visa application form, valid passport, recent photographs, proof of accommodation, confirmed flight itinerary, financial proof, and travel insurance.",
    },
    {
      category: "Financial Requirements",
      question: "How much bank balance is required for a Morocco visa?",
      answer:
        "While Morocco does not publish a fixed minimum amount, applicants must demonstrate sufficient funds to cover accommodation, daily expenses, and return travel.",
    },
    {
      category: "Accommodation",
      question: "Do I need confirmed hotel bookings for a Morocco visa?",
      answer:
        "Yes. Applicants must provide proof of accommodation for the entire duration of stay, such as hotel reservations or an invitation letter from a host in Morocco.",
    },
    {
      category: "Travel Insurance",
      question: "Is travel insurance mandatory for a Morocco visa?",
      answer:
        "Travel insurance is generally recommended and may be required depending on the application type. It should cover medical emergencies and repatriation.",
    },
    {
      category: "Family Applications",
      question: "Can I apply for a Morocco visa for my family?",
      answer:
        "Yes. Each family member, including minors, must submit an individual visa application along with required supporting documents.",
    },
    {
      category: "Minors",
      question: "What documents are required for minors applying for a Morocco visa?",
      answer:
        "Minors must provide a birth certificate, parental consent letter (if travelling without both parents), and copies of parents’ identification documents.",
    },
    {
      category: "Transit",
      question: "Do Indians need a transit visa for Morocco?",
      answer:
        "A transit visa may be required depending on the duration of transit and whether you exit the international transit area. Travellers should verify requirements before departure.",
    },
    {
      category: "Overstay",
      question: "What happens if I overstay my Morocco visa?",
      answer:
        "Overstaying may result in fines, legal penalties, or future entry restrictions. Visitors must depart Morocco before the authorised stay expires.",
    },
    {
      category: "Visa Extension",
      question: "Can I extend my Morocco tourist visa?",
      answer:
        "Visa extensions are not commonly granted and are considered only in exceptional circumstances. Requests must be made through Moroccan immigration authorities before visa expiry.",
    },
    {
      category: "Rejection",
      question: "Can I reapply if my Morocco visa is rejected?",
      answer:
        "Yes. Applicants may reapply after addressing the reasons for refusal and submitting a corrected and complete application.",
    },
    {
      category: "Refunds",
      question: "Are Morocco visa fees refundable if rejected?",
      answer:
        "No. Morocco visa application fees are generally non-refundable regardless of the outcome.",
    },
  ],

  Armenia: [
    {
      category: "Visa Basics",
      question: "Do Indians need a visa to travel to Armenia?",
      answer:
        "Yes. Indian passport holders must obtain a valid Armenia visa before travelling for tourism or business purposes. Eligible travellers can apply for an Armenia e-Visa online prior to departure.",
    },
    {
      category: "Visa Types",
      question: "What types of Armenia tourist visas are available for Indians?",
      answer:
        "Armenia offers visitor visas with different stay durations, commonly up to 21 days or up to 120 days, depending on approval and travel purpose.",
    },
    {
      category: "eVisa",
      question: "Can Indians apply for an Armenia e-Visa online?",
      answer:
        "Yes. Eligible Indian passport holders can apply for the Armenia e-Visa online by submitting personal details, passport information, and required documents. The approved visa is issued electronically.",
    },
    {
      category: "Visa on Arrival",
      question: "Is visa-on-arrival available for Indians in Armenia?",
      answer:
        "No. Indian passport holders are not eligible for visa-on-arrival in Armenia and must obtain a visa before travelling.",
    },
    {
      category: "Visa Validity",
      question: "What is the validity of an Armenia e-Visa?",
      answer:
        "An Armenia e-Visa is typically valid for up to 90 days from the date of issue and allows a stay of up to 21 days per entry, depending on the visa type granted.",
    },
    {
      category: "Fees",
      question: "How much does an Armenia visa cost for Indians?",
      answer:
        "Armenia visa fees vary based on the visa category and duration of stay. The standard e-Visa fee applies equally to all applicants, regardless of age.",
    },
    {
      category: "Eligibility",
      question: "What are the eligibility criteria for an Armenia visa?",
      answer:
        "Applicants must hold a valid passport, be outside Armenia at the time of application, and not be subject to any entry restrictions under Armenian immigration law.",
    },
    {
      category: "Required Documents",
      question: "What documents are required for an Armenia e-Visa?",
      answer:
        "Applicants generally need a passport valid for at least six months from the date of entry, a recent passport-size photograph, and supporting travel details such as itinerary or accommodation.",
    },
    {
      category: "Passport Requirements",
      question: "What is the minimum passport validity required for Armenia?",
      answer:
        "Your passport must be valid for at least six months beyond your intended date of entry into Armenia.",
    },
    {
      category: "Processing Time",
      question: "How long does it take to process an Armenia visa?",
      answer:
        "Armenia e-Visa applications are usually processed within a few working days. Processing times may vary depending on verification requirements.",
    },
    {
      category: "Family Applications",
      question: "Can I apply for an Armenia visa for my family members?",
      answer:
        "Yes. Each traveller must have an individual visa approval, including children. Multiple applications can be submitted during the same session.",
    },
    {
      category: "Visa Corrections",
      question: "What should I do if there is a mistake on my Armenia e-Visa?",
      answer:
        "If you notice incorrect information on your issued visa, you may need to submit a new application with accurate details, as corrections are typically not permitted after issuance.",
    },
    {
      category: "Extensions",
      question: "Can I extend my stay in Armenia?",
      answer:
        "Yes. Visitors may apply for a visa extension through the Migration and Citizenship Service of Armenia before their current authorised stay expires.",
    },
    {
      category: "Overstay",
      question: "What happens if I overstay my Armenia visa?",
      answer:
        "Overstaying may result in fines, deportation, or entry restrictions. Travellers should depart Armenia before their permitted stay ends or apply for an extension in advance.",
    },
    {
      category: "Rejections",
      question: "Can I reapply if my Armenia visa is rejected?",
      answer:
        "Yes. Applicants may reapply after addressing the reason for refusal. It is advisable to correct any documentation or eligibility issues before submitting a new application.",
    },
    {
      category: "Refunds",
      question: "Are Armenia visa fees refundable if my application is rejected?",
      answer:
        "No. Armenia visa fees are generally non-refundable regardless of the outcome of the application.",
    },
  ],

  Egypt: [
    {
      category: "Visa Basics",
      question: "Do Indians need a visa to travel to Egypt?",
      answer:
        "Yes. Indian passport holders must obtain a valid Egypt visa before travelling. Depending on eligibility, travellers may apply for an Egypt e-Visa online or through the Egyptian Embassy or Consulate.",
    },
    {
      category: "Visa Types",
      question: "What types of Egypt visas are available for Indians?",
      answer:
        "Common Egypt visa types include Tourist Visa (single or multiple entry), Business Visa, Transit Visa, and Long-Term visas for work or study. Most short-term travellers apply for a tourist visa.",
    },
    {
      category: "eVisa",
      question: "Can Indians apply for an Egypt e-Visa online?",
      answer:
        "Yes. Eligible Indian passport holders can apply for an Egypt e-Visa online before departure. The approved e-Visa is issued electronically and must be presented upon arrival.",
    },
    {
      category: "Visa on Arrival",
      question: "Is visa-on-arrival available for Indians in Egypt?",
      answer:
        "Visa-on-arrival is not generally available for all Indian travellers. It is recommended to obtain an Egypt e-Visa or embassy visa before travelling to avoid entry complications.",
    },
    {
      category: "Visa Validity",
      question: "What is the validity of an Egypt tourist visa?",
      answer:
        "An Egypt tourist visa is typically valid for 90 days from the date of issue and allows a stay of up to 30 days per entry.",
    },
    {
      category: "Processing Time",
      question: "How long does it take to process an Egypt visa?",
      answer:
        "Egypt e-Visa applications are usually processed within 3 to 7 business days. Embassy visa processing times may vary depending on the application type and verification requirements.",
    },
    {
      category: "Required Documents",
      question: "What documents are required for an Egypt visa?",
      answer:
        "Applicants typically need a valid passport with at least six months validity, a recent passport-size photograph, confirmed travel itinerary, accommodation details, and proof of sufficient funds. Additional documents may be required depending on visa type.",
    },
    {
      category: "Passport Requirements",
      question: "What is the minimum passport validity required for Egypt?",
      answer:
        "Your passport must be valid for at least six months from your intended date of arrival in Egypt.",
    },
    {
      category: "Fees",
      question: "How much does an Egypt visa cost?",
      answer:
        "Egypt visa fees vary depending on visa type and entry type (single or multiple entry). Fees may also differ between e-Visa and embassy applications.",
    },
    {
      category: "Group Travel",
      question: "Does each traveller need a separate Egypt visa?",
      answer:
        "Yes. Every traveller, including minors, must have an individual Egypt visa approval.",
    },
    {
      category: "Transit",
      question: "Do I need a visa to transit through Egypt?",
      answer:
        "If you remain within the international transit area and do not pass through immigration, a transit visa may not be required. If you plan to exit the airport, you must obtain a valid visa.",
    },
    {
      category: "Extensions",
      question: "Can I extend my Egypt tourist visa?",
      answer:
        "Yes. Visa extensions may be possible through the local immigration office in Egypt. Applications should be made before the current visa expires.",
    },
    {
      category: "Overstay",
      question: "What happens if I overstay my Egypt visa?",
      answer:
        "Overstaying an Egypt visa may result in fines, penalties, or future travel restrictions. Travellers should ensure they depart before their authorised stay expires.",
    },
    {
      category: "Rejections",
      question: "What should I do if my Egypt visa is rejected?",
      answer:
        "If your visa application is refused, review the reasons provided and correct any issues before reapplying. Embassy guidance may be required in certain cases.",
    },
    {
      category: "Refunds",
      question: "Are Egypt visa fees refundable if my application is rejected?",
      answer:
        "No. Egypt visa fees are generally non-refundable, regardless of the application outcome.",
    },
  ],

  Combodia: [
    {
      category: "Visa Basics",
      question: "Do Indians need a visa to travel to Cambodia?",
      answer:
        "Yes. Indian passport holders require a valid Cambodia visa for tourism, business, or short-term visits. Travellers can apply for a Cambodia e-Visa online or obtain a visa on arrival.",
    },
    {
      category: "e-Visa",
      question: "Can Indians apply for a Cambodia e-Visa?",
      answer:
        "Yes. Indian citizens can apply for a Cambodia e-Visa online before travelling. The approved visa is sent electronically and must be printed and presented upon arrival.",
    },
    {
      category: "Visa on Arrival",
      question: "Is visa on arrival available for Indians in Cambodia?",
      answer:
        "Yes. Indian travellers can obtain a visa on arrival at major Cambodian international airports and select land border crossings. However, applying for an e-Visa in advance is recommended to avoid delays.",
    },
    {
      category: "Visa Validity",
      question: "What is the validity of a Cambodia tourist visa for Indians?",
      answer:
        "A Cambodia tourist visa is typically valid for 90 days from the date of issue and allows a maximum stay of up to 30 days per visit.",
    },
    {
      category: "Processing Time",
      question: "How long does it take to process a Cambodia e-Visa?",
      answer:
        "Cambodia e-Visa applications are generally processed within 3 to 5 working days, although processing times may vary during peak travel seasons.",
    },
    {
      category: "Required Documents",
      question: "What documents are required for a Cambodia visa?",
      answer:
        "Applicants usually need a valid passport with at least six months validity, a recent passport-size photograph, confirmed return flight tickets, proof of accommodation, and sufficient financial means.",
    },
    {
      category: "Passport Requirements",
      question: "What is the passport validity requirement for Cambodia?",
      answer:
        "Your passport must be valid for at least six months from the date of entry into Cambodia and should have at least one blank page.",
    },
    {
      category: "Financial Requirements",
      question: "Is there a minimum bank balance requirement for Cambodia?",
      answer:
        "Cambodia does not publish a fixed minimum bank balance requirement, but travellers must demonstrate sufficient funds to cover their stay.",
    },
    {
      category: "Transit",
      question: "Do Indians need a transit visa for Cambodia?",
      answer:
        "If you remain within the airport transit area and do not pass through immigration, a transit visa is generally not required. If exiting the airport, a valid visa is necessary.",
    },
    {
      category: "Visa Extension",
      question: "Can I extend my Cambodia tourist visa?",
      answer:
        "Yes. Cambodia tourist visas can usually be extended once for an additional 30 days by applying through the Cambodia Immigration Department before the current visa expires.",
    },
    {
      category: "Overstay",
      question: "What happens if I overstay my Cambodia visa?",
      answer:
        "Overstaying in Cambodia results in daily fines and may lead to penalties or entry restrictions. Visitors must regularize their stay before departure.",
    },
    {
      category: "Business Visa",
      question: "Can Indians apply for a Cambodia business visa?",
      answer:
        "Yes. Indian nationals travelling for work or commercial purposes must apply for a Cambodia business visa (E-class visa), which allows extensions for longer stays.",
    },
    {
      category: "Family Applications",
      question: "Can I apply for a Cambodia visa for my family?",
      answer:
        "Yes. Each traveller, including minors, must obtain an individual visa before travelling to Cambodia.",
    },
    {
      category: "Refunds",
      question: "Are Cambodia visa fees refundable if rejected?",
      answer:
        "Cambodia visa fees are generally non-refundable, even if the application is refused.",
    },
  ],

  Mauritius: [
    {
      category: "Visa Basics",
      question: "Do Indians need a visa to travel to Mauritius?",
      answer:
        "No. Indian passport holders do not require a pre-arranged visa to travel to Mauritius for tourism. A visa-free entry is granted on arrival, subject to meeting immigration requirements.",
    },
    {
      category: "Stay Duration",
      question: "How long can Indians stay in Mauritius without a visa?",
      answer:
        "Indian travellers are generally granted a stay of up to 60 days per visit. The final duration is determined by Mauritian immigration authorities upon arrival.",
    },
    {
      category: "Entry Requirements",
      question: "What documents are required for visa-free entry to Mauritius?",
      answer:
        "Travellers must carry a valid passport (minimum 6 months validity), confirmed return flight tickets, proof of accommodation, sufficient financial means, and travel insurance. Immigration officers may request supporting documents.",
    },
    {
      category: "Passport Validity",
      question: "What is the passport validity requirement for Mauritius?",
      answer:
        "Your passport must be valid for at least six months from the date of entry into Mauritius and should have sufficient blank pages.",
    },
    {
      category: "Financial Requirements",
      question: "Is there a minimum bank balance required for Mauritius?",
      answer:
        "While Mauritius does not publish a fixed minimum amount, visitors must demonstrate sufficient funds to cover accommodation, daily expenses, and return travel.",
    },
    {
      category: "Travel Insurance",
      question: "Is travel insurance mandatory for Mauritius?",
      answer:
        "Travel insurance is not strictly mandatory but is strongly recommended to cover medical emergencies and unforeseen travel disruptions.",
    },
    {
      category: "Business Travel",
      question: "Do Indians need a visa for business travel to Mauritius?",
      answer:
        "Short-term business visits may be permitted under visa-free entry, but travellers must carry an invitation letter from the host company and supporting documents. Employment requires a valid work permit.",
    },
    {
      category: "Work Restrictions",
      question: "Can I work in Mauritius on visa-free entry?",
      answer:
        "No. Visa-free entry does not allow employment. Working in Mauritius requires a valid Occupation Permit or Work Permit issued by Mauritian authorities.",
    },
    {
      category: "Visa Extension",
      question: "Can I extend my stay in Mauritius?",
      answer:
        "Extensions may be requested through the Passport and Immigration Office in Mauritius before your authorised stay expires. Approval is discretionary.",
    },
    {
      category: "Overstay",
      question: "What happens if I overstay in Mauritius?",
      answer:
        "Overstaying may result in fines, detention, deportation, or future travel restrictions. Visitors must leave Mauritius before the authorised stay period ends.",
    },
    {
      category: "Family Travel",
      question: "Can Indian families travel together to Mauritius?",
      answer:
        "Yes. Each traveller must meet entry requirements individually, including children who must carry valid passports and supporting documents.",
    },
    {
      category: "Transit",
      question: "Do Indians need a transit visa for Mauritius?",
      answer:
        "If remaining within the international transit area and not passing through immigration, a transit visa is generally not required.",
    },
    {
      category: "Return Ticket",
      question: "Is a return ticket mandatory for Mauritius entry?",
      answer:
        "Yes. Proof of onward or return travel is required to enter Mauritius under visa-free arrangements.",
    },
    {
      category: "Vaccination",
      question: "Are there any vaccination requirements for Mauritius?",
      answer:
        "Vaccination requirements depend on the traveller’s recent travel history. Visitors arriving from certain countries may need to show proof of yellow fever vaccination.",
    },
    {
      category: "Rejection of Entry",
      question: "Can I be denied entry to Mauritius even if it is visa-free?",
      answer:
        "Yes. Immigration authorities have the discretion to deny entry if requirements are not met or if documentation is incomplete.",
    },
  ],

  Cuba: [
    {
      category: "Visa Basics",
      question: "Do Indians need a visa to travel to Cuba?",
      answer:
        "Yes. Indian passport holders require a valid Cuba Tourist Card (Tarjeta del Turista) or appropriate visa before travelling to Cuba for tourism or short-term visits.",
    },
    {
      category: "Tourist Card",
      question: "What is a Cuba Tourist Card?",
      answer:
        "A Cuba Tourist Card is an entry document that functions as a tourist visa for short stays. It is required for most foreign nationals visiting Cuba for tourism and must be presented upon arrival.",
    },
    {
      category: "Visa-Free Entry",
      question: "Can Indians travel visa-free to Cuba?",
      answer:
        "Indian citizens holding a valid permanent residence permit or valid multiple-entry visa from certain countries, such as the United States or Schengen States, may be eligible for visa-free entry for short stays. Entry conditions are subject to Cuban immigration rules at the time of travel.",
    },
    {
      category: "Validity",
      question: "How long can Indians stay in Cuba on a Tourist Card?",
      answer:
        "The Cuba Tourist Card typically allows a stay of up to 30 days. Extensions may be possible for an additional 30 days, subject to approval by Cuban immigration authorities.",
    },
    {
      category: "Processing Time",
      question: "How long does it take to obtain a Cuba Tourist Card?",
      answer:
        "Processing time varies depending on the issuing authority but is generally completed within a few working days once the required documents are submitted.",
    },
    {
      category: "Required Documents",
      question: "What documents are required for a Cuba Tourist Card?",
      answer:
        "Applicants typically need a valid passport, confirmed return flight ticket, proof of accommodation, and travel insurance covering medical expenses in Cuba.",
    },
    {
      category: "Passport Requirements",
      question: "What is the passport validity requirement for Cuba?",
      answer:
        "Your passport must be valid for at least six months from the date of entry into Cuba and must have sufficient blank pages.",
    },
    {
      category: "Travel Insurance",
      question: "Is travel insurance mandatory for Cuba?",
      answer:
        "Yes. Travel medical insurance is mandatory for all visitors to Cuba. Proof of insurance coverage must be presented upon arrival.",
    },
    {
      category: "Visa on Arrival",
      question: "Is visa on arrival available for Indians in Cuba?",
      answer:
        "No. Indian travellers must obtain the Tourist Card or appropriate visa before travelling. Airlines may deny boarding without valid documentation.",
    },
    {
      category: "Financial Requirements",
      question: "Is there a minimum bank balance requirement for Cuba?",
      answer:
        "Cuba does not publish a fixed minimum bank balance requirement, but travellers must demonstrate sufficient funds to cover their stay.",
    },
    {
      category: "Visa Extension",
      question: "Can I extend my stay in Cuba?",
      answer:
        "Yes. Visitors can apply for a 30-day extension at Cuban immigration offices before the initial 30-day stay expires.",
    },
    {
      category: "Overstay",
      question: "What happens if I overstay in Cuba?",
      answer:
        "Overstaying may result in fines and administrative penalties. Visitors must regularize their stay before departure.",
    },
    {
      category: "Work Restrictions",
      question: "Can I work in Cuba on a Tourist Card?",
      answer:
        "No. Employment in Cuba requires a specific work visa and authorization from Cuban authorities.",
    },
    {
      category: "Family Applications",
      question: "Can I apply for a Cuba Tourist Card for my family?",
      answer:
        "Yes. Each traveller, including children, must obtain an individual Tourist Card before travelling.",
    },
    {
      category: "Refunds",
      question: "Are Cuba Tourist Card fees refundable if unused?",
      answer:
        "Fees are generally non-refundable once issued, even if travel plans change.",
    },
  ],

  Georgia: [
    {
      category: "Visa Basics",
      question: "Do Indians need a visa to travel to Georgia?",
      answer:
        "Yes. Indian passport holders generally require a visa to enter Georgia for tourism, business, or family visits unless they hold a valid visa or residence permit from certain countries such as the US, UK, Schengen States, or GCC countries.",
    },
    {
      category: "Visa Exemption",
      question: "Can Indians travel to Georgia with a valid US, UK, or Schengen visa?",
      answer:
        "Yes. Indian citizens holding a valid multiple-entry visa or residence permit issued by the US, UK, Schengen countries, or certain GCC nations may enter Georgia visa-free for short stays, subject to meeting entry conditions.",
    },
    {
      category: "eVisa",
      question: "Can Indians apply for a Georgia e-Visa?",
      answer:
        "Yes. Eligible Indian passport holders can apply for a Georgia e-Visa online through the official portal. The approved e-Visa is issued electronically and must be printed and carried during travel.",
    },
    {
      category: "Visa Validity",
      question: "What is the validity of a Georgia tourist visa?",
      answer:
        "A Georgia tourist e-Visa typically allows a stay of up to 30 days within a 120-day validity period, depending on the visa granted.",
    },
    {
      category: "Processing Time",
      question: "How long does it take to process a Georgia visa?",
      answer:
        "Georgia e-Visa applications are generally processed within 5 working days after submission of complete documents. Processing times may vary depending on verification requirements.",
    },
    {
      category: "Visa Fees",
      question: "How much is the Georgia visa fee for Indians?",
      answer:
        "Georgia visa fees vary depending on the visa category and processing type. Fees are usually non-refundable, even if the visa application is rejected.",
    },
    {
      category: "Passport Requirements",
      question: "What are the passport requirements for a Georgia visa?",
      answer:
        "Your passport must be valid for at least six months from the date of entry into Georgia and must have sufficient blank pages for entry stamps.",
    },
    {
      category: "Required Documents",
      question: "What documents are required for a Georgia tourist visa?",
      answer:
        "Applicants typically need a valid passport, passport-size photograph, confirmed return flight ticket, proof of accommodation, travel insurance, and financial proof demonstrating sufficient funds.",
    },
    {
      category: "Financial Requirements",
      question: "Is there a minimum bank balance requirement for a Georgia visa?",
      answer:
        "Georgia does not publish a fixed minimum bank balance, but travellers must demonstrate sufficient funds to cover accommodation, daily expenses, and return travel.",
    },
    {
      category: "Travel Insurance",
      question: "Is travel insurance mandatory for Georgia?",
      answer:
        "Yes. Travel insurance covering medical expenses during the stay in Georgia is generally required for visa approval.",
    },
    {
      category: "Transit",
      question: "Do Indians need a transit visa for Georgia?",
      answer:
        "If you remain within the airport transit area and do not pass through immigration, a transit visa may not be required. If exiting the airport, a valid Georgia visa is required.",
    },
    {
      category: "Extension",
      question: "Can I extend my stay in Georgia?",
      answer:
        "Visa extensions are not commonly granted for short-term tourist visas. Visitors must leave Georgia before their authorised stay expires.",
    },
    {
      category: "Overstay",
      question: "What happens if I overstay my Georgia visa?",
      answer:
        "Overstaying may result in fines, entry bans, or future visa restrictions. Travellers must strictly comply with the permitted duration of stay.",
    },
    {
      category: "Family Applications",
      question: "Can I apply for a Georgia visa for my family members?",
      answer:
        "Yes. Each traveller, including minors, must submit a separate visa application along with required supporting documents.",
    },
    {
      category: "Rejection",
      question: "Can I reapply if my Georgia visa is rejected?",
      answer:
        "Yes. Applicants may submit a new application after addressing the reasons for refusal and ensuring all documentation is accurate and complete.",
    },
    {
      category: "Refunds",
      question: "Are Georgia visa fees refundable if rejected?",
      answer:
        "No. Georgia visa fees are generally non-refundable, regardless of the application outcome.",
    },
  ],

  Israel: [
    {
      category: "Visa Basics",
      question: "Do Indians need a visa to travel to Israel?",
      answer:
        "Yes. Indian passport holders must obtain a valid Israel visa before travelling for tourism, business, or short-term visits.",
    },
    {
      category: "Visa Types",
      question: "What types of Israel visas are available for Indians?",
      answer:
        "Common visa types include Tourist Visa (B/2), Business Visa, Work Visa (B/1), Student Visa (A/2), and Temporary Residence Visas. The visa category depends on the purpose and duration of stay.",
    },
    {
      category: "Tourist Visa",
      question: "What is the validity of an Israel tourist visa for Indians?",
      answer:
        "An Israel B/2 tourist visa generally allows short stays of up to 90 days. The final duration of stay is determined by Israeli border authorities upon arrival.",
    },
    {
      category: "Processing Time",
      question: "How long does it take to process an Israel visa?",
      answer:
        "Israel visa processing usually takes around 5 to 10 working days after submission of a complete application. Processing time may vary depending on the visa type and background verification.",
    },
    {
      category: "Required Documents",
      question: "What documents are required for an Israel tourist visa?",
      answer:
        "Applicants typically need a valid passport, completed visa application form, passport-size photographs, confirmed flight itinerary, accommodation proof, travel insurance, and financial documents.",
    },
    {
      category: "Passport Requirements",
      question: "What is the passport validity requirement for Israel?",
      answer:
        "Your passport must be valid for at least six months from your intended date of arrival in Israel and should have sufficient blank pages.",
    },
    {
      category: "Financial Requirements",
      question: "Is there a minimum bank balance requirement for an Israel visa?",
      answer:
        "Israel does not publish a fixed minimum bank balance. However, applicants must demonstrate sufficient funds to cover accommodation, daily expenses, and return travel.",
    },
    {
      category: "Travel Insurance",
      question: "Is travel insurance mandatory for Israel?",
      answer:
        "Travel medical insurance covering the entire stay is generally required when applying for an Israel tourist visa.",
    },
    {
      category: "Interview",
      question: "Is an interview required for an Israel visa?",
      answer:
        "In some cases, applicants may be required to attend an interview at the Israeli Embassy or Consulate as part of the visa assessment process.",
    },
    {
      category: "Visa on Arrival",
      question: "Is visa on arrival available for Indians in Israel?",
      answer:
        "No. Israel does not provide visa on arrival for Indian passport holders. A visa must be obtained prior to travel.",
    },
    {
      category: "Work Restrictions",
      question: "Can I work in Israel on a tourist visa?",
      answer:
        "No. Employment in Israel requires a valid B/1 work visa sponsored by an Israeli employer.",
    },
    {
      category: "Visa Extension",
      question: "Can I extend my stay in Israel?",
      answer:
        "Short-term tourist visas may be extended in exceptional cases by applying to the Population and Immigration Authority before visa expiry.",
    },
    {
      category: "Overstay",
      question: "What happens if I overstay my Israel visa?",
      answer:
        "Overstaying may result in fines, deportation, or future entry restrictions. Visitors must leave Israel before their authorised stay ends.",
    },
    {
      category: "Rejection",
      question: "Can I reapply if my Israel visa is rejected?",
      answer:
        "Yes. Applicants may submit a new application after addressing the reasons for refusal and ensuring that all required documents are complete.",
    },
    {
      category: "Refunds",
      question: "Are Israel visa fees refundable if rejected?",
      answer:
        "Visa application fees are generally non-refundable, regardless of the outcome.",
    },
  ],

  "British Virgin Islands": [
    {
      question: "Do Indian citizens need a visa?",
      answer:
        "No. Indian passport holders can enter this country without obtaining a visa in advance, subject to immigration approval on arrival.",
    },
    {
      question: "How long can I stay?",
      answer:
        "The permitted length of stay is decided by immigration authorities at the port of entry and may vary based on travel purpose.",
    },
    {
      question: "What documents are required?",
      answer:
        "A valid passport (minimum 6 months validity), return or onward ticket, and proof of accommodation are generally required.",
    },
    {
      question: "Is prior approval needed?",
      answer:
        "No prior visa approval is required. Entry is granted at immigration upon arrival.",
    },
    {
      question: "Can I extend my stay?",
      answer:
        "Extensions, if allowed, must be applied for directly with local immigration authorities after arrival.",
    },
  ],

  Thailand: [
    {
      question: "What is a TDAC?",
      answer:
        "TDAC (Thailand Digital Arrival Card) is an online arrival registration form that travellers must complete before entering Thailand. It replaces the traditional paper arrival card and is linked electronically to your passport.",
    },
    {
      question: "Who must submit a TDAC?",
      answer:
        "All travellers entering Thailand, including tourists, business travellers, and transit passengers (where applicable), must submit a TDAC before arrival.",
    },
    {
      question: "Do children need to apply for TDAC?",
      answer:
        "Yes. Every traveller, including infants and minors, must have a separate TDAC submitted under their own passport details.",
    },
    {
      question: "Do Indians need a visa to visit Thailand?",
      answer:
        "Indian passport holders currently enjoy visa-free entry to Thailand for short stays, subject to prevailing government rules. However, TDAC submission is still mandatory.",
    },
    {
      question: "Can I extend my visa-free stay in Thailand?",
      answer:
        "Yes. Visa-free stays may be extended by applying at a local Thai immigration office, subject to approval by immigration authorities.",
    },
    {
      question: "Do I need travel insurance for a Thailand Digital Arrival Card (TDAC)?",
      answer:
        "Travel insurance is strongly recommended for Thailand travel. While it may not always be mandatory for TDAC, immigration officers can request proof of insurance on arrival.",
    },
    {
      question: "How will I know if my Thailand Digital Arrival Card is approved?",
      answer:
        "After successful submission, TDAC confirmation is usually sent to your registered email address. You should carry a digital or printed copy while travelling.",
    },
    {
      question: "Where do I have to send my passport & TDAC application?",
      answer:
        "You do not need to send your physical passport anywhere. TDAC is submitted completely online and is electronically linked to your passport details.",
    },
    {
      question: "I am visiting multiple countries before arriving in Thailand. Am I eligible for TDAC?",
      answer:
        "Yes. You are eligible to submit a TDAC as long as you meet Thailand’s entry requirements at the time of arrival, regardless of previous travel history.",
    },
    {
      question:
        "If I have multiple hotel and flight bookings for my trip to Thailand, do I need to include all of them in the TDAC application form?",
      answer:
        "You only need to provide details of your first accommodation and initial arrival flight. However, you should carry complete travel and hotel details in case immigration authorities request them.",
    },
  ],


};



// fallback for countries not configured yet
const DEFAULT_FAQS = (countryName) => [
  {
    question: `${countryName} Visa Information`,
    answer: `This section provides general visa information for ${countryName}.`,
  },
  {
    question: `${countryName} Visa Processing Time`,
    answer: `Processing time varies depending on visa type and embassy workload.`,
  },
  {
    question: `${countryName} Visa Documents Required`,
    answer: `Passport, photographs, travel details, and supporting documents are required.`,
  },


  
];


export const getCountryFaqs = (countryName) => {
  if (!countryName) return DEFAULT_FAQS("Country");
  return COUNTRY_FAQS[countryName] || DEFAULT_FAQS(countryName);
};

