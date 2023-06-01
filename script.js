import graphData from './data.json' assert {type: 'json'};

/* ========== Variables ========== */
const diagram = document.querySelectorAll('.body__graph-link');
const diagramArray = [...diagram];

/* ========== Functions ========== */
const showAmount = (item, action) => {
	const amount = item.firstElementChild;

	if (action === 'show') {
		amount.style.opacity = '1';
	}
	else if (action === 'hide') {
		amount.style.opacity = '0';
	}
};

const loadColumn = (columnHeight, columnName, columnAmount) => {
	const columns = document.querySelectorAll('.body__graph-col');
	const columnsArray = [...columns];

	columnsArray.forEach(item => {
		const columnDay = item.querySelector('.body__graph-day');

		if (columnDay.innerHTML === columnName) {
			const columnDiagram = item.querySelector('.body__graph-diagram');
			const columnStat = item.querySelector('.body__graph-stat');

			columnDiagram.style.height = columnHeight + '%';
			columnStat.innerHTML = '$' + columnAmount;
		}
	});
};

/* ========== Events ========== */
// load diagram and stat
window.addEventListener('load', () => {
	const arrayOfAmounts = graphData.map(item => item.amount);
	const maxAmount = arrayOfAmounts
		.reduce((accumulator, currentValue) => Math.max(accumulator, currentValue), 0);
	const heightCoefficient = maxAmount / 100;

	graphData.forEach(item => {
		const columnHeight = item.amount / heightCoefficient;
		const columnName = item.day;
		const columnAmount = item.amount;

		loadColumn(columnHeight, columnName, columnAmount);
	});
});

// show stat when hovering over the diagram
diagramArray.forEach(item => {
	item.addEventListener('mouseover', () => {
		showAmount(item, 'show');
	});

	item.addEventListener('mouseout', () => {
		showAmount(item, 'hide');
	});
});