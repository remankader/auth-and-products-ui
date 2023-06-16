import "./globals.css";
import { Providers } from "./provider";
import NavigationBarComponent from "./components/bars/navigation-bar";
import TopBarComponent from "./components/bars/top-bar";

export const metadata = {
  title: "Auth and Products",
  description: "A demo project showcasing auth and product management",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="">
      <body className="">
        <Providers>
          <TopBarComponent />
          <div className="min-h-screen flex flex-col">
            <nav
              className="h-14 flex justify-center 
            border-b border-gray-200"
            >
              <div className="w-full p-1.5 mx-1 md:mx-4">
                <NavigationBarComponent />
              </div>
            </nav>

            <main className="flex justify-center flex-grow">
              <div className="w-full p-1.5 my-1.5 pb-6 mx-1 md:mx-4">
                {children}
              </div>
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
