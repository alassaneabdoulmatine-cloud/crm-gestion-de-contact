'use server'

import prisma from '@/lib/prisma'
import { startOfDay, subDays, format } from 'date-fns'

export async function getDashboardStats() {
  try {
    const [totalRevenue, totalDeals, totalContacts, totalEntreprises] = await Promise.all([
      prisma.deal.aggregate({
        _sum: { amount: true },
        where: { userId: "1" }
      }),
      prisma.deal.count({ where: { userId: "1" } }),
      prisma.contact.count({ where: { userId: "1" } }),
      prisma.entreprise.count({ where: { userId: "1" } }),
    ]);

    // Simple trend calculation (mocked for now, but could be real compared to last month)
    return {
      totalRevenue: totalRevenue._sum.amount || 0,
      totalDeals,
      totalContacts,
      totalEntreprises,
      revenueTrend: "+12.5%", // Mock
      dealsTrend: "+5.2%", // Mock
      contactsTrend: "+8.1%", // Mock
      entreprisesTrend: "+2.4%", // Mock
    };
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return {
      totalRevenue: 0,
      totalDeals: 0,
      totalContacts: 0,
      totalEntreprises: 0,
      revenueTrend: "0%",
      dealsTrend: "0%",
      contactsTrend: "0%",
      entreprisesTrend: "0%",
    };
  }
}

export async function getRevenueChartData() {
  try {
    const deals = await prisma.deal.findMany({
      where: {
        userId: "1",
        createdAt: {
          gt: subDays(new Date(), 90)
        }
      },
      select: {
        amount: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: 'asc'
      }
    });

    // Group deals by day
    const groupedData: Record<string, { date: string, desktop: number, mobile: number }> = {};
    
    // Initialize last 90 days with 0
    for (let i = 0; i < 90; i++) {
        const date = format(subDays(new Date(), i), 'yyyy-MM-dd');
        groupedData[date] = { date, desktop: 0, mobile: 0 };
    }

    deals.forEach(deal => {
      const date = format(deal.createdAt, 'yyyy-MM-dd');
      if (groupedData[date]) {
        // We use 'desktop' field for Revenue for now as the chart expects it
        groupedData[date].desktop += deal.amount || 0;
      }
    });

    // Convert back to array and sort
    return Object.values(groupedData).sort((a, b) => a.date.localeCompare(b.date));
  } catch (error) {
    console.error("Error fetching revenue chart data:", error);
    return [];
  }
}

export async function getRecentDeals() {
  try {
    return await prisma.deal.findMany({
      where: { userId: "1" },
      orderBy: { createdAt: 'desc' },
      take: 5,
      include: {
        contact: true,
        entreprise: true,
        stage: true,
      }
    });
  } catch (error) {
    console.error("Error fetching recent deals:", error);
    return [];
  }
}

export async function getRecentContacts() {
    try {
        const contacts = await prisma.contact.findMany({
            where: { userId: "1" },
            orderBy: { createdAt: 'desc' },
            take: 10,
            include: {
                status: true,
                entreprise: true,
            }
        });
        return contacts;
    } catch (error) {
        console.error("Erreur de récupération des contacts récents:", error);
        return [];
    }
}
