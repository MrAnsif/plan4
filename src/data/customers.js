export const customers = [
  {
    _id: '1',
    companyName: "Acme Traders",
    companyAddress: "123, Market Road, Kochi",
    companyPhone: "+91-9876543210",

    registeredOwner: {
      name: "Rahul Nair",
      address: "XYZ Villa, Kochi",
      phone: "+91-9876500011",
      email: "rahul@gmail.com"
    },

    gstDetails: {
      gstNumber: "32ABCDE1234Z1Z5",
      typeOfRegistration: "Regular",
      dateOfRegistration: "2023-02-01",
      filingStartDate: "2023-03-01",
      serviceOrSales: "Sales"
    },

    businessDetails: {
      buildingStatus: "Rented",
      rentAmount: 15000,
      additionalBranches: [
        "Branch 1, Kottayam",
        "Branch 2, Thrissur"
      ]
    },

    filingPreferences: {
      gstr1: true,
      gstr3b: true,
      compounding: true
    },

    createdAt: "2023-01-20T10:00:00Z",
    updatedAt: "2023-01-25T14:30:00Z"
  },
  {
    _id: '2',
    companyName: "Tech Solutions",
    companyAddress: "456, Tech Park, Bangalore",
    companyPhone: "+91-9876543211",

    registeredOwner: {
      name: "Anita Patel",
      address: "ABC Apartment, Bangalore",
      phone: "+91-9876500012",
      email: "anita@gmail.com"
    },

    gstDetails: {
      gstNumber: "29ABCDE1234Z1Z6",
      typeOfRegistration: "Regular",
      dateOfRegistration: "2023-03-01",
      filingStartDate: "2023-04-01",
      serviceOrSales: "Services"
    },

    businessDetails: {
      buildingStatus: "Owned",
      rentAmount: 0,
      additionalBranches: [
        "Branch 1, Mysore",
        "Branch 2, Mangalore"
      ]
    },

    filingPreferences: {
      gstr1: true,
      gstr3b: true,
      compounding: false
    },

    createdAt: "2023-02-10T11:00:00Z",
    updatedAt: "2023-02-15T15:30:00Z"
  },
  {
    _id: '3',
    companyName: "Green Farms",
    companyAddress: "789, Farm Road, Pune",
    companyPhone: "+91-9876543212",

    registeredOwner: {
      name: "Vikram Singh",
      address: "DEF Farmhouse, Pune",
      phone: "+91-9876500013",
      email: "vikram@gmail.com"
    },

    gstDetails: {
      gstNumber: "27ABCDE1234Z1Z7",
      typeOfRegistration: "Composition",
      dateOfRegistration: "2023-04-01",
      filingStartDate: "2023-05-01",
      serviceOrSales: "Sales"
    },

    businessDetails: {
      buildingStatus: "Rented",
      rentAmount: 20000,
      additionalBranches: [
        "Branch 1, Nashik",
        "Branch 2, Aurangabad"
      ]
    },

    filingPreferences: {
      gstr1: false,
      gstr3b: true,
      compounding: true
    },

    createdAt: "2023-03-15T12:00:00Z",
    updatedAt: "2023-03-20T16:30:00Z"
  },
  {
    _id: '4',
    companyName: "Urban Styles",
    companyAddress: "101, Fashion Street, Mumbai",
    companyPhone: "+91-9876543213",

    registeredOwner: {
      name: "Priya Sharma",
      address: "GHI Apartment, Mumbai",
      phone: "+91-9876500014",
      email: "priya@gmail.com"
    },

    gstDetails: {
      gstNumber: "27ABCDE1234Z1Z8",
      typeOfRegistration: "Regular",
      dateOfRegistration: "2023-05-01",
      filingStartDate: "2023-06-01",
      serviceOrSales: "Sales"
    },

    businessDetails: {
      buildingStatus: "Owned",
      rentAmount: 0,
      additionalBranches: [
        "Branch 1, Thane",
        "Branch 2, Navi Mumbai"
      ]
    },

    filingPreferences: {
      gstr1: true,
      gstr3b: true,
      compounding: false
    },

    createdAt: "2023-04-20T13:00:00Z",
    updatedAt: "2023-04-25T17:30:00Z"
  },
  {
    _id: '5',
    companyName: "Health Plus",
    companyAddress: "202, Medical Lane, Delhi",
    companyPhone: "+91-9876543214",

    registeredOwner: {
      name: "Amit Kumar",
      address: "JKL Villa, Delhi",
      phone: "+91-9876500015",
      email: "amit@gmail.com"
    },

    gstDetails: {
      gstNumber: "07ABCDE1234Z1Z9",
      typeOfRegistration: "Regular",
      dateOfRegistration: "2023-06-01",
      filingStartDate: "2023-07-01",
      serviceOrSales: "Services"
    },

    businessDetails: {
      buildingStatus: "Rented",
      rentAmount: 25000,
      additionalBranches: [
        "Branch 1, Gurgaon",
        "Branch 2, Noida"
      ]
    },

    filingPreferences: {
      gstr1: true,
      gstr3b: true,
      compounding: false
    },

    createdAt: "2023-05-25T14:00:00Z",
    updatedAt: "2023-05-30T18:30:00Z"
  }
];
