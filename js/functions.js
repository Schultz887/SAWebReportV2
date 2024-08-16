function displayDateTimeLong() {
    const datetimeDisplayElement = document.getElementById("datetime-display");

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const currentDate = new Date();
  const month = months[currentDate.getMonth()];
  const day = currentDate.getDate();
  const year = currentDate.getFullYear();

    // Display the date and time in the span element
    datetimeDisplayElement.textContent = `${month} ${day}, ${year}`;
}

async function fetchOutlookData() {
try {
	const response = await fetch('https://services.swpc.noaa.gov/text/27-day-outlook.txt');
	if (!response.ok) {
		throw new Error('Network response was not ok');
	}
	let data = await response.text();
					
	// Split the text into an array of lines
	let lines = data.split('\n');
					
	// Remove the first 9 lines and the last 10 lines
	lines = lines.slice(9, -21);
					
	// Join the remaining lines back into a single string
	let processedData = lines.join('\n');
					
	// Display the processed data
	document.getElementById('outlook-data').textContent = processedData;
} catch (error) {
console.error('Error fetching the outlook data:', error);
document.getElementById('outlook-data').textContent = 'Error loading data. Please try again later.';
}
}			

function updateIframeSrc(baseUrl, iframeId) {
    var today = new Date();
    var year = today.getFullYear();
    var month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    var day = String(today.getDate()).padStart(2, '0');
    var formattedDate = `${year}-${month}-${day}`;

    var url = `${baseUrl}&date=${formattedDate}`;
    document.getElementById(iframeId).src = url;
}