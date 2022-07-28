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

const CreateSchool = ({ triggerSearch, onClose, countries, statuses, persons }) => {
	const toast = useToast();
	const { getAccessTokenSilently } = useAuth0();
	const [submitState, setSubmitState] = useState({
		loading: false,
		error: null,
	});
	const [countryDropdown, setCountryDropdown] = useState(countries.length > 0);
	const [statusDropdown, setStatusDropdown] = useState(statuses.length > 0);

	const blankRegex = new RegExp(/^[ \t]*$/);
	// Arbitrary Limit 01/02/1970
	const feb1970Limit = new Date(1970, 1, 1).getTime();

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

		if (e.target.name === "country" &&
			countryDropdown &&
			e.target.value === "createnew") {
				setCountryDropdown(false);
				setFormData({ ...formData, country:"" });
				return;
			}

		if (
			e.target.name === "status" &&
			statusDropdown &&
			e.target.value === "createnew"
		) {
			setStatusDropdown(false);
			setFormData({ ...formData, status: "" });
			return;
		}

		setFormData({
			...formData,
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
		if (
			typeof timestamp !== "number" ||
			Number.isNaN(timestamp) ||
			timestamp < feb1970Limit
		) {
			return false;
		}
		return date.toISOString().startsWith(dateStr);
	}

	// Some Validation
	const isSubmissionInvalid = (formData) => {
		if (
			formData.name === "" ||
			formData.location === "" ||
			formData.country === "" ||
			formData.responsible === "" ||
			formData.status === "" ||
			formData.description === ""
		) {
			return true;
		}

		// Date Validation

		if (
			formData.deploymentdate === "" ||
			!dateIsValid(formData.deploymentdate)
		) {
			return true;
		}

		return false; // Passed Validation i.e. Not Invalid
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
			description: formData.description.trim(),
		});

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
				<FormControl isRequired isInvalid={blankRegex.test(formData.name)}>
					<FormLabel htmlFor="name">Name</FormLabel>
					<Input
						id="name"
						name="name"
						aria-describedby="school name"
						value={formData.name}
						onChange={(e) => onChangeHandler(e)}
					/>
				</FormControl>
				<FormControl
					isRequired
					isInvalid={blankRegex.test(formData.location)}
					mt="4"
				>
					<FormLabel htmlFor="location" mt="4">
						Location
					</FormLabel>
					<Input
						id="location"
						name="location"
						aria-describedby="location"
						value={formData.location}
						onChange={(e) => onChangeHandler(e)}
					/>
				</FormControl>
				<FormControl isRequired isInvalid={blankRegex.test(formData.country)}>
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
							value={formData.country}
							onChange={(e) => onChangeHandler(e)}
							type="text"
						/>
					)}
				</FormControl>
				<FormControl
					isRequired
					isInvalid={blankRegex.test(formData.responsible)}
					mt="5"
				>
					<FormLabel htmlFor="responsible">Person Responsible</FormLabel>
					<Select
						placeholder="Select person"
						name="responsible"
						id="responsible"
						aria-describedby="person responsible"
						value={formData.responsible}
						onChange={(e) => onChangeHandler(e)}
					>
						{persons.map(({ name }) => (
							<option value={name} key={name}>
								{name}
							</option>
						))}
					</Select>
				</FormControl>
				<FormControl
					isRequired
					isInvalid={blankRegex.test(formData.status)}
					mt="4"
				>
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
							value={formData.status}
							onChange={(e) => onChangeHandler(e)}
							type="text"
						/>
					)}
				</FormControl>
				<FormControl
					isRequired
					isInvalid={blankRegex.test(formData.deploymentdate)}
					mt="4"
				>
					<FormLabel htmlFor="deploymentdate">Deployment Date</FormLabel>
					<Input
						id="deploymentdate"
						name="deploymentdate"
						aria-describedby="deployment date"
						value={formData.deploymentdate}
						type="date" // Date Picker
						onChange={(e) => onChangeHandler(e)}
					/>
				</FormControl>
				<FormControl
					isRequired
					isInvalid={blankRegex.test(formData.description)}
					mt="4"
				>
					<FormLabel htmlFor="description" mt="4">
						Description
					</FormLabel>
					<Textarea
						id="description"
						name="description"
						aria-describedby="description"
						value={formData.description}
						onChange={(e) => onChangeHandler(e)}
					/>
				</FormControl>
				<Center>
					<Button
						mt="8"
						onClick={onSubmitHandler}
						disabled={isSubmissionInvalid(formData)}
					>
						Submit
					</Button>
				</Center>
			</form>
		</>
	);
};

export default CreateSchool;
