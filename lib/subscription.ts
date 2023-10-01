import { auth } from "@clerk/nextjs";

const DAY_IN_MS = 86_400_000;

export const checkSubscription = async () => {
  const { userId } = auth();

  if (!userId) {
    return false;
  }

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
  console.log(data, "DATA INSIDE LIB");

  if (!data.success || !data.response.items.length) {
    return false;
  }

  const userSubscription = data.response.items[0];

  const isValid =
    userSubscription.stripe_price_id &&
    new Date(userSubscription.stripe_current_period_end).getTime() + DAY_IN_MS >
      Date.now();

  return !!isValid;

  // const userSubscription = await prismadb.userSubscription.findUnique({
  //   where: {
  //     user_id: userId,
  //   },
  //   select: {
  //     stripeSubscriptionId: true,
  //     stripeCurrentPeriodEnd: true,
  //     stripeCustomerId: true,
  //     stripePriceId: true,
  //   },
  // });

  // if (!userSubscription) {
  //   return false;
  // }

  // const isValid =
  //   userSubscription.stripePriceId &&
  //   userSubscription.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS >
  //     Date.now();

  // return !!isValid;
};
