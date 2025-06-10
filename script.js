const fetchData = async () => {
  try {
    const res = await fetch("./data.json");
    const fetchedData = await res.json();

    const originalArray = fetchedData.products;
    const checkbox = document.querySelectorAll("input[type=checkbox]");

    checkbox.forEach((cb) => {
      cb.addEventListener("change", function () {
        let filteredArray = originalArray;

        const checked = document.querySelectorAll(
          "input[type=checkbox]:checked"
        );

        let filterMap = {};

        checked.forEach((checkedBox) => {
          const filterName = checkedBox.getAttribute("fileterName");
          const filterValue = checkedBox.value;

          console.log("filter name", filterName);
          console.log("filter value",filterValue)

          if (!filterMap[filterName]) {
            filterMap[filterName] = [];
          }

          filterMap[filterName].push(filterValue);
          console.log("filter Map: ",filterMap)
        });

        filteredArray = originalArray.filter((item) => {
          return Object.keys(filterMap).every((filterKey) => {
            return filterMap[filterKey].includes(item[filterKey]);
          });
        });

        let html = "";

        for (let i = 0; i < filteredArray.length; i++) {
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
          } = filteredArray[i];

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
      });
    });
    

    let html = "";

    for (let i = 0; i < fetchedData.products.length; i++) {
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
      } = fetchedData.products[i];

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
  } catch (error) {
    console.log(error);
  }
};

fetchData();

document.getElementById("clear").onclick= function () {
  fetchData();
}
