import { PageHeader } from "../_components/PageHeader"
import { Button } from "@/components/ui/button"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell, TableCaption } from "@/components/ui/table"
import Link from "next/link"
import db  from "@/db/db"
import { CheckCircle2, XCircle } from "lucide-react"

export default function AdminProductsPage() {
    return (
        <>
            <div className="flex justify-between items-center gap-4">
                <PageHeader> Products </PageHeader>
                <Button asChild>
                    <Link href="/admin/products/new">Add Product</Link>
                </Button>

            </div>
            <ProductTable />
             

        </>
    )
}

async function ProductTable() {

    const products = await db.product.findMany({
        select: {
            id: true,
            name: true,
            priceInCents: true,
            isAvailableForPurchase: true,
            _count: {
                select: {
                    orders: true,
                }
            }
        },
        orderBy: {
            name: 'asc'
        }
    })

    if (products.length === 0) return <p> No Product found!</p>

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-0">
                        <span className="sr-only"> Available For Purchase</span>
                    </TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Orders</TableHead>
                    <TableHead className="w-0">
                        <span className="sr-only"> Actions</span>
                    </TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                { products.map(product => (

                    <TableRow key={product.id}>

                        <TableCell> 
                            {product.isAvailableForPurchase ? (
                                <>
                                    <CheckCircle2 />
                                </>
                            ) : (

                                <XCircle />

                            )}
                        </TableCell>

                    </TableRow>
                )) }
            </TableBody>
        </Table>

    )
}