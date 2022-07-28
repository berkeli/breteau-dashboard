import React, { useState } from "react";
import {
	Button,
	Center,
	Checkbox,
	CheckboxGroup,
	FormControl,
	FormErrorMessage,
	FormHelperText,
	FormLabel,
	Input,
	Stack,
	Text,
	useToast,
} from "@chakra-ui/react";
import { useAuth0 } from "@auth0/auth0-react";
import _ from "lodash";

const CreateUser = ({ triggerSearch, onClose, roles }) => {
	const toast = useToast();
	const { getAccessTokenSilently } = useAuth0();
	const [submitState, setSubmitState] = useState({
		loading: false,
		error: null,
	});

	const [formData, setFormData] = useState({
		fullName: "",
		email: "",
		roles: [],
	});

	const onChangeHandler = (e) => {
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

	const validateInputs =
		!formData.fullName || !formData.email || !formData.country;

	const onSubmitHandler = async (e) => {
		e.preventDefault();
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
		fetch(`${process.env.API_URL}/users`, options)
			.then((res) => {
				if (res.status === 200) {
					_.debounce(triggerSearch, 500)();
					_.debounce(onClose, 500)();
					toast({
						title: "User Created",
						description:
							"We have created the user account and sent invitation email",
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
				<FormControl isRequired isInvalid={!formData.fullName}>
					<FormLabel htmlFor="fullName">Full Name</FormLabel>
					<Input
						id="fullName"
						name="fullName"
						aria-describedby="full name"
						value={formData.fullName}
						required
						onChange={onChangeHandler}
					/>
					{formData.fullName ? (
						<FormHelperText>Enter full name of the user.</FormHelperText>
					) : (
						<FormErrorMessage>Name is required.</FormErrorMessage>
					)}
				</FormControl>
				<FormControl isRequired isInvalid={!formData.email}>
					<FormLabel htmlFor="email" mt="4">
						Email
					</FormLabel>
					<Input
						id="email"
						name="email"
						aria-describedby="email"
						required
						value={formData.email}
						onChange={onChangeHandler}
						type="email"
					/>
					{formData.email ? (
						<FormHelperText>Enter email of the user.</FormHelperText>
					) : (
						<FormErrorMessage>Email is required.</FormErrorMessage>
					)}
				</FormControl>
				<FormControl isRequired isInvalid={!formData.country}>
					<FormLabel htmlFor="country" mt="4">
						Country
					</FormLabel>
					<Input
						id="country"
						name="country"
						aria-describedby="country"
						value={formData.country}
						onChange={onChangeHandler}
						type="text"
					/>
					{formData.country ? (
						<FormHelperText>Enter Country of the user.</FormHelperText>
					) : (
						<FormErrorMessage>Country is required.</FormErrorMessage>
					)}
				</FormControl>
				<FormControl mt="8">
					<CheckboxGroup p={2}>
						<FormLabel>Assign Roles</FormLabel>
						<Stack spacing={5} direction="row">
							{roles.map((role) => (
								<Checkbox
									name="roles"
									key={role.id}
									isChecked={formData.roles.includes(role.id)}
									value={role.id}
									onChange={(e) => onChangeHandler(e)}
								>
									{role.name}
								</Checkbox>
							))}
						</Stack>
					</CheckboxGroup>
				</FormControl>
				<Center>
					<Button
						mt="8"
						onClick={onSubmitHandler}
						type="submit"
						disabled={validateInputs}
					>
						Submit
					</Button>
				</Center>
			</form>
		</>
	);
};

export default CreateUser;
