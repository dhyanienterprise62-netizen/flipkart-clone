// Dummy data for categories
const categories = [
  { name: 'Mobiles', color: '#ff6161' },
  { name: 'Fashion', color: '#2874f0' },
  { name: 'Electronics', color: '#ff9f00' },
  { name: 'Home & Furniture', color: '#0f7b0f' },
  { name: 'Appliances', color: '#820024' },
  { name: 'Travel', color: '#f16565' },
  { name: 'Beauty, Toys & More', color: '#0db7af' },
  { name: 'Two Wheelers', color: '#ff6161' }
];

// Dummy data for products
const products = [
  {
    id: 1,
    name: 'Samsung Galaxy M14 5G (Berry Blue, 128 GB)',
    image: 'https://via.placeholder.com/200x150/2874f0/ffffff?text=Samsung+M14',
    price: '₹13,490',
    originalPrice: '₹16,990',
    discount: '20% off'
  },
  {
    id: 2,
    name: 'boAt Airdopes 141 Bluetooth Truly Wireless',
    image: 'https://via.placeholder.com/200x150/ff6161/ffffff?text=boAt+Airdopes',
    price: '₹1,299',
    originalPrice: '₹2,990',
    discount: '56% off'
  },
  {
    id: 3,
    name: 'Fastrack Limitless FS1 Pro Smart Watch',
    image: 'https://via.placeholder.com/200x150/0f7b0f/ffffff?text=Fastrack+Watch',
    price: '₹1,795',
    originalPrice: '₹7,995',
    discount: '77% off'
  },
  {
    id: 4,
    name: 'HP 15s Ryzen 5 Hexa Core 5500U Laptop',
    image: 'https://via.placeholder.com/200x150/820024/ffffff?text=HP+Laptop',
    price: '₹42,990',
    originalPrice: '₹56,326',
    discount: '23% off'
  },
  {
    id: 5,
    name: 'Realme narzo 60 5G (Mars Orange, 128 GB)',
    image: 'https://via.placeholder.com/200x150/ff9f00/ffffff?text=Realme+narzo',
    price: '₹17,999',
    originalPrice: '₹19,999',
    discount: '10% off'
  },
  {
    id: 6,
    name: 'Canon EOS 1500D DSLR Camera Body+ 18-55 mm',
    image: 'https://via.placeholder.com/200x150/0db7af/ffffff?text=Canon+DSLR',
    price: '₹31,999',
    originalPrice: '₹36,995',
    discount: '13% off'
  },
  {
    id: 7,
    name: 'Noise ColorFit Pro 4 Alpha Bluetooth Calling',
    image: 'https://via.placeholder.com/200x150/f16565/ffffff?text=Noise+Watch',
    price: '₹2,499',
    originalPrice: '₹7,999',
    discount: '68% off'
  },
  {
    id: 8,
    name: 'Whirlpool 1.5 Ton 3 Star Split Inverter AC',
    image: 'https://via.placeholder.com/200x150/2874f0/ffffff?text=Whirlpool+AC',
    price: '₹32,990',
    originalPrice: '₹42,500',
    discount: '22% off'
  }
];

// Carousel slides data
const slides = [
  {
    title: 'Big Billion Days',
    description: 'Biggest sale of the year with unbeatable deals across all categories',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
  },
  {
    title: 'Fashion Fiesta',
    description: 'Trendy styles and latest fashion at incredible prices',
    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
  },
  {
    title: 'Electronics Bonanza',
    description: 'Latest gadgets and electronics with massive discounts',
    background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
  },
  {
    title: 'Home & Living',
    description: 'Transform your home with our exclusive collection',
    background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
  }
];

// Global state
let currentSlide = 0;
let searchQuery = '';

// Utility functions
function createElement(tag, className = '', innerHTML = '') {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (innerHTML) element.innerHTML = innerHTML;
  return element;
}

function handleImageError(img) {
  img.src = 'https://via.placeholder.com/200x150/f0f0f0/666666?text=Image+Not+Available';
  img.alt = 'Image not available';
}

// Component functions
function createNavBar() {
  const navbar = createElement('header', 'navbar');
  
  const navbarContent = createElement('div', 'navbar-content');
  
  // Logo
  const logo = createElement('a', 'navbar-logo', 'Flipkart');
  logo.href = '#';
  
  // Search
  const searchForm = createElement('form', 'navbar-search');
  searchForm.innerHTML = `
    <input type="text" placeholder="Search for products, brands and more" id="searchInput">
    <button type="submit" class="search-btn">Search</button>
  `;
  
  // Navigation links
  const navLinks = createElement('div', 'navbar-links');
  navLinks.innerHTML = `
    <a href="#" class="navbar-link">Login</a>
    <a href="#" class="navbar-link">More</a>
    <a href="#" class="navbar-link">Cart</a>
  `;
  
  navbarContent.appendChild(logo);
  navbarContent.appendChild(searchForm);
  navbarContent.appendChild(navLinks);
  navbar.appendChild(navbarContent);
  
  // Add search functionality
  searchForm.addEventListener('submit', handleSearch);
  
  return navbar;
}

function createHeroCarousel() {
  const carousel = createElement('section', 'hero-carousel');
  
  // Create slides
  slides.forEach((slide, index) => {
    const slideElement = createElement('div', `carousel-slide ${index === 0 ? 'active' : ''}`);
    slideElement.style.background = slide.background;
    slideElement.innerHTML = `
      <h2>${slide.title}</h2>
      <p>${slide.description}</p>
      <button class="cta-button">Shop Now</button>
    `;
    carousel.appendChild(slideElement);
  });
  
  // Create controls
  const controls = createElement('div', 'carousel-controls');
  slides.forEach((_, index) => {
    const control = createElement('button', index === 0 ? 'active' : '');
    control.addEventListener('click', () => goToSlide(index));
    controls.appendChild(control);
  });
  carousel.appendChild(controls);
  
  // Auto-rotate carousel
  setInterval(nextSlide, 5000);
  
  return carousel;
}

function createCategorySection() {
  const section = createElement('section', 'category-section');
  const content = createElement('div', 'category-content');
  
  const title = createElement('h3', '', 'Top Categories');
  const cardsContainer = createElement('div', 'category-cards');
  
  categories.forEach(category => {
    const card = createElement('a', 'category-card');
    card.href = '#';
    card.style.backgroundColor = category.color;
    card.innerHTML = `<span class="category-name">${category.name}</span>`;
    cardsContainer.appendChild(card);
  });
  
  content.appendChild(title);
  content.appendChild(cardsContainer);
  section.appendChild(content);
  
  return section;
}

function createProductGrid() {
  const section = createElement('section', 'product-grid');
  const content = createElement('div', 'product-content');
  
  if (!products || products.length === 0) {
    const errorMessage = createElement('div', 'error-message', 'No products available at the moment.');
    section.appendChild(errorMessage);
    return section;
  }
  
  const title = createElement('h3', '', 'Best Deals on Smartphones');
  const gridContainer = createElement('div', 'product-grid-container');
  
  products.forEach(product => {
    const card = createProductCard(product);
    gridContainer.appendChild(card);
  });
  
  content.appendChild(title);
  content.appendChild(gridContainer);
  section.appendChild(content);
  
  return section;
}

function createProductCard(product) {
  const card = createElement('a', 'product-card');
  card.href = '#';
  
  const img = createElement('img');
  img.src = product.image;
  img.alt = product.name;
  img.onerror = () => handleImageError(img);
  
  const details = createElement('div', 'product-details');
  details.innerHTML = `
    <h4>${product.name}</h4>
    <div class="product-price">
      ${product.price}
      <span class="product-original-price">${product.originalPrice}</span>
      <span class="product-discount">${product.discount}</span>
    </div>
  `;
  
  card.appendChild(img);
  card.appendChild(details);
  
  return card;
}

function createFooter() {
  const footer = createElement('footer', 'footer');
  const content = createElement('div', 'footer-content');
  
  const sections = createElement('div', 'footer-sections');
  
  const footerData = [
    {
      title: 'About',
      links: ['Contact Us', 'About Us', 'Careers', 'Flipkart Stories', 'Press', 'Flipkart Wholesale']
    },
    {
      title: 'Help',
      links: ['Payments', 'Shipping', 'Cancellation & Returns', 'FAQ', 'Report Infringement']
    },
    {
      title: 'Policy',
      links: ['Return Policy', 'Terms Of Use', 'Security', 'Privacy', 'Sitemap', 'EPR Compliance']
    },
    {
      title: 'Social',
      links: ['Facebook', 'Twitter', 'YouTube']
    }
  ];
  
  footerData.forEach(section => {
    const sectionElement = createElement('div', 'footer-section');
    const title = createElement('h4', '', section.title);
    const list = createElement('ul');
    
    section.links.forEach(link => {
      const listItem = createElement('li');
      const anchor = createElement('a', '', link);
      anchor.href = '#';
      listItem.appendChild(anchor);
      list.appendChild(listItem);
    });
    
    sectionElement.appendChild(title);
    sectionElement.appendChild(list);
    sections.appendChild(sectionElement);
  });
  
  const bottom = createElement('div', 'footer-bottom');
  bottom.innerHTML = '<p>© 2007-2023 Flipkart.com</p>';
  
  content.appendChild(sections);
  content.appendChild(bottom);
  footer.appendChild(content);
  
  return footer;
}

// Event handlers
function handleSearch(e) {
  e.preventDefault();
  const input = document.getElementById('searchInput');
  const query = input.value.trim();
  
  if (query === '') {
    alert('Please enter a search term.');
    return;
  }
  
  console.log('Searching for:', query);
  // In a real application, this would trigger a search API call
  alert(`Searching for: ${query}`);
}

function goToSlide(index) {
  const slides = document.querySelectorAll('.carousel-slide');
  const controls = document.querySelectorAll('.carousel-controls button');
  
  // Remove active class from current slide and control
  slides[currentSlide].classList.remove('active');
  controls[currentSlide].classList.remove('active');
  
  // Set new current slide
  currentSlide = index;
  
  // Add active class to new slide and control
  slides[currentSlide].classList.add('active');
  controls[currentSlide].classList.add('active');
}

function nextSlide() {
  const nextIndex = (currentSlide + 1) % slides.length;
  goToSlide(nextIndex);
}

// Main app initialization
function initApp() {
  const root = document.getElementById('root');
  
  // Create app container
  const appContainer = createElement('div', 'app-container');
  
  // Create and append all components
  appContainer.appendChild(createNavBar());
  appContainer.appendChild(createHeroCarousel());
  appContainer.appendChild(createCategorySection());
  appContainer.appendChild(createProductGrid());
  appContainer.appendChild(createFooter());
  
  // Append to root
  root.appendChild(appContainer);
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', initApp);

// Add some interactive features
document.addEventListener('click', function(e) {
  // Handle category card clicks
  if (e.target.closest('.category-card')) {
    e.preventDefault();
    const categoryName = e.target.closest('.category-card').querySelector('.category-name').textContent;
    console.log(`Clicked on category: ${categoryName}`);
    alert(`You clicked on ${categoryName} category!`);
  }
  
  // Handle product card clicks
  if (e.target.closest('.product-card')) {
    e.preventDefault();
    const productName = e.target.closest('.product-card').querySelector('h4').textContent;
    console.log(`Clicked on product: ${productName}`);
    alert(`You clicked on: ${productName}`);
  }
  
  // Handle CTA button clicks
  if (e.target.classList.contains('cta-button')) {
    e.preventDefault();
    console.log('CTA button clicked');
    alert('Redirecting to deals page...');
  }
  
  // Handle navbar link clicks
  if (e.target.classList.contains('navbar-link')) {
    e.preventDefault();
    const linkText = e.target.textContent;
    console.log(`Navbar link clicked: ${linkText}`);
    alert(`${linkText} functionality coming soon!`);
  }
});

// Add keyboard navigation for carousel
document.addEventListener('keydown', function(e) {
  if (e.key === 'ArrowLeft') {
    const prevIndex = currentSlide === 0 ? slides.length - 1 : currentSlide - 1;
    goToSlide(prevIndex);
  } else if (e.key === 'ArrowRight') {
    nextSlide();
  }
});

// Add smooth scrolling for better UX
document.addEventListener('scroll', function() {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 100) {
    navbar.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
  } else {
    navbar.style.boxShadow = '0 1px 1px 0 rgba(0,0,0,.16)';
  }
});
