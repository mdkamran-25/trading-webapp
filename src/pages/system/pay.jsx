import React, { useState, useEffect, useRef } from "react";
import {
  Smile,
  Loader2,
  CheckCircle,
  AlertTriangle,
  Clock,
} from "lucide-react";
import { getRandomUPI, QRrandom, RechargeBalence, SECRET_KEY } from "../../api";
import { useLocation, useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";
import Cookies from "js-cookie";
import pako from "pako";
import { PageHeader, Card, Text, Button, Input } from "../../components";

const QRCode = async () => {
  const res = await QRrandom();
  if (!res.ok) return;
  const selectedItem = await res.json();
  console.log(selectedItem);
  return {
    filename: selectedItem.filename,
    url: selectedItem.url,
  };
};

const Pay = () => {
  const location = useLocation();
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [qrImageName, setQrImageName] = useState("");
  const [upiId, setupiId] = useState("Q065208051@ybl");
  const [payeeName, setPayeeName] = useState("Guest Name");
  const [utr, setUtr] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [price] = useState(location.state ?? 0);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [timer, setTimer] = useState(300); // countdown (in seconds)
  const [user, setuser] = useState(null);
  const navigate = useNavigate();
  const timerRef = useRef(null);

  // 🧩 Fetch new QR code
  const fetchQRCode = async () => {
    setMessage({ text: "Fetching latest QR code...", type: "info" });
    try {
      const data = await QRCode();
      setQrCodeUrl(data.url);
      setQrImageName(data.filename);
      setMessage({
        text: "QR Code loaded. Please complete payment within 1 minute.",
        type: "info",
      });
    } catch (error) {
      setMessage({
        text: "Failed to load QR code. Please refresh.",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // 🔐 Get user data
  const getUserData = async () => {
    const encryptedUser = Cookies.get("tredingWebUser");
    if (encryptedUser) {
      const base64 = encryptedUser.replace(/-/g, "+").replace(/_/g, "/");

      // 🔹 3. AES decrypt (gives compressed Base64 string)
      const decryptedBase64 = CryptoJS.AES.decrypt(base64, SECRET_KEY).toString(
        CryptoJS.enc.Utf8,
      );
      if (!decryptedBase64) return null;

      // 🔹 4. Convert Base64 → Uint8Array (binary bytes)
      const binaryString = atob(decryptedBase64);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }

      // 🔹 5. Decompress (restore JSON string)
      const decompressed = pako.inflate(bytes, { to: "string" });
      const data = await JSON.parse(decompressed);
      setuser(data);
      setIsLoading(true);
      if (!data?._id) navigate("/login");
    }
  };
  // --- Constants ---

  const currency = "INR";

  const isMobileDevice = () =>
    /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent,
    );

  const initiatePayment = (appName) => {
    let currentAmount = String(price).trim();

    if (!upiId) {
      setMessage({ text: "UPI ID is missing. Cannot proceed.", type: "error" });
      return;
    }

    if (!currentAmount || parseFloat(currentAmount) <= 0) {
      currentAmount = "1.00"; // default minimum amount
    }

    const formattedAmount = parseFloat(currentAmount).toFixed(2);
    const transactionNote = `Recharge for User ${user?._id || "Guest"} via ${appName}`;

    // ✅ Prepare URL Params
    const params = new URLSearchParams();
    params.append("pa", upiId);
    params.append("pn", payeeName);
    params.append("am", formattedAmount);
    params.append("cu", currency);
    params.append("tn", transactionNote);

    // ✅ Handle Paytm separately using Intent-based scheme
    if (appName === "Paytm") {
      const intentUrl = `intent://upi/pay?${params.toString()}#Intent;scheme=paytm;package=net.one97.paytm;end;`;

      if (isMobileDevice()) {
        console.log("Opening Paytm Intent:", intentUrl);

        window.location.href = intentUrl;

        // Fallback after 2.5s
        setTimeout(() => {
          setMessage({
            text: "Paytm app not detected. Opening Paytm website...",
            type: "info",
          });
          window.open("https://paytm.com/", "_blank");
        }, 2500);

        setMessage({
          text: `Opening Paytm app to pay ₹${formattedAmount}...`,
          type: "info",
        });
      } else {
        window.open("https://paytm.com/", "_blank");
        setMessage({
          text: "Opening Paytm website. Please scan QR or pay manually.",
          type: "info",
        });
      }

      return; // stop further execution
    }

    // ✅ PHONEPE and OTHER APPS
    let schemeBase;

    if (appName === "PhonePe") {
      schemeBase = "phonepe://pay?";
    } else {
      schemeBase = "upi://pay?";
    }

    const upiUrl = schemeBase + params.toString();

    if (isMobileDevice()) {
      console.log(`Trying to open ${appName}: ${upiUrl}`);

      window.location.href = upiUrl;

      // Fallback if app not found
      setTimeout(() => {
        setMessage({
          text: `${appName} not detected. Opening website instead...`,
          type: "info",
        });

        if (appName === "PhonePe")
          window.open("https://www.phonepe.com/", "_blank");
      }, 2500);

      setMessage({
        text: `Opening ${appName} app to pay ₹${formattedAmount}...`,
        type: "info",
      });
    } else {
      // ✅ Desktop Fallback
      let fallbackUrl = "";

      if (appName === "PhonePe") fallbackUrl = "https://www.phonepe.com/";

      if (fallbackUrl) {
        window.open(fallbackUrl, "_blank");
        setMessage({
          text: `Opening ${appName} website. Please scan QR or pay manually.`,
          type: "info",
        });
      } else {
        setMessage({
          text: "Could not determine redirect URL.",
          type: "error",
        });
      }
    }
  };

  const GetUPI = async () => {
    const res = await getRandomUPI();
    console.log(res);
    if (res.success) {
      setupiId(res?.data?.upiId || "Q065208051@ybl");
      setPayeeName(res?.data?.payeeName || "Guest Name");
    }
  };
  // 🚀 Initial setup
  useEffect(() => {
    GetUPI();
    getUserData();
    fetchQRCode();
    setTimer(300);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ⏱ Countdown effect
  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, []);

  // 🔁 When timer hits 0, fetch new QR and reset timer
  useEffect(() => {
    if (timer === 0) {
      GetUPI();
      fetchQRCode(); // fetch new QR
      setTimer(300); // restart countdown
    }
  }, [timer]);
  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;

  // 🧾 Submit UTR
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;
    setIsLoading(true);

    setMessage({ text: "Submitting UTR for verification...", type: "info" });
    try {
      const payload = { userId: user?._id, amount: price, utr, qrImageName };

      const res = await RechargeBalence(payload);

      if (!res.status) throw new Error("Payment request failed");

      setMessage({
        text: "Payment submitted successfully! Awaiting approval.",
        type: "success",
      });
      setUtr("");
      setTimeout(() => navigate(-1), 1000);
    } catch (error) {
      setMessage({
        text: `Submission failed: ${error.message || "Server error."}`,
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const MessageDisplay = ({ text, type }) => {
    if (!text) return null;
    let bgColor, icon;
    switch (type) {
      case "success":
        bgColor = "bg-green-100 border border-green-400 text-green-700";
        icon = <CheckCircle className="inline mr-2" size={16} />;
        break;
      case "error":
        bgColor = "bg-red-100 border border-red-400 text-red-700";
        icon = <AlertTriangle className="inline mr-2" size={16} />;
        break;
      default:
        bgColor = "bg-blue-100 border border-blue-400 text-blue-700";
        icon = <Smile className="inline mr-2" size={16} />;
    }
    return (
      <div className={`p-3 rounded-lg mt-3 text-sm font-medium ${bgColor}`}>
        {icon}
        {text}
      </div>
    );
  };

  return (
    <div className="w-full max-w-md min-h-screen mx-auto bg-gray-100">
      {/* Header */}
      <PageHeader title="Recharge" onBack={() => navigate(-1)} />

      {/* Pay Card */}
      <Card className="bg-gradient-to-b from-yellow-300 to-orange-400 border border-gray-300 w-full mt-0.5">
        {/* Header with Amount */}
        <div className="pb-4 mb-4 border-b border-gray-300">
          <Text variant="h1" className="text-gray-800">
            ₹{price}
          </Text>
        </div>

        {/* Payment Apps */}
        <div className="flex flex-wrap gap-2.5 mt-2.5 mb-4">
          <div
            onClick={() => initiatePayment("Paytm")}
            className="flex-1 min-w-[calc(50%-5px)] bg-gray-100 p-3 rounded-2xl border border-gray-300 cursor-pointer hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-2.5">
              <img
                src="https://pay.topcashwallet.com/assets/paytm-iAXkRI72.png"
                alt="Paytm"
                className="w-6 h-auto"
              />
              <Text variant="sm" className="font-medium text-gray-800">
                Paytm
              </Text>
            </div>
          </div>

          <div
            onClick={() => initiatePayment("PhonePe")}
            className="flex-1 min-w-[calc(50%-5px)] bg-gray-100 p-3 rounded-2xl border border-gray-300 cursor-pointer hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-2.5">
              <img
                src="https://pay.topcashwallet.com/assets/qr_phonepe-DfcDrNXK.png"
                alt="PhonePe"
                className="w-6 h-auto"
              />
              <Text variant="sm" className="font-medium text-gray-800">
                PhonePe
              </Text>
            </div>
          </div>
        </div>

        {/* QR Section */}
        <section className="mt-6 text-center">
          <Text variant="h3" className="mb-2 text-gray-700">
            Use Mobile Scan Code to Pay
          </Text>
          <Text variant="sm" className="mb-4 text-gray-600">
            Or take screenshot and scan in your payment app.
            <br />
            <Clock size={14} className="inline mr-1" />
            QR will expire in{" "}
            <strong>
              {minutes}:{seconds.toString().padStart(2, "0")} Minutes Left
            </strong>
          </Text>

          <div className="flex items-center justify-center mx-auto overflow-hidden border-2 border-gray-300 border-dashed rounded-lg h-72 w-72 bg-gray-50">
            {isLoading && !qrCodeUrl ? (
              <div className="flex flex-col items-center">
                <Loader2 className="w-6 h-6 mb-2 text-orange-500 animate-spin" />
                <Text variant="sm" className="text-gray-600">
                  Loading QR...
                </Text>
              </div>
            ) : (
              qrCodeUrl && (
                <img
                  src={qrCodeUrl}
                  alt="QR Code"
                  className="object-contain w-full h-full rounded"
                  onError={(e) => {
                    e.target.src =
                      "https://placehold.co/160x160/F7F7F7/333333?text=QR+Error";
                  }}
                />
              )
            )}
          </div>

          <div className="mt-3 text-sm font-medium text-red-600">
            ⚠️ Do not use the same QR code multiple times
          </div>

          {isLoading && !qrCodeUrl ? (
            <div className="flex flex-col items-center mt-4">
              <Loader2 className="w-5 h-5 mb-2 text-orange-500 animate-spin" />
              <Text variant="sm" className="text-gray-600">
                Loading QR...
              </Text>
            </div>
          ) : (
            <Text variant="sm" className="block mt-3 text-gray-700">
              UPI Id: {upiId}
            </Text>
          )}
        </section>

        {/* UTR Section */}
        <section className="pt-4 mt-8 border-t border-gray-300">
          <Text variant="body" className="mb-3 font-semibold text-gray-700">
            Enter Ref No. and Submit
          </Text>
          <form onSubmit={handleSubmit} className="space-y-3">
            <Input
              type="text"
              value={utr}
              onChange={(e) => setUtr(e.target.value)}
              placeholder="Enter Your UTR..."
              required
              disabled={isLoading || message.type === "success"}
            />
            <Button
              variant="primary"
              type="submit"
              disabled={isLoading || !utr.trim() || message.type === "success"}
              className="w-full py-2.5"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit"
              )}
            </Button>
          </form>

          <MessageDisplay text={message.text} type={message.type} />
        </section>
      </Card>
    </div>
  );
};

export default Pay;
