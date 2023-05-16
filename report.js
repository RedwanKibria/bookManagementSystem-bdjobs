const reportContainer = document.getElementById('report');
const filterForm = document.getElementById('filter-form');

// Function to fetch book information from Google Books API
async function fetchBookData() {
  try {
    const response = await fetch('https://www.googleapis.com/books/v1/volumes?q=subject:fiction');
    const data = await response.json();
    const books = data.items;

    // Display book information in report page
    books.forEach((book) => {
      const title = book.volumeInfo.title;
      const author = book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown Author';
      const description = book.volumeInfo.description ? book.volumeInfo.description : 'No description available';

      const bookInfo = `
        <div class="book">
          <h3>${title}</h3>
          <p><strong>Author:</strong> ${author}</p>
          <p>${description}</p>
        </div>
      `;

      reportContainer.innerHTML += bookInfo;
    });
  } catch (error) {
    console.error('Error fetching book data: ', error);
  }
}

// Function to filter the report by various criteria
function filterReport(event) {
  event.preventDefault();

  const filterKeyword = document.getElementById('filter-keyword').value.toLowerCase();
  const filterAge = document.getElementById('filter-age').value;
  const filterBookType = Array.from(document.querySelectorAll('input[name="filter-book-type"]:checked')).map((checkbox) => checkbox.value);


  // For demonstration purposes, just log the filters applied
  console.log('Filter Keyword:', filterKeyword);
  console.log('Filter Age:', filterAge);
  console.log('Filter Book Type:', filterBookType);
}

// Fetch book data when the page loads
document.addEventListener('DOMContentLoaded', fetchBookData);

// Add event listener to the filter form
filterForm.addEventListener('submit', filterReport);
