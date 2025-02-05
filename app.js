
// Select the element to display the products
      const newsContainer = document.getElementById("news-container");
      const numNews = 5;
      const apiKey = '07e23bfab1344fd1be93495e68dace59';
      const url = ` https://newsapi.org/v2/top-headlines?country=us&apiKey=07e23bfab1344fd1be93495e68dace59`;
      const productsContainer = document.getElementById("products-container");
      const numImages = 6; // Change this value to display more or fewer images
      const hamburger = document.querySelector(".hamburger");
      const mobileMenu = document.querySelector(".mobile-menu");

      hamburger.addEventListener("click", () => {
        mobileMenu.classList.toggle("active");
      });
      // Fetch the products data from the Fake Store API
      fetch("https://fakestoreapi.com/products?sort=desc")
      .then((response) => response.json())
      .then((data) => {
        for (let i = 0; i < numImages; i++) {
          const product = data[i];
          const productCard = document.createElement("div");
          productCard.classList.add("product-card");
    
          const productImage = document.createElement("img");
          productImage.src = product.image;
          productImage.alt = product.title;
    
          const productInfo = document.createElement("div");
          productInfo.classList.add("product-info");
    
          const productName = document.createElement("h2");
          productName.textContent = product.title;
    
          const productDescription = document.createElement("p");
          productDescription.classList.add("product-description");
          const fullText = product.description;
          const shortText = fullText.length > 100 ? fullText.substring(0, 100) + "..." : fullText;
          productDescription.textContent = shortText;
    
          const readMoreBtn = document.createElement("button");
          readMoreBtn.textContent = "Read More";
          readMoreBtn.classList.add("read-more-btn");
    
          let isExpanded = false;
          readMoreBtn.addEventListener("click", () => {
            if (isExpanded) {
              productDescription.textContent = shortText;
              readMoreBtn.textContent = "Read More";
            } else {
              productDescription.textContent = fullText;
              readMoreBtn.textContent = "Show Less";
            }
            isExpanded = !isExpanded;
          });
    
          const productPrice = document.createElement("p");
          productPrice.textContent = `Price: $${product.price}`;
    
          const productCategory = document.createElement("p");
          productCategory.textContent = `Category: ${product.category}`;
    
          productInfo.appendChild(productName);
          productInfo.appendChild(productDescription);
          if (fullText.length > 100) {
            productInfo.appendChild(readMoreBtn);
          }
          productInfo.appendChild(productPrice);
          productInfo.appendChild(productCategory);
    
          productCard.appendChild(productImage);
          productCard.appendChild(productInfo);
    
          productsContainer.appendChild(productCard);
        }
      })
      .catch((error) => console.error("Error fetching products data:", error));
  
        fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then((data) => {
            const articles = data.articles;
            const newsContainer = document.getElementById("newsContainer");
    
            // Featured article (first article)
            const featuredArticle = document.createElement("div");
            featuredArticle.classList.add("featured-article");
    
            const featuredImage = document.createElement("img");
            featuredImage.src = articles[0].urlToImage || "https://via.placeholder.com/150";
            featuredImage.alt = articles[0].title;
    
            const featuredInfo = document.createElement("div");
            featuredInfo.classList.add("featured-article-info");
            featuredInfo.innerHTML = `<h2>${articles[0].title}</h2><p>${articles[0].description || "No description available."}</p>`;
    
            featuredArticle.appendChild(featuredImage);
            featuredArticle.appendChild(featuredInfo);
    
            // Side articles (remaining articles)
            const sideArticles = document.createElement("div");
            sideArticles.classList.add("side-articles");
    
            for (let i = 1; i < Math.min(articles.length, 5); i++) {
                const article = articles[i];
                const sideArticle = document.createElement("div");
                sideArticle.classList.add("side-article");
    
                const sideImage = document.createElement("img");
                sideImage.src = article.urlToImage || "https://via.placeholder.com/150";
                sideImage.alt = article.title;
    
                const sideInfo = document.createElement("div");
                sideInfo.classList.add("side-article-info");
                sideInfo.innerHTML = `<h3>${article.title}</h3><p>${article.description || "No description available."}</p><a href="${article.url}" target="_blank">Read more</a>`;
    
                sideArticle.appendChild(sideImage);
                sideArticle.appendChild(sideInfo);
                sideArticles.appendChild(sideArticle);
            }
    
            // Append both sections to the container
            newsContainer.appendChild(featuredArticle);
            newsContainer.appendChild(sideArticles);
        })
        .catch((error) => console.error("Error fetching news data:", error));
    