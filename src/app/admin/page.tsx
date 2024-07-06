import { Card, CardHeader } from '@/components/ui/card';


export default function AdminDashboard() {
    return (
        <div className="grid grid-cols-1 md:grid-col-2 lg:grid-cols-3 gap-4">
            <Card>
                <CardHeader> Sales </CardHeader>
            </Card>
        </div>
    )
}