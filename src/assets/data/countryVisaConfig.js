// src/assets/data/countryVisaConfig.js

export const COUNTRY_VISA_CONFIG = {
    "Sri-lanka": {
        headerTitle: "Sri Lanka ETA Application",
        processTitle: "Sri Lanka Visa Process",
        processingText: "Apply Now & Get it by 1 Working Days",


        visaInfoTitle: "Sri Lanka Visa Information",
        requirementsTitle: "Sri Lanka Visa Requirements",


        stepMeta: [
            { icon: "document-text-outline", label: "Share ETA info" },
            { icon: "card-outline", label: "Pay ETA fees" },
            { icon: "send-outline", label: "Submit to immigration" },
            { icon: "checkmark-done-outline", label: "Receive ETA" },
        ],
        processSteps: [
            {
                title: "Share ETA information",
                points: [
                    "Provide passport, photo, and itinerary details.",
                    "Our team verifies information for accuracy.",
                    "Confirm and proceed to payment.",
                ],
            },
            {
                title: "Pay ETA fees",
                points: [
                    "Complete payment for government and service charges.",
                    "Receive instant confirmation and ETA reference.",
                    "We validate payment and prepare submission.",
                ],
            },
            {
                title: "Submit to immigration",
                points: [
                    "ETA application submitted electronically.",
                    "Any clarification handled on your behalf.",
                    "Wait for approval decision.",
                ],
            },
            {
                title: "Receive ETA approval",
                points: [
                    "Approval usually within 2–3 days.",
                    "Download and print ETA.",
                    "Carry ETA with passport during travel.",
                ],
            },
        ],

        visaInfo: {
            visaType: "ETA",
            stay: "30 days",
            validity: "90 days",
            entry: "Single",
            method: "Digital",
        },

        requirements: [
            "Passport valid for at least six months",
            "Confirmed return air ticket",
            "Sufficient funds for stay",
        ],
    },
    Vietnam: {
        headerTitle: "Vietnam Visa Application",
        processTitle: "Vietnam Visa Process",
        processingText: "Get Vietnam E-Visa in 5 Working Days",



        visaInfoTitle: "Vietnam Visa Information",
        requirementsTitle: "Vietnam Visa Requirements",


        stepMeta: [
            { icon: "document-text-outline", label: "Start Application" },
            { icon: "send-outline", label: "Submit to Immigration" },
            { icon: "checkmark-done-outline", label: "Get Visa Decision" },
        ],
        processSteps: [
            {
                title: "Start Your Visa Application",
                points: [
                    "Fill in traveler details online and select visa type.",
                    "Upload passport and photo documents securely.",
                    "Review and confirm your information before submission.",
                ],
            },

            {
                title: "Application Submission to Immigration",
                points: [
                    "We submit your application to Vietnam immigration authorities.",
                    "Our team verifies documents and tracks progress.",
                    "You receive proactive status updates.",
                ],
            },
            {
                title: "Get your Visa",
                points: [
                    "Decisions are typically issued within 5 working days.",
                    "Visa delivered via email and WhatsApp.",
                    "Download and print your e-visa before travel.",
                ],
            },
        ],
        visaInfo: {
            visaType: "E-Visa",
            stay: "30 days",
            validity: "3 Months",
            entry: "Single",
            method: "Online",
        },
        requirements: [
            "Valid passport (minimum 6 months validity)",
            "Return Airticket",
        ],
    },
    "Singapore": {
        headerTitle: "Singapore Visa Application",
        processTitle: "Singapore Visa Process",
        processingText: "Apply Now & Get Visa By 3-5 Business Days",
        processingNote:
            "This is a semi-online process; some original documents must be submitted to the authority. We do not claim shortcuts and follow all rules on the client's behalf during submission.",


        visaInfoTitle: "Singapore Visa Information",
        requirementsTitle: "Singapore Visa Requirements",


        stepMeta: [
            { icon: "document-text-outline", label: "Share Traveler Details" },
            { icon: "card-outline", label: "Pay Government Charges" },
            { icon: "send-outline", label: "Submission to ICA" },
            { icon: "checkmark-done-outline", label: "Receive Visa Approval" },
        ],

        processSteps: [
            {
                title: "Share Traveler Details",
                points: [
                    "Provide passport, photo, and personal details.",
                    "Submit travel itinerary and accommodation proof.",
                    "Our team validates your documents for accuracy.",
                ],
            },
            {
                title: "Pay Government Charges",
                points: [
                    "Clear government and service fees online instantly.",
                    "Receive payment confirmation and application reference.",
                    "Documents are reviewed before official submission.",
                ],
            },
            {
                title: "Submission to ICA",
                points: [
                    "Visa application is submitted to Singapore ICA.",
                    "Any additional queries are handled on your behalf.",
                    "Application status is tracked continuously.",
                ],
            },
            {
                title: "Receive Visa Approval",
                points: [
                    "Visa decision is issued after ICA review.",
                    "Approval notification sent by email and WhatsApp.",
                    "Carry visa copy while traveling to Singapore.",
                ],
            },
        ],

        visaInfo: {
            visaType: "e-Visa",
            stay: "30 days",
            validity: "2 Months - 2 Years",
            entry: "Single / Multiple",
            method: "Semi Online",
        },

        requirements: [
            "Hard Copy of Valid Passport(Original)",
            "2 Passport-size(3.5*4.5 cm) photo with white background & matt finish",
            "Signed Visa Application Form(We Provide The Form)",
            "6 Month Bank Statement(Online)",
        ],
    },
    "Hong Kong": {
        headerTitle: "Hong Kong Pre-Arrival Registration for Indian Nationals",
        processTitle: "Hong Kong Visa Process",
        processingText: "Apply Now & Get it in 1 Business Day",


        visaInfoTitle: "Hong Kong Visa Information",
        requirementsTitle: "Hong Kong Visa Requirements",

        stepMeta: [
            { icon: "document-text-outline", label: "Share traveler details" },
            { icon: "card-outline", label: "Pay visa fees" },
            { icon: "send-outline", label: "Submit application" },
            { icon: "checkmark-done-outline", label: "Receive approval" },
        ],

        processSteps: [
            {
                title: "Share traveler details",
                points: [
                    "Provide passport, photograph, and itinerary details securely.",
                    "Our visa experts validate your documents before submission.",
                    "Confirm everything so we can proceed to payment.",
                ],
            },
            {
                title: "Pay visa fees",
                points: [
                    "Pay the Hong Kong immigration and service charges online.",
                    "Receive instant payment confirmation and reference.",
                    "We queue the application with the embassy thereafter.",
                ],
            },
            {
                title: "Submit application",
                points: [
                    "We lodge your application with the Hong Kong Immigration Department.",
                    "Any additional documents requested are coordinated for you.",
                    "Get status updates on email and WhatsApp until approval.",
                ],
            },
            {
                title: "Receive approval",
                points: [
                    "Approval letter reaches your inbox in 4–7 working days.",
                    "Print the approval and carry it along with your passport.",
                    "Use the letter when entering Hong Kong and collecting your visa.",
                ],
            },
        ],

        visaInfo: {
            visaType: "Tourist",
            stay: "15 days",
            validity: "90 days",
            entry: "Single",
            method: "Digital",
        },

        requirements: [
            "Valid passport",
            "Confirmed return air ticket",
        ],
    },
    Indonesia: {
        headerTitle: "Indonesia Visa Application",
        processTitle: "Indonesia Visa Process",
        processingText: "Apply Now & Get Visa By 3-5 Working Days",

        stepMeta: [
            { icon: "document-text-outline", label: "Submit traveler details" },
            { icon: "card-outline", label: "Pay visa fees" },
            { icon: "send-outline", label: "Submit to immigration" },
            { icon: "checkmark-done-outline", label: "Collect approval" },
        ],

        processSteps: [
            {
                title: "Submit traveler details",
                points: [
                    "Share passport, photo, and travel information via our secure form.",
                    "Our team checks each document for compliance.",
                    "We prepare the application and confirm before submission.",
                ],
            },
            {
                title: "Pay visa fees",
                points: [
                    "Pay government and service charges online instantly.",
                    "Receipt and application ID are shared immediately.",
                    "We monitor the payment and ticket the application.",
                ],
            },
            {
                title: "Submit to immigration",
                points: [
                    "We forward your application to Indonesian immigration authorities.",
                    "Any clarifications are coordinated without hassle.",
                    "Track approval status through our updates.",
                ],
            },
            {
                title: "Collect approval",
                points: [
                    "Receive the e-visa approval letter in 3–5 working days.",
                    "Carry a copy along with your passport while traveling.",
                    "Our team stays in touch till you enter Indonesia.",
                ],
            },
        ],

        visaInfo: {
            visaType: "e-Visa / VOA",
            stay: "30 days",
            validity: "90 days",
            entry: "Single / Double",
            method: "Digital",
        },

        requirements: [
            "Digitally signed passport scan with minimum six months validity",
            "Passport-size photograph",
            "Return ticket and flight itinerary",
            "Proof of accommodation or invitation",
            "Bank statements for the last three months",
        ],
    },
    Mauritius: {
        headerTitle: "Mauritius All-in-One Travel Digital Form",
        processTitle: "Mauritius Visa Process",
        processingText: "Apply now & get it in 1 working day",

        visaInfoTitle: "Mauritius Travel Digital Form Information",
        requirementsTitle: "Mauritius Travel Digital Form Requirements",

        stepMeta: [
            { icon: "document-text-outline", label: "Share traveler details" },
            { icon: "card-outline", label: "Pay service fees" },
            { icon: "send-outline", label: "Submit to authorities" },
            { icon: "checkmark-done-outline", label: "Receive approval" },
        ],

        processSteps: [
            {
                title: "Share traveler details",
                points: [
                    "Provide passport details, personal information, and travel itinerary.",
                    "Upload required documents securely through our platform.",
                    "Our team reviews all details for accuracy before submission.",
                ],
            },
            {
                title: "Pay service fees",
                points: [
                    "Pay the service charges securely online.",
                    "Instant payment confirmation is generated.",
                    "Your application is queued for official submission.",
                ],
            },
            {
                title: "Submit to authorities",
                points: [
                    "We submit your Mauritius Travel Digital Form (TDA) to authorities.",
                    "Any additional clarification is handled on your behalf.",
                    "You receive regular status updates until approval.",
                ],
            },
            {
                title: "Receive approval",
                points: [
                    "Download the approved travel document once issued.",
                    "Carry it along with your passport when traveling.",
                    "Contact us anytime for travel or entry assistance.",
                ],
            },
        ],

        visaInfo: {
            visaType: "Tourist ",
            stay: "30 days",
            validity: "90 days",
            entry: "Single",
            method: "Paperless",
        },

        requirements: [
            "Passport valid for not less than 6 months from date of arrival",
            "Confirmed return air ticket",
        ],
    },

    Maldives: {
        headerTitle: "Maldives Traveller Declaration",
        processTitle: "Maldives Visa Process",
        processingText: "Apply Now & Get it in 1 Business Day",

        visaInfoTitle: "Maldives Visa Information",
        requirementsTitle: "Maldives Visa Requirements",

        stepMeta: [
            { icon: "document-text-outline", label: "Share traveler details" },
            { icon: "card-outline", label: "Pay service fees" },
            { icon: "send-outline", label: "Submit to immigration" },
            { icon: "checkmark-done-outline", label: "Receive approval" },
        ],

        processSteps: [
            {
                title: "Share traveler details",
                points: [
                    "Provide passport, photo, and itinerary details securely.",
                    "Share accommodation and return flight information.",
                    "Our team verifies details before moving ahead.",
                ],
            },
            {
                title: "Pay service fees",
                points: [
                    "Clear service charges securely online.",
                    "Instant payment confirmation is generated.",
                    "Your application is prepared for submission.",
                ],
            },
            {
                title: "Submit to immigration",
                points: [
                    "We forward the application to Maldives immigration authorities.",
                    "Any additional clarification is handled on your behalf.",
                    "You receive real-time status updates.",
                ],
            },
            {
                title: "Receive approval",
                points: [
                    "Visa is granted on arrival at Maldives airport.",
                    "Carry your documents along with your passport.",
                    "You are all set to travel to Maldives.",
                ],
            },
        ],

        visaInfo: {
            visaType: "Tourist (Visa on Arrival)",
            stay: "30 days",
            validity: "60 days",
            entry: "Single",
            method: "Paperless",
        },

        requirements: [
            "Valid passport with at least six months validity",
            "Confirmed return air ticket",
            "Confirmed hotel or accommodation details",
        ],
    },

    "North Korea": {
        headerTitle: "North Korea Entry Information",
        processTitle: "North Korea Visa Process",
        processingText: "Entry Status: On Arrival",

        visaInfoTitle: "North Korea Entry Information",
        requirementsTitle: "North Korea Entry Requirements",

        // ✅ Stepper icons & labels
        stepMeta: [
            { icon: "airplane-outline", label: "Arrive in North Korea" },
            { icon: "document-text-outline", label: "Keep passport ready (6 months validity)" },
            { icon: "shield-checkmark-outline", label: "Immigration check" },
            { icon: "stamp-outline", label: "Receive arrival stamp" },
            { icon: "checkmark-done-outline", label: "Entry approved" },
        ],

        // ✅ Stepper content (matches your screenshots)
        processSteps: [
            {
                title: "Arrive in North Korea",
                points: [
                    "Proceed directly to immigration upon arrival.",
                ],
            },
            {
                title: "Keep passport ready (6 months validity)",
                points: [
                    "Carry a passport valid for at least six months.",
                ],
            },
            {
                title: "Immigration check",
                points: [
                    "Present your passport to immigration authorities.",
                ],
            },
            {
                title: "Receive arrival stamp",
                points: [
                    "Immigration provides an entry stamp on arrival.",
                ],
            },

            {
                title: "Entry Approved",
                points: [
                    "You are allowed entry as per immigration approval.",
                ],
            },
        ],

        // ✅ Visa-free info cards
        visaInfo: {
            visaType: "None (Visa-Free)",
            stay: "As permitted by immigration",
            validity: "90 days",
            entry: "Single",
            method: "On Arrival (Stamp)",
        },

        // ✅ Requirements (static)
        requirements: [
            "Valid passport (minimum 6 months validity)",
            "Passport shown at immigration",
            "Compliance with local entry rules",
        ],

        // 🔒 Important flag for your UI logic
        isVisaFree: true,
    },


    "Barbados": {
        headerTitle: "Barbados Entry Information",
        processTitle: "Barbados Visa Process",
        processingText: "Entry Status: On Arrival",

        visaInfoTitle: "Barbados Entry Information",
        requirementsTitle: "Barbados Entry Requirements",

        // ✅ Stepper icons & labels
        stepMeta: [
            { icon: "airplane-outline", label: "Arrive at destination" },
            { icon: "document-text-outline", label: "Present Documents to immigration" },
            { icon: "shield-checkmark-outline", label: "Immigration Verification" },

            { icon: "checkmark-done-outline", label: "Entry Clearance granted" },
        ],

        // ✅ Stepper content (matches your screenshots)
        processSteps: [
            {
                title: "Arrive at destination",
                points: [
                    "Arrive at the port of entry..",
                ],
            },
            {
                title: "Present Documents to immigration",
                points: [
                    "Present passport and travel documents for inspection.",
                ],
            },
            {
                title: "Immigration Verification",
                points: [
                    "Immigration verifies your documents and entry conditions.",
                ],
            },
            {
                title: "Receive arrival stamp",
                points: [
                    "Entry is granted subject to immigration approval.",
                ],
            },

            {
                title: "Entry Approved",
                points: [
                    "You are allowed entry as per immigration approval.",
                ],
            },
        ],

        // ✅ Visa-free info cards
        visaInfo: {
            visaType: "None (Visa-Free)",
            stay: "As permitted by immigration",
            validity: "90 days",
            entry: "Single",
            method: "On Arrival (Stamp)",
        },

        // ✅ Requirements (static)
        requirements: [
            "Valid passport (minimum 6 months validity)",
            "Passport shown at immigration",
            "Compliance with local entry rules",
        ],

        // 🔒 Important flag for your UI logic
        isVisaFree: true,
    },

    "Fiji": {
        headerTitle: "Fiji Entry Information",
        processTitle: "Fiji Visa Process",
        processingText: "Visa-free entry details for Indian passport holders",

        visaInfoTitle: "Fiji Entry Information",
        requirementsTitle: "Fiji Entry Requirements",

        // ✅ Stepper icons & labels
        stepMeta: [
            { icon: "airplane-outline", label: "Arrive at destination" },
            { icon: "document-text-outline", label: "Present Documents to immigration" },
            { icon: "shield-checkmark-outline", label: "Immigration Verification" },
            { icon: "checkmark-done-outline", label: "Entry Clearance granted" },
        ],

        // ✅ Stepper content (matches your screenshots)
        processSteps: [
            {
                title: "Arrive at destination",
                points: [
                    "Arrive at the port of entry..",
                ],
            },
            {
                title: "Present Documents to immigration",
                points: [
                    "Present passport and travel documents for inspection.",
                ],
            },
            {
                title: "Immigration Verification",
                points: [
                    "Immigration verifies your documents and entry conditions.",
                ],
            },
            {
                title: "Receive arrival stamp",
                points: [
                    "Entry is granted subject to immigration approval.",
                ],
            },

            {
                title: "Entry Approved",
                points: [
                    "You are allowed entry as per immigration approval.",
                ],
            },
        ],

        // ✅ Visa-free info cards
        visaInfo: {
            visaType: "Visa-Free",
            stay: "4 Months",
            validity: "As Per Entry",
            entry: "Single",
            method: "Visa Free",
        },

        // ✅ Requirements (static)
        requirements: [
            "Valid passport (minimum 6 months validity)",
            "Passport shown at immigration",
            "Compliance with local entry rules",
        ],

        // 🔒 Important flag for your UI logic
        isVisaFree: true,
    },


    "Nepal": {
        headerTitle: "Nepal Entry Information",
        processTitle: "Nepal Visa Process",
        processingText: "Visa-free entry details for Indian passport holders",

        visaInfoTitle: "Nepal Entry Information",
        requirementsTitle: "Nepal Entry Requirements",

        // ✅ Stepper icons & labels
        stepMeta: [
            { icon: "airplane-outline", label: "Arrive at destination" },
            { icon: "document-text-outline", label: "Present Documents to immigration" },
            { icon: "shield-checkmark-outline", label: "Immigration Verification" },
            { icon: "checkmark-done-outline", label: "Entry Clearance granted" },
        ],

        // ✅ Stepper content (matches your screenshots)
        processSteps: [
            {
                title: "Arrive at destination",
                points: [
                    "Arrive at the port of entry..",
                ],
            },
            {
                title: "Present Documents to immigration",
                points: [
                    "Present passport and travel documents for inspection.",
                ],
            },
            {
                title: "Immigration Verification",
                points: [
                    "Immigration verifies your documents and entry conditions.",
                ],
            },
            {
                title: "Receive arrival stamp",
                points: [
                    "Entry is granted subject to immigration approval.",
                ],
            },

            {
                title: "Entry Approved",
                points: [
                    "You are allowed entry as per immigration approval.",
                ],
            },
        ],

        // ✅ Visa-free info cards
        visaInfo: {
            visaType: "Visa-Free",
            stay: "As permitted",
            validity: "As Per Entry",
            entry: "Single",
            method: "Visa Free",
        },

        // ✅ Requirements (static)
        requirements: [
            "Valid passport (minimum 6 months validity)",
            "Passport shown at immigration",
            "Compliance with local entry rules",
        ],

        // 🔒 Important flag for your UI logic
        isVisaFree: true,
    },

    "British Virgin Islands": {
        headerTitle: "British Virgin Islands Information",
        processTitle: "British Virgin Islands Visa Process",
        processingText: "Entry Status: On Arrival",

        visaInfoTitle: "British Virgin Islands Entry Information",
        requirementsTitle: "British Virgin Islands Entry Requirements",

        // ✅ Stepper icons & labels
        stepMeta: [
            { icon: "airplane-outline", label: "Arrive at destination" },
            { icon: "document-text-outline", label: "Present Documents to immigration" },
            { icon: "shield-checkmark-outline", label: "Immigration Verification" },
            { icon: "checkmark-done-outline", label: "Entry Clearance granted" },
        ],

        // ✅ Stepper content (matches your screenshots)
        processSteps: [
            {
                title: "Arrive at destination",
                points: [
                    "Arrive at the port of entry..",
                ],
            },
            {
                title: "Present Documents to immigration",
                points: [
                    "Present passport and travel documents for inspection.",
                ],
            },
            {
                title: "Immigration Verification",
                points: [
                    "Immigration verifies your documents and entry conditions.",
                ],
            },
            {
                title: "Receive arrival stamp",
                points: [
                    "Entry is granted subject to immigration approval.",
                ],
            },

            {
                title: "Entry Approved",
                points: [
                    "You are allowed entry as per immigration approval.",
                ],
            },
        ],

        // ✅ Visa-free info cards
        visaInfo: {
            visaType: "Visa-Free",
            stay: "As permitted",
            validity: "As Per Entry",
            entry: "Single",
            method: "Visa Free",
        },

        // ✅ Requirements (static)
        requirements: [
            "Valid passport (minimum 6 months validity)",
            "Passport shown at immigration",
            "Compliance with local entry rules",
        ],

        // 🔒 Important flag for your UI logic
        isVisaFree: true,
    },

    "Cook Islands": {
        headerTitle: "Cook Islands Islands Information",
        processTitle: "Cook Islands Islands Visa Process",
        processingText: "Entry Status: On Arrival",

        visaInfoTitle: "Cook Islands Entry Information",
        requirementsTitle: "Cook Islands Entry Requirements",

        // ✅ Stepper icons & labels
        stepMeta: [
            { icon: "airplane-outline", label: "Arrive at destination" },
            { icon: "document-text-outline", label: "Present Documents to immigration" },
            { icon: "shield-checkmark-outline", label: "Immigration Verification" },
            { icon: "checkmark-done-outline", label: "Entry Clearance granted" },
        ],

        // ✅ Stepper content (matches your screenshots)
        processSteps: [
            {
                title: "Arrive at destination",
                points: [
                    "Arrive at the port of entry..",
                ],
            },
            {
                title: "Present Documents to immigration",
                points: [
                    "Present passport and travel documents for inspection.",
                ],
            },
            {
                title: "Immigration Verification",
                points: [
                    "Immigration verifies your documents and entry conditions.",
                ],
            },
            {
                title: "Receive arrival stamp",
                points: [
                    "Entry is granted subject to immigration approval.",
                ],
            },

            {
                title: "Entry Approved",
                points: [
                    "You are allowed entry as per immigration approval.",
                ],
            },
        ],

        // ✅ Visa-free info cards
        visaInfo: {
            visaType: "Visa-Free",
            stay: "31 days",
            validity: "As Per Entry",
            entry: "Single",
            method: "Visa Free",
        },

        // ✅ Requirements (static)
        requirements: [
            "Valid passport (minimum 6 months validity)",
            "Passport shown at immigration",
            "Compliance with local entry rules",
        ],

        // 🔒 Important flag for your UI logic
        isVisaFree: true,
    },

    "Dominica": {
        headerTitle: "Dominica Islands Information",
        processTitle: "Dominica Islands Visa Process",
        processingText: "Entry Status: Before Travel",

        visaInfoTitle: "Dominica Entry Information",
        requirementsTitle: "Dominica Entry Requirements",

        // ✅ Stepper icons & labels
        stepMeta: [
            { icon: "airplane-outline", label: "Arrive at destination" },
            { icon: "document-text-outline", label: "Present Documents to immigration" },
            { icon: "shield-checkmark-outline", label: "Immigration Verification" },
            { icon: "checkmark-done-outline", label: "Entry Clearance granted" },
        ],

        // ✅ Stepper content (matches your screenshots)
        processSteps: [
            {
                title: "Arrive at destination",
                points: [
                    "Arrive at the port of entry..",
                ],
            },
            {
                title: "Present Documents to immigration",
                points: [
                    "Present passport and travel documents for inspection.",
                ],
            },
            {
                title: "Immigration Verification",
                points: [
                    "Immigration verifies your documents and entry conditions.",
                ],
            },
            {
                title: "Receive arrival stamp",
                points: [
                    "Entry is granted subject to immigration approval.",
                ],
            },

            {
                title: "Entry Approved",
                points: [
                    "You are allowed entry as per immigration approval.",
                ],
            },
        ],

        // ✅ Visa-free info cards
        visaInfo: {
            visaType: "Visa Required",
            stay: "As permitted",
            validity: "As Per Entry",
            entry: "Single",
            method: "Visa Required",
        },

        // ✅ Requirements (static)
        requirements: [
            "Valid passport (minimum 6 months validity)",
            "Passport shown at immigration",
            "Compliance with local entry rules",
        ],

        // 🔒 Important flag for your UI logic
        isVisaFree: true,
    },

    "El Salvador": {
        headerTitle: "El Salvador Information",
        processTitle: "El Salvador Visa Process",
        processingText: "Entry Status: Before Travel",

        visaInfoTitle: "El Salvador Entry Information",
        requirementsTitle: "El Salvador Entry Requirements",

        // ✅ Stepper icons & labels
        stepMeta: [
            { icon: "airplane-outline", label: "Arrive at destination" },
            { icon: "document-text-outline", label: "Present Documents to immigration" },
            { icon: "shield-checkmark-outline", label: "Immigration Verification" },
            { icon: "checkmark-done-outline", label: "Entry Clearance granted" },
        ],

        // ✅ Stepper content (matches your screenshots)
        processSteps: [
            {
                title: "Arrive at destination",
                points: [
                    "Arrive at the port of entry..",
                ],
            },
            {
                title: "Present Documents to immigration",
                points: [
                    "Present passport and travel documents for inspection.",
                ],
            },
            {
                title: "Immigration Verification",
                points: [
                    "Immigration verifies your documents and entry conditions.",
                ],
            },
            {
                title: "Receive arrival stamp",
                points: [
                    "Entry is granted subject to immigration approval.",
                ],
            },

            {
                title: "Entry Approved",
                points: [
                    "You are allowed entry as per immigration approval.",
                ],
            },
        ],

        // ✅ Visa-free info cards
        visaInfo: {
            visaType: "Visa Required",
            stay: "As permitted",
            validity: "As Per Entry",
            entry: "Single",
            method: "Visa Required",
        },

        // ✅ Requirements (static)
        requirements: [
            "Valid passport (minimum 6 months validity)",
            "Passport shown at immigration",
            "Compliance with local entry rules",
        ],

        // 🔒 Important flag for your UI logic
        isVisaFree: true,
    },

    "Gambia ": {
        headerTitle: "Gambia  Information",
        processTitle: "Gambia  Visa Process",
        processingText: "Entry Status: On Arrival",

        visaInfoTitle: "Gambia  Entry Information",
        requirementsTitle: "Gambia  Entry Requirements",

        // ✅ Stepper icons & labels
        stepMeta: [
            { icon: "airplane-outline", label: "Arrive at destination" },
            { icon: "document-text-outline", label: "Present Documents to immigration" },
            { icon: "shield-checkmark-outline", label: "Immigration Verification" },
            { icon: "checkmark-done-outline", label: "Entry Clearance granted" },
        ],

        // ✅ Stepper content (matches your screenshots)
        processSteps: [
            {
                title: "Arrive at destination",
                points: [
                    "Arrive at the port of entry..",
                ],
            },
            {
                title: "Present Documents to immigration",
                points: [
                    "Present passport and travel documents for inspection.",
                ],
            },
            {
                title: "Immigration Verification",
                points: [
                    "Immigration verifies your documents and entry conditions.",
                ],
            },
            {
                title: "Receive arrival stamp",
                points: [
                    "Entry is granted subject to immigration approval.",
                ],
            },

            {
                title: "Entry Approved",
                points: [
                    "You are allowed entry as per immigration approval.",
                ],
            },
        ],

        // ✅ Visa-free info cards
        visaInfo: {
            visaType: "Visa-Free",
            stay: "90 days",
            validity: "As Per Entry",
            entry: "Single",
            method: "Visa Free",
        },

        // ✅ Requirements (static)
        requirements: [
            "Valid passport (minimum 6 months validity)",
            "Passport shown at immigration",
            "Compliance with local entry rules",
        ],

        // 🔒 Important flag for your UI logic
        isVisaFree: true,
    },


    "Haiti": {
        headerTitle: "Haiti  Information",
        processTitle: "Haiti  Visa Process",
        processingText: "Entry Status: On Arrival",

        visaInfoTitle: "Haiti Entry Information",
        requirementsTitle: "Haiti  Entry Requirements",

        // ✅ Stepper icons & labels
        stepMeta: [
            { icon: "airplane-outline", label: "Arrive at destination" },
            { icon: "document-text-outline", label: "Present Documents to immigration" },
            { icon: "shield-checkmark-outline", label: "Immigration Verification" },
            { icon: "checkmark-done-outline", label: "Entry Clearance granted" },
        ],

        // ✅ Stepper content (matches your screenshots)
        processSteps: [
            {
                title: "Arrive at destination",
                points: [
                    "Arrive at the port of entry..",
                ],
            },
            {
                title: "Present Documents to immigration",
                points: [
                    "Present passport and travel documents for inspection.",
                ],
            },
            {
                title: "Immigration Verification",
                points: [
                    "Immigration verifies your documents and entry conditions.",
                ],
            },
            {
                title: "Receive arrival stamp",
                points: [
                    "Entry is granted subject to immigration approval.",
                ],
            },

            {
                title: "Entry Approved",
                points: [
                    "You are allowed entry as per immigration approval.",
                ],
            },
        ],

        // ✅ Visa-free info cards
        visaInfo: {
            visaType: "Visa-Free",
            stay: "3 months",
            validity: "As Per Entry",
            entry: "Single",
            method: "Visa Free",
        },

        // ✅ Requirements (static)
        requirements: [
            "Valid passport (minimum 6 months validity)",
            "Passport shown at immigration",
            "Compliance with local entry rules",
        ],

        // 🔒 Important flag for your UI logic
        isVisaFree: true,
    },


    "Jamaica  ": {
        headerTitle: "Jamaica   Information",
        processTitle: "Jamaica   Visa Process",
        processingText: "Visa-free entry details for Indian passport holders",

        visaInfoTitle: "Jamaica   Entry Information",
        requirementsTitle: "Jamaica   Entry Requirements",

        // ✅ Stepper icons & labels
        stepMeta: [
            { icon: "airplane-outline", label: "Arrive at destination" },
            { icon: "document-text-outline", label: "Present Documents to immigration" },
            { icon: "shield-checkmark-outline", label: "Immigration Verification" },
            { icon: "checkmark-done-outline", label: "Entry Clearance granted" },
        ],

        // ✅ Stepper content (matches your screenshots)
        processSteps: [
            {
                title: "Arrive at destination",
                points: [
                    "Arrive at the port of entry..",
                ],
            },
            {
                title: "Present Documents to immigration",
                points: [
                    "Present passport and travel documents for inspection.",
                ],
            },
            {
                title: "Immigration Verification",
                points: [
                    "Immigration verifies your documents and entry conditions.",
                ],
            },
            {
                title: "Receive arrival stamp",
                points: [
                    "Entry is granted subject to immigration approval.",
                ],
            },

            {
                title: "Entry Approved",
                points: [
                    "You are allowed entry as per immigration approval.",
                ],
            },
        ],

        // ✅ Visa-free info cards
        visaInfo: {
            visaType: "Visa-Free",
            stay: "As permitted",
            validity: "As Per Entry",
            entry: "Single",
            method: "Visa Free",
        },

        // ✅ Requirements (static)
        requirements: [
            "Valid passport (minimum 6 months validity)",
            "Passport shown at immigration",
            "Compliance with local entry rules",
        ],

        // 🔒 Important flag for your UI logic
        isVisaFree: true,
    },


    "Micronesia": {
        headerTitle: "Micronesia  Information",
        processTitle: "Micronesia  Visa Process",
        processingText: "Visa-free entry details for Indian passport holders",

        visaInfoTitle: "Micronesia  Entry Information",
        requirementsTitle: "Micronesia  Entry Requirements",

        // ✅ Stepper icons & labels
        stepMeta: [
            { icon: "airplane-outline", label: "Arrive at destination" },
            { icon: "document-text-outline", label: "Present Documents to immigration" },
            { icon: "shield-checkmark-outline", label: "Immigration Verification" },
            { icon: "checkmark-done-outline", label: "Entry Clearance granted" },
        ],

        // ✅ Stepper content (matches your screenshots)
        processSteps: [
            {
                title: "Arrive at destination",
                points: [
                    "Arrive at the port of entry..",
                ],
            },
            {
                title: "Present Documents to immigration",
                points: [
                    "Present passport and travel documents for inspection.",
                ],
            },
            {
                title: "Immigration Verification",
                points: [
                    "Immigration verifies your documents and entry conditions.",
                ],
            },
            {
                title: "Receive arrival stamp",
                points: [
                    "Entry is granted subject to immigration approval.",
                ],
            },

            {
                title: "Entry Approved",
                points: [
                    "You are allowed entry as per immigration approval.",
                ],
            },
        ],

        // ✅ Visa-free info cards
        visaInfo: {
            visaType: "Visa-Free",
            stay: "30 Days",
            validity: "As Per Entry",
            entry: "Single",
            method: "Visa Free",
        },

        // ✅ Requirements (static)
        requirements: [
            "Valid passport (minimum 6 months validity)",
            "Passport shown at immigration",
            "Compliance with local entry rules",
        ],

        // 🔒 Important flag for your UI logic
        isVisaFree: true,
    },


    "Monstserrat": {
        headerTitle: "Monstserrat  Information",
        processTitle: "Monstserrat Visa Process",
        processingText: "Entry Status: On Arrival",

        visaInfoTitle: "Monstserrat  Entry Information",
        requirementsTitle: "Monstserrat  Entry Requirements",

        // ✅ Stepper icons & labels
        stepMeta: [
            { icon: "airplane-outline", label: "Arrive at destination" },
            { icon: "document-text-outline", label: "Present Documents to immigration" },
            { icon: "shield-checkmark-outline", label: "Immigration Verification" },
            { icon: "checkmark-done-outline", label: "Entry Clearance granted" },
        ],

        // ✅ Stepper content (matches your screenshots)
        processSteps: [
            {
                title: "Arrive at destination",
                points: [
                    "Arrive at the port of entry..",
                ],
            },
            {
                title: "Present Documents to immigration",
                points: [
                    "Present passport and travel documents for inspection.",
                ],
            },
            {
                title: "Immigration Verification",
                points: [
                    "Immigration verifies your documents and entry conditions.",
                ],
            },
            {
                title: "Receive arrival stamp",
                points: [
                    "Entry is granted subject to immigration approval.",
                ],
            },

            {
                title: "Entry Approved",
                points: [
                    "You are allowed entry as per immigration approval.",
                ],
            },
        ],

        // ✅ Visa-free info cards
        visaInfo: {
            visaType: "Visa-Free",
            stay: "6 months",
            validity: "As Per Entry",
            entry: "Single",
            method: "Visa Free",
        },

        // ✅ Requirements (static)
        requirements: [
            "Valid passport (minimum 6 months validity)",
            "Passport shown at immigration",
            "Compliance with local entry rules",
        ],

        // 🔒 Important flag for your UI logic
        isVisaFree: true,
    },


    "Niue ": {
        headerTitle: "Niue  Information",
        processTitle: "Niue  Visa Process",
        processingText: "Apply Now & Get Visa By 5-7 Days",

        visaInfoTitle: "Niue  Entry Information",
        requirementsTitle: "Niue  Entry Requirements",

        // ✅ Stepper icons & labels
        stepMeta: [
            { icon: "airplane-outline", label: "Arrive at destination" },
            { icon: "document-text-outline", label: "Present Documents to immigration" },
            { icon: "shield-checkmark-outline", label: "Immigration Verification" },
            { icon: "checkmark-done-outline", label: "Entry Clearance granted" },
        ],

        // ✅ Stepper content (matches your screenshots)
        processSteps: [
            {
                title: "Arrive at destination",
                points: [
                    "Arrive at the port of entry..",
                ],
            },
            {
                title: "Present Documents to immigration",
                points: [
                    "Present passport and travel documents for inspection.",
                ],
            },
            {
                title: "Immigration Verification",
                points: [
                    "Immigration verifies your documents and entry conditions.",
                ],
            },
            {
                title: "Receive arrival stamp",
                points: [
                    "Entry is granted subject to immigration approval.",
                ],
            },

            {
                title: "Entry Approved",
                points: [
                    "You are allowed entry as per immigration approval.",
                ],
            },
        ],

        // ✅ Visa-free info cards
        visaInfo: {
            visaType: "Visa-Free",
            stay: "30 days",
            validity: "90 days",
            entry: "Single / Multiple",
            method: "Paperless",
        },

        // ✅ Requirements (static)
        requirements: [
            "Valid passport (minimum 6 months validity)",
            "Passport shown at immigration",
            "Compliance with local entry rules",
        ],

        // 🔒 Important flag for your UI logic
        isVisaFree: true,
    },


    "Reunion": {
        headerTitle: "Reunion  Information",
        processTitle: "Reunion  Visa Process",
        processingText: "Entry Status: Before Travel",

        visaInfoTitle: "Reunion  Entry Information",
        requirementsTitle: "Reunion  Entry Requirements",

        // ✅ Stepper icons & labels
        stepMeta: [
            { icon: "airplane-outline", label: "Arrive at destination" },
            { icon: "document-text-outline", label: "Present Documents to immigration" },
            { icon: "shield-checkmark-outline", label: "Immigration Verification" },
            { icon: "checkmark-done-outline", label: "Entry Clearance granted" },
        ],

        // ✅ Stepper content (matches your screenshots)
        processSteps: [
            {
                title: "Arrive at destination",
                points: [
                    "Arrive at the port of entry..",
                ],
            },
            {
                title: "Present Documents to immigration",
                points: [
                    "Present passport and travel documents for inspection.",
                ],
            },
            {
                title: "Immigration Verification",
                points: [
                    "Immigration verifies your documents and entry conditions.",
                ],
            },
            {
                title: "Receive arrival stamp",
                points: [
                    "Entry is granted subject to immigration approval.",
                ],
            },

            {
                title: "Entry Approved",
                points: [
                    "You are allowed entry as per immigration approval.",
                ],
            },
        ],

        // ✅ Visa-free info cards
        visaInfo: {
            visaType: "Entry Permit",
            stay: "15 days (organized tours)",
            validity: "As Per Entry",
            entry: "Single",
            method: "Organized trips",
        },

        // ✅ Requirements (static)
        requirements: [
            "Valid passport (minimum 6 months validity)",
            "Passport shown at immigration",
            "Compliance with local entry rules",
        ],

        // 🔒 Important flag for your UI logic
        isVisaFree: true,
    },


    "Senegal ": {
        headerTitle: "Senegal Information",
        processTitle: "Senegal  Visa Process",
        processingText: "Entry Status: On Arrival",

        visaInfoTitle: "Senegal Entry Information",
        requirementsTitle: "Senegal  Entry Requirements",

        // ✅ Stepper icons & labels
        stepMeta: [
            { icon: "airplane-outline", label: "Arrive at destination" },
            { icon: "document-text-outline", label: "Present Documents to immigration" },
            { icon: "shield-checkmark-outline", label: "Immigration Verification" },
            { icon: "checkmark-done-outline", label: "Entry Clearance granted" },
        ],

        // ✅ Stepper content (matches your screenshots)
        processSteps: [
            {
                title: "Arrive at destination",
                points: [
                    "Arrive at the port of entry..",
                ],
            },
            {
                title: "Present Documents to immigration",
                points: [
                    "Present passport and travel documents for inspection.",
                ],
            },
            {
                title: "Immigration Verification",
                points: [
                    "Immigration verifies your documents and entry conditions.",
                ],
            },
            {
                title: "Receive arrival stamp",
                points: [
                    "Entry is granted subject to immigration approval.",
                ],
            },

            {
                title: "Entry Approved",
                points: [
                    "You are allowed entry as per immigration approval.",
                ],
            },
        ],

        // ✅ Visa-free info cards
        visaInfo: {
            visaType: "Visa-Free",
            stay: "90 days",
            validity: "As Per Entry",
            entry: "Single",
            method: "Visa Free",
        },

        // ✅ Requirements (static)
        requirements: [
            "Valid passport (minimum 6 months validity)",
            "Passport shown at immigration",
            "Compliance with local entry rules",
        ],

        // 🔒 Important flag for your UI logic
        isVisaFree: true,
    },


    "St. Kitts & Nevis ": {
        headerTitle: "St. Kitts & Nevis  Information",
        processTitle: "St. Kitts & Nevis  Visa Process",
        processingText: "Entry Status: Before Travel",

        visaInfoTitle: "St. Kitts & Nevis  Entry Information",
        requirementsTitle: "St. Kitts & Nevis  Entry Requirements",

        // ✅ Stepper icons & labels
        stepMeta: [
            { icon: "airplane-outline", label: "Arrive at destination" },
            { icon: "document-text-outline", label: "Present Documents to immigration" },
            { icon: "shield-checkmark-outline", label: "Immigration Verification" },
            { icon: "checkmark-done-outline", label: "Entry Clearance granted" },
        ],

        // ✅ Stepper content (matches your screenshots)
        processSteps: [
            {
                title: "Arrive at destination",
                points: [
                    "Arrive at the port of entry..",
                ],
            },
            {
                title: "Present Documents to immigration",
                points: [
                    "Present passport and travel documents for inspection.",
                ],
            },
            {
                title: "Immigration Verification",
                points: [
                    "Immigration verifies your documents and entry conditions.",
                ],
            },
            {
                title: "Receive arrival stamp",
                points: [
                    "Entry is granted subject to immigration approval.",
                ],
            },

            {
                title: "Entry Approved",
                points: [
                    "You are allowed entry as per immigration approval.",
                ],
            },
        ],

        // ✅ Visa-free info cards
        visaInfo: {
            visaType: "Entry Permit",
            stay: "3 months",
            validity: "As Per Entry",
            entry: "Single",
            method: "eTA",
        },

        // ✅ Requirements (static)
        requirements: [
            "Valid passport (minimum 6 months validity)",
            "Passport shown at immigration",
            "Compliance with local entry rules",
        ],

        // 🔒 Important flag for your UI logic
        isVisaFree: true,
    },


    "St. Vincent & the Grenadines ": {
        headerTitle: "St. Vincent & the Grenadines  Information",
        processTitle: "St. Vincent & the Grenadines Visa Process",
        processingText: "Entry Status: On Arrival",

        visaInfoTitle: "St. Vincent & the Grenadines  Entry Information",
        requirementsTitle: "St. Vincent & the Grenadines  Entry Requirements",

        // ✅ Stepper icons & labels
        stepMeta: [
            { icon: "airplane-outline", label: "Arrive at destination" },
            { icon: "document-text-outline", label: "Present Documents to immigration" },
            { icon: "shield-checkmark-outline", label: "Immigration Verification" },
            { icon: "checkmark-done-outline", label: "Entry Clearance granted" },
        ],

        // ✅ Stepper content (matches your screenshots)
        processSteps: [
            {
                title: "Arrive at destination",
                points: [
                    "Arrive at the port of entry..",
                ],
            },
            {
                title: "Present Documents to immigration",
                points: [
                    "Present passport and travel documents for inspection.",
                ],
            },
            {
                title: "Immigration Verification",
                points: [
                    "Immigration verifies your documents and entry conditions.",
                ],
            },
            {
                title: "Receive arrival stamp",
                points: [
                    "Entry is granted subject to immigration approval.",
                ],
            },

            {
                title: "Entry Approved",
                points: [
                    "You are allowed entry as per immigration approval.",
                ],
            },
        ],

        // ✅ Visa-free info cards
        visaInfo: {
            visaType: "Visa-Free",
            stay: "3 Months",
            validity: "As Per Entry",
            entry: "Single",
            method: "Visa Free",
        },

        // ✅ Requirements (static)
        requirements: [
            "Valid passport (minimum 6 months validity)",
            "Passport shown at immigration",
            "Compliance with local entry rules",
        ],

        // 🔒 Important flag for your UI logic
        isVisaFree: true,
    },


    "Trinidad & Tobago ": {
        headerTitle: "Trinidad & Tobago  Information",
        processTitle: "Trinidad & Tobago  Visa Process",
        processingText: "Entry Status: On Arrival",

        visaInfoTitle: "Trinidad & Tobago  Entry Information",
        requirementsTitle: "Trinidad & Tobago  Entry Requirements",

        // ✅ Stepper icons & labels
        stepMeta: [
            { icon: "airplane-outline", label: "Arrive at destination" },
            { icon: "document-text-outline", label: "Present Documents to immigration" },
            { icon: "shield-checkmark-outline", label: "Immigration Verification" },
            { icon: "checkmark-done-outline", label: "Entry Clearance granted" },
        ],

        // ✅ Stepper content (matches your screenshots)
        processSteps: [
            {
                title: "Arrive at destination",
                points: [
                    "Arrive at the port of entry..",
                ],
            },
            {
                title: "Present Documents to immigration",
                points: [
                    "Present passport and travel documents for inspection.",
                ],
            },
            {
                title: "Immigration Verification",
                points: [
                    "Immigration verifies your documents and entry conditions.",
                ],
            },
            {
                title: "Receive arrival stamp",
                points: [
                    "Entry is granted subject to immigration approval.",
                ],
            },

            {
                title: "Entry Approved",
                points: [
                    "You are allowed entry as per immigration approval.",
                ],
            },
        ],

        // ✅ Visa-free info cards
        visaInfo: {
            visaType: "Visa-Free",
            stay: "90 days",
            validity: "As Per Entry",
            entry: "Single",
            method: "Visa Free",
        },

        // ✅ Requirements (static)
        requirements: [
            "Valid passport (minimum 6 months validity)",
            "Passport shown at immigration",
            "Compliance with local entry rules",
        ],

        // 🔒 Important flag for your UI logic
        isVisaFree: true,
    },

    Malaysia: {
        headerTitle: "Malaysia Visa Application",
        processTitle: "Malaysia Visa Process",
        processingText: "Apply now & get it in 1 working day",

        visaInfoTitle: "Malaysia Travel Digital Form Information",
        requirementsTitle: "Malaysia Travel Digital Form Requirements",

        stepMeta: [
            { icon: "document-text-outline", label: "Share traveler details" },
            { icon: "card-outline", label: "Pay service fees" },
            { icon: "send-outline", label: "Submit to authorities" },
            { icon: "checkmark-done-outline", label: "Receive approval" },
        ],

        processSteps: [
            {
                title: "Share traveler details",
                points: [
                    "Provide passport, photo, and itinerary details securely.",
                    "Our team reviews the documents before submission.",
                    "Confirm everything so we can proceed to payment.",
                ],
            },
            {
                title: "Pay service fees",
                points: [
                    "Clear government and service charges securely.",
                    "Any additional questions are handled on your behalf.",
                    "We monitor the payment and ticket the application.",
                ],
            },
            {
                title: "Submit to authorities",
                points: [
                    "We forward the application to the immigration authority.",
                    "Any additional questions are handled on your behalf.",
                    "Receive status updates until the decision is out.",
                ],
            },
            {
                title: "Receive approval",
                points: [
                    "Download the approval letter once issued.",
                    "Carry it alongside your passport when you travel.",
                    "Reach out if you need any travel clarifications.",
                ],
            },
        ],

        visaInfo: {
            visaType: "Tourist & Business ",
            stay: "14 days",
            validity: "30 days",
            entry: "Single",
            method: "Paperless",
        },

        requirements: [
            "Passport with minimum six months validity",
            "Confirmed flight & return ticket",
            "Hotel booking details",
            "Arrival medium details: Bus | Cruise | Air",
        ],
    },

    Thailand: {
        headerTitle: "Thailand Visa Application",
        processTitle: "Thailand Visa Process",
        processingText: "Apply now & get it in 1 working day",

        visaInfoTitle: "Thailand Travel Digital Form Information",
        requirementsTitle: "Thailand Travel Digital Form Requirements",

        stepMeta: [
            { icon: "document-text-outline", label: "Share traveler details" },
            { icon: "card-outline", label: "Pay service fees" },
            { icon: "send-outline", label: "Submit to authorities" },
            { icon: "checkmark-done-outline", label: "Receive approval" },
        ],

        processSteps: [
            {
                title: "Share traveler details",
                points: [
                    "Provide passport, photo, and itinerary details securely.",
                    "Our team reviews the documents before submission.",
                    "Confirm everything so we can proceed to payment.",
                ],
            },
            {
                title: "Pay service fees",
                points: [
                    "Clear government and service charges securely.",
                    "Any additional questions are handled on your behalf.",
                    "We monitor the payment and ticket the application.",
                ],
            },
            {
                title: "Submit to authorities",
                points: [
                    "We forward the application to the immigration authority.",
                    "Any additional questions are handled on your behalf.",
                    "Receive status updates until the decision is out.",
                ],
            },
            {
                title: "Receive approval",
                points: [
                    "Download the approval letter once issued.",
                    "Carry it alongside your passport when you travel.",
                    "Reach out if you need any travel clarifications.",
                ],
            },
        ],

        visaInfo: {
            visaType: "Tourist & Business ",
            stay: "30 days",
            validity: "90 days",
            entry: "Single / Multiple",
            method: "Paperless",
        },

        requirements: [
            "Valid passport with at least six months validity",
            "Confirmed flights and return itinerary",
            "Recent passport-size photograph with a white background.",
            "Hotel bookings or host contact details.",
            "Bank statement or proof of funds"
        ],
    },

    Azerbaijan: {
        headerTitle: "Azerbaijan Visa Application",
        processTitle: "Azerbaijan Visa Process",
        processingText: "Apply now & get 3-5 Business Days",

        visaInfoTitle: "Azerbaijan Visa Information",
        requirementsTitle: "Azerbaijan Visa Requirements",

        stepMeta: [
            { icon: "document-text-outline", label: "Start Application" },
            { icon: "card-outline", label: "Submit to immigration" },
            { icon: "checkmark-done-outline", label: "Get your Visa" },
        ],

        processSteps: [
            {
                title: "Start Online Visa Application",
                points: [
                    "Fill in traveler details online and select visa type.",
                    "Upload passport and photo documents securely.",
                    "Review and confirm your information before submission.",
                ],
            },
            {
                title: "Application Submission",
                points: [
                    "Clear government and service charges securely.",
                    "Any additional questions are handled on your behalf.",
                    "We monitor the payment and ticket the application.",
                ],
            },
            {
                title: "Get Your Visa",
                points: [
                    "Decisions are typically issued within 5 working days.",
                    "Visa delivered via email and WhatsApp.",
                    "Download and print your e-visa before travel.",
                ],
            },
        ],

        visaInfo: {
            visaType: "e-Visa",
            stay: "30 days",
            validity: "3 Months",
            entry: "Single",
            method: "Online",
        },

        requirements: [
            "Passport",
        ],
    },

    Combodia: {
        headerTitle: "Combodia Visa Application",
        processTitle: "Combodia Visa Process",
        processingText: "Apply now & get visa 1-3 Days",

        visaInfoTitle: "Combodia Visa Information",
        requirementsTitle: "Combodia Visa Requirements",

        stepMeta: [
            { icon: "document-text-outline", label: "Start Application" },
            { icon: "card-outline", label: "Application Submission" },
            { icon: "checkmark-done-outline", label: "Get your Visa" },
        ],

        processSteps: [
            {
                title: "Start Online Visa Application",
                points: [
                    "Fill in traveler details online and select visa type.",
                    "Upload passport and photo documents securely.",
                    "Review and confirm your information before submission.",
                ],
            },
            {
                title: "Application Submit to immigration",
                points: [
                    "Clear government and service charges securely.",
                    "Any additional questions are handled on your behalf.",
                    "We monitor the payment and ticket the application.",
                ],
            },
            {
                title: "Get Your Visa",
                points: [
                    "Decisions are typically issued within 5 working days.",
                    "Visa delivered via email and WhatsApp.",
                    "Download and print your e-visa before travel.",
                ],
            },
        ],

        visaInfo: {
            visaType: "e-Visa",
            stay: "30 days",
            validity: "3 Months",
            entry: "Single",
            method: "Online",
        },

        requirements: [
            "Valid Passport with minimum 6 months validity",
            "Bank statement",
            "Confirmed return Air Ticket",
            "Passport-size photo with white background",
            "Hotel Booking confirmation",
        ],
    },

    Kenya: {
        headerTitle: "Kenya Visa Application",
        processTitle: "Kenya Visa Process",
        processingText: "Apply now & get visa 1-3 Days",
        processingNote:
            "Indians citizen travelling to kenys must obtain as Electronic Travel authorization (ETA) prior to departure; visa on arriral is not available Applications are submitted online visa the online.",

        visaInfoTitle: "Kenya Visa Information",
        requirementsTitle: "Kenya Visa Requirements",

        stepMeta: [
            { icon: "document-text-outline", label: "Start Application" },
            { icon: "card-outline", label: "Application Submission" },
            { icon: "checkmark-done-outline", label: "Get your Visa" },
        ],

        processSteps: [
            {
                title: "Start Online Visa Application",
                points: [
                    "Fill in traveler details online and select visa type.",
                    "Upload passport and photo documents securely.",
                    "Review and confirm your information before submission.",
                ],
            },
            {
                title: "Application Submit to immigration",
                points: [
                    "Clear government and service charges securely.",
                    "Any additional questions are handled on your behalf.",
                    "We monitor the payment and ticket the application.",
                ],
            },
            {
                title: "Get Your Visa",
                points: [
                    "Decisions are typically issued within 5 working days.",
                    "Visa delivered via email and WhatsApp.",
                    "Download and print your e-visa before travel.",
                ],
            },
        ],

        visaInfo: {
            visaType: "e-Visa",
            stay: "30 days",
            validity: "90 days",
            entry: "Single",
            method: "Online",
        },

        requirements: [
            "Valid Passport",
            "Photo ( White background 80% face & colour clothes",
            "Confirm Hotel Voucher",
            "Confirm Air Ticket",
            "Invitation letter - if Business Purposetravel",
        ],
    },

    Qatar: {
        headerTitle: " Qatar Visa Application",
        processTitle: " Qatar Visa Process",
        processingText: "Apply now & get visa in 6-7 Days",


        visaInfoTitle: " Qatar Visa Information",
        requirementsTitle: " Qatar Visa Requirements",

        stepMeta: [
            { icon: "document-text-outline", label: "Start Application" },
            { icon: "card-outline", label: "Application Submission" },
            { icon: "checkmark-done-outline", label: "Get your Visa" },
        ],

        processSteps: [
            {
                title: "Start Online Visa Application",
                points: [
                    "Fill in traveler details online and select visa type.",
                    "Upload passport and photo documents securely.",
                    "Review and confirm your information before submission.",
                ],
            },
            {
                title: "Application Submit to immigration",
                points: [
                    "Clear government and service charges securely.",
                    "Any additional questions are handled on your behalf.",
                    "We monitor the payment and ticket the application.",
                ],
            },
            {
                title: "Get Your Visa",
                points: [
                    "Decisions are typically issued within 5 working days.",
                    "Visa delivered via email and WhatsApp.",
                    "Download and print your e-visa before travel.",
                ],
            },
        ],

        visaInfo: {
            visaType: "e-Visa",
            stay: "30 days",
            validity: "90 days",
            entry: "Single",
            method: "Online",
        },

        requirements: [
            "Valid passport with at least six months validity",
            "Recent passport-size photograph with a white background",
            "Confirmed flights and return itinerary",
            "Hotel bookings or host contact details",
            "Bank statement or proof of funds"
        ],
    },

    Russia: {
        headerTitle: "Russia Visa Application",
        processTitle: "Russia Visa Process",
        processingText: "Apply now & get visa in 6-7 Days",
     
        visaInfoTitle: "Russia Visa Information",
        requirementsTitle: "Russia Visa Requirements",

        stepMeta: [
            { icon: "document-text-outline", label: "Start Application" },
            { icon: "card-outline", label: "Application Submission" },
            { icon: "checkmark-done-outline", label: "Get your Visa" },
        ],

        processSteps: [
            {
                title: "Start Online Visa Application",
                points: [
                    "Fill in traveler details online and select visa type.",
                    "Upload passport and photo documents securely.",
                    "Review and confirm your information before submission.",
                ],
            },
            {
                title: "Application Submit to immigration",
                points: [
                    "Clear government and service charges securely.",
                    "Any additional questions are handled on your behalf.",
                    "We monitor the payment and ticket the application.",
                ],
            },
            {
                title: "Get Your Visa",
                points: [
                    "Decisions are typically issued within 5 working days.",
                    "Visa delivered via email and WhatsApp.",
                    "Download and print your e-visa before travel.",
                ],
            },
        ],

        visaInfo: {
            visaType: "e-Visa",
            stay: "30 days",
            validity: "90 days",
            entry: "Single",
            method: "Online",
        },

        requirements: [
            "Valid Passport",
            "Photo with 80% face coverage",
            "Travel Insurance",
            "Confirmed flights and return itinerary",
        ],
    },

    Morocco: {
        headerTitle: "Morocco Visa Application",
        processTitle: "Morocco Visa Process",
        processingText: "Apply now & get visa in 4-5 Days",


        visaInfoTitle: "Morocco Visa Information",
        requirementsTitle: "Morocco Visa Requirements",

        stepMeta: [
            { icon: "document-text-outline", label: "Start Application" },
            { icon: "card-outline", label: "Application Submission" },
            { icon: "checkmark-done-outline", label: "Get your Visa" },
        ],

        processSteps: [
            {
                title: "Start Online Visa Application",
                points: [
                    "Fill in traveler details online and select visa type.",
                    "Upload passport and photo documents securely.",
                    "Review and confirm your information before submission.",
                ],
            },
            {
                title: "Application Submit to immigration",
                points: [
                    "Clear government and service charges securely.",
                    "Any additional questions are handled on your behalf.",
                    "We monitor the payment and ticket the application.",
                ],
            },
            {
                title: "Get Your Visa",
                points: [
                    "Decisions are typically issued within 5 working days.",
                    "Visa delivered via email and WhatsApp.",
                    "Download and print your e-visa before travel.",
                ],
            },
        ],

        visaInfo: {
            visaType: "e-Visa",
            stay: "30 days",
            validity: "180 days",
            entry: "Single",
            method: "Online",
        },

        requirements: [
            "Valid Passport",
            "Digital Photo",
        ],
    },

    Armenia: {
        headerTitle: "Armenia Visa Application",
        processTitle: "Armenia Visa Process",
        processingText: "Apply now & get visa in 4-5 Days",


        visaInfoTitle: "Armenia Visa Information",
        requirementsTitle: "Armenia Visa Requirements",

        stepMeta: [
            { icon: "document-text-outline", label: "Start Application" },
            { icon: "card-outline", label: "Application Submission" },
            { icon: "checkmark-done-outline", label: "Get your Visa" },
        ],

        processSteps: [
            {
                title: "Start Online Visa Application",
                points: [
                    "Fill in traveler details online and select visa type.",
                    "Upload passport and photo documents securely.",
                    "Review and confirm your information before submission.",
                ],
            },
            {
                title: "Application Submit to immigration",
                points: [
                    "Clear government and service charges securely.",
                    "Any additional questions are handled on your behalf.",
                    "We monitor the payment and ticket the application.",
                ],
            },
            {
                title: "Get Your Visa",
                points: [
                    "Decisions are typically issued within 5 working days.",
                    "Visa delivered via email and WhatsApp.",
                    "Download and print your e-visa before travel.",
                ],
            },
        ],

        visaInfo: {
            visaType: "e-Visa",
            stay: "30 days",
            validity: "90 days",
            entry: "Single",
            method: "Online",
        },

        requirements: [
            "Valid passport with at least six months validity",
            "Confirmed flights and return itinerary",
            "Recent passport-size photograph with a white background",
            "Bank statement or proof of funds",
            "Hotel bookings or host contact details",
            
        ],
    },

    Egypt: {
        headerTitle: "Egypt Visa Application",
        processTitle: "Egypt Visa Process",
        processingText: "Apply now & get visa in 4-5 Days",


        visaInfoTitle: "Egypt Visa Information",
        requirementsTitle: "Egypt Visa Requirements",

        stepMeta: [
            { icon: "document-text-outline", label: "Start Application" },
            { icon: "card-outline", label: "Application Submission" },
            { icon: "checkmark-done-outline", label: "Get your Visa" },
        ],

        processSteps: [
            {
                title: "Start Online Visa Application",
                points: [
                    "Fill in traveler details online and select visa type.",
                    "Upload passport and photo documents securely.",
                    "Review and confirm your information before submission.",
                ],
            },
            {
                title: "Application Submit to immigration",
                points: [
                    "Clear government and service charges securely.",
                    "Any additional questions are handled on your behalf.",
                    "We monitor the payment and ticket the application.",
                ],
            },
            {
                title: "Get Your Visa",
                points: [
                    "Decisions are typically issued within 5 working days.",
                    "Visa delivered via email and WhatsApp.",
                    "Download and print your e-visa before travel.",
                ],
            },
        ],

        visaInfo: {
            visaType: "e-Visa",
            stay: "30 days",
            validity: "90 days",
            entry: "Single",
            method: "Online",
        },

        requirements: [
            "Valid passport",
            "Photo",
            "Confirmed air ticket",
            "Confirmed hotel voucher",
            "Airport pickup and drop confirmation"
        ],
    }
};
