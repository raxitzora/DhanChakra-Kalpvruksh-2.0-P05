import { Header, Footer, Sidebar } from "../Components/Common";

export default function MainLayout({ children }) {
    return (
        <div className="flex flex-col h-screen bg-gray-50 overflow-hidden text-gray-800">
            <Header />
            <div className="flex flex-1 overflow-hidden w-full">
                <Sidebar />
                <main className="flex-1 flex flex-col overflow-y-auto relative">
                    {children}
                    <Footer />
                </main>
            </div>
        </div>
    )
}