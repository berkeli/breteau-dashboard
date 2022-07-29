// Some Validation
export const isSubmissionInvalid = (formData) => {
	if (
		formData.name.trim() === "" ||
		formData.location.trim() === "" ||
		formData.country.trim() === "" ||
		formData.responsiblename.trim() === "" ||
		formData.status.trim() === "" ||
		formData.description.trim() === ""
	) {
		return true;
	}

	return false; // Passed Validation i.e. Not Invalid
};
