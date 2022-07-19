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

const CreateInitiative = ({ triggerSearch, onClose, categories }) => {
	const toast = useToast();
	const { getAccessTokenSilently } = useAuth0();
	const [submitState, setSubmitState] = useState({
		loading: false,
		error: null,
	});
	const [categoryDropdown, setCategoryDropdown] = useState(
		categories.length > 0
	);

	const [formData, setFormData] = useState({
		name: "",
		description: "",
		category: "",
	});

	const onChangeHandler = (e) => {
		if (
			e.target.name === "category" &&
			categoryDropdown &&
			e.target.value === "createnew"
		) {
			setCategoryDropdown(false);
			setFormData({ ...formData, area: "" });
			return;
		}

		if (e.target.name === "roles") {
			if (e.target.checked) {
				setFormData({
					...formData,
					roles: [...formData.roles, e.target.value],
				});
			} else {
				setFormData({
					...formData,
					roles: formData.roles.filter((role) => role !== e.target.value),
				});
			}
		} else {
			setFormData({
				...formData,
				[e.target.name]: e.target.value,
			});
		}
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
		fetch(`${process.env.API_URL}/initiatives`, options)
			.then((res) => {
				if (res.status === 200) {
					_.debounce(triggerSearch, 500)();
					_.debounce(onClose, 500)();
					toast({
						title: "Initiative Created",
						description: "Initiative created successfully",
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
						aria-describedby="initiative name"
						value={formData.name}
						required
						onChange={(e) => onChangeHandler(e)}
					/>
					<FormLabel htmlFor="category" mt="4">
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
				</Center>
			</form>
		</>
	);
};

export default CreateInitiative;
