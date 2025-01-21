import { CheckIcon } from '@heroicons/react/20/solid'

interface Tier {
  name: string;
  id: string;
  href: string;
  priceMonthly: string;
  description: string;
  features: string[];
  featured: boolean;
}

const tiers: Tier[] = [
  {
    name: 'Hobby',
    id: 'tier-hobby',
    href: '#',
    priceMonthly: '$29',
    description: "The perfect plan if you're just getting started with our product.",
    features: ['25 products', 'Up to 10,000 subscribers', 'Advanced analytics', '24-hour support response time'],
    featured: false,
  },
  {
    name: 'Enterprise',
    id: 'tier-enterprise',
    href: '#',
    priceMonthly: '$99',
    description: 'Dedicated support and infrastructure for your company.',
    features: [
      'Unlimited products',
      'Unlimited subscribers',
      'Advanced analytics',
      'Dedicated support representative',
      'Marketing automations',
      'Custom integrations',
    ],
    featured: true,
  },
]

function classNames(...classes: (string | boolean)[]): string {
  return classes.filter(Boolean).join(' ')
}

export default function PricingSession() {
  return (
    <div id="pricing" className="bg-gray-50 py-24 sm:py-32 lg:px-8 px-4">
      {/* Títulos e descrição principal */}
      <div className="mx-auto text-center max-w-4xl px-6 sm:px-8">
        <h2 className="text-base font-semibold text-indigo-600 uppercase tracking-wide">Pricing</h2>
        <p className="mt-2 text-4xl font-extrabold text-gray-900 sm:text-5xl">
          Choose the right plan for you
        </p>
      </div>

      <p className="mt-4 text-lg text-gray-600 text-center sm:text-xl">
        Choose an affordable plan that’s packed with the best features<br /> for engaging your audience, creating customer loyalty, and driving sales.
      </p>

      {/* Grid de planos */}
      <div className="mx-auto mt-16 grid grid-cols-1 gap-y-8 sm:mt-20 sm:gap-y-10 lg:max-w-4xl lg:grid-cols-2 lg:gap-x-8">
        {tiers.map((tier) => (
          <div
            key={tier.id}
            className={classNames(
              tier.featured
                ? 'relative bg-indigo-600 shadow-xl hover:scale-105 hover:shadow-2xl hover:border-indigo-500 border-2 border-transparent'
                : 'bg-white/60 sm:mx-8 lg:mx-0 hover:scale-105 hover:shadow-lg hover:border-indigo-500 border-2 border-transparent',
              'rounded-3xl p-8 sm:p-8 lg:p-10 ring-1 ring-gray-200 sm:p-10 transform transition-all duration-300 ease-in-out',
            )}
          >
            <h3
              id={tier.id}
              className={classNames(tier.featured ? 'text-white' : 'text-indigo-600', 'text-base font-semibold')}
            >
              {tier.name}
            </h3>

            <p className="mt-4 flex items-baseline gap-x-2">
              <span
                className={classNames(
                  tier.featured ? 'text-white' : 'text-gray-900',
                  'text-5xl font-semibold tracking-tight',
                )}
              >
                {tier.priceMonthly}
              </span>
              <span className={classNames(tier.featured ? 'text-gray-400' : 'text-gray-500', 'text-base')}>/month</span>
            </p>

            <p className={classNames(tier.featured ? 'text-gray-200' : 'text-gray-600', 'mt-6 text-base')}>
              {tier.description}
            </p>

            <ul className={classNames(
              tier.featured ? 'text-gray-200' : 'text-gray-600',
              'mt-8 space-y-3 text-sm sm:mt-10'
            )}>
              {tier.features.map((feature) => (
                <li key={feature} className="flex gap-x-3">
                  <CheckIcon
                    aria-hidden="true"
                    className={classNames(tier.featured ? 'text-white' : 'text-indigo-600', 'h-6 w-5 flex-none')}
                  />
                  {feature}
                </li>
              ))}
            </ul>

            <a
              href={tier.href}
              aria-describedby={tier.id}
              className={classNames(
                tier.featured
                  ? 'bg-indigo-500 text-white shadow-sm hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-600'
                  : 'text-indigo-600 ring-1 ring-inset ring-indigo-200 hover:ring-indigo-300 focus:ring-2 focus:ring-indigo-600',
                'mt-8 block rounded-md px-3.5 py-2.5 text-center text-sm font-semibold sm:mt-10'
              )}
            >
              Get started today
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}
