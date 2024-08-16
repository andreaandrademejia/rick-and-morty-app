import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetch = (url) => {
	const [data, setData] = useState(null);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);

	const getData = () => {
		axios
			.get(url)
			.then((res) => {
				setData(res.data);
				setError(null);
			})
			.catch((err) => {
				const errorMessage = err.response
					? err.response.data.message || 'Error al cargar los datos'
					: 'Error de red o el servidor no responde';
				console.error(err);
				setError(errorMessage);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	useEffect(() => {
		if (url) {
			getData();
		}
	}, [url]);

	return [data, error, loading];
};

export default useFetch;
