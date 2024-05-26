export const DEMO_COLUMNS = [
  {
    value: "annual_revenue",
    type: "INT",
    label: "Annual revenue",
  },
  {
    value: "billing_city",
    type: "STRING",
    label: "Billing city",
  },
  {
    value: "billing_country",
    type: "STRING",
    label: "Billing country",
  },
  {
    value: "billing_state",
    type: "STRING",
    label: "Billing state",
  },
  {
    value: "billing_street",
    type: "STRING",
    label: "Billing street",
  },
  {
    value: "billing_zip",
    type: "STRING",
    label: "Billing zip",
  },
  {
    value: "created_at",
    type: "TIMESTAMP",
    label: "Created timestamp",
  },
  {
    value: "duns",
    type: "STRING",
    label: "DUNS",
  },
  {
    value: "employees",
    type: "INT",
    label: "Employees",
  },
  {
    value: "fax",
    type: "STRING",
    label: "Fax",
  },
  {
    value: "name",
    type: "STRING",
    label: "Name",
  },
  {
    value: "phone",
    type: "STRING",
    label: "Phone",
  },
  {
    value: "shipping_city",
    type: "STRING",
    label: "Shipping city",
  },
  {
    value: "shipping_country",
    type: "STRING",
    label: "Shipping country",
  },
  {
    value: "shipping_state",
    type: "STRING",
    label: "Shipping state",
  },
  {
    value: "shipping_street",
    type: "STRING",
    label: "Shipping street",
  },
  {
    value: "shipping_zip",
    type: "STRING",
    label: "Shipping zip",
  },
  {
    value: "updated_at",
    type: "TIMESTAMP",
    label: "Updated timestamp",
  },
  {
    value: "website",
    type: "STRING",
    label: "Website",
  },
  {
    value: "paying_status",
    type: "ENUM",
    label: "Paying status",
    values: [
      {
        value: "not_paying",
        label: "Not paying",
      },
      {
        value: "free",
        label: "Free",
      },
      {
        value: "trial",
        label: "Trial",
      },
      {
        value: "paying",
        label: "Paying",
      },
      {
        value: "churned_from_paying",
        label: "Churned from paying",
      },
      {
        value: "churned_from_free",
        label: "Churned from free",
      },
    ],
  },
  {
    value: "owner_user",
    type: "RELATION",
    label: "Owner user",
    values: [
      {
        value: "{{current_user.id}}",
        label: "Current User",
      },
    ],
  },
  {
    value: "industry",
    type: "RELATION",
    label: "Industry",
    values: [
      {
        value: "account.industry:'Advertising'",
        label: "Advertising",
      },
      {
        value: "account.industry:'Agriculture'",
        label: "Agriculture",
      },
      {
        value: "account.industry:'Aerospace & Defense'",
        label: "Aerospace & Defense",
      },
      {
        value: "account.industry:'Apparel'",
        label: "Apparel",
      },
      {
        value: "account.industry:'Banking'",
        label: "Banking",
      },
      {
        value: "account.industry:'Biotechnology'",
        label: "Biotechnology",
      },
      {
        value: "account.industry:'Business Services'",
        label: "Business Services",
      },
      {
        value: "account.industry:'Chemicals'",
        label: "Chemicals",
      },
      {
        value: "account.industry:'Communications'",
        label: "Communications",
      },
      {
        value: "account.industry:'Construction'",
        label: "Construction",
      },
      {
        value: "account.industry:'Consulting'",
        label: "Consulting",
      },
      {
        value: "account.industry:'Education'",
        label: "Education",
      },
      {
        value: "account.industry:'Electronics'",
        label: "Electronics",
      },
      {
        value: "account.industry:'Energy'",
        label: "Energy",
      },
      {
        value: "account.industry:'Engineering'",
        label: "Engineering",
      },
      {
        value: "account.industry:'Entertainment'",
        label: "Entertainment",
      },
      {
        value: "account.industry:'Environmental'",
        label: "Environmental",
      },
      {
        value: "account.industry:'Finance'",
        label: "Finance",
      },
      {
        value: "account.industry:'Food & Beverage'",
        label: "Food & Beverage",
      },
      {
        value: "account.industry:'Government'",
        label: "Government",
      },
      {
        value: "account.industry:'Healthcare'",
        label: "Healthcare",
      },
      {
        value: "account.industry:'Hospitality'",
        label: "Hospitality",
      },
      {
        value: "account.industry:'Insurance'",
        label: "Insurance",
      },
      {
        value: "account.industry:'Machinery'",
        label: "Machinery",
      },
      {
        value: "account.industry:'Manufacturing'",
        label: "Manufacturing",
      },
      {
        value: "account.industry:'Media'",
        label: "Media",
      },
      {
        value: "account.industry:'Not For Profit'",
        label: "Not For Profit",
      },
      {
        value: "account.industry:'Other'",
        label: "Other",
      },
      {
        value: "account.industry:'Recreation'",
        label: "Recreation",
      },
      {
        value: "account.industry:'Retail'",
        label: "Retail",
      },
      {
        value: "account.industry:'Shipping'",
        label: "Shipping",
      },
      {
        value: "account.industry:'Technology'",
        label: "Technology",
      },
      {
        value: "account.industry:'Telecommunications'",
        label: "Telecommunications",
      },
      {
        value: "account.industry:'Transportation'",
        label: "Transportation",
      },
      {
        value: "account.industry:'Utilities'",
        label: "Utilities",
      },
    ],
  },
  {
    value: "invoice_template",
    type: "RELATION",
    label: "Invoice template",
    values: [
      {
        value: "account.invoice_template:'Default template'",
        label: "Default template",
      },
    ],
  },
  {
    value: "account_type",
    type: "RELATION",
    label: "Account type",
    values: [
      {
        value: "account.account_type:'Analyst'",
        label: "Analyst",
      },
      {
        value: "account.account_type:'Competitor'",
        label: "Competitor",
      },
      {
        value: "account.account_type:'Customer'",
        label: "Customer",
      },
      {
        value: "account.account_type:'Investor'",
        label: "Investor",
      },
      {
        value: "account.account_type:'Partner'",
        label: "Partner",
      },
      {
        value: "account.account_type:'Press'",
        label: "Press",
      },
      {
        value: "account.account_type:'Prospect'",
        label: "Prospect",
      },
      {
        value: "account.account_type:'Reseller'",
        label: "Reseller",
      },
      {
        value: "account.account_type:'Vendor'",
        label: "Vendor",
      },
      {
        value: "account.account_type:'Other'",
        label: "Other",
      },
    ],
  },
];
