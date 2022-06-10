
const exportColumnFilterMethod = ({ column }) => {
	if (IsEmpty(column.property)) {
		return false;
	}
	return true;
};
const exportBeforeMethod = ({ options }) => {
	options.columns.forEach(t => {
		t.cellType = IsEmpty(t.cellType) ? 'string' : t.cellType;
	});
};
