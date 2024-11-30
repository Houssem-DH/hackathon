import Header from "@/Components/Questions/Header";


export default function Layout({ children, user }) {
    return (
        <div className="min-h-screen flex flex-col">
            {/* Header */}
            <Header user={user} />
           
            {/* Sidebar and Main Content */}
            <div className="flex flex-1">
                

                {/* Main Content */}
                <main className="flex-1 bg-gray-50 px-6 py-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
