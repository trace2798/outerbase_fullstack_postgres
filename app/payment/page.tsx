import { SubscriptionButton } from "@/components/subscription-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { checkSubscription } from "@/lib/subscription";
import { auth, currentUser } from "@clerk/nextjs";

const SettingsPage = async () => {
  const isPro = await checkSubscription();
  const { userId } = auth();
  const user = await currentUser();
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
  //console.log(data, "DATA");

  // const paymentMethodsStripe = await fetch(
  //   `https://daily-beige.cmd.outerbase.io/stripeTest`,
  //   {
  //     method: "GET",
  //     headers: {
  //       "content-type": "application/json",
  //     },
  //   }
  // );
  // const data2 = await paymentMethodsStripe.json();
  // //console.log(data2, "DATA2");

  return (
    <div className="h-full p-4 space-y-2 flex flex-col items-center">
      <div className="text-muted-foreground text-sm">
        {isPro ? (
          <>
            {" "}
            <Card className="max-w-sm mb-5">
              <CardHeader>
                <CardTitle>You are a Pro user</CardTitle>
                <CardDescription>
                  Data fetched using Outerbase command
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="max-w-sm mb-5">
              <CardHeader>
                <CardTitle>Your Payment Info</CardTitle>
                <CardDescription>
                  Data fetched using Outerbase command
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                {data &&
                  data.response.items.map((item: any) => (
                    <div
                      key={item.id}
                      className="flex flex-col items-center space-y-3 rounded-md border p-4"
                    >
                      <div className="space-y-1 w-full">
                        <p className="text-sm font-medium leading-none">
                          Your User ID
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {item.user_id}
                        </p>
                      </div>
                      <div className="space-y-1 w-full">
                        <p className="text-sm font-medium leading-none">
                          Stripe Customer ID
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {item.stripe_customer_id}
                        </p>
                      </div>
                      <div className="space-y-1 w-full">
                        <p className="text-sm font-medium leading-none">
                          Stripe Subscription ID
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {item.stripe_subscription_id}
                        </p>
                      </div>
                      <div className="space-y-1 w-full">
                        <p className="text-sm font-medium leading-none">
                          Stripe Price ID
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {item.stripe_price_id}
                        </p>
                      </div>
                      <div className="space-y-1 w-full">
                        <p className="text-sm font-medium leading-none">
                          Next Payment Due
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(
                            item.stripe_current_period_end
                          ).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
              </CardContent>
            </Card>
          </>
        ) : (
          <Card className="max-w-sm mb-5">
            <CardHeader>
              <CardTitle>You are on the free plan</CardTitle>
              <CardDescription>
                Become a Pro member for benefits.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="flex flex-col items-center space-y-3 rounded-md border p-4">
                <div className="space-y-1 w-full">
                  <p className="text-sm font-medium leading-none">
                    Summize is a demo app
                  </p>
                  <p className="text-sm text-muted-foreground">
                    You can test the upgrade and won&apos;t be charged.
                  </p>
                </div>
                <div className="space-y-1 w-full">
                  <p className="text-sm font-medium leading-none">
                    Use Stripe Test Card Number
                  </p>
                  <p className="text-sm text-muted-foreground">
                    4242 4242 4242 4242
                  </p>
                </div>
                <div className="space-y-1 w-full">
                  <p className="text-sm font-medium leading-none">
                    For More information on Test card number
                  </p>
                  <p className="text-sm text-indigo-400">
                    <a
                      href=" https://stripe.com/docs/testing?testing-method=card-numbers#visa"
                      target="_blank"
                    >
                      {" "}
                      Check this Link
                    </a>
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              Stripe integrated following US standard. For smooth transaction
              choose US as the Country
            </CardFooter>
          </Card>
        )}
      </div>
      <SubscriptionButton isPro={isPro} />
    </div>
  );
};

export default SettingsPage;
