import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-white">
      <title>Privacy & Security Policy | ShopMart</title>

      <Navigation />

      <section className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy & Security Policy</h1>
            <p className="text-xl text-gray-600">
              Your privacy and security are our top priorities. Learn how we protect your information.
            </p>
          </div>

          <div className="prose prose-lg max-w-none">
            <div className="bg-gray-50 p-6 rounded-lg mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Information We Collect</h2>
              <ul className="space-y-2">
                <li>• Personal information (name, email, phone) when you register or contact us</li>
                <li>• Payment information (processed securely through our payment partners)</li>
                <li>• Shopping behavior and preferences to improve your experience</li>
                <li>• Device information and cookies for site functionality and analytics</li>
              </ul>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">How We Use Your Information</h2>
              <ul className="space-y-2">
                <li>• Process orders and provide customer support</li>
                <li>• Send important updates about your orders and account</li>
                <li>• Improve our products and services</li>
                <li>• Protect against fraud and unauthorized access</li>
                <li>• Comply with legal obligations</li>
              </ul>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Security Measures</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Data Protection</h3>
                  <ul className="space-y-1 text-sm">
                    <li>• SSL encryption for all data transmission</li>
                    <li>• Secure database storage with encryption</li>
                    <li>• Regular security audits and updates</li>
                    <li>• Access controls and authentication</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Payment Security</h3>
                  <ul className="space-y-1 text-sm">
                    <li>• PCI DSS compliant payment processing</li>
                    <li>• No storage of credit card details</li>
                    <li>• Secure payment gateways (UPI, Cards, Wallets)</li>
                    <li>• Fraud detection and prevention</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your Rights</h2>
              <ul className="space-y-2">
                <li>• Access and review your personal information</li>
                <li>• Request correction of inaccurate data</li>
                <li>• Request deletion of your account and data</li>
                <li>• Opt-out of marketing communications</li>
                <li>• Data portability and transparency</li>
              </ul>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Cookies & Tracking</h2>
              <p className="mb-4">
                We use cookies and similar technologies to enhance your browsing experience:
              </p>
              <ul className="space-y-2">
                <li>• Essential cookies for site functionality</li>
                <li>• Performance cookies to analyze usage</li>
                <li>• Preference cookies to remember your settings</li>
                <li>• Marketing cookies for personalized content (with your consent)</li>
              </ul>
              <p className="mt-4 text-sm text-gray-600">
                You can manage cookie preferences through your browser settings.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Affiliate Partnerships</h2>
              <p className="mb-4">
                We participate in affiliate marketing programs and may earn commissions from qualifying purchases through affiliate links.
              </p>
              <ul className="space-y-2">
                <li>• Affiliate links are clearly marked</li>
                <li>• We only promote products we believe in</li>
                <li>• Commissions don't affect the price you pay</li>
                <li>• We maintain editorial independence</li>
              </ul>
            </div>

            <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold text-blue-900 mb-4">Contact Us</h2>
              <p className="text-blue-800 mb-4">
                If you have questions about this Privacy Policy or how we handle your data, please contact us:
              </p>
              <div className="space-y-2 text-blue-800">
                <p>• Email: privacy@shopmart.com</p>
                <p>• Phone: +91 9999999999</p>
                <p>• Address: 123 Business Street, Mumbai, India 400001</p>
              </div>
            </div>

            <div className="mt-8 text-sm text-gray-500">
              <p>Last updated: {new Date().toLocaleDateString()}</p>
              <p>We may update this Privacy Policy from time to time. Changes will be posted on this page.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}