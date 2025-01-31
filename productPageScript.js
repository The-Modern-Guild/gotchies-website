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
        
        // update price when product is updated
        updatePrice();

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