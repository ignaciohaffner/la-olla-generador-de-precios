import html2canvas from "html2canvas";

const descargar = async (element, imageFileName) => {
  // Element is position:fixed off-screen — no scroll offset needed
  const canvas = await html2canvas(element, {
    useCORS: true,
    allowTaint: true,
    scale: 1,
  });
  const image = canvas.toDataURL("image/png", 1.0);
  downloadImage(image, imageFileName);
};

const downloadImage = (blob, fileName) => {
  const fakeLink = document.createElement("a");
  fakeLink.style.display = "none";
  fakeLink.download = fileName;
  fakeLink.href = blob;
  document.body.appendChild(fakeLink);
  fakeLink.click();
  document.body.removeChild(fakeLink);
};

export default descargar;
