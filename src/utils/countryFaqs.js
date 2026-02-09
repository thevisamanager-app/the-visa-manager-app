// src/utils/countryFaqs.js

const COUNTRY_FAQS = {
  "Sri-lanka": [
    {
      question: "What is an ETA?",
      answer:
        "An ETA (Electronic Travel Authorization) is an official online approval that allows eligible travelers to enter Sri Lanka for short stays such as tourism, business, or transit. It is electronically linked to your passport.",
    },
    {
      question: "What types of ETA are available?",
      answer:
        "Sri Lanka offers Tourist ETA, Business ETA, and Transit ETA depending on the purpose of travel.",
    },
    {
      question: "What is the ETA website?",
      answer:
        "The ETA is issued through Sri Lanka’s official online immigration system. Applications are submitted digitally and approved electronically.",
    },
    {
      question: "How should I submit an application?",
      answer:
        "You can submit your ETA application online by filling in personal details, passport information, and travel details, followed by payment of the required fee.",
    },
    {
      question: "Do I need a ticket before I apply for an ETA?",
      answer:
        "A confirmed return or onward ticket is generally recommended, as immigration authorities may request proof of travel plans.",
    },
    {
      question: "How do I know if my ETA is still valid for travel to Sri Lanka?",
      answer:
        "You can check your ETA validity online using your passport number and the reference details provided at the time of approval.",
    },
    {
      question: "How does the airline know that I have a valid visa to travel to Sri Lanka?",
      answer:
        "Airlines verify your ETA electronically through the Sri Lankan immigration system using your passport details at check-in.",
    },
    {
      question: "What can I do if I am unable to apply through this site?",
      answer:
        "If you face technical issues, you may seek assistance from authorized visa service providers or contact Sri Lanka immigration support.",
    },
    {
      question: "Is my personal information safe?",
      answer:
        "Yes. Personal and passport information submitted during the ETA process is protected and used only for immigration and security purposes.",
    },
    {
      question: "How secure are payments made through electronic payment cards?",
      answer:
        "Payments are processed through secure, encrypted payment gateways that comply with international security standards.",
    },
    {
      question: "Which electronic payment cards are accepted?",
      answer:
        "Major international credit and debit cards such as Visa and MasterCard are commonly accepted for ETA payments.",
    },
    {
      question: "What happens if I already possess a valid visa?",
      answer:
        "If you already hold a valid Sri Lanka visa covering your travel dates and purpose, you do not need to apply for a new ETA.",
    },
    {
      question: "If I already possess a valid ETA, can I apply for a fresh ETA again?",
      answer:
        "Yes, but applying for a new ETA while an existing one is still valid is usually unnecessary unless your travel details change.",
    },
    {
      question: "Can I apply for a fresh ETA while being in Sri Lanka?",
      answer:
        "No. ETA applications must be submitted before arrival. Extensions or changes are handled by Sri Lanka immigration authorities after entry.",
    },
    {
      question: "What happens if my ETA application is not approved?",
      answer:
        "If your ETA is declined, you will be notified electronically. You may reapply or contact immigration authorities for further clarification.",
    },
    {
      question: "If my ETA application is unsuccessful, can I get a refund?",
      answer:
        "ETA fees are generally non-refundable once the application has been processed, regardless of the outcome.",
    },
    {
      question: "What can I do if I make a mistake in my application?",
      answer:
        "For minor mistakes, authorities may request clarification. For major errors, you may need to submit a fresh ETA application.",
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
      question: "Is Hong Kong pre-arrival registration mandatory for Indians?",
      answer:
        "Yes. Indian passport holders must complete Hong Kong Pre-Arrival Registration (PAR) before traveling.",
    },
    {
      question: "Is this a visa?",
      answer:
        "No. Pre-Arrival Registration is not a visa. It is an entry pre-clearance required for eligible Indian travellers.",
    },
    {
      question: "How long does the registration take?",
      answer:
        "Hong Kong Pre-Arrival Registration is usually processed instantly or within a few minutes after successful submission.",
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