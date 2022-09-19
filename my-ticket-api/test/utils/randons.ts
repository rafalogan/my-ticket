export const getRandom = (length = 1000, int = true) => {
	if (!int) return Math.floor(Math.random() * length);

	return Math.floor(Math.random() * length) + 1;
};
