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

const CreateSchedule = ({ triggerSearch, onClose, dropdownData }) => {
	const toast = useToast();
	const { schools, initiatives, persons } = dropdownData;
	const { user } = useAuth0();
	const { getAccessTokenSilently } = useAuth0();
	const [submitState, setSubmitState] = useState({
		loading: false,
		error: null,
	});

	const [formData, setFormData] = useState({
		schoolId: "",
		programmeInitiativeId: "",
		deliveredById: persons.find((e) => e.auth0_id === user.sub)?.id || "",
		numOfNewStudents: 0,
		numOfExistingStudents: 0,
		numOfNewTeachers: 0,
		numOfExistingTeachers: 0,
		totalNumTablets: 0,
		duration: 0,
		grades: "",
		languagesTaught: "",
		supportCategory: "",
		supportType: "",
	});

	const onChangeHandler = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};
	const onSubmitHandler = async () => {
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
		fetch(`${process.env.API_URL}/schedule-tracker`, options)
			.then((res) => {
				if (res.status === 200) {
					_.debounce(triggerSearch, 500)();
					_.debounce(onClose, 500)();
					toast({
						title: "Schedule Tracker Created",
						description: "Schedule Tracker  created successfully",
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
				<FormControl isRequired isInvalid={!formData.schoolId}>
					<FormLabel htmlFor="schoolId">School</FormLabel>
					<Select
						placeholder="Select school"
						name="schoolId"
						id="schoolId"
						aria-describedby="school name"
						value={formData.schoolId}
						onChange={(e) => onChangeHandler(e)}
					>
						{schools.map((school) => (
							<option value={school.id} key={school.name}>
								{school.name}
							</option>
						))}
					</Select>
					{formData.schoolId ? (
						<FormHelperText>Please select school.</FormHelperText>
					) : (
						<FormErrorMessage>School is required.</FormErrorMessage>
					)}
				</FormControl>
				<FormControl isRequired isInvalid={!formData.programmeInitiativeId}>
					<FormLabel htmlFor="programmeInitiativeId">Initiative</FormLabel>
					<Select
						placeholder="Select Initiative"
						name="programmeInitiativeId"
						id="programmeInitiativeId"
						aria-describedby="initiative name"
						value={formData.programmeInitiativeId}
						onChange={(e) => onChangeHandler(e)}
					>
						{initiatives.map((initiative) => (
							<option value={initiative.id} key={initiative.name}>
								{initiative.name}
							</option>
						))}
					</Select>
					{formData.programmeInitiativeId ? (
						<FormHelperText>Please select Initiative.</FormHelperText>
					) : (
						<FormErrorMessage>Initiative is required.</FormErrorMessage>
					)}
				</FormControl>
				<FormControl isRequired isInvalid={!formData.deliveredById}>
					<FormLabel htmlFor="deliveredById">Delivered By</FormLabel>
					<Select
						placeholder="Delivered By"
						name="deliveredById"
						id="deliveredById"
						aria-describedby="Delivered By"
						value={formData.deliveredById}
						onChange={(e) => onChangeHandler(e)}
					>
						{persons.map((person) => (
							<option value={person.id} key={person.full_name}>
								{person.full_name}
							</option>
						))}
					</Select>
				</FormControl>
				<FormControl
					isInvalid={
						Number(formData.duration) < 0 ||
						(!formData.duration && formData.duration !== 0)
					}
					isRequired
				>
					<FormLabel htmlFor="duration">Duration by hour</FormLabel>
					<Input
						placeholder="Duration by hour"
						name="duration"
						id="duration"
						type="number"
						min="0"
						aria-describedby="duration"
						value={formData.duration}
						onChange={(e) => onChangeHandler(e)}
					></Input>
					{formData.duration ? (
						<FormHelperText>Please input the duration.</FormHelperText>
					) : (
						<FormErrorMessage>Duration is required.</FormErrorMessage>
					)}
				</FormControl>
				<FormControl isRequired isInvalid={!formData.briefSummary}>
					<FormLabel htmlFor="briefSummary">Brief Summary</FormLabel>
					<Textarea
						placeholder="Brief Summary"
						name="briefSummary"
						id="briefSummary"
						aria-describedby="Brief Summary"
						value={formData.briefSummary}
						onChange={(e) => onChangeHandler(e)}
					></Textarea>
					{formData.briefSummary ? (
						<FormHelperText>Please add brief summary.</FormHelperText>
					) : (
						<FormErrorMessage>Brief summary is required.</FormErrorMessage>
					)}
				</FormControl>
				<FormControl
					isInvalid={
						Number(formData.numOfNewTeachers) < 0 ||
						(!formData.numOfNewTeachers && formData.numOfNewTeachers !== 0)
					}
					isRequired
				>
					<FormLabel htmlFor="numOfNewTeachers">
						Number of New Teachers
					</FormLabel>
					<Input
						placeholder="Number Of New Teachers"
						name="numOfNewTeachers"
						id="numOfNewTeachers"
						type="number"
						min="0"
						aria-describedby="Number Of New Teachers"
						value={formData.numOfNewTeachers}
						onChange={(e) => onChangeHandler(e)}
					></Input>
					{formData.numOfNewTeachers ? (
						<FormHelperText>
							Please input the number of new teachers.
						</FormHelperText>
					) : (
						<FormErrorMessage>
							Number of new teachers is required.
						</FormErrorMessage>
					)}
				</FormControl>
				<FormControl
					isInvalid={
						Number(formData.numOfNewStudents) < 0 ||
						(!formData.numOfNewStudents && formData.numOfNewStudents !== 0)
					}
					isRequired
				>
					<FormLabel htmlFor="numOfNewStudents">
						Number of New Students
					</FormLabel>
					<Input
						placeholder="Number Of New Students"
						name="numOfNewStudents"
						id="numOfNewStudents"
						type="number"
						min="0"
						aria-describedby="Number Of New Students"
						value={formData.numOfNewStudents}
						onChange={(e) => onChangeHandler(e)}
					></Input>
					{formData.numOfNewStudents ? (
						<FormHelperText>
							Please input number of new students.
						</FormHelperText>
					) : (
						<FormErrorMessage>
							Number of new students is required.
						</FormErrorMessage>
					)}
				</FormControl>
				<FormControl
					isInvalid={
						Number(formData.numOfExistingTeachers) < 0 ||
						(!formData.numOfExistingTeachers &&
							formData.numOfExistingTeachers !== 0)
					}
					isRequired
				>
					<FormLabel htmlFor="numOfExistingTeachers">
						Number Of Existing Teachers
					</FormLabel>
					<Input
						placeholder="Number Of Existing Teachers"
						name="numOfExistingTeachers"
						id="numOfExistingTeachers"
						type="number"
						min="0"
						aria-describedby="Number Of Teacher"
						value={formData.numOfExistingTeachers}
						onChange={(e) => onChangeHandler(e)}
					></Input>
					{formData.numOfExistingTeachers ? (
						<FormHelperText>
							Please input number of new teachers.
						</FormHelperText>
					) : (
						<FormErrorMessage>
							Number of new teachers is required.
						</FormErrorMessage>
					)}
				</FormControl>
				<FormControl
					isInvalid={
						Number(formData.numOfExistingStudents) < 0 ||
						(!formData.numOfExistingStudents &&
							formData.numOfExistingStudents !== 0)
					}
					isRequired
				>
					<FormLabel htmlFor="numOfExistingStudents">
						Number Of Existing Students
					</FormLabel>
					<Input
						placeholder="Number Of Existing Students"
						name="numOfExistingStudents"
						id="numOfExistingStudents"
						type="number"
						min="0"
						aria-describedby="Number Of Existing Students"
						value={formData.numOfExistingStudents}
						onChange={(e) => onChangeHandler(e)}
					></Input>
					{formData.numOfExistingStudents ? (
						<FormHelperText>
							Please input number of existing students.
						</FormHelperText>
					) : (
						<FormErrorMessage>
							Number of existing students is required.
						</FormErrorMessage>
					)}
				</FormControl>
				<FormControl>
					<FormLabel htmlFor="totalNumTablets">
						Total Number of Tablets
					</FormLabel>
					<Input
						placeholder="Total Number of Tablets"
						name="totalNumTablets"
						id="totalNumTablets"
						type="number"
						min="0"
						aria-describedby="Total Number of Tablets"
						value={formData.totalNumTablets}
						onChange={(e) => onChangeHandler(e)}
					></Input>
				</FormControl>
				<FormControl>
					<FormLabel htmlFor="grades">Grades</FormLabel>
					<Input
						placeholder="Grades"
						name="grades"
						id="grades"
						aria-describedby="Grades"
						value={formData.grades}
						onChange={(e) => onChangeHandler(e)}
					></Input>
				</FormControl>
				<FormControl>
					<FormLabel htmlFor="languagesTaught">Languages Taught</FormLabel>
					<Input
						placeholder="Languages Taught"
						name="languagesTaught"
						id="languagesTaught"
						aria-describedby="languagesTaught"
						value={formData.languagesTaught}
						onChange={(e) => onChangeHandler(e)}
					></Input>
				</FormControl>
				<FormControl>
					<FormLabel htmlFor="supportCategory">Support Category</FormLabel>
					<Input
						placeholder="Support Category"
						name="supportCategory"
						id="supportCategory"
						aria-describedby="supportCategory"
						value={formData.supportCategory}
						onChange={(e) => onChangeHandler(e)}
					></Input>
				</FormControl>
				<FormControl>
					<FormLabel htmlFor="supportType">Support Type</FormLabel>
					<Input
						placeholder="Support Type"
						name="supportType"
						id="supportType"
						aria-describedby="supportType"
						value={formData.supportType}
						onChange={(e) => onChangeHandler(e)}
					></Input>
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

export default CreateSchedule;
