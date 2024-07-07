import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';


export default function AdminDashboard() {
    return (
        <div className="grid grid-cols-1 md:grid-col-2 lg:grid-cols-3 gap-4">

            <DashboardCard title='Sales' description='Descript' body='body' />
            
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