export const COUNTRY_APPLY_CONFIG = {

  Vietnam: {
    fields: {
      travelDate: { required: true },
      phone: { required: true },
      email: { required: true },
      hotelDetails: { required: true },
    },
    documents: {
      passportFront: {
        label: "Upload Passport Front Page",
        required: true,
        example: require("../assets/examples/passport-front.png"),
      },
      passportBack: {
        label: "Upload Passport Back Page",
        required: true,
        example: require("../assets/examples/passport-back.png"),
      },
      photo: {
        label: "Passport Size Photo",
        required: true,
        example: require("../assets/examples/passport-photo.png"),
      },
      ticket: {
        label: "Upload Return Ticket",
        required: true,
        example: require("../assets/examples/ticket.png"),
      },
    },
  },

  Azerbaijan: {
    fields: {
      travelDate: { required: true },
      phone: { required: true },
      email: { required: true },
      hotelDetails: { required: true },
    },
    documents: {
      passportFront: {
        label: "Upload Passport Front Page",
        required: true,
        example: require("../assets/examples/passport-front.png"),
      },
      passportBack: {
        label: "Upload Passport Back Page",
        required: true,
        example: require("../assets/examples/passport-back.png"),
      },
    },
  },

  Combodia: {
    fields: {
      travelDate: { required: true },
      phone: { required: true },
      email: { required: true },
      hotelDetails: { required: true },
    },
    documents: {
      passportFront: {
        label: "Upload Passport Front Page",
        required: true,
        example: require("../assets/examples/passport-front.png"),
      },
      passportBack: {
        label: "Upload Passport Back Page",
        required: true,
        example: require("../assets/examples/passport-back.png"),
      },
      photo: {
        label: "Passport Size Photo",
        required: true,
        example: require("../assets/examples/passport-photo.png"),
      },
      ticket: {
        label: "Upload Return Air Ticket",
        required: true,
        example: require("../assets/examples/ticket.png"),
      },
      bankStatement: {
        label: "Upload Bank Statement",
        required: true,
        example: null, // optional sample if you add one
      },
      hotelConfirmation: {
        label: "Upload Hotel Confirmation",
        required: true,
        example: null,
      },
    },
  },

  Singapore: {
    fields: {
      travelDate: { required: true },
      phone: { required: true },
      email: { required: true },
      hotelDetails: { required: true },
    },
    documents: {
      bankDetails: {
        label: "Upload Bank Details (PDF)",
        required: true,
        type: "pdf",
      },
      passportFront: {
        label: "Upload Passport Front Page",
        required: true,
        example: require("../assets/examples/passport-front.png"),
      },
      passportBack: {
        label: "Upload Passport Last Page",
        required: true,
        example: require("../assets/examples/passport-back.png"),
      },
      photo: {
        label: "Applicant's Photo",
        required: true,
        example: require("../assets/examples/passport-photo.png"),
      },
    },
    forms: {
      applicationFormAssetPath: "forms/Form14a.pdf",
      applicationFormSignatureRefAssetPath:
        "forms/Form14a-signature-reference.pdf",
      applicationFormPreviewImageAssetPath:
        "forms/Form14a-signature-reference.jpg",
      authorityLetterAssetPath: "forms/Authority-letter.pdf",
      authorityLetterPreviewImageAssetPath: "forms/Authority-letter-sample.jpg",
      applicationFormUrl: "",
      authorityLetterUrl: "",
    },
  },

  Armenia: {
    fields: {
      travelDate: { required: true },
      phone: { required: true },
      email: { required: true },
    },
    documents: {
      passportFront: {
        label: "Upload Passport Front Page",
        required: true,
        example: require("../assets/examples/passport-front.png"),
      },
    },
  },

  Bhutan: {
    fields: {
      travelDate: { required: true },
      phone: { required: true },
      email: { required: true },
    },
    documents: {
      passportFront: {
        label: "Upload Passport Front Page",
        required: true,
        example: require("../assets/examples/passport-front.png"),
      },
    },
  },

  Cuba: {
    fields: {
      travelDate: { required: true },
      phone: { required: true },
      email: { required: true },
    },
    documents: {
      passportFront: {
        label: "Upload Passport Front Page",
        required: true,
        example: require("../assets/examples/passport-front.png"),
      },
    },
  },

  Egypt: {
    fields: {
      travelDate: { required: true },
      phone: { required: true },
      email: { required: true },
    },
    documents: {
      passportFront: {
        label: "Upload Passport Front Page",
        required: true,
        example: require("../assets/examples/passport-front.png"),
      },
    },
  },

  Georgia: {
    fields: {
      travelDate: { required: true },
      phone: { required: true },
      email: { required: true },
    },
    documents: {
      passportFront: {
        label: "Upload Passport Front Page",
        required: true,
        example: require("../assets/examples/passport-front.png"),
      },
    },
  },

  "Hong Kong": {
    fields: {
      travelDate: { required: true },
      phone: { required: true },
      email: { required: true },
    },
    documents: {
      passportFront: {
        label: "Upload Passport Front Page",
        required: true,
        example: require("../assets/examples/passport-front.png"),
      },
    },
  },

  Kenya: {
    fields: {
      travelDate: { required: true },
      phone: { required: true },
      email: { required: true },
    },
    documents: {
      passportFront: {
        label: "Upload Passport Front Page",
        required: true,
        example: require("../assets/examples/passport-front.png"),
      },
    },
  },

  Malaysia: {
    fields: {
      travelDate: { required: true },
      phone: { required: true },
      email: { required: true },
    },
    documents: {
      passportFront: {
        label: "Upload Passport Front Page",
        required: true,
        example: require("../assets/examples/passport-front.png"),
      },
    },
  },

  Maldives: {
    fields: {
      travelDate: { required: true },
      phone: { required: true },
      email: { required: true },
    },
    documents: {
      passportFront: {
        label: "Upload Passport Front Page",
        required: true,
        example: require("../assets/examples/passport-front.png"),
      },
    },
  },

  Mauritius: {
    fields: {
      travelDate: { required: true },
      phone: { required: true },
      email: { required: true },
    },
    documents: {
      passportFront: {
        label: "Upload Passport Front Page",
        required: true,
        example: require("../assets/examples/passport-front.png"),
      },
    },
  },

  Morocco: {
    fields: {
      travelDate: { required: true },
      phone: { required: true },
      email: { required: true },
    },
    documents: {
      passportFront: {
        label: "Upload Passport Front Page",
        required: true,
        example: require("../assets/examples/passport-front.png"),
      },
    },
  },

  Qatar: {
    fields: {
      travelDate: { required: true },
      phone: { required: true },
      email: { required: true },
    },
    documents: {
      passportFront: {
        label: "Upload Passport Front Page",
        required: true,
        example: require("../assets/examples/passport-front.png"),
      },
    },
  },

  Russia: {
    fields: {
      travelDate: { required: true },
      phone: { required: true },
      email: { required: true },
    },
    documents: {
      passportFront: {
        label: "Upload Passport Front Page",
        required: true,
        example: require("../assets/examples/passport-front.png"),
      },
    },
  },

  "Sri-lanka": {
    fields: {
      travelDate: { required: true },
      phone: { required: true },
      email: { required: true },
    },
    documents: {
      passportFront: {
        label: "Upload Passport Front Page",
        required: true,
        example: require("../assets/examples/passport-front.png"),
      },
    },
  },

  Thailand: {
    fields: {
      travelDate: { required: true },
      phone: { required: true },
      email: { required: true },
    },
    documents: {
      passportFront: {
        label: "Upload Passport Front Page",
        required: true,
        example: require("../assets/examples/passport-front.png"),
      },
    },
  },

  DEFAULT: {
    fields: {
      travelDate: { required: true },
      phone: { required: true },
      email: { required: true },
    },
    documents: {
      passportFront: {
        label: "Upload Passport Front Page",
        required: true,
        example: require("../assets/examples/passport-front.png"),
      },
    },
  },
};
