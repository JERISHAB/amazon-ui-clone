const fetchData = async () => {
  try {
    const res = await fetch("./data.json");
    const fetchedData = await res.json();
    const originalArray = fetchedData.products;

    const checkbox = document.querySelectorAll("input[type=checkbox]");
    const pTags = document.querySelectorAll(".filter-text");

    renderProducts(originalArray);

    checkbox.forEach((cb) => {
      cb.addEventListener("change", applyFilters);
    });

    pTags.forEach((pTag) => {
      pTag.addEventListener("click", () => {
        pTag.classList.toggle("active");
        applyFilters();
      });
    });

    document.getElementById("clear").addEventListener("click", () => {
      checkbox.forEach((cb) => {
        if (cb.getAttribute("fileterName") === "brand") {
          cb.checked = false;
        }
      });
      applyFilters();
    });

    function applyFilters() {
      const checked = document.querySelectorAll("input[type=checkbox]:checked");
      const activePTags = document.querySelectorAll(".filter-text.active");

      let filterMap = {};

      checked.forEach((cb) => {
        const name = cb.getAttribute("fileterName");
        const value = cb.value;

        console.log("name is :", name);
        console.log("value is :", value);

        if (!filterMap[name]) {
          filterMap[name] = [];
        }
        filterMap[name].push(value);
      });

      activePTags.forEach((pTag) => {
        const name = pTag.getAttribute("fileterName");
        const value = pTag.getAttribute("value");

        if (!filterMap[name]) {
          filterMap[name] = [];
        }
        filterMap[name].push(value);
      });

      const filteredArray = [];

      for (let i = 0; i < originalArray.length; i++) {
        const item = originalArray[i];
        let match = true;

        for (let key in filterMap) {
          const itemValue = item[key];
          const allowedValues = filterMap[key];

          if (!allowedValues.includes(itemValue)) {
            match = false;
          }
        }

        if (match) {
          filteredArray.push(item);
        }
      }
             
      renderProducts(filteredArray);
    }

    function renderProducts(dataArray) {
      let html = "";

      dataArray.forEach((product) => {
        const {
          description,
          rating,
          noOfRatings,
          boughtInPastMonth,
          discountPrice,
          originalPrice,
          discountPercentage,
          freeDeliveryDate,
          primeDeliveryDate,
          productImage,
        } = product;

        const isWrapped = discountPrice.toString().length > 3;
        const cashBackClass = isWrapped ? "wrap" : "no-wrap";
        const deliveryClass = isWrapped ? "delivery-wrap" : "delivery-no-wrap";
     
        html += `
        <div class="prod-div">
          <img src="${productImage}" alt="product-image" class="prod-img">
          <div class="pro-details">
              <p class="pro-description">${description}</p>
              <div class="ratings">      
                  <p class="ratings">${rating}</p>
                  <img src="./images/products/product-elements/star4.svg" class="rating-img">
                  <img src="./images/products/product-elements/star4-mob.svg" class="rating-img-mob">
                  <p class="no-ratings">(${noOfRatings})</p>
              </div>
              <p class="bought-past-month">${boughtInPastMonth}+ bought in past month</p>
              <span class="price-desc">
                  <span class="discount-price"><sup>₹</sup>${discountPrice}</span>
                  <span class="og-price">
                    M.R.P: <span class="strike"> ₹${originalPrice}</span> 
                    <span class="og-price-percentage">
                      <span>(${discountPercentage}%</span>
                      <span class="price-off"> off)</span>
                    </span>
                  </span>
              </span>
              <p class="cash-back-text ${cashBackClass}">Up to 5% back with Amazon Pay ICICI card</p>
              <p class="${deliveryClass} free-delivery">FREE delivery <strong>${freeDeliveryDate}</strong></p>
              <p class="prime-delivery">Or <span class="prime">Prime members</span> get FREE delivery <strong>${primeDeliveryDate}</strong></p>
              <button class="add-cart">Add to cart</button>
          </div>  
        </div>`;
      });

      document.getElementById("grid-sec").innerHTML = html;
    }
  } catch (error) {
    console.error("Fetch error:", error);
  }
};

fetchData();


// Toggle function

function toggleFunc() {
  const filter = document.getElementById("toggle-list");
  filter.classList.toggle("toggleDisplay");
}


function seeMOre() {

  let btn = document.getElementById("seeBtn");
  console.log(btn)
  const brandLabel = document.getElementsByClassName("see-more-brand");
  console.log((brandLabel));

  if ((brandLabel[0].style.display === "none"))
    for (let i = 0; i < 3; i++) {
      console.log(brandLabel[i].style.display);
      brandLabel[i].style.display = "flex";
      console.log(brandLabel[i].style.display);
      btn.innerHTML = `<img src="images/categories/see-more-arrow.svg" style="rotate: 180deg" alt="" />See less`;
    } else {
    for (let i = 0; i < 3; i++) {
      console.log(brandLabel[i].style.display);
      brandLabel[i].style.display = "none";
      console.log(brandLabel[i].style.display);
      btn.innerHTML = `<img src="images/categories/see-more-arrow.svg" alt="" />See more`;
    }
  

  }
}