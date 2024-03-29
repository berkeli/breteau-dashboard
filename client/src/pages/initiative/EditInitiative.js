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

const EditInitiative = ({ triggerSearch, onClose, categories, initiative }) => {
	const toast = useToast();
	const { getAccessTokenSilently } = useAuth0();
	const [submitState, setSubmitState] = useState({
		loading: false,
		error: null,
	});
	const [categoryDropdown, setCategoryDropdown] = useState(true);

	const [formData, setFormData] = useState({
		name: initiative.name,
		description: initiative.description,
		category: initiative.category,
	});

	const onChangeHandler = (e) => {
		if (
			e.target.name === "category" &&
			categoryDropdown &&
			e.target.value === "createnew"
		) {
			setCategoryDropdown(false);
			setFormData({ ...formData, category: "" });
			return;
		} else {
			setFormData({
				...formData,
				[e.target.name]: e.target.value,
			});
		}
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
			body: JSON.stringify({ ...formData, id: initiative.id }),
		};
		fetch(`${process.env.API_URL}/initiatives`, options)
			.then((res) => {
				if (res.status === 200) {
					_.debounce(triggerSearch, 500)();
					_.debounce(onClose, 500)();
					toast({
						title: "Initiative Updated",
						description: "Initiative Updated successfully",
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
				<FormControl isRequired isInvalid={formData.name === ""}>
					<FormLabel htmlFor="name">Name</FormLabel>
					<Input
						id="name"
						name="name"
						aria-describedby="initiative name"
						value={formData.name}
						onChange={onChangeHandler}
					/>
					{!formData.name === "" ? (
						<FormHelperText>Enter the name of the initiative.</FormHelperText>
					) : (
						<FormErrorMessage>Name is required.</FormErrorMessage>
					)}
				</FormControl>
				<FormControl isRequired isInvalid={formData.category === ""}>
					<FormLabel htmlFor="category" mt="4">
						Category
					</FormLabel>
					{categoryDropdown ? (
						<Select
							placeholder="Select category"
							name="category"
							id="category"
							aria-describedby="initiative category"
							value={formData.category}
							onChange={onChangeHandler}
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
							value={formData.category}
							onChange={onChangeHandler}
							type="text"
						/>
					)}
					{!formData.category === "" ? (
						<FormHelperText>
							Enter the category of the initiative.
						</FormHelperText>
					) : (
						<FormErrorMessage>Category is required.</FormErrorMessage>
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
						onChange={onChangeHandler}
					/>
				</FormControl>
				<Center>
					<Button
						mt="8"
						onClick={onSubmitHandler}
						type="submit"
						disabled={formData.name === "" || formData.category === ""}
					>
						Submit
					</Button>
				</Center>
			</form>
		</>
	);
};

export default EditInitiative;
