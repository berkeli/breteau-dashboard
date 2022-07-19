import { prisma } from "../../db/";

export const createSchool = (req, res) => {
	const { schoolName, location, country, responsible, dateDeployed, status } =
		req.body;

	prisma.school
		.create({
			data: {
				name: schoolName,
				country,
				deploymentDate: dateDeployed || new Date(),
				location,
				status,
			},
		})
		.then((school) => {
			res.json(school);
		})
		.catch((err) => {
			console.log(err);
		});
};
