import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Header */}
      <section className="bg-gradient-to-br from-black to-red-900 text-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 lg:mb-6">
              Privacy <span className="text-red-400">Policy</span>
            </h1>
            <p className="text-lg lg:text-xl text-gray-200 max-w-3xl mx-auto">
              आपकी privacy हमारी priority है - Your data is safe with us
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="border border-gray-200">
            <CardContent className="p-8 lg:p-12">
              <div className="prose prose-lg max-w-none">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Information Collection</h2>
                <p className="text-gray-600 mb-6">
                  हम सिर्फ वही information collect करते हैं जो आपकी shopping experience improve करने के लिए जरूरी है। इसमें शामिल है:
                </p>
                <ul className="list-disc pl-6 text-gray-600 mb-8">
                  <li>Name, email address, और phone number</li>
                  <li>Shipping और billing addresses</li>
                  <li>Payment information (securely processed)</li>
                  <li>Order history और preferences</li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-900 mb-6">Data Usage</h2>
                <p className="text-gray-600 mb-6">
                  आपकी information का use हम निम्न purposes के लिए करते हैं:
                </p>
                <ul className="list-disc pl-6 text-gray-600 mb-8">
                  <li>Orders process करने के लिए</li>
                  <li>Customer support provide करने के लिए</li>
                  <li>Product recommendations improve करने के लिए</li>
                  <li>Promotional offers send करने के लिए (with consent)</li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-900 mb-6">Data Security</h2>
                <p className="text-gray-600 mb-6">
                  हम industry-standard security measures use करते हैं आपकी personal information को protect करने के लिए:
                </p>
                <ul className="list-disc pl-6 text-gray-600 mb-8">
                  <li>SSL encryption for data transmission</li>
                  <li>Secure servers with regular security updates</li>
                  <li>Limited access to personal information</li>
                  <li>Regular security audits और monitoring</li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-900 mb-6">Data Sharing</h2>
                <p className="text-gray-600 mb-6">
                  हम आपकी personal information को third parties के साथ sell नहीं करते। हम information share करते हैं सिर्फ:
                </p>
                <ul className="list-disc pl-6 text-gray-600 mb-8">
                  <li>Shipping partners के साथ delivery के लिए</li>
                  <li>Payment processors के साथ secure transactions के लिए</li>
                  <li>Legal requirements के case में</li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Rights</h2>
                <p className="text-gray-600 mb-6">
                  आपके पास निम्न rights हैं:
                </p>
                <ul className="list-disc pl-6 text-gray-600 mb-8">
                  <li>अपनी personal information access करने का right</li>
                  <li>Incorrect information को correct करने का right</li>
                  <li>Account delete करने का right</li>
                  <li>Marketing communications को opt-out करने का right</li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Us</h2>
                <p className="text-gray-600">
                  Privacy policy के बारे में कोई questions हों तो contact करें:
                  <br />
                  Email: privacy@digitalaryan21.com
                  <br />
                  Phone: +91-XXXX-XXXX
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}