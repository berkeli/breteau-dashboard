import React, { useState } from "react";
import {
	Button,
	Center,
	FormControl,
	FormErrorMessage,
	FormHelperText,
	FormLabel,
	Input,
	Select,
	Text,
	Textarea,
	useToast,
} from "@chakra-ui/react";
import { useAuth0 } from "@auth0/auth0-react";
import _ from "lodash";
import { isSubmissionInvalid } from "../../utils/isSubmissionInvalid";
import { isDateInvalid } from "../../utils/isDateInvalid";

const EditSchool = ({
	triggerSearch,
	onClose,
	countries,
	statuses,
	persons,
	schoolData,
}) => {
	const toast = useToast();
	const { getAccessTokenSilently } = useAuth0();
	const [submitState, setSubmitState] = useState({
		loading: false,
		error: null,
	});
	const [countryDropdown, setCountryDropdown] = useState(countries.length > 0);
	const [statusDropdown, setStatusDropdown] = useState(statuses.length > 0);

	// sv-SE is YYYY-MM-DD format
	const convertDate = (dateStr) =>
		new Date(dateStr).toLocaleDateString("sv-SE").split("T")[0];

	const blankRegex = new RegExp(/^[ \t]*$/);

	const [formData, setFormData] = useState({
		// name: initiative.name,
		// description: initiative.description,
		// category: initiative.category,
		...schoolData,
		responsiblename: schoolData.full_name,
		deploymentdate: convertDate(schoolData.deploymentdate),
	});

	const onChangeHandler = (e) => {
		if (
			e.target.name === "country" &&
			countryDropdown &&
			e.target.value === "createnew"
		) {
			setCountryDropdown(false);
			setFormData({ ...formData, country: "" });
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

	const onSubmitHandler = async (e) => {
		e.preventDefault();

		setSubmitState({ ...submitState, loading: true });
		const token = await getAccessTokenSilently();

		const options = {
			method: "PUT",
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
						title: "School Updated",
						description: "School Updated successfully",
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
				setSubmitState({ ...submitState, loading: false, error: err.message });
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
					{formData.name === "" ? (
						<FormHelperText>Enter the name of the school.</FormHelperText>
					) : (
						<FormErrorMessage>
							School Name is required. It cannot be spaces.
						</FormErrorMessage>
					)}
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
					{formData.location === "" ? (
						<FormHelperText>Enter the name of the location.</FormHelperText>
					) : (
						<FormErrorMessage>
							Location is required. It cannot be spaces.
						</FormErrorMessage>
					)}
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
					isInvalid={blankRegex.test(formData.responsiblename)}
					mt="5"
				>
					<FormLabel htmlFor="responsible">Person Responsible</FormLabel>
					<Select
						placeholder="Select person"
						name="responsiblename"
						id="responsible"
						aria-describedby="person responsible"
						value={formData.responsiblename}
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
					isInvalid={isDateInvalid(formData.deploymentdate)}
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
					<FormErrorMessage>Valid Date required after 1970.</FormErrorMessage>
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
					{formData.description === "" ? (
						<FormHelperText>Enter a description of the school.</FormHelperText>
					) : (
						<FormErrorMessage>
							A description of the school is required. It cannot be spaces.
						</FormErrorMessage>
					)}
				</FormControl>
				<Center>
					<Button
						mt="8"
						onClick={onSubmitHandler}
						disabled={
							isSubmissionInvalid(formData) ||
							isDateInvalid(formData.deploymentdate)
						}
					>
						Submit
					</Button>
				</Center>
			</form>
		</>
	);
};

export default EditSchool;
