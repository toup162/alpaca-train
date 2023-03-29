import React, { useState, useEffect } from 'react'
import InfoCard from '../components/Cards/InfoCard'
import PageTitle from '../components/Typography/PageTitle'
import SectionTitle from '../components/Typography/SectionTitle'
import { ChatIcon, CartIcon, MoneyIcon, PeopleIcon } from '../icons'
import RoundIcon from '../components/RoundIcon'
import response from '../utils/demo/tableData'
import {
    Button
} from '@windmill/react-ui'
import AddFavoriteModal from '../components/AddFavoriteModal/AddFavoriteModal'

function Dashboard() {
    const [data, setData] = useState([]);

    const [isAddFavorateModalOpen, setIsAddFavorateModalOpen] = useState(false);

    // pagination setup
    const resultsPerPage = 10;
    const totalResults = response.length;

    return (
        <div className="mb-12 mt-6">
            <SectionTitle>Favorites</SectionTitle>
            
            {/* <!-- Cards --> */}
            <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
                <InfoCard title="Total clients" value="6389">
                    <RoundIcon
                        icon={PeopleIcon}
                        iconColorClass="text-orange-500 dark:text-orange-100"
                        bgColorClass="bg-orange-100 dark:bg-orange-500"
                        className="mr-4"
                    />
                </InfoCard>

                <InfoCard title="Account balance" value="$ 46,760.89">
                    <RoundIcon
                        icon={MoneyIcon}
                        iconColorClass="text-green-500 dark:text-green-100"
                        bgColorClass="bg-green-100 dark:bg-green-500"
                        className="mr-4"
                    />
                </InfoCard>

                <InfoCard title="New sales" value="376">
                    <RoundIcon
                        icon={CartIcon}
                        iconColorClass="text-blue-500 dark:text-blue-100"
                        bgColorClass="bg-blue-100 dark:bg-blue-500"
                        className="mr-4"
                    />
                </InfoCard>

                <InfoCard title="Pending contacts" value="35">
                    <RoundIcon
                        icon={ChatIcon}
                        iconColorClass="text-teal-500 dark:text-teal-100"
                        bgColorClass="bg-teal-100 dark:bg-teal-500"
                        className="mr-4"
                    />
                </InfoCard>
            </div>

            <div>
                <Button onClick={() => setIsAddFavorateModalOpen(true)}>Add Favorite</Button>
            </div>

            <AddFavoriteModal
                isOpen={isAddFavorateModalOpen}
                setOpen={setIsAddFavorateModalOpen}
            />

        </div>
    )
}

export default Dashboard;
