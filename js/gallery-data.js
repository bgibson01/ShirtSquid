const accessToken = "EAATwwL8skx4BOZBRSiP3PqjL4RFDvJ3yMUZCyzX1LRjHlKZCMVMxzeJZApdrsfo7hEkdZCBLBWbajPkfzwy3ABWYenTEzoHQqeT4ZBcUdroXGXjLkSESiSEBnSmdZCkboZCNhswQZBX23gKrjnnwpIoWOLyIRb9O11EO6vYdeHY2vOzuVbodqp8LSvcQ2p0DmouuoXZA72UblRoHaixo1P7ZB4KkPsZD"; // Replace with your actual access token
const pageId = "880201272040785"; // Replace with your Facebook page ID

const galleryData = [];

// Create a Promise to notify when data is ready
const fetchGalleryData = new Promise((resolve, reject) => {
    fetch(`https://graph.facebook.com/v12.0/${pageId}/photos?fields=images,name&access_token=${accessToken}`)
      .then(response => response.json())
      .then(data => {
        data.data.forEach((photo, index) => {
          // Use the largest image available
          const largestImage = photo.images[0];
  
          galleryData.push({
            id: index + 1,
            src: largestImage.source,
            caption: photo.name || "No caption available"
          });
        });
  
        console.log("Gallery data fetched:", galleryData); // Check the populated array in the console
        resolve(); // Notify that the data is ready
      })
      .catch(error => {
        console.error("Error fetching Facebook photos:", error);
        reject(error); // Notify that an error occurred
      });
  });
  });