window.addEventListener('ShopyflowReady', (event) => {
    Shopyflow.on('buyModuleReady', ({ el, product }) => {
        document.querySelectorAll('.cart-item-quantity-changer-4').forEach(button => {
            button.addEventListener('click', updateFreeShipping)
        })

        function updateFreeShipping() {
            console.log('help me')
            let price = document.getElementById('organic-briefs-price').textContent;
            price = price.replace('$', '');
            if (price >= 50 || document.getElementById('Quantity-Block-2').value > 1) {
                document.getElementById('product-free-shipping').style.display = 'block';
            } else {
                document.getElementById('product-free-shipping').style.display = 'none';
            }
        }
        let subTotalCart = document.getElementById('cart-modal-subtotal');

        if (subTotalCart) {
            const observer = new MutationObserver(() => {
                let subTotalText = subTotalCart.textContent.trim();
                let subTotal = parseFloat(subTotalText.replace('$', '')) || 0; // Convert to number safely

                let freeShippingElement = document.getElementById('organic-briefs-free-shipping');
                if (freeShippingElement) {
                    freeShippingElement.style.display = subTotal >= 50 ? 'block' : 'none';
                }
            });

            // Start observing changes in the subtotal element
            observer.observe(subTotalCart, {
                characterData: true, // Detect text changes
                childList: true, // Detect changes in child elements
                subtree: true // Ensure all nested changes are captured
            });
        }
        ///////////////////////////////////////////////////////////////////////////

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

        function fadeTextChange(container, newText) {
            const textElement = container.querySelector(".text-block-16"); // Target inner text div
            textElement.style.opacity = "0"; // Fade out

            setTimeout(() => {
                textElement.textContent = newText; // Change text after fade out
                textElement.style.opacity = "1"; // Fade back in
            }, 200); // Matches transition duration
        }

        const fivePackSavings = document.getElementById("five-pack-savings");
        const threePackSavings = document.getElementById("three-pack-savings");

        fivePackSavings.addEventListener("mouseover", function () {
            fadeTextChange(fivePackSavings, "$25 each");
        });

        fivePackSavings.addEventListener("mouseout", function () {
            fadeTextChange(fivePackSavings, "16.67% off");
        });

        threePackSavings.addEventListener("mouseover", function () {
            fadeTextChange(threePackSavings, "$27.5 each");
        });

        threePackSavings.addEventListener("mouseout", function () {
            fadeTextChange(threePackSavings, "8.33% off");
        });

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
                if (price) {
                    priceElement.textContent = price;
                    strikethroughPriceElement.textContent = strikethroughPrice;
                }
                if (price == '$30.00') {
                    strikethroughPriceElement.style.display = 'none';
                } else {
                    strikethroughPriceElement.style.display = 'block';
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
            '7356063875139': '$30.00',
            '7356069904451': '$82.50',
            '7356064071747': '$125.00'
        };

        const strikePriceMatrix = {
            '7356063875139': '\s',
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
                updateFreeShipping();
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
            window.open(variantCheckoutLink[findActiveBundleOption()][findActiveSizeOption()] + quantity + '?channel=buy_button', '_blank');
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
            }

            if (defaultSize) {
                defaultSize.classList.add('sf-active');
            }

            updateProduct();
        }

        initializeDefaultSelections();

        const addToCartButton = document.querySelector('[fs-addtocart-element="add-to-cart"]');
        const quantityInput = document.querySelector('[fs-addtocart-element="quantity-input"]');

        if (addToCartButton && quantityInput) {
            addToCartButton.addEventListener('click', function () {
                setTimeout(() => {
                    quantityInput.value = '1';
                    quantityInput.dispatchEvent(new Event('input', { bubbles: true }));
                    quantityInput.dispatchEvent(new Event('change', { bubbles: true }));
                }, 200);
            });
        }

        updateProduct();
    });
})

window.onload = function() {
  updatePrice();
};