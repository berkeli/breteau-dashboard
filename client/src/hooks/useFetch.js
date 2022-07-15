import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const useFetch = (endpoint, options) => {
	const { getAccessTokenSilently } = useAuth0();
	const [data, setData] = useState(null);
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [trigger, setTrigger] = useState(true);

	const triggerSearch = () => {
		setTrigger(!trigger);
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const token = await getAccessTokenSilently();
				const optionsWithToken = {
					...options,
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-Type": "application/json",
					},
				};
				const response = await fetch(
					`${process.env.API_URL}/${endpoint}`,
					optionsWithToken
				);
				const json = await response.json();
				setData(json);
				setIsLoading(false);
			} catch (error) {
				setError(error);
				setIsLoading(false);
			}
		};
		fetchData();
	}, [endpoint, getAccessTokenSilently, options, trigger]);
	return {
		data,
		isLoading,
		error,
		triggerSearch,
	};
};

export default useFetch;
