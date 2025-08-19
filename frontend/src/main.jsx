import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
const stripePromise = loadStripe(
  "pk_test_51Rs6ViH3q1uh5hIky187kpkACUAa2tfFkhxvVy2syNCQyo09PLEU57TJEKkCA6ZnnN2roeGQT36BKqRvmfU8hanv00HY6xQ6rf"
);

createRoot(document.getElementById("root")).render(
  <Elements stripe={stripePromise}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Elements>
);