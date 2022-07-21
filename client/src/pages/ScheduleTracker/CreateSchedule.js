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
		school_id: null,
		initiative_id: null,
		no_of_new_students: null,
		no_of_existing_students: null,
		no_of_new_teachers: null,
		no_of_existing_teachers: null,
		no_of_tablets: null,
		grades: null,
		languages_taught: null,
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
			<form method="post" action="index.html">
				<FormControl>
					<FormLabel htmlFor="school_id">School</FormLabel>
					<Select
						placeholder="Select school"
						name="school_id"
						id="school_id"
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
					<Input
						placeholder="Duration by hour"
						name="school_duration"
						id="school_duration"
						type="number"
						aria-describedby="school duration"
						value={formData.school_duration}
					></Input>
					<Input
						placeholder="Brief Summary"
						name="briefSummary"
						id="school_briefSummary"
						aria-describedby="Brief Summary"
						value={formData.school_briefSummary}
					></Input>
					<Input
						placeholder="Number Of New Teachers"
						name="numOfNewTeachers"
						id="school_numOfNewTeachers"
						aria-describedby="Number Of New Teachers"
						value={formData.school_numOfNewTeachers}
					></Input>
					<Input
						placeholder="Number Of New Students"
						name="numOfNewStudents"
						id="school_numOfNewStudents"
						aria-describedby="Number Of New Students"
						value={formData.school_numOfNewStudents}
					></Input>
					<Input
						placeholder="Number Of Teachers"
						name="numOfExistingTeachers"
						id="school_numOfExistingTeachers"
						aria-describedby="Number Of Teacher"
						value={formData.school_numOfExistingTeachers}
					></Input>
					<Input
						placeholder="Number Of Existing Students"
						name="numOfExistingStudents"
						id="school_numOfExistingStudents"
						aria-describedby="Number Of Existing Students"
						value={formData.school_numOfExistingStudents}
					></Input>
					<Input
						placeholder="Total Number of Tablets"
						name="totalNumTablets"
						id="school_totalNumTablets"
						aria-describedby="Total Number of Tablets"
						value={formData.school_totalNumTablets}
					></Input>
					<Input
						placeholder="Total Number of Tablets"
						name="totalNumTablets"
						id="school_totalNumTablets"
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

				{/* <FormLabel htmlFor="category" mt="4">
						Category
					</FormLabel>

					{categoryDropdown ? (
						<Select
							placeholder="Select area"
							name="category"
							id="category"
							aria-describedby="initiative category"
							value={formData.category}
							onChange={(e) => onChangeHandler(e)}
						>
							{categories.map(({ category }) => (
								<option value={category} key={category}>
									{category}
								</option>
							))}
							<option value="createnew">Create a New Category</option>
						</Select>
					) : (
						<Input
							id="category"
							name="category"
							aria-describedby="category"
							required
							value={formData.category}
							onChange={(e) => onChangeHandler(e)}
							type="text"
						/>
					)}
				</FormControl>
				<FormControl mt="8">
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
				</Center> */}

				<Button type="submit">Add school</Button>
			</form>
		</>
	);
};

export default CreateSchedule;
