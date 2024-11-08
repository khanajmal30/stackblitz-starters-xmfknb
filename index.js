async function fetchAndSortStudents() {
  try {
    // Replace with your actual URL to the students.txt file
    const response = await fetch('https://your-url-to-students.txt');
    const textData = await response.text();

    // Parse the fetched data into an array of student objects
    const students = textData.split('\n').map((line) => {
      const [name, chemistry, biology, dob] = line.split(',');
      return {
        name: name.trim(),
        chemistry: parseInt(chemistry.trim(), 10),
        biology: parseInt(biology.trim(), 10),
        dob: dob.trim(),
      };
    });

    // Sorting function
    students.sort((a, b) => {
      const totalA = a.chemistry + a.biology;
      const totalB = b.chemistry + b.biology;

      // First priority: Total marks
      if (totalA !== totalB) {
        return totalB - totalA; // Descending order
      }

      // Second priority: Biology marks
      if (a.biology !== b.biology) {
        return b.biology - a.biology; // Descending order
      }

      // Third priority: Chemistry marks
      if (a.chemistry !== b.chemistry) {
        return b.chemistry - a.chemistry; // Descending order
      }

      // Fourth priority: Date of birth
      const dateA = new Date(a.dob.split('-').reverse().join('-')); // Convert to YYYY-MM-DD format
      const dateB = new Date(b.dob.split('-').reverse().join('-')); // Convert to YYYY-MM-DD format
      return dateA - dateB; // Ascending order
    });

    // Output the sorted array
    console.log(students);
  } catch (error) {
    console.error('Error fetching student data:', error);
  }
}

// Call the function to fetch and sort students
fetchAndSortStudents();
