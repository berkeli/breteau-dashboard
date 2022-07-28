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

const EditSchedule = ({ schedule, triggerSearch, onClose, dropdownData }) => {
	const toast = useToast();
	const { schools, initiatives, persons } = dropdownData;
	const { getAccessTokenSilently } = useAuth0();
	const [submitState, setSubmitState] = useState({
		loading: false,
		error: null,
	});

	const [formData, setFormData] = useState({
		schoolId: schedule.schoolid,
		programmeInitiativeId: schedule.programmeinitiativeid,
		numOfNewStudents: schedule.numofnewstudents,
		numOfExistingStudents: schedule.numofexistingstudents,
		numOfNewTeachers: schedule.numofnewteachers,
		numOfExistingTeachers: schedule.numofexistingteachers,
		totalNumTablets: schedule.totalnumtablets,
		duration: schedule.duration,
		grades: schedule.grades,
		languagesTaught: schedule.languagestaught,
		supportCategory: schedule.supportcategory,
		supportType: schedule.supporttype,
		deliveredById: schedule.deliveredbyid,
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
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(formData),
		};
		fetch(`${process.env.API_URL}/schedule-tracker/${schedule.id}`, options)
			.then((res) => {
				if (res.status === 200) {
					_.debounce(triggerSearch, 500)();
					_.debounce(onClose, 500)();
					toast({
						title: "Schedule Tracker Updated",
						description: "Schedule Tracker updated successfully",
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
				console.log(err);
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
				<FormControl>
					<FormLabel htmlFor="schoolId">School</FormLabel>
					<Select
						placeholder="Select school"
						name="schoolId"
						id="schoolId"
						aria-describedby="school name"
						value={formData.schoolId}
						onChange={onChangeHandler}
					>
						{schools.map((school) => (
							<option value={school.id} key={school.name}>
								{school.name}
							</option>
						))}
					</Select>
					<FormLabel htmlFor="programmeInitiativeId">Initiative</FormLabel>
					<Select
						placeholder="Select Initiative"
						name="programmeInitiativeId"
						id="programmeInitiativeId"
						aria-describedby="initiative name"
						value={formData.programmeInitiativeId}
						onChange={onChangeHandler}
					>
						{initiatives.map((initiative) => (
							<option value={initiative.id} key={initiative.name}>
								{initiative.name}
							</option>
						))}
					</Select>
					<FormControl>
						<FormLabel htmlFor="deliveredById">Delivered By</FormLabel>
						<Select
							placeholder="Delivered By"
							name="deliveredById"
							id="deliveredById"
							aria-describedby="Delivered By"
							value={formData.deliveredById}
							onChange={onChangeHandler}
						>
							{persons.map((person) => (
								<option value={person.id} key={person.full_name}>
									{person.full_name}
								</option>
							))}
						</Select>
					</FormControl>
					<FormLabel htmlFor="duration">Duration by hour</FormLabel>
					<Input
						placeholder="Duration by hour"
						name="duration"
						id="duration"
						type="number"
						min="0"
						aria-describedby="duration"
						value={formData.duration}
						onChange={onChangeHandler}
					></Input>
					<FormLabel htmlFor="briefSummary">Brief Summary</FormLabel>
					<Textarea
						placeholder="Brief Summary"
						name="briefSummary"
						id="briefSummary"
						aria-describedby="Brief Summary"
						value={formData.briefSummary}
						onChange={onChangeHandler}
					></Textarea>
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
						onChange={onChangeHandler}
					></Input>
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
						onChange={onChangeHandler}
					></Input>
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
						onChange={onChangeHandler}
					></Input>
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
						onChange={onChangeHandler}
					></Input>
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
						onChange={onChangeHandler}
					></Input>
					<FormLabel htmlFor="grades">Grades</FormLabel>
					<Input
						placeholder="Grades"
						name="grades"
						id="grades"
						aria-describedby="Grades"
						value={formData.grades}
						onChange={onChangeHandler}
					></Input>
					<FormLabel htmlFor="languagesTaught">Languages Taught</FormLabel>
					<Input
						placeholder="Languages Taught"
						name="languagesTaught"
						id="languagesTaught"
						aria-describedby="languagesTaught"
						value={formData.languagesTaught}
						onChange={onChangeHandler}
					></Input>
					<FormLabel htmlFor="supportCategory">Support Category</FormLabel>
					<Input
						placeholder="Support Category"
						name="supportCategory"
						id="supportCategory"
						aria-describedby="supportCategory"
						value={formData.supportCategory}
						onChange={onChangeHandler}
					></Input>
					<FormLabel htmlFor="supportType">Support Type</FormLabel>
					<Input
						placeholder="Support Type"
						name="supportType"
						id="supportType"
						aria-describedby="supportType"
						value={formData.supportType}
						onChange={onChangeHandler}
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

export default EditSchedule;
