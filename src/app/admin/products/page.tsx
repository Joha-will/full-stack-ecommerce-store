import { PageHeader } from "../_components/PageHeader"
import { Button } from "@/components/ui/button"
import { Table } from "@/components/ui/table"


export default function AdminProductsPage() {
    return (
        <>
            <div className="flex justify-between items-center gap-4">
                <PageHeader> Products </PageHeader>
                <Button asChild>
                    <link href="/admin/products/new">Add Product</link>
                </Button>

            </div>
            <div>
                {/* Product List */}
                <h2>List of Products</h2>
            </div>
             

        </>
    )
}

function ProductTable() {
    return (
        <Table>

            
        </Table>

    )
}