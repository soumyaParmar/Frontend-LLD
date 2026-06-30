import { debounce } from "../utils.js";

export class MasonryImage {
  constructor(Images, imageContainer) {
    this.Images = Images;

    this.imageContainer = imageContainer;
    this.debounced = debounce(this.showImages.bind(this));
  }

  init() {
    this.showImages();
    window.addEventListener("resize", () => {
      this.debounced();
    });
  }

  createImageElement(imgurl, title, height, width, top, left) {
    const imgContainer = document.createElement("img");
    imgContainer.style.position = "absolute";
    imgContainer.src = imgurl;
    imgContainer.style.width = width + "px";
    imgContainer.style.height = height + "px";
    imgContainer.style.padding = "10px";
    imgContainer.style.top = top + "px";
    imgContainer.style.left = left + "px";
    return imgContainer;
  }

  addImage(element) {
    this.imageContainer.appendChild(element);
  }

  showImages() {
    const colWidth = 220;
    const gap = 16;
    const containerWidth = this.imageContainer.offsetWidth;
    const cols = Math.floor((containerWidth + gap) / (colWidth + gap)) || 1;

    const colHeights = Array(cols).fill(0);
    const allimgs = this.imageContainer.querySelectorAll("img");

    this.Images.forEach((image, index) => {
      const minColIndex = colHeights.indexOf(Math.min(...colHeights));
      const left = minColIndex * (colWidth + gap);
      const top = colHeights[minColIndex];
      const scaledHeight = (colWidth / image.width) * image.height;
      if (allimgs[index]) {
        allimgs[index].src = image.url;
        allimgs[index].title = image.title;
        allimgs[index].style.width = colWidth + "px";
        allimgs[index].style.height = scaledHeight + "px";
        allimgs[index].style.top = top + "px";
        allimgs[index].style.left = left + "px";
      } else {
        const el = this.createImageElement(
          image.url,
          image.title,
          scaledHeight,
          colWidth,
          top,
          left,
        );
        this.addImage(el);
      }
      colHeights[minColIndex] += scaledHeight + gap;
    });
    this.imageContainer.style.height = `${Math.max(...colHeights)}px`;
  }
}
