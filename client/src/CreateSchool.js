import React, { useState } from "react";
import { Button } from "@chakra-ui/react";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useAuth0 } from "@auth0/auth0-react";

function CreateSchool() {
	const { getAccessTokenSilently } = useAuth0();
	const [formData, setFormData] = useState({
		schoolName: "",
		location: "",
		country: "",
		responsible: "",
		dateDeployed: "",
		status: "",
	});
	const onChangeHandler = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const onSubmitHandler = () => {
		getAccessTokenSilently().then((token) => {
			fetch("http://localhost:3000/api/schools", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(formData),
			});
		});
	};

	return (
		<div>
			<form className="schoolForm">
				<AddSchoolElement
					text="Country "
					name="country"
					value={formData.country}
					onChangeHandler={onChangeHandler}
				/>
				<AddSchoolElement
					text="Location "
					name="location"
					value={formData.location}
					onChangeHandler={onChangeHandler}
				/>
				<AddSchoolElement
					text="School Name "
					name="schoolName"
					value={formData.schoolName}
					onChangeHandler={onChangeHandler}
				/>
				<AddSchoolElement
					text="Responsible name "
					name="responsible"
					value={formData.responsible}
					onChangeHandler={onChangeHandler}
				/>
				<AddSchoolElement
					text="When deployed "
					name="dateDeployed"
					value={formData.dateDeployed}
					onChangeHandler={onChangeHandler}
				/>
				<AddSchoolElement
					text="Status "
					name="status"
					value={formData.status}
					onChangeHandler={onChangeHandler}
				/>
			</form>
			<Button
				colorScheme="teal"
				size="md"
				className="buttonSubmut"
				onClick={onSubmitHandler}
			>
				Submit
			</Button>
		</div>
	);
}

function AddSchoolElement(props) {
	return (
		<div>
			<FormControl>
				<FormLabel className="formName" htmlFor={props.text}>
					{props.text}
				</FormLabel>
				<Input
					name={props.name}
					value={props.value}
					onChange={(e) => props.onChangeHandler(e)}
					id={props.text}
					className="inputBox"
					type="text"
				/>
			</FormControl>
		</div>
	);
}

export default CreateSchool;
