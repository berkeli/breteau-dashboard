/* eslint-disable no-undef */
import { renderHook, waitFor } from "@testing-library/react";
import { useAuth0 } from "@auth0/auth0-react";

import useFetch from "../../src/hooks/useFetch";
import { act } from "react-dom/test-utils";

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

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
	test("should have a loading state at first", async () => {
		const { result } = renderHook(() => useFetch("/api"));
		expect(result.current.isLoading).toEqual(true);
	});

	test("should make an API call on mount", async () => {
		const { result } = renderHook(() => useFetch("/api"));

		await act(async () => {
			await waitFor(() => result.current.data === null);
		});

		expect(fetch).toHaveBeenCalledTimes(1);

		expect(getAccessTokenSilently).toHaveBeenCalledTimes(1);

		expect(result.current.data).toEqual({ message: "Test" });
		expect(result.current.isLoading).toEqual(false);
		expect(result.current.error).toEqual(null);
	});
});
