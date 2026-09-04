const PRODUCTS = [
  { id: "baka", name: "BAKA", price: 90.00, image: "images/baka.png.png", category: "Sweatshirt" },

  { id: "esdeekid", name: "ESDEE KID", price: 90.00, image: "images/esdeekid.png.png", category: "Sweatshirt" },

  { id: "eyeseeu", name: "EYE SEE YOU", price: 90.00, image: "images/eyeseeu.png.png", category: "Sweatshirt" },

  { id: "kanye", name: "KANYE", price: 80.00, image: "images/kanye2.png.png", category: "T-Shirt" },

  { id: "son", name: "SON", price: 80.00, image: "images/son.png.png", category: "T-Shirt" },

  { id: "weplayin", name: "WE PLAYIN", price: 80.00, image: "images/weplayin.png.png", category: "T-Shirt" },

  { id: "coming-soon-1", name: "COMING SOON", price: 0.00, image: "", category: "" },

  { id: "coming-soon-2", name: "COMING SOON", price: 0.00, image: "", category: "" }
];

const SIZES = ["S", "M", "L", "XL", "2XL"];

function getProductById(id) {
  return PRODUCTS.find((p) => p.id === id);
}