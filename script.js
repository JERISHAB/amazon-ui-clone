const fetchData = async () => {
  try {
    const res = await fetch("./data.json");
    const fetchedData = await res.json();
    const originalArray = fetchedData.products;

    const checkbox = document.querySelectorAll("input[type=checkbox]");
    const pTags = document.querySelectorAll(".filter-text");

    renderProducts(originalArray);

    checkbox.forEach((cb) => {
      cb.addEventListener("change", () => {
        console.log("Checkbox changed:", cb.value);
        applyFilters();
      });
    });

    pTags.forEach((pTag) => {
      pTag.addEventListener("click", () => {
        console.log("P tag clicked:", pTag.innerText);
        pTag.classList.toggle("active");
        applyFilters();
      });
    });

    document.getElementById("clear").addEventListener("click", () => {
      console.log("Clear clicked for brand");
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

      checked.forEach((checkedBox) => {
        const filterName = checkedBox.getAttribute("fileterName");
        const filterValue = checkedBox.value;

        if (!filterMap[filterName]) {
          filterMap[filterName] = [];
        }

        filterMap[filterName].push(filterValue);
      });

      activePTags.forEach((pTag) => {
        const filterName = pTag.getAttribute("fileterName");
        const filterValue = pTag.getAttribute("value");

        if (!filterMap[filterName]) {
          filterMap[filterName] = [];
        }

        filterMap[filterName].push(filterValue);
      });

      console.log("Filter Map:", filterMap);

      const filteredArray = originalArray.filter((item) => {
        return Object.keys(filterMap).every((key) => {
          return filterMap[key].includes(String(item[key]));
        });
      });

      console.log("Filtered products:", filteredArray);
      renderProducts(filteredArray);
    }

    function renderProducts(dataArray) {
      let html = "";

      for (let i = 0; i < dataArray.length; i++) {
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
        } = dataArray[i];

        html += `<div class="prod-div">
          <img src="${productImage}" alt="product-image" class="prod-img">
          <div class="pro-details">
              <p class="pro-description">${description}</p>
              <div class="ratings">      
                  <p class="ratings">${rating}</p>
                  <img src="./images/star4.svg" class="rating-img">
                  <p class="no-ratings">(${noOfRatings})</p>
              </div>
              <p class="bought-past-month">${boughtInPastMonth}+ bought in past month</p>
              <div class="price-desc">
                  <p><sup>₹</sup><span class="discount-price">${discountPrice}</span></p>
                  <p class="og-price"> M.R.P: <span class="strike">₹${originalPrice}</span> <span class="og-price-percentage">(${discountPercentage}% off)</span></p>
              </div>
              <p class="cash-back-text">Up to 5% back with Amazon Pay ICICI card</p>
              <p class="free-delivery">FREE delivery <strong>${freeDeliveryDate}</strong></p>
              <p class="free-delivery">Or <span class="prime">Prime members</span> get free delivery <strong>${primeDeliveryDate}</strong></p>
              <button class="add-cart">Add to cart</button>
          </div>
        </div>`;
      }

      document.getElementById("grid-sec").innerHTML = html;
    }
  } catch (error) {
    console.log("Fetch error:", error);
  }
};

fetchData();


function toggleFunc() {
  const filter = document.getElementById("toggle-list");
  filter.classList.toggle('toggleDisplay')
}
