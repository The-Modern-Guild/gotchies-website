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

  

// Function to find the active bundle option and log its bundle-id 

function findActiveBundleOption() { 

    const activeElement = document.querySelector('.bundle-option.sf-active'); 

    if (activeElement) { 

        const bundleId = activeElement.getAttribute('bundle-id'); 

        console.log('The bundle-id of the active element is:', bundleId); 

        return bundleId; 

    } else { 

        console.log('No active bundle option found.'); 

        return null; 

    } 

} 

  

function findActiveSizeOption() { 

    const activeElement = document.querySelector('.size-option.sf-active'); 

    if (activeElement) { 

        const sizeId = activeElement.getAttribute('size-id'); 

        console.log('The size-id of the active element is:', sizeId); 

        return sizeId; 

    } else { 

        console.log('No active size option found.'); 

        return null; 

    } 

} 

  

let variantMatrix = { 

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

} 

  

let variantCheckoutLink = { 

    '7356063875139': { 

        's': 'https://037ecb-53.myshopify.com/cart/42025416196163:1?channel=buy_button', 

        'm': 'https://037ecb-53.myshopify.com/cart/42025416228931:1?channel=buy_button', 

        'l': 'https://037ecb-53.myshopify.com/cart/42025416294467:1?channel=buy_button', 

        'xl': 'https://037ecb-53.myshopify.com/cart/42025416261699:1?channel=buy_button' 

    }, 

    '7356069904451': { 

        's': 'https://037ecb-53.myshopify.com/cart/42025449586755:1?channel=buy_button', 

        'm': 'https://037ecb-53.myshopify.com/cart/42025449619523:1?channel=buy_button', 

        'l': 'https://037ecb-53.myshopify.com/cart/42025449652291:1?channel=buy_button', 

        'xl': 'https://037ecb-53.myshopify.com/cart/42025449685059:1?channel=buy_button' 

    }, 

    '7356064071747': { 

        's': 'https://037ecb-53.myshopify.com/cart/42025417211971:1?channel=buy_button', 

        'm': 'https://037ecb-53.myshopify.com/cart/42025417244739:1?channel=buy_button', 

        'l': 'https://037ecb-53.myshopify.com/cart/42025417277507:1?channel=buy_button', 

        'xl': 'https://037ecb-53.myshopify.com/cart/42025417310275:1?channel=buy_button' 

    } 

} 

  

// Function to update the product container and button states 

function updateProduct() { 

    let bundleId = findActiveBundleOption(); 

    let sizeId = findActiveSizeOption(); 

    

    // Add error checking 

    if (!bundleId || !sizeId) { 

        console.error('Missing bundle or size selection'); 

        return; 

    } 

  

    let variantId = variantMatrix[bundleId]?.[sizeId]; 

    if (!variantId) { 

        console.error('Invalid variant combination:', bundleId, sizeId); 

        return; 

    } 

  

    const addToCart = document.getElementById('add-to-cart'); 

    const buyNow = document.getElementById('buy-now'); 

     

    if (addToCart && buyNow) { 

        addToCart.setAttribute('sf-add-to-cart', "gid://shopify/ProductVariant/" + variantId); 

        buyNow.href = variantCheckoutLink[bundleId][sizeId]; 

    } 

} 

  

// Set up click handlers for bundle and size options 

document.querySelectorAll('.bundle-option').forEach(element => { 

    element.addEventListener('click', () => { 

        clearBundleButtons(); 

        element.classList.add('sf-active'); 

        updateProduct(); 

    }); 

}); 

  

document.querySelectorAll('.size-option').forEach(element => { 

    element.addEventListener('click', () => { 

        clearSizeButtons(); 

        element.classList.add('sf-active'); 

        updateProduct(); 

    }); 

}); 

  

  

  

// Single DOMContentLoaded event listener that handles all initialization 

document.addEventListener('DOMContentLoaded', function() { 

    // Shopyflow specific selectors 

    const addToCartButton = document.querySelector('[fs-addtocart-element="add-to-cart"]'); 

    const quantityInput = document.querySelector('[fs-addtocart-element="quantity-input"]'); 

     

    // Find and set default selections 

    const singleButton = document.querySelector('.bundle-option[bundle-id="7356063875139"]'); 

    const defaultSize = document.querySelector('.size-option[size-id="s"]'); 

     

    // Add sf-active class to defaults 

    if (singleButton) { 

        singleButton.classList.add('sf-active'); 

    } 

    if (defaultSize) { 

        defaultSize.classList.add('sf-active'); 

    } 

     

    // Setup quantity reset after add to cart 

    if (addToCartButton && quantityInput) { 

        addToCartButton.addEventListener('click', function() { 

            setTimeout(() => { 

                quantityInput.value = '1'; 

                quantityInput.dispatchEvent(new Event('input', { bubbles: true })); 

                quantityInput.dispatchEvent(new Event('change', { bubbles: true })); 

            }, 200); 

        }); 

    } 

  

    // Update product with default selections 

    updateProduct(); 

}); 
