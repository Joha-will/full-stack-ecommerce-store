import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import db from '@/db/db';
import { formatCurrency } from '@/lib/formatters';
import { formatNumber } from '@/lib/formatters';


async function getSalesData() {
    const data = await db.order.aggregate({
        _sum: {pricePaidInCents: true},
        _count: true,
    })
    return {
        totalSales: (data._sum.pricePaidInCents ?? 0) / 100,
        totalOrders: data._count,
    }

}

async function getUserData() {
    const [userCount, orderData] = await Promise.all([
        db.user.count(),
        db.order.aggregate({
            _sum: {pricePaidInCents: true},
        })
    ])

    return {
        userCount,
        averageValuePerUser: userCount === 0 ? 0 : (orderData._sum.pricePaidInCents || 0) / userCount / 100,
    }

}

async function getProductsData() {
    const [ activeCount, inactiveCount ] = await Promise.all([
        db.product.count({where: {isAvailableForPurchase: true}}),
        db.product.count({where: {isAvailableForPurchase: false}}),
    ])

    return {
        activeCount,
        inactiveCount,
    }

}


function wait(duration: number) {
    return new Promise(resolve => setTimeout(resolve, 
        duration))
}

export default async function AdminDashboard() {

    const [salesData, userData, productData ] = await Promise.all([
        getSalesData(),
        getUserData(),
        getProductsData(),
    ])


    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

            <DashboardCard title='Sales' description={`${formatNumber(salesData.totalSales)} Orders`} body={formatCurrency(salesData.totalOrders)} />
            <DashboardCard title='Customers' description={`${formatCurrency(userData.averageValuePerUser)} Average Value`} body={formatNumber(userData.userCount)} />
            <DashboardCard title='Active Products' description={`${formatNumber(productData.inactiveCount)} Inactive Products`} body={formatCurrency(productData.activeCount)} />
            
        </div>
    )
}




type DashboardCardProps = {
    title: string;
    description: string;
    body: string;
}

function DashboardCard({title, description, body}: DashboardCardProps) {

    return (

        <Card>
            <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
            </CardHeader>

            <CardContent>
            <p>{body}</p>
            </CardContent>

        </Card>

    );
}