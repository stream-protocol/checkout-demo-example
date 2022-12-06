import { useCheckout } from "@streampay/react-checkout-sdk";
import axios from "axios";
import type { NextPage } from "next";

const Index: NextPage = () => {
  const fetchSessionId = async () => {
    const { data } = await axios.post("/api/create-session");
    return data.session_id;
  };

  const { mutate, isLoading } = useCheckout(fetchSessionId);

  // Example showcasing react hooks to generate the session url, alternatively you can use ur pre-built button.
  // More details here- https://docs.streampayment.app/checkout/getting-started.html#integrating-the-checkout-button

  return (
    <div className="min-h-screen w-full bg-slate-100 flex items-center justify-center">
      <button
        className="w-36 font-body px-8 h-10 rounded-md bg-indigo-600 text-white text-[16px] hover:bg-indigo-700 grid place-items-center"
        onClick={async () => {
          await mutate();
        }}
      >
        {isLoading ? (
          <div className="h-3 w-3 bg-indigo-50 rounded-full animate-ping"></div>
        ) : (
          "Checkout"
        )}
      </button>
    </div>
  );
};

export default Index;