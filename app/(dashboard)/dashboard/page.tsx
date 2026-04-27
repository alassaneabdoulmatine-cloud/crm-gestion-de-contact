import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { SectionCards } from "@/components/section-cards"
import { getDashboardStats, getRevenueChartData, getRecentDeals, getRecentContacts } from "./actions"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DataTable } from "@/app/(dashboard)/contacts/data-table"
import { columns } from "@/app/(dashboard)/contacts/columns"

export default async function Page() {
  const [stats, chartData, recentDeals, recentContacts] = await Promise.all([
    getDashboardStats(),
    getRevenueChartData(),
    getRecentDeals(),
    getRecentContacts(),
  ]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
    }).format(amount)
  }

  return (
    <div className="flex flex-1 flex-col h-[calc(100vh-64px)] overflow-y-auto pb-10">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <SectionCards stats={stats} />

          <div className="px-4 lg:px-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <ChartAreaInteractive data={chartData} />
            </div>

            <Card className="flex flex-col h-full">
              <CardHeader>
                <CardTitle>Deals Récents</CardTitle>
              </CardHeader>
              <CardContent className="flex-1 overflow-auto">
                <div className="space-y-4">
                  {recentDeals.length > 0 ? (
                    recentDeals.map((deal) => (
                      <div key={deal.id} className="flex items-center justify-between border-b pb-2 last:border-0 last:pb-0">
                        <div className="space-y-1">
                          <p className="text-sm font-medium leading-none">{deal.title}</p>
                          <p className="text-xs text-muted-foreground">
                            {deal.contact?.name || deal.entreprise?.name || "Sans client"}
                          </p>
                        </div>
                        <div className="text-right space-y-1">
                          <p className="text-sm font-semibold">{formatCurrency(deal.amount || 0)}</p>
                          <Badge variant="outline" className="text-[10px] h-4">
                            {deal.stage?.name || "Prospect"}
                          </Badge>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground text-center py-4">Aucun deal récent</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="px-4 lg:px-6">
            <Card>
              <CardHeader>
                <CardTitle>Nouveaux Contacts</CardTitle>
              </CardHeader>
              <CardContent>
                <DataTable columns={columns} data={recentContacts as any} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
