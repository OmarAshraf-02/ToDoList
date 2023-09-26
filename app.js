title = "Untitled";

let count = 0;
let checked = 0;

const container = document.querySelector(".container");
const h1 = document.createElement("h1");
h1.innerText = title;
h1.contentEditable = true;
h1.spellcheck = false;
h1.style.fontWeight = 700;

h1.addEventListener("blur", () => {
	const editedTitle = h1.innerText.trim();
	if (editedTitle === "" || editedTitle.length >= 40) {
		h1.innerText = "Untitled";
		title = "Untitled";
	} else {
		h1.innerText = editedTitle;
		title = editedTitle;
	}
});

h1.addEventListener("keypress", (e) => {
	if (e.key === "Enter") {
		h1.blur();
	}
});

const h3 = document.createElement("h3");
h3.innerText = "0 tasks, 0 done";
document.body.prepend(h1, h3);

const input = document.querySelector("input");
const addButton = document.querySelector("button");
const list = document.querySelector("ul");

addButton.addEventListener("click", () => {
	if (input.value) {
		const li = document.createElement("li");
		const del = document.createElement("button");
		const checkbox = document.createElement("input");
		const textNode = document.createTextNode(input.value);
		checkbox.type = "checkbox";
		checkbox.id = "myCheckbox";
		// Create an SVG element and set attributes
		const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
		svg.setAttribute("width", "24");
		svg.setAttribute("height", "24");
		svg.setAttribute("viewBox", "0 0 24 24");

		// Create a path element for the blue trash can logo with vertical lines
		const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
		path.setAttribute(
			"d",
			"M3 6H5V19H19V6H21V4H3V6M5 0H19C20.1 0 21 0.9 21 2V6H3V2C3 0.9 3.9 0 5 0M8 9V17C8 17.55 8.45 18 9 18H15C15.55 18 16 17.55 16 17V9H8ZM10 14H12V17H10V14ZM10 10H12V12H10V10Z"
		);
		path.setAttribute("fill", "#80b6e2"); // Blue color

		// Append the path to the SVG element
		svg.appendChild(path);

		// Append the SVG element to the button
		del.appendChild(svg);
		del.setAttribute("id", "deleteButton");
		del.setAttribute("class", "deleteButton");
		li.appendChild(checkbox);
		li.appendChild(textNode);
		li.appendChild(del);
		list.appendChild(li);

		del.addEventListener("click", () => {
			const listItem = del.parentNode; //selects the li containing the button
			list.removeChild(listItem);
			count--;

			if (checkbox.checked) {
				checked--;
			}

			updateCounter();
		});

		checkbox.addEventListener("change", (e) => {
			if (e.target.checked) {
				li.style.textDecoration = "line-through";
				checked++;
			} else {
				li.style.textDecoration = "none";
				checked--;
			}

			updateCounter();
		});

		count++;
		updateCounter();
		input.value = "";
		input.focus();
	}
});

updateCounter = () => {
	if (count !== 1) {
		h3.innerText = `${count} tasks, ${checked} done`;
	} else {
		h3.innerText = `${count} task, ${checked} done`;
	}
};

input.addEventListener("keypress", (e) => {
	if (e.key === "Enter") {
		addButton.click();
	}
});
