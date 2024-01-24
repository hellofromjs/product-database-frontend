import { useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function usePagination() {
	const [searchParams, setSearchParams] = useSearchParams();
	const [currenPage, setCurrenPage] = useState(searchParams.get("page"));

	const setPage = (pageNum) => {
		setSearchParams({ page: pageNum });
		setCurrenPage(pageNum);
	};

	return [currenPage, setPage];
}

