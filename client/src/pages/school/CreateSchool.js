import React, { useState } from "react";
import {
	Button,
	Center,
	FormControl,
	FormLabel,
	Input,
	Select,
	Text,
	Textarea,
	useToast,
} from "@chakra-ui/react";
import { useAuth0 } from "@auth0/auth0-react";
import _ from "lodash";

const CreateSchool = ({ triggerSearch, onClose, countries, statuses }) => {
	const toast = useToast();
	const { getAccessTokenSilently } = useAuth0();
	const [submitState, setSubmitState] = useState({
		loading: false,
		error: null,
	});
	const [countryDropdown, setCountryDropdown] = useState(countries.length > 0);
	const [statusDropdown, setStatusDropdown] = useState(statuses.length > 0);

	const [formData, setFormData] = useState({
		name: "",
		description: "",
		location: "",
		country: "",
		responsible: "",
		status: "",
		// Assume Today's Date
		deploymentdate: new Date().toLocaleDateString("sv-SE"), // sv-SE is YYYY-MM-DD format
	});

	const onChangeHandler = (e) => {
		let newCountry = formData.country;
		let newStatus = formData.status;

		if (e.target.name === "country") {
			if (countryDropdown && e.target.value === "createnew") {
				setCountryDropdown(false);
				newCountry = "";
			}
		}

		if (e.target.name === "status") {
			if (statusDropdown && e.target.value === "createnew") {
				setStatusDropdown(false);
				newStatus = "";
			}
		}

		setFormData({
			...formData,
			country: newCountry,
			status: newStatus,
			[e.target.name]: e.target.value,
		});
	};

	// Date format is `yyyy-mm-dd`
	function dateIsValid(dateStr) {
		const regex = /^\d{4}-\d{2}-\d{2}$/;
		if (dateStr.match(regex) === null) {
			return false;
		}
		const date = new Date(dateStr);

		const timestamp = date.getTime();
		if (typeof timestamp !== "number" || Number.isNaN(timestamp)) {
			return false;
		}
		return date.toISOString().startsWith(dateStr);
	}

	// Some Validation
	const validateSubmission = (formData) => {
		if (
			formData.name === "" ||
			formData.location === "" ||
			formData.country === "" ||
			formData.responsible === "" ||
			formData.status === "" ||
			formData.description === ""
		) {
			return {
				result: false,
				message: "Empty fields are not allowed. All fields must be filled in.",
			};
		}

		// Date Validation

		if (
			formData.deploymentdate === "" ||
			!dateIsValid(formData.deploymentdate)
		) {
			return { result: false, message: "Invalid Deployment Date" };
		}

		return { result: true }; // Passed Simple Validation
	};

	const onSubmitHandler = async () => {
		// Trim the inputted data

		setFormData({
			...formData,
			name: formData.name.trim(),
			location: formData.location.trim(),
			country: formData.country.trim(),
			responsible: formData.responsible.trim(),
			status: formData.status.trim(),
			deploymentdate: formData.deploymentdate.trim(),
			description: formData.description,
		});
		// Validate
		let response = validateSubmission(formData);
		if (!response.result) {
			setSubmitState({ ...submitState, error: response.message });
			return;
		}

		// Otherwise continue
		setSubmitState({ ...submitState, loading: true });
		const token = await getAccessTokenSilently();

		const options = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(formData),
		};
		fetch(`${process.env.API_URL}/schools`, options)
			.then((res) => {
				if (res.status === 200) {
					_.debounce(triggerSearch, 500)();
					_.debounce(onClose, 500)();
					toast({
						title: "School Created",
						description: "School created successfully",
						status: "success",
						duration: 5000,
						isClosable: true,
					});
				}
				return res.json();
			})
			.then((data) => {
				if (data.message) {
					setSubmitState({ ...submitState, error: data.message });
				} else {
					setSubmitState({
						...submitState,
						loading: false,
					});
				}
			})
			.catch((err) => {
				setSubmitState({ ...submitState, loading: false, error: err });
			});
	};

	if (submitState.error) {
		return (
			<Center>
				<Text>
					Something went wrong... <br />
					{submitState.error}
				</Text>
			</Center>
		);
	}

	return (
		<>
			<form>
				<FormControl>
					<FormLabel htmlFor="name">Name</FormLabel>
					<Input
						id="name"
						name="name"
						aria-describedby="school name"
						value={formData.name}
						required
						onChange={(e) => onChangeHandler(e)}
					/>
				</FormControl>
				<FormControl mt="4">
					<FormLabel htmlFor="location" mt="4">
						Location
					</FormLabel>
					<Input
						id="location"
						name="location"
						aria-describedby="location"
						required
						value={formData.location}
						onChange={(e) => onChangeHandler(e)}
					/>
				</FormControl>
				<FormControl>
					<FormLabel htmlFor="country" mt="4">
						Country
					</FormLabel>

					{countryDropdown ? (
						<Select
							placeholder="Select country"
							name="country"
							id="country"
							aria-describedby="school country"
							value={formData.country}
							onChange={(e) => onChangeHandler(e)}
						>
							{countries.map(({ country }) => (
								<option value={country} key={country}>
									{country}
								</option>
							))}
							<option value="createnew">Create a New Country</option>
						</Select>
					) : (
						<Input
							id="country"
							name="country"
							aria-describedby="country"
							required
							value={formData.country}
							onChange={(e) => onChangeHandler(e)}
							type="text"
						/>
					)}
				</FormControl>
				<FormControl mt="5">
					<FormLabel htmlFor="responsible">Person Responsible</FormLabel>
					<Input
						id="responsible"
						name="responsible"
						aria-describedby="person responsible"
						value={formData.responsible}
						required
						onChange={(e) => onChangeHandler(e)}
					/>
				</FormControl>
				<FormControl mt="4">
					<FormLabel htmlFor="status">Status</FormLabel>

					{statusDropdown ? (
						<Select
							placeholder="Select status"
							name="status"
							id="status"
							aria-describedby="school status"
							value={formData.status}
							onChange={(e) => onChangeHandler(e)}
						>
							{statuses.map(({ status }) => (
								<option value={status} key={status}>
									{status}
								</option>
							))}
							<option value="createnew">Create a New Status</option>
						</Select>
					) : (
						<Input
							id="status"
							name="status"
							aria-describedby="status"
							required
							value={formData.status}
							onChange={(e) => onChangeHandler(e)}
							type="text"
						/>
					)}
				</FormControl>
				<FormControl mt="4">
					<FormLabel htmlFor="deploymentdate">Deployment Date</FormLabel>
					<Input
						id="deploymentdate"
						name="deploymentdate"
						aria-describedby="deployment date"
						value={formData.deploymentdate}
						required
						type="date" // Date Picker
						onChange={(e) => onChangeHandler(e)}
					/>
				</FormControl>
				<FormControl mt="4">
					<FormLabel htmlFor="description" mt="4">
						Description
					</FormLabel>
					<Textarea
						id="description"
						name="description"
						aria-describedby="description"
						required
						value={formData.description}
						onChange={(e) => onChangeHandler(e)}
					/>
				</FormControl>
				<Center>
					<Button mt="8" onClick={onSubmitHandler}>
						Submit
					</Button>
				</Center>
			</form>
		</>
	);
};

export default CreateSchool;
