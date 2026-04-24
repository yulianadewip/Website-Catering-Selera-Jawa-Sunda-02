import PesananTable from "@/components/admin/dashboard/pesanan-list";
import CardDashboard from "@/components/admin/dashboard/card-dashboard";

export default function AdminDashboardPage(){
    return(
        <div className="max-w-8xl px-4 py-20 mt-10 mx-auto">
            <CardDashboard />
            <PesananTable />
        </div>
    )
}