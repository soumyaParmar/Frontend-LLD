import { MasonryImage } from "./classes/MansoryImage.js";
import { mockImages } from "./data.js";

document.addEventListener("DOMContentLoaded", () => {
  let PAGE_SIZE = 15;

  let currentPage = 1;
  let isLoading = false;
  const visibleImages = [];

  const imageContainer = document.querySelector(".pinterest-images");
  const infiniteMsgDiv = document.getElementById("infinite-scroll");
  let masImg = new MasonryImage(visibleImages, imageContainer);
  masImg.init();

  const loadImages = () => {
    if (isLoading) return;

    isLoading = true;

    setTimeout(() => {
      const startIndex = (currentPage - 1) * PAGE_SIZE;
      const newImages = mockImages.slice(startIndex, startIndex + PAGE_SIZE);
      if (newImages.length > 0) {
        visibleImages.push(...newImages);
        masImg.showImages();
        currentPage++;
      } else {
        observer.disconnect();
        infiniteMsgDiv.textContent = "No more images";
      }
      isLoading = false;
    }, 2000);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      const entry = entries[0];

      if (entry.isIntersecting) {
        loadImages();
      }
    },
    {
      rootMargin: "200px",
      threshold: 0.1,
    },
  );

  observer.observe(infiniteMsgDiv);
});
