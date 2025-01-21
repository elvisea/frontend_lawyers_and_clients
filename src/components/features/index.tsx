type Features = {
  name: string;
  description: string;
  icon: React.ElementType;
}

type Props = {
  features: Features[]
}

export const ListFeatures = (props: Props) => {
  return props.features.map((feature) => (
    <div key={feature.name} className="relative pl-16">
      <dt className="text-base/7 font-semibold text-gray-900">
        <div className="absolute left-0 top-0 flex size-10 items-center justify-center rounded-lg bg-indigo-600">
          <feature.icon aria-hidden="true" className="size-6 text-white" />
        </div>
        {feature.name}
      </dt>
      <dd className="mt-2 text-base/7 text-gray-600">{feature.description}</dd>
    </div>
  ))
}