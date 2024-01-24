import { useEffect, useRef, useState } from "react"

export default function Dropdown({ className, title, children }) {
	const [isOpen, setIsOpen] = useState(false)
	const [selectedOption, setSelectedOption] = useState(false)

	const toggleDropdown = () => {
		setIsOpen(!isOpen)
	}

	const onOptionClicked = (value) => {
		setSelectedOption(value)
		setIsOpen(false)
	}

	const newRef = useRef(null)
	useEffect(() => {
		document.addEventListener("mousedown", handleOutsideClick)
		return () => {
			document.removeEventListener("mousedown", handleOutsideClick)
		}
	})

	const handleOutsideClick = (e) => {
		if (newRef.current && !newRef.current.contains(e.target)) {
			setIsOpen(false)
		}
	}

	return (
		<div className="relative" ref={newRef}>
			<button
				className={`bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center`}
				onClick={toggleDropdown}
			>
				{selectedOption || title}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					fill="currentColor"
					className="fill-current h-4 w-4 ml-2"
					viewBox="0 0 16 16"
				>
					<path
						fillRule="evenodd"
						d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
					/>
				</svg>
			</button>
			<ul
				onClick={toggleDropdown}
				className={`absolute ${
					isOpen ? "block" : "hidden"
				} bg-white text-gray-800 cursor-pointer z-20 rounded-md py-2 ${className}`}
			>
				{children}
			</ul>
		</div>
	)
}
