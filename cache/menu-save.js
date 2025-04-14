// Create watermark element and style it
(function() {
    // Create watermark div
    const watermark = document.createElement('div');
    watermark.className = 'puhlunk-watermark';
    
    // Create and add style
    const style = document.createElement('style');
    style.textContent = `
      .puhlunk-watermark {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-image: url('cache/puhlunkpreview.png');
        background-repeat: repeat;
        background-size: 120%;
        opacity: 0.04;
        z-index: 4;
        pointer-events: none;
      }
    `;
    
    // Add to document
    document.head.appendChild(style);
    document.body.insertBefore(watermark, document.body.firstChild);
    
    // Disable right-click function
    document.addEventListener('contextmenu', function(e) {
      e.preventDefault();
      alert("Contact @puhlunk for access :)");
      return false;
    });
  })();