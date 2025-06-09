import { SignUp } from "@clerk/nextjs";
import BgGradient from "@/components/common/bg-gradient";

export default function SignUpPage() {
  return (
    <section>
      <BgGradient />
      <div className="flex items-center justify-center min-h-screen  bg-white py-8 px-4 sm:px-6 lg:px-6">
        <SignUp
          appearance={{
            elements: {
              formButtonPrimary: "bg-rose-600 hover:bg-rose-700 text-white",
              footerActionLink: "text-rose-600 hover:text-rose-700",
            },
          }}
        />
      </div>
    </section>
  );
}
