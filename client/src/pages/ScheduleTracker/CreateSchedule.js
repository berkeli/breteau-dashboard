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

const CreateSchedule = ({ triggerSearch, onClose, dropdownData }) => {
	const toast = useToast();
	const { schools, initiatives } = dropdownData;
	const { getAccessTokenSilently } = useAuth0();
	const [submitState, setSubmitState] = useState({
		loading: false,
		error: null,
	});

	console.log(dropdownData);

	const [formData, setFormData] = useState({
		school_id: "", // change to camel case
		initiative_id: "",
		noOfNewStudents: "",
		noOfExistingStudents: null,
		noOfNewTeachers: null,
		noOfExistingTeachers: null,
		noOfTablets: null,
		grades: null,
		languagesTaught: null,
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

		console.log("formData ", formData);

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
				<FormControl>
					<FormLabel htmlFor="schoolId">School</FormLabel>
					<Select
						placeholder="Select school"
						name="schoolId"
						id="schoolId"
						aria-describedby="school name"
						value={formData.school_id}
						onChange={(e) => onChangeHandler(e)}
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
						aria-describedby="school name"
						value={formData.school_id}
						onChange={(e) => onChangeHandler(e)}
					>
						{schools.map((school) => (
							<option value={school.id} key={school.name}>
								{school.name}
							</option>
						))}
					</Select>
					<FormLabel htmlFor="duration">Duration by hour</FormLabel>
					<Input
						placeholder="Duration by hour"
						name="duration"
						id="duration"
						type="number"
						aria-describedby="school duration"
						value={formData.school_duration}
					></Input>
					<FormLabel htmlFor="briefSummary">Brief Summary</FormLabel>
					<Textarea
						placeholder="Brief Summary"
						name="briefSummary"
						id="briefSummary"
						aria-describedby="Brief Summary"
						value={formData.school_briefSummary}
					></Textarea>
					<FormLabel htmlFor="numOfNewTeachers">Number of Teachers</FormLabel>
					<Input
						placeholder="Number Of New Teachers"
						name="numOfNewTeachers"
						id="numOfNewTeachers"
						aria-describedby="Number Of New Teachers"
						value={formData.school_numOfNewTeachers}
					></Input>
					<Input
						placeholder="Number Of New Students"
						name="numOfNewStudents"
						id="numOfNewStudents"
						aria-describedby="Number Of New Students"
						value={formData.school_numOfNewStudents}
					></Input>
					<Input
						placeholder="Number Of Teachers"
						name="numOfExistingTeachers"
						id="numOfExistingTeachers"
						aria-describedby="Number Of Teacher"
						value={formData.school_numOfExistingTeachers}
					></Input>
					<Input
						placeholder="Number Of Existing Students"
						name="numOfExistingStudents"
						id="numOfExistingStudents"
						aria-describedby="Number Of Existing Students"
						value={formData.school_numOfExistingStudents}
					></Input>
					<Input
						placeholder="Total Number of Tablets"
						name="totalNumTablets"
						id="totalNumTablets"
						aria-describedby="Total Number of Tablets"
						value={formData.school_totalNumTablets}
					></Input>
					<Input
						placeholder="Total Number of Tablets"
						name="totalNumTablets"
						id="totalNumTablets"
						aria-describedby="Total Number of Tablets"
						value={formData.school_totalNumTablets}
					></Input>
					<Input
						placeholder="Grades"
						name="grades"
						id="school_grades"
						aria-describedby="Grades"
						value={formData.school_grades}
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
