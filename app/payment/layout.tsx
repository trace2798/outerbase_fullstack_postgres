import { Sidebar } from "@/components/sidebar";

const PaymentLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      {/* <Navbar /> */}
      <div className="hidden md:flex mt-16 h-full w-20 flex-col fixed inset-y-0">
        <Sidebar />
      </div>
      <main className="pl-[10vw] pr-[5vw] lg:px-[5vw] pt-24 h-fit flex justify-center">
        {children}
      </main>
    </div>
  );
};

export default PaymentLayout;
