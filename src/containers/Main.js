import React from 'react'

function Main({ children }) {
    return (
        <main className="h-full overflow-y-auto">
            <div className="dashboard-container container grid px-6 mr-auto ml-auto lg:ml-0">{children}</div>
        </main>
    )
}

export default Main
