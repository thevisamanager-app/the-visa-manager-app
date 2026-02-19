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

  Combodia: [
    {
      question: "Can Indian travelers apply for a Cambodia e-visa?",
      answer:
        "Yes. Indian passport holders can apply online for a Cambodia e-visa for eligible travel purposes.",
    },
    {
      question: "Do I need a return ticket for Cambodia visa?",
      answer:
        "Yes. A return or onward ticket is generally required as proof of planned departure.",
    },
    {
      question: "How long is the Cambodia e-visa valid?",
      answer:
        "Cambodia e-visa validity and allowed stay depend on the visa issued, typically for short tourist travel.",
    },
    {
      question: "Is a visa extension possible?",
      answer:
        "Extensions may be possible subject to Cambodian immigration rules and approval.",
    },
    {
      question: "Do I need a hotel booking for Cambodia?",
      answer:
        "Yes. Proof of accommodation, such as a hotel booking, is commonly required.",
    },
    {
      question: "Do I receive a physical visa stamp?",
      answer:
        "For e-visa applications, approval is issued electronically; entry endorsement is handled by immigration at arrival.",
    },
  ],

  Azerbaijan: [
    {
      question: "What are the advantages of an Azerbaijan e-visa?",
      answer:
        "The Azerbaijan e-visa allows travellers to apply completely online without visiting an embassy. It offers faster processing, digital approval via email, reduced paperwork, and convenient entry without a physical visa stamp.",
    },
    {
      question: "How long will my Azerbaijan e-visa be valid for?",
      answer:
        "An Azerbaijan e-visa is generally valid for 90 days from the date of issue and allows a stay of up to 30 days within that validity period.",
    },
    {
      question: "How many people may I create a family application for?",
      answer:
        "A family e-visa application for Azerbaijan can include a maximum of 10 applicants in a single submission.",
    },
    {
      question: "What should I do if my family members are more than 10 persons?",
      answer:
        "If your family group exceeds 10 members, you must submit multiple e-visa applications, each covering up to 10 travellers.",
    },
    {
      question: "How many people may I create a group application for?",
      answer:
        "A group application for the Azerbaijan e-visa can include up to 10 individuals per application.",
    },
    {
      question:
        "My child is registered in my passport. Do I need to make a separate e-visa application for her or him?",
      answer:
        "Yes, each traveller must have an individual Azerbaijan e-visa, including children listed on a parent's passport.",
    },
    {
      question:
        "Do I have to obtain a visa if I do not leave the international transit area?",
      answer:
        "No, a visa is not required if you remain within the international transit area and do not pass through Azerbaijan immigration control.",
    },
    {
      question: "What does the CVV, CVC, or CVC2 number mean?",
      answer:
        "CVV, CVC, or CVC2 is the card security code printed on your debit or credit card. It is used to verify secure online payments during the e-visa transaction.",
    },
    {
      question:
        "The information on my e-visa does not fully match my travel document. Can I enter Azerbaijan with this e-visa?",
      answer:
        "No, all details on your Azerbaijan e-visa must exactly match your passport. Any discrepancy may result in denial of entry at immigration.",
    },
    {
      question:
        "I realised that some information on my e-visa does not match my travel document and the e-visa is invalid. Can I get a refund?",
      answer:
        "No, e-visa fees are non-refundable if incorrect or inaccurate information was submitted during the application process.",
    },
    {
      question:
        "I realised that some of the information provided in my e-visa application requires correction. What should I do?",
      answer:
        "Corrections cannot be made once the application is submitted. You must apply again with the correct details.",
    },
    {
      question: "Why is there a service fee?",
      answer:
        "The service fee covers application processing, secure payment handling, system maintenance, and customer support services.",
    },
    {
      question:
        "I do not have a credit card or debit card. Is there any other way of e-visa fee payment?",
      answer:
        "Currently, Azerbaijan e-visa fees can only be paid online using a valid credit or debit card.",
    },
    {
      question:
        "If my e-visa application is denied, will my payment be refunded?",
      answer:
        "No, the Azerbaijan e-visa fee is non-refundable even if the application is denied.",
    },
    {
      question:
        "How long should the validity of the passport be in order to apply for an e-visa?",
      answer:
        "Your passport must be valid for at least six months beyond your intended date of entry into Azerbaijan.",
    },
    {
      question: "Should the e-visa be attached in the passport?",
      answer:
        "No, the Azerbaijan e-visa is electronically linked to your passport. However, carrying a printed or digital copy is recommended while travelling.",
    },
    {
      question:
        "Within how many days and in which order should foreigners or stateless persons get registered in their place of stay?",
      answer:
        "Foreigners staying in Azerbaijan for more than 15 days must register their place of residence with the State Migration Service, usually via their hotel or host.",
    },
    {
      question: "What should be done if the e-visa is denied?",
      answer:
        "If the e-visa is denied, you may submit a new application with corrected details or apply through an Azerbaijani embassy or consulate.",
    },
    {
      question:
        "Is it possible to apply for a new e-visa without leaving the territory of the Republic of Azerbaijan?",
      answer:
        "No, travellers must leave Azerbaijan before applying for a new e-visa. Extensions are handled separately by the State Migration Service.",
    },
    {
      question:
        "How will I get information about the status of the e-visa application?",
      answer:
        "You will receive updates via email, and once approved, the e-visa will be sent electronically to your registered email address.",
    },
    {
      question:
        "What should be done if I would like to stay in the Republic of Azerbaijan for a period longer than the e-visa permits?",
      answer:
        "You must apply for a visa extension through the State Migration Service of Azerbaijan before your permitted stay expires.",
    },
    {
      question:
        "Can citizens of all eligible countries apply and obtain a visa upon arrival at the border checkpoint of the Republic of Azerbaijan?",
      answer:
        "No, visa-on-arrival is available only for selected nationalities. Most travellers must apply for an Azerbaijan e-visa in advance.",
    },
  ],

  Armenia: [
    {
      question: "Do Indians need a visa for Armenia?",
      answer:
        "Yes. Indian passport holders generally need a valid visa or e-visa before traveling to Armenia, unless they qualify under a specific exemption.",
    },
    {
      question: "Can Indians get an Armenia visa on arrival?",
      answer:
        "Visa-on-arrival is available only in limited cases. Most Indian travellers should apply for an Armenia e-visa in advance.",
    },
    {
      question: "What does an Armenia e-visa look like?",
      answer:
        "An Armenia e-visa is issued electronically as a digital approval document containing your personal details, visa validity, and entry information.",
    },
    {
      question: "Who is eligible to apply for an Armenia e-visa?",
      answer:
        "Indian citizens with a valid passport, clear travel purpose, and supporting documents can generally apply, subject to Armenia immigration rules.",
    },
    {
      question: "Is Armenia visa-free for Indians holding certain residence permits?",
      answer:
        "In some situations, holders of valid residence permits or visas from selected countries may receive exemptions. Eligibility should be confirmed before travel.",
    },
    {
      question: "How can Indians apply for an Armenia e-visa?",
      answer:
        "Apply online by filling in passport and travel details, uploading required documents, and paying the applicable visa fee.",
    },
    {
      question: "Can I apply for an Armenia e-visa for my family members together?",
      answer:
        "Group or family submissions may be possible depending on the platform, but each traveller must have an individual approved visa linked to their passport.",
    },
    {
      question: "What should I do if there is a mistake on my Armenia e-visa?",
      answer:
        "Do not travel with incorrect visa details. Apply for correction or submit a fresh application so the visa exactly matches your passport.",
    },
    {
      question: "Is there a fee waiver for children or senior citizens applying for an Armenia e-visa?",
      answer:
        "Fee waivers depend on the latest government policy. Unless specifically exempted, standard visa fees usually apply.",
    },
    {
      question: "What is the Armenia visa fee for Indians?",
      answer:
        "The visa fee depends on visa type, stay duration, and processing route. Final payable amount may include government and service charges.",
    },
    {
      question: "What types of Armenia tourist visas are available for Indians?",
      answer:
        "Tourist options generally include short-stay e-visas, typically issued as single-entry or multiple-entry based on eligibility and travel plan.",
    },
    {
      question: "Can Indians extend their stay in Armenia?",
      answer:
        "Extensions may be possible by applying to Armenia migration authorities before the permitted stay expires, subject to approval.",
    },
    {
      question: "What happens if I overstay my Armenia e-visa?",
      answer:
        "Overstaying can lead to fines, legal penalties, and possible future visa restrictions. You should regularize your status immediately with authorities.",
    },
    {
      question: "Can I reapply for an Armenia visa after rejection?",
      answer:
        "Yes. You can reapply after addressing the rejection reason and submitting complete, accurate documents.",
    },
    {
      question: "How can I reduce the chances of Armenia visa rejection?",
      answer:
        "Submit accurate information, valid passport details, complete supporting documents, clear travel plans, and strong financial proof.",
    },
  ],

  Qatar: [
    {
      question: "Do Indians need a visa to travel to Qatar?",
      answer:
        "Yes. Indian passport holders require a valid visa or entry authorization to travel to Qatar. However, eligible Indian travellers may obtain a visa on arrival if they meet specific conditions set by Qatar immigration authorities.",
    },
    {
      question: "Can Indians get a visa on arrival in Qatar?",
      answer:
        "Yes. Indian citizens may be eligible for a visa on arrival in Qatar for up to 30 days, provided they hold a valid passport (minimum 6 months validity), confirmed return ticket, hotel booking through Discover Qatar or confirmed accommodation, and a valid credit/debit card. Conditions are subject to change.",
    },
    {
      question: "What is the validity of a Qatar tourist visa for Indians?",
      answer:
        "A Qatar tourist visa or visa on arrival typically allows a stay of up to 30 days. In some cases, it may be extended for an additional 30 days, subject to approval by the Ministry of Interior.",
    },
    {
      question: "What types of Qatar visas are available for Indians?",
      answer:
        "Common Qatar visa types include Tourist Visa, Business Visa, Transit Visa, Family Visit Visa, and Work Visa. The visa category depends on the purpose and duration of stay.",
    },
    {
      question: "What is the Hayya entry permit for Qatar?",
      answer:
        "The Hayya platform is Qatar's official digital entry system used during major events and for certain visitor categories. Eligible travellers may need to apply through the Hayya portal depending on entry regulations in effect at the time of travel.",
    },
    {
      question: "What are the passport requirements for a Qatar visa?",
      answer:
        "Your passport must be valid for at least six months from the date of arrival in Qatar and must have sufficient blank pages for entry stamps.",
    },
    {
      question: "What documents are required for a Qatar tourist visa?",
      answer:
        "Applicants typically require a valid passport, passport-size photograph, confirmed return flight ticket, proof of accommodation, financial proof, and a valid debit or credit card. Additional documents may be requested depending on the visa category.",
    },
    {
      question: "Is there a minimum bank balance requirement for Qatar visa?",
      answer:
        "While Qatar does not publish a fixed minimum amount, travellers must demonstrate sufficient financial means to support their stay, especially when applying for certain visa categories.",
    },
    {
      question: "Do Indians need a transit visa for Qatar?",
      answer:
        "Indian travellers transiting through Hamad International Airport without exiting the transit area do not require a transit visa. If leaving the airport during transit, a transit or short-term entry visa may be required.",
    },
    {
      question: "Can I extend my stay in Qatar?",
      answer:
        "Yes. Eligible visitors may apply for a visa extension through the Ministry of Interior before their current stay expires. Approval is discretionary.",
    },
    {
      question: "Can I work in Qatar on a tourist visa?",
      answer:
        "No. Working in Qatar on a tourist visa is illegal. Employment requires a valid work visa sponsored by a Qatari employer.",
    },
    {
      question: "Can I apply for a Qatar visa for my family?",
      answer:
        "Yes. Each family member must have a separate visa or entry approval. Family Visit Visas are available for residents sponsoring relatives.",
    },
    {
      question: "How long does it take to process a Qatar visa?",
      answer:
        "Qatar visa processing times vary by category but typically range from 3 to 7 working days once a complete application is submitted.",
    },
    {
      question: "Can I reapply if my Qatar visa is rejected?",
      answer:
        "Yes. Applicants may reapply after addressing the reasons for refusal and ensuring all documentation is accurate and complete.",
    },
    {
      question: "What happens if I overstay my Qatar visa?",
      answer:
        "Overstaying may result in daily fines, exit penalties, and potential travel restrictions. Visitors must leave Qatar before the authorised stay expires.",
    },
    {
      question: "Are Qatar visa fees refundable if rejected?",
      answer:
        "Visa fees are generally non-refundable, even if the application is refused.",
    },
  ],

  Kenya: [
    {
      question: "What is the Kenya Electronic Travel Authorization (eTA)?",
      answer:
        "Kenya eTA is a mandatory online travel authorisation for eligible travellers visiting Kenya. It is linked digitally to your passport and must be approved before travel.",
    },
    {
      question: "Do diplomatic passport holders need to apply for a Kenya eTA?",
      answer:
        "Diplomatic passport exemptions depend on bilateral arrangements. Travellers should verify the latest exemption rules before travel; if no exemption applies, eTA is required.",
    },
    {
      question: "Do diplomats need to pay for the Kenya eTA?",
      answer:
        "If a diplomat is exempt under official policy, payment may not be required. Otherwise, standard applicable eTA fees are charged.",
    },
    {
      question: "If we are travelling as a couple or group, is one Kenya eTA enough?",
      answer:
        "No. Each traveller, including spouses, children, and group members, must have an individual Kenya eTA approval linked to their own passport.",
    },
    {
      question: "How do I apply for the Kenya eTA?",
      answer:
        "Apply online by filling personal and passport details, uploading required documents, and paying the fee. After submission, the application is reviewed and approved electronically.",
    },
    {
      question: "What documents are required for a Kenya eTA application?",
      answer:
        "Typically required: passport bio page, recent photograph, travel itinerary/flight details, accommodation details, and any additional supporting documents requested for your trip type.",
    },
    {
      question: "How long does it take to process a Kenya eTA?",
      answer:
        "Processing commonly takes a few working days, but timelines can vary based on application volume and document verification.",
    },
    {
      question: "How much does the Kenya eTA cost?",
      answer:
        "The cost includes official government charges and may include service fees depending on the application channel used.",
    },
    {
      question: "How can I track my Kenya eTA application status?",
      answer:
        "You can track status using your application reference details on the application portal or through updates sent to your registered email.",
    },
    {
      question: "Can someone apply for a Kenya eTA on behalf of another traveller?",
      answer:
        "Yes. A representative can submit the form, but traveller details and documents must be accurate, and the approved eTA remains tied to the traveller's passport.",
    },
  ],

  Russia: [
    {
      question: "How can I apply for a Russia visa?",
      answer:
        "To apply for a Russia visa, complete the online visa application form, gather the required supporting documents, and submit your application through an authorised visa channel or Russian Embassy/Consulate. After payment and document verification, the application is processed for approval. Once approved, you will receive either a visa sticker in your passport or an electronic visa, depending on your eligibility.",
    },
    {
      question: "Can I get a visa-on-arrival in Russia?",
      answer:
        "No. Russia does not offer visa-on-arrival for Indian passport holders. Travellers must obtain a valid Russia visa before departure.",
    },
    {
      question: "How long can I stay in Russia?",
      answer:
        "The permitted stay in Russia depends on the type of visa issued and the conditions specified on the visa. Tourist visas typically allow short stays, while business, student, or work visas may permit longer durations.",
    },
    {
      question: "What is the validity period of a Russia visa?",
      answer:
        "The validity of a Russia visa varies by visa category. Tourist visas are commonly issued for 30 to 90 days and may allow single or multiple entries depending on approval.",
    },
    {
      question: "Do Schengen visa holders need a Russia visa?",
      answer:
        "Yes. A valid Schengen visa does not grant entry into Russia. Travellers must apply separately for a Russia visa based on the purpose of travel.",
    },
    {
      question: "What are the photo requirements for a Russia visa application?",
      answer:
        "Russia visa photographs must be in colour, taken against a white background, and without glasses. The photo should clearly show the applicant's face with a neutral expression.",
    },
    {
      question: "In what format should Russia visa documents be uploaded?",
      answer:
        "Supporting documents for a Russia visa application must typically be uploaded in PDF or JPG format. Ensure all files are clear and legible.",
    },
    {
      question: "How long does it take to process a Russia visa?",
      answer:
        "Russia visa processing generally takes between 3 to 10 business days after submission of complete documentation. Processing time may vary depending on visa type and consular workload.",
    },
    {
      question: "How will I receive my Russia visa?",
      answer:
        "If issued as a sticker visa, the approved visa will be affixed inside your passport. If eligible for an eVisa, you will receive the approved visa electronically via email.",
    },
    {
      question: "Does every Indian national travelling to Russia need a visa?",
      answer:
        "Yes. Indian passport holders must obtain a valid Russia visa before travelling. The visa type depends on the purpose and duration of the visit.",
    },
    {
      question: "Can I cancel my Russia visa?",
      answer:
        "Yes, a Russia visa can be cancelled depending on the visa category and circumstances. It is advisable to contact the relevant visa authority or authorised service provider for guidance before proceeding.",
    },
    {
      question: "Will I get a refund if I cancel my Russia visa?",
      answer:
        "No. Russia visa fees are non-refundable, even if the visa is cancelled or unused.",
    },
    {
      question: "Will I get a refund if my Russia visa application is rejected?",
      answer:
        "No. Russia visa fees are non-refundable regardless of whether the application is approved or refused.",
    },
    {
      question: "How soon can I reapply if my Russia visa is rejected?",
      answer:
        "There is no mandatory waiting period to reapply after a Russia visa refusal. However, applicants should carefully address the reasons for rejection before submitting a new application.",
    },
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
