// export const COUNTRY_APPLY_ROUTES = {
//   Vietnam: "VietnamApplyScreen",
//   DEFAULT: "StartApplicationScreen",
// };

// export const COUNTRY_APPLY_CONFIG = {
//   Vietnam: {
//     fields: {
//       travelDate: { required: true },
//       phone: { required: true },
//       email: { required: true },
//       hotel: { required: true },
//     },
//     documents: {
//       passportFront: {
//         label: "Upload Passport Front Page",
//         required: true,
//         example: require("../assets/examples/passport-front.png"),
//       },
//       passportBack: {
//         label: "Upload Passport Last Page",
//         required: true,
//         example: require("../assets/examples/passport-back.png"),
//       },
//       photo: {
//         label: "Passport Size Photo",
//         required: true,
//         example: require("../assets/examples/passport-photo.png"),
//       },
//       ticket: {
//         label: "Upload Return Ticket",
//         required: true,
//         example: require("../assets/examples/ticket.png"),
//       },
//     },
//   },

//   Azerbaijan: {
//     fields: {
//       travelDate: { required: true },
//       phone: { required: true },
//       email: { required: true },
//       hotel: { required: true },
//     },
//     documents: {
//       passportFront: {
//         label: "Upload Passport Front Page",
//         required: true,
//         example: require("../assets/examples/passport-front.png"),
//       },
//       passportBack: {
//         label: "Upload Passport Back Page",
//         required: true,
//         example: require("../assets/examples/passport-back.png"),
//       },
//     },
//   },

//   DEFAULT: {
//     fields: {
//       travelDate: { required: true },
//       phone: { required: true },
//       email: { required: true },
//     },
//     documents: {
//       passportFront: {
//         label: "Upload Passport Front Page",
//         required: true,
//         example: require("../assets/examples/passport-front.png"),
//       },
//     },
//   },
// };


export const COUNTRY_APPLY_ROUTES = {
  Vietnam: "VietnamApplyScreen",
  Singapore: "SingaporeApplyScreen",
  DEFAULT: "TravelDateScreen",
};

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
        label: "Upload Passport Last Page",
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
