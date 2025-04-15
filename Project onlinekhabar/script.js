let currentSlide = 0;
const slides = document.querySelectorAll(".slide");

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove("active");
    if (i === index) slide.classList.add("active");
  });
  const slider = document.querySelector(".slides");
  slider.style.transform = `translateX(-${index * 100}%)`;
}

setInterval(() => {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}, 3000);

// Initial show
showSlide(currentSlide);
const API_KEY = '69f795a9b46443fd81ae0c77c4971ed0'; 
const PAGE_SIZE = 5;
let currentPage = 1;

const newsContainer = document.getElementById("newsContainer");
const spinner = document.getElementById("spinner");

async function fetchNews(page = 1) {
  spinner.style.display = "block";
  newsContainer.innerHTML = "";

  try {
    const res = await fetch(`https://newsapi.org/v2/top-headlines?country=us&pageSize=${PAGE_SIZE}&page=${page}&apiKey=${API_KEY}`);
    const data = await res.json();

    if (data.articles && data.articles.length > 0) {
      data.articles.forEach(news => {
        const article = document.createElement("article");
        article.classList.add("news-card");
        article.innerHTML = `
          <img src="${news.urlToImage || 'https://via.placeholder.com/300x200'}" alt="News Image" />
          <h2>${news.title}</h2>
          <p>${news.description || 'No description available.'}</p>
        `;
        newsContainer.appendChild(article);
      });
    } else {
      newsContainer.innerHTML = "<p>No news found.</p>";
    }
  } catch (err) {
    console.error("Failed to load news:", err);
    newsContainer.innerHTML = "<p>Error fetching news. Try again later.</p>";
  } finally {
    spinner.style.display = "none";
  }
}

document.getElementById("prevPage").addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    fetchNews(currentPage);
  }
});

document.getElementById("nextPage").addEventListener("click", () => {
  currentPage++;
  fetchNews(currentPage);
});

document.addEventListener("DOMContentLoaded", () => fetchNews(currentPage));

// Hamburger Menu
document.getElementById("hamburger").addEventListener("click", () => {
  const nav = document.querySelector(".nav");
  nav.classList.toggle("active");
  nav.classList.add("transition");
});

// Dark Mode Toggle
const darkToggle = document.getElementById("darkModeToggle");
darkToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  document.body.classList.add("transition");
  localStorage.setItem("darkMode", document.body.classList.contains("dark-mode"));
});

if (localStorage.getItem("darkMode") === "true") {
  document.body.classList.add("dark-mode");
}
