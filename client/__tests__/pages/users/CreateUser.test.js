import "@testing-library/jest-dom";
import {
	fireEvent,
	render,
	screen,
	queryByAttribute,
	act,
} from "@testing-library/react";
import CreateUser from "../../../src/pages/users/CreateUser";
import { useAuth0 } from "@auth0/auth0-react";
const getById = queryByAttribute.bind(null, "id");
const roles = [
	{ name: "Admin", id: 1 },
	{ name: "Super Admin", id: 2 },
	{ name: "Country Manager", id: 3 },
];

jest.mock("@auth0/auth0-react");

const user = {
	email: "johndoe@me.com",
	email_verified: true,
	sub: "auth0|12345678901234",
};
const getAccessTokenSilently = jest.fn();
getAccessTokenSilently.mockResolvedValue("SOME TOKEN");
useAuth0.mockReturnValue({
	isAuthenticated: true,
	user,
	logout: jest.fn(),
	loginWithRedirect: jest.fn(),
	getAccessTokenSilently,
});

global.fetch = jest.fn(() =>
	Promise.resolve({
		json: () => Promise.resolve({ message: "Test" }),
	})
);

describe("LoginPage", () => {
	test("Renders create user form with a disabled button", () => {
		render(<CreateUser roles={roles} />);
		const submit = screen.getByText(/submit/i);
		expect(submit).toBeInTheDocument();
		expect(submit).toBeDisabled();
	});

	test("Renders roles as checkboxes and other fields", () => {
		render(<CreateUser roles={roles} />);

		const name = screen.getByLabelText(/full name/i);
		const email = screen.getByLabelText(/email/i);

		expect(name).toBeInTheDocument();
		expect(email).toBeInTheDocument();

		const roleCheckBoxes = screen.getAllByRole("checkbox", {
			checked: false,
		});
		expect(roleCheckBoxes.length).toBe(roles.length);
	});

	test("Enables the button when all fields are filled out", () => {
		const dom = render(<CreateUser roles={roles} />);

		const name = getById(dom.container, "fullName");
		const email = getById(dom.container, "email");
		const country = getById(dom.container, "country");
		const submit = screen.getByText(/submit/i);

		fireEvent.change(name, { target: { value: "John Doe" } });
		fireEvent.change(email, { target: { value: "jon@apple.com" } });
		fireEvent.change(country, { target: { value: "Germany" } });

		expect(submit).toBeEnabled();
	});

	test("onChangeHandler updates the state and the input value", async () => {
		const dom = render(<CreateUser roles={roles} />);

		const name = getById(dom.container, "fullName");
		const email = getById(dom.container, "email");
		const country = getById(dom.container, "country");

		await act(async () => {
			fireEvent.change(name, { target: { value: "John Doe" } });
			fireEvent.change(email, { target: { value: "jon@apple.com" } });
			fireEvent.change(country, { target: { value: "Germany" } });
		});

		expect(name.value).toBe("John Doe");
		expect(email.value).toBe("jon@apple.com");
		expect(country.value).toBe("Germany");
	});

	test("Sends a POST request to the /api/users enpoint after obtaining the token", async () => {
		const dom = render(<CreateUser roles={roles} />);

		const name = getById(dom.container, "fullName");
		const email = getById(dom.container, "email");
		const country = getById(dom.container, "country");
		const submit = screen.getByText(/submit/i);

		fireEvent.change(name, { target: { value: "John Doe" } });
		fireEvent.change(email, { target: { value: "jon@apple.com" } });
		fireEvent.change(country, { target: { value: "Germany" } });

		await act(async () => {
			fireEvent.click(submit);
		});

		expect(getAccessTokenSilently).toHaveBeenCalledTimes(1);
		expect(fetch).toHaveBeenCalledTimes(1);
	});

	test("Shows error message when there's an erorr response", async () => {
		const dom = render(<CreateUser roles={roles} />);

		global.fetch = jest.fn(() =>
			Promise.resolve({
				ok: false,
				status: 500,
				json: () => Promise.resolve({ message: "Some Random error!" }),
			})
		);

		const name = getById(dom.container, "fullName");
		const email = getById(dom.container, "email");
		const country = getById(dom.container, "country");
		const submit = screen.getByText(/submit/i);

		fireEvent.change(name, { target: { value: "John Doe" } });
		fireEvent.change(email, { target: { value: "jon@apple.com" } });
		fireEvent.change(country, { target: { value: "Germany" } });

		await act(async () => {
			fireEvent.click(submit);
		});

		const error = screen.getByText(/some random error/i);

		expect(error).toBeInTheDocument();
	});
});
