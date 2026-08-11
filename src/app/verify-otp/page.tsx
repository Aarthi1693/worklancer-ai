import AuthLayout from "@/components/auth/AuthLayout";
import OTPForm from "@/components/auth/OTPForm";

export default function VerifyOTPPage() {
  return (
    <AuthLayout
      title="Verify OTP"
      subtitle="Enter the verification code sent to your email."
    >
      <OTPForm />
    </AuthLayout>
  );
}