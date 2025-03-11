"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";  
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";

const OTPPage = () => {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!otp || otp.length !== 6) {
      toast.error("الرجاء إدخال رمز التحقق المكون من 6 أرقام");
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate an API call to verify the OTP
      const response = await verifyOtp(otp); // Replace with your actual API call
      if (response.success) {
        toast.success("تم التحقق بنجاح!");
        router.push("/dashboard"); // Redirect to the dashboard or another page
      } else {
        toast.error(response.message || "فشل التحقق، الرجاء المحاولة مرة أخرى");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      toast.error("حدث خطأ أثناء التحقق، الرجاء المحاولة مرة أخرى");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">التحقق من الرمز</CardTitle>
          <CardDescription className="text-center">
            الرجاء إدخال رمز التحقق المكون من 6 أرقام الذي تم إرساله إلى هاتفك.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="otp">رمز التحقق</Label>
              <Input
                id="otp"
                type="text"
                inputMode="numeric"
                pattern="\d{6}"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="أدخل الرمز المكون من 6 أرقام"
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "جاري التحقق..." : "تحقق"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button
            variant="link"
            onClick={() => router.push("/resend-otp")} // Redirect to resend OTP page
            className="text-sm text-blue-600 hover:text-blue-700"
          >
            لم تستلم الرمز؟ إعادة إرسال
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default OTPPage;

// Mock function to simulate OTP verification
const verifyOtp = async (otp) => {
  // Replace this with your actual API call
  return new Promise((resolve) => {
    setTimeout(() => {
      if (otp === "123456") {
        resolve({ success: true, message: "تم التحقق بنجاح!" });
      } else {
        resolve({ success: false, message: "رمز التحقق غير صحيح" });
      }
    }, 1000);
  });
};