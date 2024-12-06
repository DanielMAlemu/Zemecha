

var loadFile = function(event) {

  var reader = new FileReader();

  reader.onload = function() {

      createOverlay(reader.result);

  };

  reader.readAsDataURL(event.target.files[0]);

};



var createOverlay = function(base64Image) {

  Caman("#overlay-img", function() {

      this.brightness(5).render();

      this.newLayer(function() {

          this.setBlendingMode("normal");

          this.opacity(100);

          this.overlayImage(base64Image);

      });

      // Use the pre-loaded overlay image

      this.newLayer(function() {

        this.setBlendingMode("normal");

        this.opacity(90);

        this.overlayImage('overlay.png');

    });



    $('#overlay-img').removeAttr('style');

});

};



// Pre-load the overlay image

const overlayImage = new Image();

overlayImage.src = 'overlay.png';



// Add a download button

const downloadButton = document.createElement('button');

downloadButton.textContent = 'Download Image';
downloadButton.classList.add('download-button');
downloadButton.style.display = "block";

downloadButton.addEventListener('click', () => {

  const canvas = document.getElementById('overlay-img');

  const dataURL = canvas.toDataURL('image/png');

  const link = document.createElement('a');

  link.href = dataURL;

  link.download = 'profile_overlay.png';

  link.click();

});


document.body.appendChild(downloadButton);

      //const selectedTranslation = translations[language]; // Use the imported object

     /* document.addEventListener("DOMContentLoaded", () => {
        const buttons = document.querySelectorAll("#language-selection button");
      
        const updateTranslations = (language) => {
          console.log("Updating translations for:", language);
          const selectedTranslation = window.translations[language];
          console.log("Selected translation:", selectedTranslation);
      
          if (selectedTranslation) {
            document.getElementById("title").textContent = selectedTranslation.title;
            document.getElementById("stopHateSpeech").textContent = selectedTranslation.stopHateSpeech;
            document.getElementById("create").textContent = selectedTranslation.create;
            document.getElementById("locate").textContent = selectedTranslation.locate;
            document.getElementById("select").textContent = selectedTranslation.select;
            document.getElementById("download").textContent = selectedTranslation.download;
            document.getElementById("learn").innerHTML = selectedTranslation.learn;


          } else {
            console.error("Translation not found for language:", language);
          }
        };
      
        buttons.forEach((button) => {
          button.addEventListener("click", () => {
            const language = button.getAttribute("data-lang");
            console.log("Button clicked for language:", language);
            updateTranslations(language);
          });
        });
      });*/
      const buttons = document.querySelectorAll("#language-selection button");
      buttons.forEach((button) => {
        button.addEventListener("click", () => {
          const languageCode = button.getAttribute("data-lang");
          translateContent(languageCode);
        });
      });

      async function translateContent(languageCode) {
        const response = await fetch('translations.json');
        const translations = await response.json();
        window.translations = translations;  // Assign translations to window object

        const selectedLanguage = translations[languageCode];
      
        if (selectedLanguage) {
          document.getElementById('title').textContent = selectedLanguage.title;
          document.getElementById('stopHateSpeech').textContent = selectedLanguage.stopHateSpeech;
          document.getElementById('create').textContent = selectedLanguage.create;
          document.getElementById('select').textContent = selectedLanguage.select;
          document.getElementById('download').textContent = selectedLanguage.download;
          document.getElementById('learn').textContent = selectedLanguage.learn;
          document.getElementById('locate').textContent = selectedLanguage.locate;
          // ... update other elements with translated text

        } else {
          console.error('Translation not found for language:', languageCode);
        }
      
      }
      



