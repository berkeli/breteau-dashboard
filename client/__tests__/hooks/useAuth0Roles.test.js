import { renderHook, cleanup } from "@testing-library/react";
import { useAuth0 } from "@auth0/auth0-react";

import useAuth0Roles from "../../src/hooks/useAuth0Roles";

jest.mock("@auth0/auth0-react");
const namespace = "http://breteau.com/roles";
const USER_CM = {
	email: "johndoe@me.com",
	email_verified: true,
	sub: "auth0|12345678901234",
	[namespace]: ["Country Manager"],
};

const USER_ADMIN = {
	email: "johndoe@me.com",
	email_verified: true,
	sub: "auth0|12345678901234",
	[namespace]: ["Admin"],
};

const USER_SUPER_ADMIN = {
	email: "johndoe@me.com",
	email_verified: true,
	sub: "auth0|12345678901234",
	[namespace]: ["Super Admin"],
};

afterEach(() => cleanup());
useAuth0.mockReturnValue({
	isAuthenticated: true,
	user: USER_CM,
	logout: jest.fn(),
	loginWithRedirect: jest.fn(),
	getAccessTokenSilently: jest.fn(),
});
describe("useAuth0Roles", () => {
	test("should provide an object with 3 keys", async () => {
		const { result } = renderHook(() => useAuth0Roles("/api"));
		const { current } = result;
		expect(current).toHaveProperty("isAdmin");
		expect(current).toHaveProperty("isSuperAdmin");
		expect(current).toHaveProperty("isCountryManager");
	});

	test("should return true for isCountryManager and false for the other 2", async () => {
		const { result } = renderHook(() => useAuth0Roles("/api"));
		const { current } = result;

		expect(current.isCountryManager).toBe(true);
		expect(current.isAdmin).toBe(false);
		expect(current.isSuperAdmin).toBe(false);
	});

	test("should return true for Admin and false for Super Admin", async () => {
		useAuth0.mockReturnValue({
			isAuthenticated: true,
			user: USER_ADMIN,
			logout: jest.fn(),
			loginWithRedirect: jest.fn(),
			getAccessTokenSilently: jest.fn(),
		});
		const { result } = renderHook(() => useAuth0Roles("/api"));
		const { current } = result;
		expect(current.isCountryManager).toBe(true);
		expect(current.isAdmin).toBe(true);
		expect(current.isSuperAdmin).toBe(false);
	});

	test("should return true for all roles for Super Admins", async () => {
		useAuth0.mockReturnValue({
			isAuthenticated: true,
			user: USER_SUPER_ADMIN,
			logout: jest.fn(),
			loginWithRedirect: jest.fn(),
			getAccessTokenSilently: jest.fn(),
		});
		const { result } = renderHook(() => useAuth0Roles("/api"));
		const { current } = result;

		expect(current.isCountryManager).toBe(true);
		expect(current.isAdmin).toBe(true);
		expect(current.isSuperAdmin).toBe(true);
	});
});
