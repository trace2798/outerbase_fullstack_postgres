import { auth, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { absoluteUrl } from "@/lib/utils";

const settingsUrl = absoluteUrl("/payment");

export async function GET() {
  try {
    const { userId } = auth();
    const user = await currentUser();

    if (!userId || !user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // const userSubscription = await prismadb.userSubscription.findUnique({
    //   where: {
    //     user_id: userId,
    //   },
    // });
    // console.log(userSubscription, "SUBS");

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_OUTERBASE_SECRET}/findStripeSubscription?userId=${userId}`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log(data, "DATA");
    const userSubscription = data.response.items[0];

    console.log(userSubscription, "SUBS");
    if (userSubscription && userSubscription.stripe_customer_id) {
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: userSubscription.stripe_customer_id,
        return_url: settingsUrl,
      });
      console.log(JSON.stringify({ url: stripeSession.url }), "URL FIRST");
      return new NextResponse(JSON.stringify({ url: stripeSession.url }));
    }

    const stripeSession = await stripe.checkout.sessions.create({
      success_url: settingsUrl,
      cancel_url: settingsUrl,
      payment_method_types: ["card"],
      mode: "subscription",
      billing_address_collection: "auto",
      customer_email: user.emailAddresses[0].emailAddress,
      line_items: [
        {
          price_data: {
            currency: "USD",
            product_data: {
              name: "Summize",
              description: "Review and find books you love",
            },
            unit_amount: 1000,
            recurring: {
              interval: "month",
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        userId,
      },
    });

    return new NextResponse(JSON.stringify({ url: stripeSession.url }));
  } catch (error) {
    console.log("[STRIPE_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
