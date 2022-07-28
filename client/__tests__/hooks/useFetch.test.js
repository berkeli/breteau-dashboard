/* eslint-disable no-undef */
import { renderHook, act } from "@testing-library/react";
import { useAuth0 } from "@auth0/auth0-react";

import useFetch from "../../src/hooks/useFetch";

jest.mock("@auth0/auth0-react");

const user = {
	email: "johndoe@me.com",
	email_verified: true,
	sub: "auth0|12345678901234",
};

const getAccessTokenSilently = jest.fn();

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

describe("useFetch", () => {
	test("should make a call to the API and return the message", async () => {
		let hook;
		await act(async () => {
			hook = renderHook(() => useFetch("/api"));
		});
		const { result } = hook;
		expect(fetch).toHaveBeenCalledTimes(1);
		expect(result.current.isLoading).toEqual(false);
		expect(result.current.data).toEqual({ message: "Test" });
		expect(result.current.isLoading).toEqual(false);
		expect(result.current.error).toEqual(null);
	});
});
