import connectMongo from "@/lib/mongodb";
import Customer from "@/models/customer";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectMongo()

    const total = await Customer.countDocuments()

    // registration type
    const registrationTypes = await Customer.aggregate([
      {
        $group: {
          _id: '$gstDetails.typeOfRegistration',
          count: { $sum: 1 }
        }
      }
    ])


    // Upcoming filing (30 days)
    const now = new Date()
    const in30Days = new Date()
    in30Days.setDate(now.getDate() + 30)

    // Extracting month and day
    const currentMonth = now.getMonth()
    const currentDay = now.getDate()
    const endMonth = in30Days.getMonth()
    const endDay = in30Days.getDate()

    let dateFilter

    if (endMonth === currentMonth) {
      // Same month
      dateFilter = {
        $and: [
          { 'gstDetails.typeOfRegistration': 'Regular' },
          {
            $expr: {
              $and: [
                { $eq: [{ $month: '$gstDetails.filingStartDate' }, currentMonth + 1] },
                { $gte: [{ $dayOfMonth: '$gstDetails.filingStartDate' }, currentDay] },
                { $lte: [{ $dayOfMonth: '$gstDetails.filingStartDate' }, endDay] }
              ]
            }
          }
        ]
      }
    } else {
      // Across months
      dateFilter = {
        $and: [
          { 'gstDetails.typeOfRegistration': 'Regular' },
          {
            $expr: {
              $or: [
                {
                  $and: [
                    { $eq: [{ $month: '$gstDetails.filingStartDate' }, currentMonth + 1] },
                    { $gte: [{ $dayOfMonth: '$gstDetails.filingStartDate' }, currentDay] }
                  ]
                },
                {
                  $and: [
                    { $eq: [{ $month: '$gstDetails.filingStartDate' }, endMonth + 1] },
                    { $lte: [{ $dayOfMonth: '$gstDetails.filingStartDate' }, endDay] }
                  ]
                }
              ]
            }
          }
        ]
      }
    }

    const upcomingFilers = await Customer.find(dateFilter)
      .select('companyName gstDetails.typeOfRegistration gstDetails.filingStartDate')


    // recent registration
    const recentRegistrations = await Customer.find({})
      .sort({ createdAt: -1 })
      .limit(10)
      .select('companyName companyPhone createdAt')


    return NextResponse.json({
      totalCustomers: total,
      typeOfRegistrationBreakdown: registrationTypes,
      upcomingFilers,
      recentRegistrations,
    })

  } catch (err) {
    console.error('Dashboard data fetch failed:', err);
    return new Response(JSON.stringify({ error: 'Failed to fetch dashboard data' }), { status: 500 });
  }
}