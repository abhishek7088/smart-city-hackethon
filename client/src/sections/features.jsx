import React from "react";
import logo1 from "/issues.png";
import logo2 from "/trackstatuslogo.png";
import logo3 from "/feedbacklogo.png";
import logo4 from "/secure.png"

const features = [
  { icon: <img src={logo1} alt="Report Issues logo" className="w-8 h-8" />, title: "Report Issues", description: "Effortlessly report any issues you encounter with just a few clicks. Whether it's a technical glitch, service problem, or general concern, our intuitive system ensures your reports reach the right people for quick resolution." },
  { icon: <img src={logo2} alt="Track Progress logo" className="w-8 h-8" />, title: "Track Progress", description: "Stay updated on your issue’s progress with real-time tracking. Monitor the status of your report from submission to resolution, ensuring transparency and efficiency in the process." },
  { icon: <img src={logo3} alt="Feedback logo" className="w-8 h-8" />, title: "Feedback", description: "Share your thoughts and experiences to help us improve. Your feedback is valuable in enhancing our services and ensuring a better user experience." },
  { icon: <img src={logo4} alt="Secure logo" className="w-8 h-8" />, title: "Secure and Transparent", description: "Ensure the highest level of security and transparency in issue resolution. Our platform protects your data while keeping every step of the process visible to maintain trust and accountability" },
];

const FeaturesSection = () => {
  return (
    <div className="text-center py-12 bg-[#f3f4f6]">
      <h2 className="text-2xl font-bold mb-6">Features</h2>
      <div className="flex flex-wrap justify-center gap-6">
        {features.map((feature, index) => (
          <div key={index} className="bg-[#B0D0DD] p-6 rounded-lg shadow-lg w-64 relative flex flex-col items-center transform transition-transform duration-300 hover:scale-105">
            <div className="bg-white text-black w-12 h-12 flex items-center justify-center rounded-full mb-4">
              {feature.icon}
            </div>
            <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
            <p className="text-sm text-gray-600 mb-4 text-center">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturesSection;
