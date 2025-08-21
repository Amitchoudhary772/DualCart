import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Truck, 
  Shield, 
  Headphones, 
  RotateCcw, 
  CreditCard, 
  MapPin,
  Clock,
  Award
} from "lucide-react";

export default function Services() {
  const services = [
    {
      icon: Truck,
      title: "Free Delivery",
      description: "₹499+ orders पर free delivery मिलेगी",
      details: "Express delivery available in major cities"
    },
    {
      icon: Shield,
      title: "Warranty Protection",
      description: "सभी products पर warranty guarantee",
      details: "1-2 year warranty on electronics"
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description: "हमेशा available customer care team",
      details: "Call, chat, or email support"
    },
    {
      icon: RotateCcw,
      title: "Easy Returns",
      description: "7 days में return करने की facility",
      details: "No questions asked return policy"
    },
    {
      icon: CreditCard,
      title: "Secure Payment",
      description: "Safe और secure payment options",
      details: "UPI, Cards, Net Banking, COD"
    },
    {
      icon: MapPin,
      title: "Pan India Delivery",
      description: "All over India में delivery available",
      details: "500+ cities covered"
    },
    {
      icon: Clock,
      title: "Quick Processing",
      description: "Same day में order process होगा",
      details: "Orders placed before 2 PM shipped same day"
    },
    {
      icon: Award,
      title: "Quality Guarantee",
      description: "100% authentic products की guarantee",
      details: "Only genuine products from authorized dealers"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Header */}
      <section className="bg-gradient-to-br from-black to-red-900 text-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 lg:mb-6">
              Our <span className="text-red-400">Services</span>
            </h1>
            <p className="text-lg lg:text-xl text-gray-200 max-w-3xl mx-auto">
              Customer satisfaction हमारी priority है - Best services guaranteed!
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <Card key={index} className="group hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-red-300">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 mb-3 text-sm">
                      {service.description}
                    </p>
                    <p className="text-xs text-red-600 font-medium">
                      {service.details}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            Need Help? हम यहाँ हैं!
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Any questions या problems हों तो contact करें - Our team is ready to help
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              className="bg-red-600 text-white hover:bg-red-700 px-8 py-3"
              onClick={() => window.location.href = "/contact"}
            >
              Contact Support
            </Button>
            <Button 
              variant="outline"
              className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white px-8 py-3"
              onClick={() => window.location.href = "/help"}
            >
              Help Center
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}