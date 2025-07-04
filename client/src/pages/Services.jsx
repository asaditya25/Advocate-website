import React from "react";
import { FaBalanceScale, FaGavel, FaUsers, FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const services = [
	{
		icon: <FaBalanceScale className="text-4xl text-gold mb-2" />,
		title: "Civil Litigation",
		description:
			"Expert handling of civil disputes, contracts, and property issues.",
	},
	{
		icon: <FaGavel className="text-4xl text-gold mb-2" />,
		title: "Criminal Defense",
		description: "Strong representation in criminal matters to protect your rights.",
	},
	{
		icon: <FaUsers className="text-4xl text-gold mb-2" />,
		title: "Family & Divorce Law",
		description: "Compassionate and strategic support for family-related cases.",
	},
	{
		icon: <FaHome className="text-4xl text-gold mb-2" />,
		title: "Property Disputes",
		description: "Resolution of land and property conflicts with legal precision.",
	},
];

export default function Services() {
	const navigate = useNavigate();
	return (
		<section className="min-h-[80vh] bg-ash py-16 px-2">
			<div className="max-w-6xl mx-auto">
				<h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-navy font-bold text-center mb-12">
					Our Legal Services
				</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
					{services.map((service, idx) => (
						<div
							key={service.title}
							className="bg-ivory rounded-xl shadow-lg p-8 flex flex-col items-center text-center border border-gold/30 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group"
						>
							{service.icon}
							<h3 className="font-serif text-xl font-bold text-navy mb-2 group-hover:text-gold transition">
								{service.title}
							</h3>
							<p className="font-sans text-gray-700 text-base mb-4">
								{service.description}
							</p>
							<button
								onClick={() => navigate("/appointment")}
								className="mt-auto bg-gold text-navy font-semibold px-5 py-2 rounded shadow hover:bg-navy hover:text-gold transition-all duration-300"
							>
								Book Now
							</button>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
