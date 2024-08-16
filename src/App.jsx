import { useEffect, useRef, useState } from 'react';
import useFetch from './hooks/useFetch';
import './App.css';
import ResidentCard from './components/ResidentCard';
import LocationInfo from './components/LocationInfo';
import getNumbers from './utils/getNumbers';

function App() {
	const [locationID, setLocationID] = useState(getRandomNumber(126));
	const [errorMessage, setErrorMessage] = useState('');
	const url = locationID ? `/api/location/${locationID}` : '';
	const [location, hasError, isLoading] = useFetch(url);
	const [locations, hasErrorLocations, isLoadingLocations] = useFetch(
		`/api/location/${getNumbers()}`,
	);

	function getRandomNumber(max) {
		return Math.floor(Math.random() * max) + 1;
	}

	useEffect(() => {
		setLocationID();
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();
		const inputValue = inputName.current.value.trim();
		const selectedLocation = locations?.find(
			(location) => location.name.toLowerCase() === inputValue.toLowerCase(),
		);

		if (inputValue) {
			setLocationID(selectedLocation ? selectedLocation.id : null);
			setErrorMessage(
				selectedLocation ? '' : 'No location found with that name!',
			);
		} else {
			setErrorMessage(inputValue ? '' : 'You must put a location name');
		}
	};

	const inputName = useRef();

	return (
		<div className="app flex-container">
			<header className="app__hero">
				<img className="hero__image" src="/image/hero.png" alt="Hero Image" />
			</header>
			<section className="app__body">
				<form className="form" onSubmit={handleSubmit}>
					<input
						className="form__input"
						type="text"
						placeholder="Search location name"
						ref={inputName}
						list="locations"
					/>
					<datalist id="locations">
						{isLoadingLocations ? (
							<option>Loading...</option>
						) : hasErrorLocations ? (
							<option>Error loading locations</option>
						) : (
							locations?.map((location) => (
								<option value={location.name} key={location.id}></option>
							))
						)}
					</datalist>
					<button className="form__btn">Search</button>
				</form>
				{isLoading ? (
					<video
						className="loading_video"
						src="/video/Rick and Morty Portal Sound Effect.mp4"
						alt="Loading"
					/>
				) : hasError ? (
					<h1>Error loading location</h1>
				) : errorMessage ? (
					<h1>:x:{errorMessage}</h1>
				) : (
					<>
						<LocationInfo location={location} />
						<section className="cards__container flex-container">
							{location?.residents?.map((url) => (
								<ResidentCard key={url} url={url} />
							))}
						</section>
					</>
				)}
			</section>
		</div>
	);
}

export default App;
