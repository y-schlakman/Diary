//globals
todaysDate = new Date((new Date()).getFullYear(), (new Date()).getMonth(), (new Date()).getDate());
displayedDate = new Date(todaysDate.getFullYear(), todaysDate.getMonth(), todaysDate.getDate());
dateText = document.getElementById('date');
lArrow = document.getElementById('leftArrow');
rArrow = document.getElementById('rightArrow');
logText = document.getElementById('logTextarea');
saveBtn = document.getElementById('saveBtn');

//event listeners
lArrow.addEventListener('click', decrementDate);
rArrow.addEventListener('click', incrementDate);
saveBtn.addEventListener('click', saveLog);

//code
main();

//functions
function main()
{
	updateDisplay();
}
function updateDisplay()
{
	dateText.innerHTML = format_date(displayedDate);
	var text = loadLog();
	console.log({text});
	if(text != null)
	{
		logText.value = text;
		logText.placeholder = "Start your log here...";
		if(displayedDate < todaysDate)
		{
			logText.readOnly = true;
			logText.style.backgroundColor = 'transparent';
			logText.style.textAlign = '';
			logText.style.border = '0px';
			logText.style.fontSize = "2em";
		}
		else
		{
			logText.readOnly = false;
			logText.style.backgroundColor = '';
			logText.style.textAlign = '';
			logText.style.border = '';
			logText.style.fontSize = "";
		}
	}
	else if (displayedDate < todaysDate)
	{
		logText.value = "";
		logText.placeholder = "No log was written on this day...";
		logText.readOnly = true;
		logText.style.backgroundColor = 'transparent';
		logText.style.textAlign = 'center';
		logText.style.border = '0px';
		logText.style.fontSize = "2em";
	}
	else if (displayedDate > todaysDate)
	{
		logText.value = "";
		logText.placeholder = "You can't predict the future...";
		logText.readOnly = true;
		logText.style.backgroundColor = 'transparent';
		logText.style.textAlign = 'center';
		logText.style.border = '0px';
		logText.style.fontSize = "2em";
	}
	else
	{
		logText.value = "";
		logText.placeholder = "Start your log here...";
		logText.readOnly = false;
		logText.style.backgroundColor = '';
		logText.style.textAlign = '';
		logText.style.border = '';
		logText.style.fontSize = "";
	}
}
function decrementDate(event)
{
	saveLog();
	displayedDate.setDate(displayedDate.getDate() - 1);
	updateDisplay();
	console.log(event.target.id + " was pressed!");
}
function incrementDate(event)
{
	saveLog();
	displayedDate.setDate(displayedDate.getDate() + 1);
	updateDisplay();
	console.log(event.target.id + " was pressed!");
}
function saveLog()
{
	var date = format_date(displayedDate);
	var text = logText.value;
	var currentText = localStorage.getItem(date);
	if(text == currentText)
	{
		return;
	}
	else if (text == "")
	{
		if(currentText != null)
			localStorage.removeItem(date);
		return;
	}
	localStorage.setItem(date, text);
}
function loadLog()
{
	var date = format_date(displayedDate);
	var text = localStorage.getItem(date);
	return text;
}

//utils
function format_date(date)
{
	const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	var string = "";
	string += months[date.getMonth()] + " ";
	string += date.getDate() + ", ";
	string += date.getFullYear();
	return string;	
}