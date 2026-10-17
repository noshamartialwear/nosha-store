export const policies = {
  privacy: {
    title: "Privacy policy",
    description:
      "How Nosha handles website enquiries and personal information.",
    sections: [
      {
        title: "Information we receive",
        text: "The enquiry form collects your name, email, optional organization, selected interests and message. Do not submit payment card details, identification documents or other sensitive information. This website has no checkout or customer accounts. Hosting and email services may also process IP addresses, request logs and delivery information to operate and protect their services.",
      },
      {
        title: "Use and sharing",
        text: "We use your information to answer enquiries, discuss products, prepare requested quotations and keep related correspondence. Enquiries do not subscribe you to marketing. We do not sell enquiry information or use it for targeted advertising. Our hosting provider is Vercel; configured enquiry emails are delivered through Resend and our receiving email provider. These providers may process information in the United States and other countries where they operate.",
      },
      {
        title: "Cookies and analytics",
        text: "We use Google Analytics 4 to understand website visits and interactions. Google may use cookies and process device, browser, page and approximate location information under its privacy practices. We do not send enquiry form contents, names or email addresses to Google Analytics. You can control cookies through your browser and use the Google Analytics opt-out browser add-on. Hosting and security providers may also process technical request information.",
      },
      {
        title: "Retention, security and requests",
        text: "Enquiry records are retained while needed to answer your request and meet related business or recordkeeping obligations. Access should be limited to people who need it. No internet service can guarantee complete security. Use our contact form to request access, correction or deletion of information you supplied. We may need to verify your request and retain information where required.",
      },
      {
        title: "Children and updates",
        text: "The enquiry service is intended for adults, including parents and academy representatives. Children under 13 should not submit personal information. A parent or guardian can contact us about information submitted by a child. Changes to our practices will be reflected on this page.",
      },
    ],
  },
  shipping: {
    title: "Shipping policy",
    description:
      "USA shipping enquiries, order confirmation and delivery information.",
    sections: [
      {
        title: "USA enquiries",
        text: "We welcome enquiries from customers and academies in the United States. This is a product showcase and enquiry website, without online checkout. Contact us to confirm availability and delivery to your location. International delivery is not offered through this website.",
      },
      {
        title: "Order confirmation",
        text: "Products, sizes, quantities, customization, total pricing, shipping charges and the expected shipment date will be confirmed in writing before payment. Sending an enquiry does not place an order or reserve stock. Please provide an accurate delivery address and tell us about deadlines before ordering.",
      },
      {
        title: "Processing and transit",
        text: "Processing depends on stock, quantity and agreed customization. Carrier transit time is separate from processing time. The delivery service and tracking arrangements will be confirmed with your order. Contact us for details rather than relying on a general delivery estimate.",
      },
      {
        title: "Delays",
        text: "If we cannot ship within the agreed time, we will notify you, explain the revised timing and offer the choice to accept the delay or cancel unshipped merchandise for a refund. Applicable US shipping requirements still apply where no shipment time has been agreed.",
      },
      {
        title: "Delivery problems",
        text: "Contact us promptly about missing, damaged or incorrect deliveries. Keep the packaging, order reference and photographs where possible so we can investigate and arrange an appropriate resolution. The showcase address on this website is not a pickup point or returns destination.",
      },
    ],
  },
  returns: {
    title: "Returns & refunds",
    description: "Proposed Nosha return, exchange and refund terms.",
    sections: [
      {
        title: "Standard returns",
        text: "For standard, non-customized products, contact us within 30 days of delivery to request a return or exchange. Items should be unworn, unwashed, unaltered and complete with original tags and packaging. Carefully trying an item on to check fit is acceptable; training in it is not.",
      },
      {
        title: "Instructions and shipping costs",
        text: "Before sending anything, contact us with your order reference, item and reason for return. We will provide instructions and the correct destination. For changes of mind or an incorrectly chosen size, you pay return shipping and original shipping charges are not refundable, except where required by law. Any exchange shipping charge will be agreed in advance.",
      },
      {
        title: "Custom and hygiene-sensitive items",
        text: "Personalized, embroidered and made-to-order products cannot normally be returned for a change of mind once production begins. Opened or used protective items that cannot be safely resold for hygiene reasons are also excluded from change-of-mind returns. These exclusions do not remove rights relating to defective, damaged or incorrectly supplied goods.",
      },
      {
        title: "Product problems",
        text: "Tell us promptly if an item arrives damaged, defective or different from the confirmed order. Include photographs where possible. We will assess the issue and arrange an appropriate replacement, repair or refund, including reasonable return shipping when the issue is our responsibility. Stop using any item that may be unsafe.",
      },
      {
        title: "Refunds and cancellations",
        text: "We inspect authorized returns and contact you with the outcome. Approved refunds are issued to the original payment method within 10 business days; payment providers may take additional time to post them. Request cancellation as soon as possible. Any non-recoverable custom production costs must have been disclosed and agreed before ordering. Refunds required by law will follow the applicable deadlines.",
      },
    ],
  },
  terms: {
    title: "Website terms",
    description: "Terms for browsing Nosha and requesting product information.",
    sections: [
      {
        title: "Website use",
        text: "Use this website lawfully, provide accurate enquiry information and do not misuse the form or interfere with the service. This website introduces Nosha Martial Wear and lets you request product information.",
      },
      {
        title: "Products and orders",
        text: "Images are illustrative and may include generated lifestyle scenes. Actual colors, branding and product details may differ. Confirm the specification, size, price, availability and delivery terms before purchasing. An enquiry or automated acknowledgement does not mean an order has been accepted.",
      },
      {
        title: "Training and safety",
        text: "Choose equipment suitable for your discipline, fit and intended use with guidance from your instructor. No uniform or protective equipment eliminates injury risk. Follow care and use instructions and replace damaged equipment.",
      },
      {
        title: "Content and your rights",
        text: "Nosha branding and website content may not be reproduced commercially without permission. Information and services may be updated, and the website may occasionally be unavailable. Nothing in these terms removes rights or remedies that cannot lawfully be excluded.",
      },
      {
        title: "Contact and showcase details",
        text: "Use the contact form for website, privacy and order questions. The Manassas address is for showcase purposes only; it is not a verified shop, pickup point or returns address. You can also contact us at noshawear@gmail.com or +1 (703) 703-3662.",
      },
    ],
  },
} as const

export const policyLinks = Object.entries(policies).map(([slug, policy]) => ({
  href: `/policies/${slug}`,
  label: policy.title,
}))
