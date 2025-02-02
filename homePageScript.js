    // Array of text sets
    const textSets = [
        { element1: "Prioritize", element2: "Your Health" },
        { element1: "Extremely", element2: "Comfortable" },
        { element1: "Your Future is", element2: "Organic" }
    ];

    // Function to update text content based on the visible slide
    function updateTextForVisibleSlide(slideIndex) {
        // Get the elements
        const el1 = document.getElementById("header-slide-white");
        const el2 = document.getElementById("header-slide-green");

        if (!el1 || !el2) {
            return;
        }

        // Remove visible class to trigger fade-out
        el1.classList.remove("visible");
        el2.classList.remove("visible");

        // Wait for transition to complete, then update text
        setTimeout(() => {
            el1.textContent = textSets[slideIndex].element1;
            el2.textContent = textSets[slideIndex].element2;

            // Add visible class to trigger fade-in
            el1.classList.add("visible");
            el2.classList.add("visible");
        }, 500); // Match the CSS transition duration
    }

    // Function to set up the Intersection Observer
    function observeSlides() {
        const slides = ["slide-1", "slide-2", "slide-3"]; // List of slide IDs
        const options = {
            root: null, // Use the viewport as the root
            threshold: 0.5 // Trigger when at least 50% of the slide is in view
        };

        // Create Intersection Observer
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Determine which slide is visible
                    const slideIndex = slides.indexOf(entry.target.id);
                    if (slideIndex !== -1) {
                        updateTextForVisibleSlide(slideIndex);
                    }
                }
            });
        }, options);

        // Observe each slide
        slides.forEach(slideId => {
            const slide = document.getElementById(slideId);
            if (slide) {
                observer.observe(slide);
            }
        });
    }

    // Initialize the observer on DOMContentLoaded
    document.addEventListener("DOMContentLoaded", () => {
        // Set initial text to the first slide's text set
        const el1 = document.getElementById("header-slide-white");
        const el2 = document.getElementById("header-slide-green");

        if (el1 && el2) {
            el1.textContent = textSets[0].element1;
            el2.textContent = textSets[0].element2;
            el1.classList.add("visible");
            el2.classList.add("visible");
        }
        // Start observing slides
        observeSlides();
    });
window.addEventListener('load', function() {
    function clearSizeButtons() {
        let sizeButtons = document.querySelectorAll('.size-option');
        sizeButtons.forEach(button => {
            button.classList.remove('sf-active');
        });
    }

    function clearBundleButtons() {
        let bundleButtons = document.querySelectorAll('.bundle-option');
        bundleButtons.forEach(button => {
            button.classList.remove('sf-active');
        });
    }

    function findActiveBundleOption() {
        const activeElement = document.querySelector('.bundle-option.sf-active');
        if (activeElement) {
            const bundleId = activeElement.getAttribute('bundle-id');
            return bundleId;
        }
        return null;
    }

    function findActiveSizeOption() {
        const activeElement = document.querySelector('.size-option.sf-active');
        if (activeElement) {
            const sizeId = activeElement.getAttribute('size-id');
            return sizeId;
        }
        return null;
    }
    
    function updatePrice() {
    	const bundleId = findActiveBundleOption();
      const priceElement = document.getElementById('organic-briefs-price');
      const strikethroughPriceElement = document.getElementById('organic-briefs-strikethrough-price');
      
      if (bundleId && priceElement && strikethroughPriceElement) {
      	const price = priceMatrix[bundleId];
        const strikethroughPrice = strikePriceMatrix[bundleId];
        if (price && strikethroughPrice) {
        	priceElement.textContent = price;
          strikethroughPriceElement.textContent = strikethroughPrice;
      	}
      }
    }
    
    function updatePhoto() {
    	document.querySelectorAll('.div-block-25').forEach((element) => {
      	element.style.display = 'none'
      })
    	let bundleId = findActiveBundleOption();
      if (bundleId == '7356063875139') {
      	document.getElementById('single-image').style.display = 'flex'
      } else if (bundleId == '7356069904451') {
      	document.getElementById('three-image').style.display = 'flex';
      } else if (bundleId == '7356064071747') {
      	document.getElementById('five-image').style.display = 'flex';
      }
    }

    const variantMatrix = {
        '7356063875139': {
            's': 42025416196163,
            'm': 42025416228931,
            'l': 42025416294467,
            'xl': 42025416261699
        },
        '7356069904451': {
            's': 42025449586755,
            'm': 42025449619523,
            'l': 42025449652291,
            'xl': 42025449685059
        },
        '7356064071747': {
            's': 42025417211971,
            'm': 42025417244739,
            'l': 42025417277507,
            'xl': 42025417310275
        }
    };
    
     const priceMatrix = {
        '7356063875139':'$30.00',
        '7356069904451': '$82.50',
        '7356064071747': '$130.00'
    };
    
    const strikePriceMatrix = {
        '7356063875139':' ',
        '7356069904451': '$90.00',
        '7356064071747': '$150.00'
    };

    const variantCheckoutLink = {
        '7356063875139': {
            's': 'https://037ecb-53.myshopify.com/cart/42025416196163:',
            'm': 'https://037ecb-53.myshopify.com/cart/42025416228931:',
            'l': 'https://037ecb-53.myshopify.com/cart/42025416294467:',
            'xl': 'https://037ecb-53.myshopify.com/cart/42025416261699:'
        },
        '7356069904451': {
            's': 'https://037ecb-53.myshopify.com/cart/42025449586755:',
            'm': 'https://037ecb-53.myshopify.com/cart/42025449619523:',
            'l': 'https://037ecb-53.myshopify.com/cart/42025449652291:',
            'xl': 'https://037ecb-53.myshopify.com/cart/42025449685059:'
        },
        '7356064071747': {
            's': 'https://037ecb-53.myshopify.com/cart/42025417211971:',
            'm': 'https://037ecb-53.myshopify.com/cart/42025417244739:',
            'l': 'https://037ecb-53.myshopify.com/cart/42025417277507:',
            'xl': 'https://037ecb-53.myshopify.com/cart/42025417310275:'
        }
    };

    function updateProduct() {
        const bundleId = findActiveBundleOption();
        const sizeId = findActiveSizeOption();
        
        if (!bundleId || !sizeId) {
            return;
        }

        const variantId = variantMatrix[bundleId]?.[sizeId];
        if (!variantId) {
            return;
        }
        
        // update price and photo when product is updated
        updatePrice();
        updatePhoto()

        const addToCart = document.getElementById('add-to-cart');
        const buyNow = document.getElementById('buy-now');
        
        if (addToCart) {
            const variantGid = "gid://shopify/ProductVariant/" + variantId;
            addToCart.setAttribute('sf-add-to-cart', variantGid);
        }
    }

    // Set up direct click handlers for bundle options
    document.querySelectorAll('.bundle-option').forEach(element => {
        element.addEventListener('click', () => {
            console.log('Bundle option clicked:', element.getAttribute('bundle-id'));
            clearBundleButtons();
            element.classList.add('sf-active');
            updateProduct();
        });
    });

    // Set up direct click handlers for size options
    document.querySelectorAll('.size-option').forEach(element => {
        element.addEventListener('click', () => {
            console.log('Size option clicked:', element.getAttribute('size-id'));
            clearSizeButtons();
            element.classList.add('sf-active');
            updateProduct();
        });
    });
    
    // Set up Buy Now button dynamic link change
    document.getElementById('buy-now').addEventListener('click', (e) => {
    	let quantity = document.getElementById('add-to-cart').getAttribute('sf-current-_qty_');
      window.open(variantCheckoutLink[findActiveBundleOption()]		[findActiveSizeOption()] + quantity  + '?channel=buy_button', '_blank');
    });

    const DEFAULT_BUNDLE_ID = '7356063875139';
    const DEFAULT_SIZE_ID = 's';

    function initializeDefaultSelections() {
        clearBundleButtons();
        clearSizeButtons();
        
        const defaultBundle = document.querySelector(`.bundle-option[bundle-id="${DEFAULT_BUNDLE_ID}"]`);
        const defaultSize = document.querySelector(`.size-option[size-id="${DEFAULT_SIZE_ID}"]`);
        
        if (defaultBundle) {
            defaultBundle.classList.add('sf-active');
        } else {
            console.error('Default bundle button not found');
        }
        
        if (defaultSize) {
            defaultSize.classList.add('sf-active');
        } else {
            console.error('Default size button not found');
        }

        updateProduct();
    }
    
    initializeDefaultSelections();
    
    const addToCartButton = document.querySelector('[fs-addtocart-element="add-to-cart"]');
    const quantityInput = document.querySelector('[fs-addtocart-element="quantity-input"]');
    
    if (addToCartButton && quantityInput) {
        addToCartButton.addEventListener('click', function() {
            setTimeout(() => {
                quantityInput.value = '1';
                quantityInput.dispatchEvent(new Event('input', { bubbles: true }));
                quantityInput.dispatchEvent(new Event('change', { bubbles: true }));
            }, 200);
        });
    }
    
    updateProduct();
});
  const cards = document.querySelectorAll('.be-organic-card-2');

  cards.forEach(card => {
    let currentOffsetX = 0; // Track current X offset
    let currentOffsetY = 0; // Track current Y offset
    let isFirstHover = true; // Track whether it's the first hover

    card.addEventListener('mouseenter', () => {
      if (isFirstHover) {
        // On the first hover, ensure it doesn't snap
        card.style.transition = 'transform 0.2s ease';
        setTimeout(() => {
          card.style.transition = 'none'; // Disable transition for immediate motion
        }, 200); // Allow a brief initial smoothness
        isFirstHover = false;
      }
    });

    card.addEventListener('mousemove', (e) => {
      // Get element’s position and size
      const rect = card.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      // Determine mouse position relative to the element
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Calculate offsets
      const centerX = width / 2;
      const centerY = height / 2;
      const offsetX = (x - centerX) / 30;
      const offsetY = (y - centerY) / 30;

      // Animate the transform to smoothly move to the new position
      card.animate(
        [
          { transform: `translate(${currentOffsetX}px, ${currentOffsetY}px)` },
          { transform: `translate(${offsetX}px, ${offsetY}px)` }
        ],
        { duration: 100, fill: 'forwards' }
      );

      // Update the current offsets
      currentOffsetX = offsetX;
      currentOffsetY = offsetY;
    });

    card.addEventListener('mouseleave', () => {
      // Smoothly return to the original position
      card.animate(
        [
          { transform: `translate(${currentOffsetX}px, ${currentOffsetY}px)` },
          { transform: `translate(0, 0)` }
        ],
        { duration: 200, fill: 'forwards' }
      );

      // Reset offsets
      currentOffsetX = 0;
      currentOffsetY = 0;

      // Reset first hover flag for future interactions
      isFirstHover = true;
    });
  });
