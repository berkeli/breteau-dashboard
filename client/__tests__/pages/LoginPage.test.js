import "@testing-library/jest-dom";
import React from "react";
import { render, screen } from "@testing-library/react";
import LoginPage from "../../src/pages/LoginPage";
import { useAuth0 } from "@auth0/auth0-react";

jest.mock("@auth0/auth0-react");

const user = {
	email: "johndoe@me.com",
	email_verified: true,
	sub: "auth0|12345678901234",
};
const loginWithRedirect = jest.fn();
useAuth0.mockReturnValue({
	isAuthenticated: false,
	user,
	logout: jest.fn(),
	loginWithRedirect,
	getAccessTokenSilently: jest.fn(),
});
describe("LoginPage", () => {
	test("renders login button", () => {
		render(<LoginPage />);
		const login = screen.getByText(/login/i);
		expect(login).toBeInTheDocument();
	});

	test("calls loginWithRedirect from auth0 when clicked the button", () => {
		render(<LoginPage />);
		const login = screen.getByText(/login/i);
		login.click();
		expect(loginWithRedirect).toHaveBeenCalledTimes(1);
	});
});
