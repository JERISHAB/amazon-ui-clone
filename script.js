const fetchData = async () => {
  try {
    const res = await fetch("./data.json");
    const fetchedData = await res.json();

    let html = "";

   // for (let i = 0; i < fetchedData.products.length; i++) {
    for (let i = 0; i <3; i++) {
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

      html += `<div class="prod-div" style="background-color: bisque; border: solid 2px black;">
        <img src="${productImage}" alt="product-image" class="prod-img">
        <div class="pro-details">
            <p class="pro-description">${description}</p>
            <div class="ratings">      
                <p class="ratings">${rating}</p>
                <img src="#" class="rating-img">
                <p class="no-ratings">${noOfRatings}</p>
            </div>
            <p class="bought-past-month">${boughtInPastMonth}</p>
            <div class="pric-desc">
                <p class="discount-price">${discountPrice}</p>
                <p class="og-price-percentage">${originalPrice} (${discountPercentage}%)</p>
            </div>
            <p class="cash-back-text">Up to 5% back with Amazon Pay ICICI cardUp to 5% back with Amazon Pay ICICI card</p>
            <p class="free-delivery">${freeDeliveryDate}</p>
            <p class="prime-delivery">${primeDeliveryDate}</p>
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
