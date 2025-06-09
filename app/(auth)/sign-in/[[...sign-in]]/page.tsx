import { SignIn } from "@clerk/nextjs"; // This component requires @clerk/nextjs to be installed
import BgGradient from "@/components/common/bg-gradient";

export default function SignInPage() {
  return (
    <section>
      <BgGradient />
      <div className="flex items-center justify-center min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
        <SignIn
          appearance={{
            elements: {
              formButtonPrimary: "bg-rose-600 hover:bg-rose-700 text-white",
              footerActionLink: "text-rose-600 hover:text-rose-700",
              footerAction__signUp:""
            },
          }}
        />
      </div>
    </section>
  );
}
