import { IoIosAlert } from "react-icons/io"
import { FaCircleInfo } from "react-icons/fa6"
import { FaCheckCircle } from "react-icons/fa"

export default function Toast({ title, text, variant = "info" }) {
	const variants = {
		info: {
			classes: "bg-blue-300 text-blue-800",
			title: "Info",
			text: "Additional information",
			icon: <FaCircleInfo size={30} />,
		},
		success: {
			classes: "bg-green-300 text-green-800",
			title: "Success",
			text: "Action completed successfully",
			icon: <FaCheckCircle size={30} />,
		},
		danger: {
			classes: "bg-red-300 text-red-800",
			title: "Danger",
			text: "Action failed",
			icon: <IoIosAlert size={30} />,
		},
	}

	return (
		<div
			className={`flex gap-2 p-4 rounded-lg shadow-lg items-center ${variants[variant].classes}`}
		>
			{variants[variant].icon}
			<div>
				<h3 className="font-bold">{title || variants[variant].title}</h3>
				<p className="text-sm">{text || variants[variant].text}</p>
			</div>
		</div>
	)
}
